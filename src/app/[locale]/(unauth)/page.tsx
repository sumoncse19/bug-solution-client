/* eslint-disable prettier/prettier */

"use client";

import { API_URL } from "config";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [selectedType, setSelectedType] = useState<string>("bug");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }
    if (selectedType === "bug" && !selectedFile) {
      setError("Please upload an image");
      return;
    }
    setError("");

    try {
      setIsLoading(true);

      if (selectedType === "bug") {
        // For bug type - send both prompt and image
        const formData = new FormData();
        formData.append("prompt", prompt);
        if (selectedFile) {
          formData.append("imageFile", selectedFile);
        }
        formData.append("feedbackType", selectedType);

        const response = await fetch(
          `${API_URL}/api/v1/ask-query/gemini-image`,
          {
            method: "POST",
            body: formData,
          }
        );
        const responseJson = await response.json();
        setApiResponse(responseJson.data.content);
      } else {
        // For other types - send only prompt
        const response = await fetch(
          `${API_URL}/api/v1/ask-query/gemini-text`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt, feedbackType: selectedType }),
          }
        );
        const responseJson = await response.json();
        setApiResponse(responseJson.data);
      }
    } catch (err: any) {
      setError(
        `An error occurred while processing your request: ${err.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponse = (text: string) => {
    // Split by double newlines or numbered points
    return text
      .split(/\n\n|\d+\.\s/)
      .filter(Boolean)
      .map((paragraph, index) => (
        <p key={`${index + 1}`} className="mb-2">
          {paragraph.startsWith("**") ? (
            // Handle bold text
            <strong>{paragraph.replace(/\*\*/g, "")}</strong>
          ) : paragraph.startsWith("*") ? (
            // Handle bullet points
            <li className="ml-4">{paragraph.replace(/^\*\s/, "")}</li>
          ) : (
            paragraph
          )}
        </p>
      ));
  };

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="my-10 w-[90vw] space-y-4 rounded-lg border bg-white p-4 shadow-xl 3xl:w-1/2">
        <h1 className="text-center text-2xl">This is from home page</h1>
        <Tabs defaultValue="submit-feedback" className="w-full space-y-6">
          <TabsList className="h-10 w-full">
            <TabsTrigger value="submit-feedback" className="h-9 w-1/2 text-lg">
              Submit your feedback
            </TabsTrigger>
            <TabsTrigger value="responseList" className="h-9 w-1/2 text-lg">
              Response List
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="submit-feedback"
            className="flex w-full flex-col gap-6"
          >
            <div className="flex items-center justify-between space-x-4">
              <p className="whitespace-nowrap">Select a type of feedback</p>
              <Select onValueChange={(value) => setSelectedType(value)}>
                <SelectTrigger className="grow">
                  <SelectValue placeholder="Bug" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div
              className={`grid w-full ${selectedType === "bug" ? "grid-cols-2" : "grid-cols-1"}  gap-4`}
            >
              <div className="w-full">
                <Label htmlFor="prompt">Prompt</Label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your prompt"
                  className={`${selectedType === "bug" ? "h-[400px]" : "h-[300px]"} w-full rounded-md border ${error ? "border-red-500" : ""} p-2 outline-none`}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>

              {selectedType === "bug" && (
                <div>
                  <Label htmlFor="picture">Upload your picture</Label>
                  <div className="flex h-[400px] w-full flex-col justify-between space-y-4 rounded-md border p-2">
                    <div className="h-auto max-h-[calc(100%-80px)] grow">
                      {imagePreview && (
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width="100"
                          height="100"
                          className="size-full rounded-md object-contain"
                        />
                      )}
                    </div>
                    <div className="w-full">
                      <Label htmlFor="picture">Picture</Label>
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        className="w-full cursor-pointer"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-md border p-4">
              <h3 className="mb-4 text-lg font-bold">AI Response:</h3>
              <div className="prose max-w-none">
                {apiResponse ? (
                  formatResponse(apiResponse)
                ) : (
                  <p className="italic text-gray-500">No response yet</p>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col items-end justify-end">
              <Button
                variant="outline"
                className="w-fit"
                onClick={handleSubmit}
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? "Sending..." : "Submit"}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="responseList">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Index;

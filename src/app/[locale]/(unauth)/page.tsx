/* eslint-disable prettier/prettier */

"use client";

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="w-1/2 space-y-4 rounded-lg border bg-white p-4 shadow-xl">
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
                  placeholder="Enter your prompt"
                  className={`${selectedType === "bug" ? "h-[600px]" : "h-[300px]"} w-full rounded-md border p-2 outline-none`}
                />
              </div>

              {selectedType === "bug" && (
                <div>
                  <Label htmlFor="picture">Upload your picture</Label>
                  <div className="flex h-[600px] w-full flex-col justify-between space-y-4 rounded-md border p-2">
                    <div className="mt-4 grow">
                      {imagePreview && (
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width="400"
                          height="500"
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

            <div className="flex w-full flex-col items-end justify-end">
              <Button variant="outline" className="w-fit">
                Button
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

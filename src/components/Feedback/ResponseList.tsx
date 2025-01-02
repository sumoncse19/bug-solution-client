/* eslint-disable no-underscore-dangle */
import { API_URL } from 'config';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoReload } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ResponseList = () => {
  const [selectedType, setSelectedType] = useState<string>('text_solution');
  const [apiResponse, setApiResponse] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (type: string) => {
    setIsLoading(true);
    try {
      if (type === 'text_solution') {
        const response = await fetch(
          `${API_URL}/api/v1/ask-query/gemini-text?page=${currentPage}`,
          {
            method: 'GET',
          },
        );

        const responseJson = await response.json();
        if (responseJson.success) {
          setApiResponse(responseJson.data.allTextSolution);
          const totalPagesCount = Math.ceil(
            responseJson.data.total / responseJson.data.limit,
          );
          setTotalPages(totalPagesCount);
          setCurrentPage(responseJson.data.page);
        }
      } else if (type === 'image_solution') {
        const response = await fetch(
          `${API_URL}/api/v1/ask-query/gemini-image?page=${currentPage}`,
          {
            method: 'GET',
          },
        );

        const responseJson = await response.json();
        if (responseJson.success) {
          setApiResponse(responseJson.data.allImageSolution);
          const totalPagesCount = Math.ceil(
            responseJson.data.total / responseJson.data.limit,
          );
          setTotalPages(totalPagesCount);
          setCurrentPage(responseJson.data.page);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedType);
  }, [selectedType, currentPage]);

  const handleSelectedType = (value: string) => {
    setSelectedType(value);
    fetchData(value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const bufferToBase64 = (buffer: any) => {
    if (!buffer) return '';
    const binary = Buffer.from(buffer.data).toString('base64');
    return `data:${buffer.type};base64,${binary}`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between space-x-4">
        <p className="whitespace-nowrap">
          Select a type for response of feedback: {totalPages}
        </p>
        <Select onValueChange={(value) => setSelectedType(value)}>
          <SelectTrigger className="grow">
            <SelectValue placeholder="Idea/Other (Text Solution)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text_solution">
              Idea/Other (Text Solution)
            </SelectItem>
            <SelectItem value="image_solution">Bug(Image Solution)</SelectItem>
          </SelectContent>
        </Select>

        <div
          className="size-9 cursor-pointer rounded-sm bg-green-900 p-2 font-bold"
          onClick={() => handleSelectedType(selectedType)}
        >
          <IoReload className="text-white" />
        </div>
      </div>

      <div className="h-[calc(100vh-300px)] space-y-4 overflow-y-auto rounded-md border p-3">
        <div className="space-y-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : apiResponse.length === 0 ? (
            <div className="rounded-md border p-4 text-center">
              <p>No data found</p>
            </div>
          ) : (
            apiResponse.map((response: any, index) => (
              <div key={`${response._id}`} className="rounded-md border p-4">
                <p className="mt-1">
                  <strong>{index + 1}. Question:</strong>{' '}
                  <span className="italic">{response.prompt}</span>
                </p>
                {selectedType === 'image_solution' && response.imageFile && (
                  <div className="mt-4 h-[500px] w-full">
                    <Image
                      src={bufferToBase64(response.imageFile.buffer)}
                      alt={response.prompt}
                      width={700}
                      height={500}
                      className="size-full rounded-md object-contain"
                    />
                  </div>
                )}
                <p className="mt-1">
                  <strong>Answer:</strong> {response.solution}
                </p>
                <p className="mt-1">
                  <strong>Feedback Type: </strong>
                  <span className="font-bold capitalize italic text-green-800">
                    {response.feedbackType}
                  </span>
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          >
            Previous
          </Button>

          <span className="flex items-center gap-1">
            Page
            <strong>{currentPage}</strong>
            of
            <strong>{totalPages}</strong>
          </span>

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResponseList;

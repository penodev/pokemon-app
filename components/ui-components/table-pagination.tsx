import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { KeyboardEvent, useState } from "react";

import { Input } from "@/components/ui/input";

interface PaginationType {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const TablePagination = ({
  page,
  totalPages,
  setPage,
}: PaginationType) => {
  const [inputPage, setInputPage] = useState<number>(page);
  const handlePrevious = () => {
    if (page > 0) {
      setInputPage(page - 1);
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      setInputPage(page + 1);
      setPage(page + 1);
    }
  };
  const onSubmit = () => {
    if (inputPage > 0 && inputPage <= totalPages) {
      setPage(inputPage);
    } else {
      toast.error("Can not find page");
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className='w-full flex justify-center items-center gap-4 text-sm'>
      <div className='cursor-pointer hover:bg-muted rounded-md p-1'>
        <ChevronLeft className='w-4 h-4' onClick={handlePrevious} />
      </div>
      <Input
        type='text'
        value={inputPage}
        className='w-16'
        onChange={(e) => setInputPage(Number(e.target.value))}
        onKeyDown={(e) => onKeyDown(e)}
      />
      {` of ${totalPages} pages`}
      <div className='cursor-pointer hover:bg-muted rounded-md p-1'>
        <ChevronRight className='w-4 h-4' onClick={handleNext} />
      </div>
    </div>
  );
};

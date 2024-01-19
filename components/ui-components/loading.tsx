import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
}

export const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={cn("w-full mt-16 flex justify-center items-center", className)}
    >
      <Loader2 className='w-4 h-4 animate-spin mr-4' /> Loading...
    </div>
  );
};

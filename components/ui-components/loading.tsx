import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className='w-full mt-16 flex justify-center items-center'>
      <Loader2 className='w-4 h-4 animate-spin mr-4' /> Loading...
    </div>
  );
};

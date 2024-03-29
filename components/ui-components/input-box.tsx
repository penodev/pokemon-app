import React from "react";

import { cn } from "@/lib/utils";

import { Input } from "../ui/input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  setState?: (state: any) => void;
}

export const InputBox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, setState, ...props }, ref) => {
    return (
      <div className='flex flex-col gap-2 w-full justify-end ' ref={ref}>
        <label className='text-xs font-semibold capitalize'>{label}</label>
        <Input
          className={cn(`h-12`, className)}
          onChange={!!setState ? (e) => setState(e.target.value) : () => {}}
          {...props}
        />
      </div>
    );
  }
);
InputBox.displayName = "InputBox";

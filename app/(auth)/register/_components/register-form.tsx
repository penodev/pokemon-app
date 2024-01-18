"use client";

import { InputBox } from "@/components/ui-components/input-box";
import { Button } from "@/components/ui/button";

export const RegisterForm = () => {
  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <form className='w-[400px] space-y-4'>
      <InputBox label='Email' name='email' />

      <InputBox label='Password' name='password' type='password' />
      <Button type='submit'>Submit</Button>
    </form>
  );
};

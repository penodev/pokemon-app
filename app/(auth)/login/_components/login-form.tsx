"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { InputBox } from "@/components/ui-components/input-box";
import { Button } from "@/components/ui/button";
import { getToken } from "@/services/login";
import { Label } from "@/components/ui/label";

export const LoginForm = () => {
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const token = await getToken({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    console.log(token);
    if (token) {
      setCookie("jwt", token);
      router.push("/poke-manage");
    }
  };
  return (
    <form
      className='w-[500px] space-y-4 p-16 bg-white rounded-md'
      onSubmit={onSubmit}
    >
      <div className='w-full text-center  pb-8'>
        <Label className='text-lg font-bold'>🔐 Login</Label>
      </div>
      <InputBox label='Email' name='email' />
      <InputBox label='Password' name='password' type='password' />
      <Button type='submit'>Submit</Button>
    </form>
  );
};

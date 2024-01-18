"use client";

import { InputBox } from "@/components/ui-components/input-box";
import { Button } from "@/components/ui/button";
import { getToken } from "@/services/login";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

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
      router.push("/");
    }
  };
  return (
    <form className='w-[400px] space-y-4' onSubmit={onSubmit}>
      <InputBox label='Email' name='email' />
      <InputBox label='Password' name='password' type='password' />
      <Button type='submit'>Submit</Button>
    </form>
  );
};

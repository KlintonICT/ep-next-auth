'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';

export default function Form() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (!res?.error) {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2 mx-auto max-w-md mt-10'
    >
      <input
        name='email'
        className='border border-black text-black'
        type='email'
      />
      <input
        name='password'
        className='border border-black text-black'
        type='password'
      />
      <button type='submit'>Login</button>
    </form>
  );
}

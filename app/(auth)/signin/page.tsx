"use client";
import { authenticate } from "@/actions/actions";
import SubmitButton from "@/components/FormButton/SubmitButton";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function LoginPage() {
  const ref = useRef<HTMLFormElement>(null);
  let [error, seterror] = useState("");
  return (
    <>
      <main className="w-full h-screen flex flex-col items-center">
        <div className="w-full h-1/4 flex flex-col justify-evenly p-2 gap-2">
          <Image
            src={"logo.svg"}
            width={250}
            height={112}
            className="mx-auto"
            alt={"logo"}
          />
        </div>
        <div className="max-w-md w-full text-gray-600 space-y-1 shadow-sm rounded px-12 py-0 bg-gray-100">
          <div className="text-center">
            <div className="my-2">
              <h3 className="text-gray-800 text-xl font-bold sm:text-xl mb-3">
                Sign In to your account
              </h3>
              {<h3 className="text-red text-xl sm:text-xl">{error}</h3>}
            </div>
          </div>
          <form
            className="space-y-5"
            action={async (FormData) => {
              const response = await authenticate(FormData);
              console.warn(response);
              if (response?.isError) {
                seterror(() => (error = response?.message!));
              } else {
                ref.current?.reset();
                window.location.reload();
              }
            }}
            ref={ref}
          >
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4.5">
              <SubmitButton
                label="Sign in"
                style="flex justify-center gap-3 w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              />
            </div>
          </form>
          <p className="text-center">
            {"Don't have an account? "}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

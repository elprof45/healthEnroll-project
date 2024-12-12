import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HealthEnroll home",
  description: "This is HealthEnrol DashBoard",
};

export default function Home() {
  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <div className="text-center ">
          <div className="w-full h-1/4 flex flex-col justify-evenly p-2 gap-2">
            <Image
              src={"logo.svg"}
              width={300}
              height={112}
              className="mx-auto"
              alt={"logo"}
            />
          </div>
          <div className="py-4">
            <h3 className="text-3xl text-gray-200 font-semibold md:text-4xl">
              Welcome to HealthEnroll
            </h3>
            <p className="text-gray-300 leading-relaxed mt-3">
              Please Sign In to access the application.
            </p>
          </div>
          <div className="mt-5 items-center justify-center gap-3 sm:flex">
            <Link
              href="/signin"
              className="block w-full mt-2 py-2.5 px-8 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

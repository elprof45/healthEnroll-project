import Image from "next/image";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
export const DropdownItems = async () => {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }
  return (
    <>
      <span className="hidden text-right lg:block">
        <span className="block text-sm font-medium text-black dark:text-white">
          {session.user?.email}
        </span>
        <span className="block text-xs"> {session.user?.name}</span>
      </span>

      <span className="h-12 w-12 rounded-full">
        <div className="avatar placeholder ">
          <div className="w-14 bg-blue-600 text-neutral-content rounded-full">
            <span className="text-4xl font-semibold text-white">
              {session.user?.name ? session.user?.name[0].toUpperCase() : "Dr"}
            </span>
          </div>
        </div>
      </span>
    </>
  );
};

"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  label,
  style,
}: {
  label: string;
  style: string;
}) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button className={style} disabled type="submit">
          <div className="h-5 w-5 animate-spin rounded-full border-4 border-solid border-whiter border-t-transparent"></div>
          En cours ...
        </button>
      ) : (
        <button className={style} type="submit">
          {label}
        </button>
      )}
    </>
  );
}

"use client";

import Error from "@/components/Layout/Error.index";
import { ReactNode } from "react";
import { ErrorBoundary as ErrorComponent } from "react-error-boundary";

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  const handleError = (error: Error) => {
    console.error(error);
    console.log("Error 테스트");
  };

  return (
    <ErrorComponent
      fallbackRender={({ error }) => <Error error={error} />}
      onError={handleError}
    >
      {children}
    </ErrorComponent>
  );
}

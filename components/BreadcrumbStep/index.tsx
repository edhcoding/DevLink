"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/utils/cn";
import { Fragment } from "react";

export default function BreadcrumbStep({
  steps,
  currentStep,
  nextClickHandler,
}: {
  steps: string[];
  currentStep: string;
  nextClickHandler: (step: string) => void;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {steps.map((step, index) => (
          <Fragment key={step}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem
              className={cn("cursor-pointer font-medium", {
                "text-rose-500 dark:text-amber-300 font-bold":
                  step === currentStep,
              })}
            >
              <BreadcrumbLink
                onClick={() => nextClickHandler(step)}
                className="hover:text-rose-600 dark:hover:text-amber-400"
              >
                {step}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

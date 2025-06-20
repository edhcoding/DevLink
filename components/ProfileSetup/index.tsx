"use client";

import type { Tables } from "@/database.types";
import StepProfile from "@/components/ProfileSetup/StepProfile";
import useFunnel from "@/hooks/useFunnel";
import { FormData } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import StepSocialInfo from "@/components/ProfileSetup/StepSocialInfo";
import StepAddLinks from "@/components/ProfileSetup/StepAddLinks";
import StepSummary from "@/components/ProfileSetup/StepSummay";
import BreadcrumbStep from "@/components/BreadcrumbStep";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/supabase/actions/profile/action";
import { DevTool } from "@hookform/devtools";
import { formSchema } from "@/constants/form";
import { PersonStanding } from "lucide-react";

interface Props {
  profile: Tables<"profiles">;
  links: Tables<"links">[];
}

const steps = ["Profile", "Social Info", "Add Links", "Summary"];

export default function ProfileSetup({ profile, links }: Props) {
  const { Funnel, Step, currentStep, nextClickHandler, prevClickHandler } =
    useFunnel("Profile");

  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name,
      username: profile.username,
      bio: profile.bio ?? "",
      avatarUrl: profile.avatar_url ?? "",
      githubUrl: profile.github_url ?? "",
      blogUrl: profile.blog_url ?? "",
      linkedinUrl: profile.linkedin_url ?? "",
      links,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const { success } = await updateProfile(data);
    if (success) router.push(`/${formMethods.getValues("username")}`);
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md mx-auto mt-4 p-4 absolute top-14">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center">
            <PersonStanding />
            <h1 className="text-4xl font-extrabold"> 프로필 설정</h1>
          </div>
          <BreadcrumbStep
            steps={steps}
            currentStep={currentStep}
            nextClickHandler={nextClickHandler}
          />
        </div>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="w-full">
          <Funnel>
            <Step name="Profile">
              <StepProfile
                profile={profile}
                onNext={() => nextClickHandler("Social Info")}
              />
            </Step>
            <Step name="Social Info">
              <StepSocialInfo
                onPrev={() => prevClickHandler("Profile")}
                onNext={() => nextClickHandler("Add Links")}
              />
            </Step>
            <Step name="Add Links">
              <StepAddLinks
                onPrev={() => prevClickHandler("Social Info")}
                onNext={() => nextClickHandler("Summary")}
              />
            </Step>
            <Step name="Summary">
              <StepSummary />
            </Step>
          </Funnel>
        </form>
      </div>
      {process.env.NODE_ENV === "development" && (
        <DevTool control={formMethods.control} placement="top-right" />
      )}
    </FormProvider>
  );
}

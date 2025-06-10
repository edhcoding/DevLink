"use client";

import type { Tables } from "@/database.types";
import StepProfile from "@/components/Account/StepProfile";
import useFunnel from "@/hooks/useFunnel";
import { FormData, formSchema } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import StepSocialInfo from "@/components/Account/StepSocialInfo";
import StepAddLinks from "@/components/Account/StepAddLinks";
import StepSummary from "@/components/Account/StepSummay";
import BreadcrumbStep from "@/components/BreadcrumbStep";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/supabase/actions/profile/action";

interface Props {
  profile: Tables<"profiles">;
  links: Tables<"links">[];
}

const steps = ["Profile", "Social Info", "Add Links", "Summary"];

export default function Account({ profile, links }: Props) {
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
    await updateProfile(data);
    router.push(`/${profile.username}`);
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md mx-auto mt-4 p-4 absolute top-14">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-extrabold">프로필 설정</h1>
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
    </FormProvider>
  );
}

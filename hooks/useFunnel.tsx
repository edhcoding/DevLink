import { ReactElement, ReactNode, useState } from "react";

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

export default function useFunnel(defaultStep: string) {
  const [step, setStep] = useState(defaultStep);

  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find(
      (childStep) => childStep.props.name === step
    );

    return <>{targetStep}</>;
  };

  const nextClickHandler = (nextStep: string) => setStep(nextStep);
  const prevClickHandler = (prevStep: string) => setStep(prevStep);

  return {
    Funnel,
    Step,
    currentStep: step,
    nextClickHandler,
    prevClickHandler,
  } as const;
}

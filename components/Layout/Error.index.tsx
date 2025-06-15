import Particles from "@/components/Home/Particles";
import { Button } from "@/components/ui/button";
import { useErrorBoundary } from "react-error-boundary";

export default function Error({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
      <Particles className="absolute inset-0 -z-10" quantity={1000} />

      <div className="flex flex-col items-center justify-center gap-3 max-w-[250px]">
        <h1 className="text-4xl font-extrabold">⚠️ Error</h1>
        <p className="text-lg text-gray-400 text-center mb-10 text-pretty">
          {error.message}
        </p>

        <Button variant="default" onClick={resetBoundary} className="w-full">
          다시 시도
        </Button>
      </div>
    </div>
  );
}

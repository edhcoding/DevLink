import Particles from "@/components/Home/Particles";
import { BarLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
      <Particles className="absolute inset-0 -z-10" quantity={1000} />

      <BarLoader className="!bg-white" />
    </div>
  );
}

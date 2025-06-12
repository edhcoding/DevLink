import { formSchema } from "@/constants/form";
import { z } from "zod";

export type FormData = z.infer<typeof formSchema>;

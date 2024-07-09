import { sportSchema } from "@/utils/zodSchemas";
import { z } from "zod";

export type SportForm = z.infer<typeof sportSchema>
import { Posts } from "@prisma/client";

export interface IPosts extends Posts {
  images: string[];
}

import { authOptions } from "@/lib/authOption";
import NextAuth from "next-auth";

const hander = NextAuth(authOptions);

export { hander as GET, hander as POST };

import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LOKER LO | Sign Up",
};

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp
        appearance={{ variables: { colorPrimary: "#0F172A" } }}
        signInUrl="/sign-in"
      />
    </div>
  );
}

import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LOKER LO | Sign In",
};

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn
        appearance={{ variables: { colorPrimary: "#0F172A" } }}
        signUpUrl="/sign-up"
        afterSignInUrl="/admin"
      />
    </div>
  );
}

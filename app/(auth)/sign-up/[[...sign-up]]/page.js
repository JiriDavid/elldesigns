import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Create Account",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="glass-card gradient-border w-full max-w-md p-10">
        <h1 className="text-center text-2xl font-semibold text-brandSoftPink">
          Join the EllDesigns circle
        </h1>
        <p className="mt-2 text-center text-sm text-white/70">
          Create an account to engage with couture collections and manage
          atelier operations.
        </p>
        <div className="mt-8 flex justify-center">
          <SignUp
            appearance={{
              elements: { card: "bg-transparent shadow-none border-none" },
            }}
          />
        </div>
      </div>
    </div>
  );
}

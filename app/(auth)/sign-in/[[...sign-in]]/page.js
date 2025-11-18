import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="glass-card gradient-border w-full max-w-md p-10">
        <h1 className="text-center text-2xl font-semibold text-brandSoftPink">
          Welcome back to EllDesigns
        </h1>
        <p className="mt-2 text-center text-sm text-white/70">
          Sign in to manage your atelier and connect with patrons.
        </p>
        <div className="mt-8 flex justify-center">
          <SignIn
            appearance={{
              elements: { card: "bg-transparent shadow-none border-none" },
            }}
          />
        </div>
      </div>
    </div>
  );
}

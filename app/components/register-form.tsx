import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/registry/new-york/ui/label";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  React.useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/Dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const firstName = e.target.firstName.value;
    const middleName = e.target.middleName.value;
    const lastName = e.target.lastName.value;
    const occupation = e.target.occupation.value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    setIsLoading(true); // Set isLoading to true when submitting the form

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          middleName,
          lastName,
          occupation,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/Login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    } finally {
      setIsLoading(false); // Set isLoading to false after the registration process completes
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="firstName">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First Name"
                type="text"
                autoComplete="given-name"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="middleName">
                Middle Name
              </Label>
              <Input
                id="middleName"
                name="middleName"
                placeholder="Middle Name"
                type="text"
                autoComplete="additional-name"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="lastName">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                type="text"
                autoComplete="family-name"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="occupation">
                Occupation
              </Label>
              <Input
                id="occupation"
                name="occupation"
                placeholder="Occupation"
                type="text"
                autoComplete="occupation"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            {/* Add input field for photo upload if needed */}
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up
            </Button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
      </div>
    )
  );
}

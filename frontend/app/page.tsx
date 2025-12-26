"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/useLogin";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const loginMutation = useLogin();
  const { data } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (data?.success) {
      router.push(`/${data.user.fullName}`);
    }
  }, [data, router]);

  const handleSubmit = () => loginMutation.mutate(loginData);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-50 dark:bg-slate-900">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-base-100 rounded-xl shadow-lg overflow-hidden border border-primary/25 p-6 sm:p-8 lg:p-10">
        {/* Logo */}

        {/* Error/Success Messages */}
        {loginMutation.error && (
          <div className="alert alert-error mb-4 text-sm">
            {(loginMutation.error as any)?.response?.data?.message ||
              loginMutation.error.message ||
              "Login failed"}
          </div>
        )}
        {loginMutation.isSuccess && (
          <div className="alert alert-success mb-4 text-sm">
            Login successful! Redirecting...
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-1">Welcome Back</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Sign in to your account to check the system
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col space-y-2 w-full">
              <label className="label-text font-medium">Email</label>
              <Input
                type="email"
                placeholder="hello@example.com"
                className="w-full p-3 border-gray-200"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col space-y-2 w-full">
              <label className="label-text font-medium">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border-gray-200"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs mr-2"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

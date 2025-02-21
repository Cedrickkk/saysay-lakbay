import FieldInfo from "@/components/field-info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/api/auth";
import { loginSchema } from "@/schemas/login";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const { user, error } = await login(value.email, value.password);

      if (error) {
        form.setErrorMap({
          onSubmit: error,
        });
        return;
      }

      return user;
    },
  });
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <form.Field
          name="email"
          children={(field) => {
            return (
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            );
          }}
        />

        <form.Field
          name="password"
          children={(field) => {
            return (
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor={field.name}>Password</Label>
                </div>
                <Input
                  id={field.name}
                  type="password"
                  required
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => [state.isSubmitting, state.canSubmit]}
          children={([isSubmitting, canSubmit]) => {
            return (
              <>
                <Button type="submit" className="w-full" disabled={!canSubmit}>
                  {isSubmitting ? "..." : "Login"}
                </Button>
              </>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => [state.errorMap]}
          children={([errorMap]) =>
            errorMap.onSubmit ? (
              <p className="text-sm text-destructive">
                {errorMap.onSubmit.toString()}
              </p>
            ) : null
          }
        />

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <a href="http://localhost:5173/auth/google">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M43.611 20.083H42V20H24V28H35.303C33.654 32.657 29.223 36 24 36C17.373 36 12 30.627 12 24C12 17.373 17.373 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24C4 35.045 12.955 44 24 44C35.045 44 44 35.045 44 24C44 22.659 43.862 21.35 43.611 20.083Z"
                fill="#FFC107"
              />
              <path
                d="M6.30603 14.691L12.877 19.51C14.655 15.108 18.961 12 24 12C27.059 12 29.842 13.154 31.961 15.039L37.618 9.382C34.046 6.053 29.268 4 24 4C16.318 4 9.65603 8.337 6.30603 14.691Z"
                fill="#FF3D00"
              />
              <path
                d="M24 44C29.166 44 33.86 42.023 37.409 38.808L31.219 33.57C29.1439 35.1491 26.6076 36.0028 24 36C18.798 36 14.381 32.683 12.717 28.054L6.19501 33.079C9.50501 39.556 16.227 44 24 44Z"
                fill="#4CAF50"
              />
              <path
                d="M43.611 20.083H42V20H24V28H35.303C34.5142 30.2164 33.0934 32.1532 31.216 33.571L31.219 33.569L37.409 38.807C36.971 39.205 44 34 44 24C44 22.659 43.862 21.35 43.611 20.083Z"
                fill="#1976D2"
              />
            </svg>
            Login with Google
          </a>
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?&nbsp;
        <Link to="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}

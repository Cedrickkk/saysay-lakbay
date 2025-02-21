import { signUp } from "@/api/auth";
import FieldInfo from "@/components/field-info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/schemas/signup";
import { Label } from "@radix-ui/react-label";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onChange: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      const { user, error } = await signUp(
        value.name,
        value.email,
        value.password,
      );
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
        <h1 className="text-2xl font-bold">
          Ready to join us? Create your account.
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Tell us a little about yourself to get started.
        </p>
      </div>
      <div className="grid gap-6">
        <form.Field
          name="name"
          children={(field) => {
            return (
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Name</Label>
                <Input
                  id={field.name}
                  type="text"
                  placeholder="John Doe"
                  required
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            );
          }}
        />

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
                  {isSubmitting ? "..." : "Sign up"}
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
      </div>
      <div className="text-center text-sm">
        Already have an account?&nbsp;
        <Link to="/login" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
}

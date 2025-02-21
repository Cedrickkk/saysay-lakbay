import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div className="container mx-auto -mt-20 flex min-h-screen max-w-screen-xl flex-col items-center justify-center gap-5">
      <Outlet />
    </div>
  );
}

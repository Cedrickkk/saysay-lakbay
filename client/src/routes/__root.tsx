import { authStatusOptions } from "@/hooks/auth/use-auth-status";
import { type QueryClient } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    const data = await queryClient.fetchQuery(authStatusOptions);
    return data;
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <header className="container mx-auto my-6">
        <nav className="flex w-full items-center justify-between gap-5 text-base font-medium">
          <Link
            to="/"
            className="flex items-center font-semibold tracking-wide text-[#19445C]"
          >
            <img src="logo.svg" alt="SaysayLakbay Logo" />
            <span className="text-base font-bold">SaysayLakbay</span>
          </Link>
          <Link
            to="/login"
            className="[&.active]:text-pretty [&.active]:font-bold"
          >
            Login
          </Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

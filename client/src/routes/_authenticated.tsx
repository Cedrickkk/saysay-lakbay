import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {},
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <div>Hello "/_authenticated"!</div>;
}

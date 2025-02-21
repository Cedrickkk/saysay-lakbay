import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center justify-center px-6 py-8 md:flex-row md:justify-between md:px-12 md:py-14 lg:-mt-16 lg:px-24">
        <div className="text-center lg:text-left">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Discover Hidden Gems Near You
            <span className="flex items-center justify-center lg:justify-start">
              <span className="me-1">—</span>
              <span className="text-2xl lg:text-3xl">with SaysayLakbay</span>
            </span>
          </h1>
          <p className="mt-6">Explore, Share, and Review Local Spots</p>
        </div>
        <img
          src="hero.png"
          alt="Hero"
          className="aspect-16/9 mt-8 h-4/5 w-full object-cover md:mt-0 md:w-1/2"
        />
      </div>
    </>
  );
}

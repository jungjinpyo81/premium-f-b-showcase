import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  staticData: { sitemap: false },
  beforeLoad: ({ params }) => {
    const path = (params._splat ?? "").toLowerCase();

    if (path === "globallogisticsservices") {
      throw redirect({ to: "/", hash: "trade", replace: true });
    }

    if (path === "distribution") {
      throw redirect({ to: "/", hash: "distribution", replace: true });
    }

    throw notFound();
  },
});

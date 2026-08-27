import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy per-collection URLs now resolve to the single Taste Journey page. */
export const Route = createFileRoute("/collections/$slug")({
  beforeLoad: ({ params, search }) => {
    throw redirect({ to: "/collections", search, hash: params.slug, replace: true });
  },
});

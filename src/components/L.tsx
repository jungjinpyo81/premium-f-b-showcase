import { Link } from "@tanstack/react-router";

/**
 * Internal link that keeps the current `?lang=` locale across navigations.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function L(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Link {...props} search={(prev: any) => prev} />;
}

import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="font-display text-lg tracking-[0.35em]">
          EUROPE CONNECT
        </Link>
        <nav className="flex items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <Link to="/brands" activeProps={{ className: "text-foreground" }} className="hover:text-foreground">
            Brands
          </Link>
          <Link to="/news" activeProps={{ className: "text-foreground" }} className="hover:text-foreground">
            News
          </Link>
          <Link to="/" hash="inquiry" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-xs text-muted-foreground md:px-10">
        <span className="font-display tracking-[0.35em] text-foreground">EUROPE CONNECT</span>
        <span>Europe Connect · B2B Inquiry Only</span>
      </div>
    </footer>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";

import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SmoothScroll } from "@/components/site/SmoothScroll";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" },
      { title: "AKAHELIX — Genetics laboratory set-up and validation" },
      {
        name: "description",
        content:
          "AKAHELIX plans, builds and validates CAP and NYSDOH-ready molecular genetics and cytogenetics laboratories.",
      },
      { name: "author", content: "AKAHELIX INC." },
      { property: "og:site_name", content: "AKAHELIX" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.akahelix.com/" },
      { property: "og:image", content: "https://www.akahelix.com/og-image.jpg" },
      { property: "og:image:secure_url", content: "https://www.akahelix.com/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "AKAHELIX — LDT Validation & Clinical Compliance" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AKAHELIX — Genetics laboratory set-up and validation" },
      {
        name: "twitter:description",
        content:
          "AKAHELIX plans, builds and validates CAP and NYSDOH-ready molecular genetics and cytogenetics laboratories.",
      },
      { name: "twitter:image", content: "https://www.akahelix.com/og-image.jpg" },
      { name: "twitter:image:alt", content: "AKAHELIX — LDT Validation & Clinical Compliance" },
      { name: "theme-color", content: "#1946f7" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="overflow-x-clip w-full max-w-full overscroll-x-none [touch-action:pan-y]">
        <div className="relative w-full max-w-full overflow-x-clip min-h-screen">
          <div className="intro-curtain" aria-hidden>
            <div className="intro-word font-sans text-[clamp(2.5rem,9vw,7rem)] font-medium leading-none tracking-[-0.06em]">
              <span>AKAHELIX</span>
            </div>
            <div className="intro-count label-mono text-on-blue-muted">Laboratory genetics · Est. 2026</div>
          </div>
          {children}
        </div>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPortal = pathname.startsWith("/admin") || pathname.startsWith("/admin_panel");

  useEffect(() => {
    // Disable iOS Safari pinch-to-zoom and gesture zooming
    const preventGesture = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", preventGesture);
    document.addEventListener("gesturechange", preventGesture);
    document.addEventListener("gestureend", preventGesture);

    return () => {
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        {!isPortal && <Header />}
        <main className="overflow-x-clip w-full max-w-full">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        {!isPortal && <Footer />}
        {!isPortal && <AssistantWidget />}
      </MotionConfig>
    </QueryClientProvider>
  );
}

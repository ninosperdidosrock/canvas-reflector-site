import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";

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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Niños Perdidos · Rock, Disney y Nunca Jamás" },
      { name: "description", content: "Niños Perdidos: la banda madrileña que convierte las canciones de tu infancia en himnos del rock." },
      { property: "og:title", content: "Niños Perdidos · Rock, Disney y Nunca Jamás" },
      { property: "og:description", content: "Niños Perdidos: la banda madrileña que convierte las canciones de tu infancia en himnos del rock." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Niños Perdidos · Rock, Disney y Nunca Jamás" },
      { name: "twitter:description", content: "Niños Perdidos: la banda madrileña que convierte las canciones de tu infancia en himnos del rock." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/283e497c-46a3-4975-b415-af3f62c357a9/id-preview-bd8853a8--d1ae6bd1-a078-4cfa-a71f-1ce205b65a5b.lovable.app-1780564498398.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/283e497c-46a3-4975-b415-af3f62c357a9/id-preview-bd8853a8--d1ae6bd1-a078-4cfa-a71f-1ce205b65a5b.lovable.app-1780564498398.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "google-site-verification", content: "SoWCYYYxTu3uM1A1wLet7v-JTxoGolG3ONBIdAUeJBM" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          name: "Niños Perdidos",
          url: "https://canvas-reflector-site.lovable.app",
          genre: ["Rock", "Disney Covers"],
          description:
            "Banda madrileña que versiona al rock las canciones más míticas de Disney y la animación de los 90 y 2000.",
          foundingLocation: { "@type": "Place", name: "Madrid, España" },
          sameAs: [
            "https://www.instagram.com/ninosperdidos.rock",
            "https://www.youtube.com/@ni%C3%B1osperdidos-rock",
            "https://www.tiktok.com/@ninosperdidosrock",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}

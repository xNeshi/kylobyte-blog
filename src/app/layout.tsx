import NavBar from "@/components/NavBar";
import NavSideBar from "@/components/NavSideBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import "highlight.js/styles/github-dark.css";
import { roboto } from "../../public/font";
import "./globals.css";

export async function generateMetadata() {
  return {
    title: "Kylobyte",
    description:
      "My personal blog where I share my thoughts, experiences, and projects.",
    icons: {
      icon: [
        {
          media: `(prefers-color-scheme: light)`,
          url: "/images/favicon-light.ico",
          href: "/images/favicon-light.ico",
        },
        {
          media: `(prefers-color-scheme: dark)`,
          url: "/images/favicon-dark.ico",
          href: "/images/favicon-dark.ico",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${roboto.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <NavSideBar />
            <div className="flex flex-col w-full items-center pb-30">
              <NavBar />
              <main className="flex flex-col w-full items-center justify-center max-w-[1280px]">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

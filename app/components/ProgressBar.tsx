"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.1 });

function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto") || href.startsWith("tel")) return;
      if (target.getAttribute("target") === "_blank") return;
      NProgress.start();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

export default function ProgressBar() {
  return (
    <>
      <style>{`
        #nprogress .bar {
          background: #b91c1c !important;
          height: 3px !important;
        }
        #nprogress .peg {
          box-shadow: 0 0 10px #b91c1c, 0 0 5px #b91c1c !important;
        }
      `}</style>
      <Suspense fallback={null}>
        <NavigationEvents />
      </Suspense>
    </>
  );
}
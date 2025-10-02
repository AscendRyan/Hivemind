import { useEffect } from "react";
import { Footer } from "@/components/Footer";

export default function SkinFooterBare() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.style.background = "transparent";
    body.style.background = "transparent";
    html.style.margin = "0";
    body.style.margin = "0";
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const style = document.createElement("style");
    style.textContent = `
      footer{background:transparent !important;backdrop-filter:none !important;box-shadow:none !important;border:0 !important;}
    `;
    document.head.appendChild(style);

    // links break out of iframe
    Array.from(document.querySelectorAll('a[href]')).forEach(a =>
      (a as HTMLAnchorElement).setAttribute("target", "_top")
    );

    // report height to parent
    const el = document.querySelector("footer") as HTMLElement | null;
    const send = () => {
      const h = (el?.offsetHeight || document.documentElement.scrollHeight) | 0;
      window.parent?.postMessage({ type: "skin:resize", role: "footer", height: h }, "*");
    };
    const ro = new ResizeObserver(send);
    if (el) ro.observe(el);
    window.addEventListener("load", send);
    window.addEventListener("resize", send);
    send();

    return () => {
      ro.disconnect();
      window.removeEventListener("load", send);
      window.removeEventListener("resize", send);
      style.remove();
    };
  }, []);

  return <Footer />;
}

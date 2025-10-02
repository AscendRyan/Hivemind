import { useEffect } from "react";
import { Header } from "@/components/Header";

export default function SkinHeaderBare() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // transparent, no UA margins, no child scrollbars
    html.style.background = "transparent";
    body.style.background = "transparent";
    html.style.margin = "0";
    body.style.margin = "0";
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    // force header to be static (the IFRAME itself is fixed)
    const style = document.createElement("style");
    style.textContent = `
      header{position:static !important;top:auto !important;left:auto !important;right:auto !important;
             background:transparent !important;backdrop-filter:none !important;box-shadow:none !important;border:0 !important;}
    `;
    document.head.appendChild(style);

    // report height to parent (auto-sizes the iframe; avoids clipping/scrollbars)
    const el = document.querySelector("header") as HTMLElement | null;
    const send = () => {
      const h = (el?.offsetHeight || document.documentElement.scrollHeight) | 0;
      window.parent?.postMessage({ type: "skin:resize", role: "header", height: h }, "*");
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

  return <Header />;
}

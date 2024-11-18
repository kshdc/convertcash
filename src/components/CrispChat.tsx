import { useEffect } from 'react';

export function CrispChat() {
  useEffect(() => {
    // @ts-ignore
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "e77899d6-eac7-4c5e-9b95-468bccc923af";

    const script = document.createElement('script');
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
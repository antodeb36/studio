"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

export function AdBanner() {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const adLoaded = useRef(false);

  useEffect(() => {
    if (adContainerRef.current && !adLoaded.current) {
      try {
        const atOptions = {
          'key' : 'dd12de45e26457221d7ba5ff89d2434b',
          'format' : 'iframe',
          'height' : 60,
          'width' : 468,
          'params' : {}
        };
        
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
          atOptions = ${JSON.stringify(atOptions)};
        `;
        adContainerRef.current.appendChild(script);

        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = '//www.highperformanceformat.com/dd12de45e26457221d7ba5ff89d2434b/invoke.js';
        adContainerRef.current.appendChild(invokeScript);
        
        adLoaded.current = true;
      } catch (error) {
        console.error("Ad script failed to load:", error);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center my-4 w-full h-[60px]">
       <div ref={adContainerRef} style={{ width: '468px', height: '60px' }}></div>
    </div>
  );
}

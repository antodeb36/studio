"use client";

import { useEffect, useRef } from "react";

export function AdBanner() {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adContainerRef.current && !adContainerRef.current.hasChildNodes()) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = '//pl27698582.revenuecpmgate.com/f2a247c5464320760236868ceca4079d/invoke.js';
      
      const container = document.createElement('div');
      container.id = 'container-f2a247c5464320760236868ceca4079d';
      
      adContainerRef.current.appendChild(script);
      adContainerRef.current.appendChild(container);
    }
  }, []);

  return (
    <div className="flex justify-center items-center my-4 w-full">
       <div ref={adContainerRef} className="flex justify-center items-center"></div>
    </div>
  );
}

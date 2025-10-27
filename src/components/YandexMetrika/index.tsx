"use client";

import Script from "next/script";

const YANDEX_METRIKA_ID = 9004708;

export const YandexMetrika = () => {
  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');

            ym(${YANDEX_METRIKA_ID}, 'init', {
              webvisor:true,
              trackHash:true,
              clickmap:true,
              ecommerce:"dataLayer",
              accurateTrackBounce:true,
              trackLinks:true
            });
          `,
        }}
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
};

// Hook to use Yandex Metrika goals
export const useYandexMetrika = () => {
  const reachGoal = (goal: string, params?: any) => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(YANDEX_METRIKA_ID, "reachGoal", goal, params);
    }
  };

  return { reachGoal };
};

export default YandexMetrika;


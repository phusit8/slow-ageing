import liff from "@line/liff";

let liffInitPromise: Promise<typeof liff> | null = null;

export function initLiff(): Promise<typeof liff> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Cannot initialize LIFF on server side"));
  }

  if (!liffInitPromise) {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

    if (!liffId) {
      return Promise.reject(new Error("NEXT_PUBLIC_LIFF_ID is not configured"));
    }

    // สร้าง Promise พร้อม Timeout 10 วินาที ป้องกัน LIFF ค้างใน WebView
    const initPromise = new Promise<typeof liff>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("LINE LIFF initialization timed out"));
      }, 10000);

      liff
        .init({ liffId })
        .then(() => {
          clearTimeout(timer);
          resolve(liff);
        })
        .catch((err) => {
          clearTimeout(timer);
          liffInitPromise = null;
          reject(err);
        });
    });

    liffInitPromise = initPromise;
  }

  return liffInitPromise;
}

export { liff };
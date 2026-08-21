import liff from "@line/liff";

let liffInitPromise: Promise<typeof liff> | null = null;

export function initLiff() {
    if (!liffInitPromise) {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID!;

        if (!liffId) {
            return Promise.reject(new Error("NEXT_PUBLIC_LIFF_ID is notset"));

        }

        liffInitPromise = liff.init({ liffId }).then(() => liff).catch((err) => { liffInitPromise = null; throw err; });
    }
    return liffInitPromise;
}
export {liff};
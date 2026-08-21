"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { initLiff } from "@/lib/liff";

export interface LiffProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

interface UseLiffState {
  isReady: boolean; // liff.init() เสร็จแล้ว
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isInClient: boolean; // เปิดอยู่ภายในแอป LINE หรือไม่
  profile: LiffProfile | null;
  error: string | null;
}

export function useLiff() {
  const [state, setState] = useState<UseLiffState>({
    isReady: false,
    isLoggedIn: false,
    isLoggingIn: false,
    isInClient: false,
    profile: null,
    error: null,
  });

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    async function setup() {
      try {
        const liff = await initLiff();
        const inClient = liff.isInClient();
        const loggedIn = liff.isLoggedIn();

        if (loggedIn) {
          try {
            const profile = await liff.getProfile();
            if (isMountedRef.current) {
              setState({
                isReady: true,
                isLoggedIn: true,
                isLoggingIn: false,
                isInClient: inClient,
                profile,
                error: null,
              });
            }
          } catch (profileErr) {
            if (isMountedRef.current) {
              setState({
                isReady: true,
                isLoggedIn: true,
                isLoggingIn: false,
                isInClient: inClient,
                profile: null,
                error:
                  profileErr instanceof Error
                    ? profileErr.message
                    : "Failed to load profile",
              });
            }
          }
        } else {
          if (isMountedRef.current) {
            setState({
              isReady: true,
              isLoggedIn: false,
              isLoggingIn: false,
              isInClient: inClient,
              profile: null,
              error: null,
            });
          }
        }
      } catch (err) {
        if (isMountedRef.current) {
          setState({
            isReady: true,
            isLoggedIn: false,
            isLoggingIn: false,
            isInClient: false,
            profile: null,
            error: err instanceof Error ? err.message : "LIFF init failed",
          });
        }
      }
    }

    setup();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // ฟังก์ชันเรียกตอนกดปุ่ม "เข้าสู่ระบบด้วย LINE"
  const login = useCallback(async () => {
    setState((s) => ({ ...s, isLoggingIn: true, error: null }));
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("manual_logout");
    }

    try {
      const liff = await initLiff();

      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        setState((s) => ({
          ...s,
          isReady: true,
          isLoggedIn: true,
          isLoggingIn: false,
          profile,
          error: null,
        }));
        window.location.replace("/home");
        return;
      }

      liff.login({
        redirectUri: window.location.origin + "/",
      });
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoggingIn: false,
        error: err instanceof Error ? err.message : "Login failed",
      }));
    }
  }, []);

  const logout = useCallback(async () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("manual_logout", "true");
    }

    try {
      const liff = await initLiff();
      if (liff.isLoggedIn()) {
        liff.logout();
      }
      setState((s) => ({
        ...s,
        isLoggedIn: false,
        profile: null,
      }));
    } catch {
      setState((s) => ({ ...s, isLoggedIn: false, profile: null }));
    }
  }, []);

  const closeWindow = useCallback(async () => {
    try {
      const liff = await initLiff();
      if (liff.isInClient()) {
        liff.closeWindow();
      }
    } catch (err) {
      console.error("Failed to close window:", err);
    }
  }, []);

  return { ...state, login, logout, closeWindow };
}
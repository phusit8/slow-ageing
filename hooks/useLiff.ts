"use client";

import { useCallback, useEffect, useState } from "react";
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
  profile: LiffProfile | null;
  error: string | null;
}

export function useLiff() {
  const [state, setState] = useState<UseLiffState>({
    isReady: false,
    isLoggedIn: false,
    isLoggingIn: false,
    profile: null,
    error: null,
  });

  // init ตอนโหลดหน้า — เช็คว่าล็อกอินอยู่แล้วหรือยัง
  useEffect(() => {
    let cancelled = false;

    async function setup() {
      try {
        const liff = await initLiff();
        if (cancelled) return;

        const loggedIn = liff.isLoggedIn();

        if (loggedIn) {
          const profile = await liff.getProfile();
          if (cancelled) return;
          setState((s) => ({
            ...s,
            isReady: true,
            isLoggedIn: true,
            profile,
          }));
        } else {
          setState((s) => ({ ...s, isReady: true, isLoggedIn: false }));
        }
      } catch (err) {
        if (cancelled) return;
        setState((s) => ({
          ...s,
          isReady: true,
          error: err instanceof Error ? err.message : "LIFF init failed",
        }));
      }
    }

    setup();
    return () => {
      cancelled = true;
    };
  }, []);

  // ฟังก์ชันเรียกตอนกดปุ่ม "เข้าสู่ระบบด้วย LINE"
  const login = useCallback(async () => {
    setState((s) => ({ ...s, isLoggingIn: true, error: null }));
    try {
      const liff = await initLiff();

      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        setState((s) => ({
          ...s,
          isLoggingIn: false,
          isLoggedIn: true,
          profile,
        }));
        window.location.replace("/home");
        return;
      }

      // ให้ redirect ไปที่ /home โดยตรงหลังจากล็อกอินสำเร็จ
      const targetRedirect = window.location.origin + "/home";
      liff.login({
        redirectUri: targetRedirect,
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
    try {
      const liff = await initLiff();
      if (liff.isLoggedIn()) {
        liff.logout();
      }
      setState((s) => ({ ...s, isLoggedIn: false, profile: null }));
    } catch {
      setState((s) => ({ ...s, isLoggedIn: false, profile: null }));
    }
  }, []);

  return { ...state, login, logout };
}
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

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    async function setup() {
      try {
        const liff = await initLiff();

        const loggedIn = liff.isLoggedIn();

        if (loggedIn) {
          try {
            const profile = await liff.getProfile();
            if (isMountedRef.current) {
              setState({
                isReady: true,
                isLoggedIn: true,
                isLoggingIn: false,
                profile,
                error: null,
              });
            }
          } catch (profileErr) {
            // หากดึง profile ไม่สำเร็จแต่ล็อกอินอยู่
            if (isMountedRef.current) {
              setState({
                isReady: true,
                isLoggedIn: true,
                isLoggingIn: false,
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
    try {
      const liff = await initLiff();

      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        setState({
          isReady: true,
          isLoggedIn: true,
          isLoggingIn: false,
          profile,
          error: null,
        });
        window.location.replace("/home");
        return;
      }

      // ใน LINE App หรือ Browser ให้ใช้ Endpoint URL ปัจจุบัน
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
    try {
      const liff = await initLiff();
      if (liff.isLoggedIn()) {
        liff.logout();
      }
      setState({
        isReady: true,
        isLoggedIn: false,
        isLoggingIn: false,
        profile: null,
        error: null,
      });
    } catch {
      setState((s) => ({ ...s, isLoggedIn: false, profile: null }));
    }
  }, []);

  return { ...state, login, logout };
}
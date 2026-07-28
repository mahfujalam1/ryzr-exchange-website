"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { googlePrefill } from "@/actions";

type GoogleCredentialResponse = { credential?: string };

type GoogleAccounts = {
  id: {
    initialize: (options: {
      client_id: string;
      callback: (response: GoogleCredentialResponse) => void;
    }) => void;
    renderButton: (
      element: HTMLElement,
      options: Record<string, string | number>,
    ) => void;
  };
};

declare global {
  interface Window {
    google?: { accounts: GoogleAccounts };
  }
}

const CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
  "795427673427-ui1nerdb1g1brm7ivt4bs4a9pvvupma0.apps.googleusercontent.com";

export default function GoogleSignInButton() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCredential = useCallback(
    async ({ credential }: GoogleCredentialResponse) => {
      if (!credential || isLoading) return;

      setIsLoading(true);
      setError("");
      try {
        const response = await googlePrefill(credential);
        const prefill = response?.data ?? response;
        sessionStorage.setItem("googleJoinPrefill", JSON.stringify(prefill));
        router.push("/join?provider=google");
      } catch (caughtError: unknown) {
        const apiError = caughtError as {
          response?: { data?: { detail?: string } };
        };
        setError(
          apiError.response?.data?.detail ??
            "Google sign-in failed. Please try again.",
        );
        setIsLoading(false);
      }
    },
    [isLoading, router],
  );

  useEffect(() => {
    if (!scriptReady || !CLIENT_ID || !buttonRef.current || !window.google) {
      return;
    }

    const buttonElement = buttonRef.current;
    let renderedWidth = 0;
    let animationFrame = 0;

    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredential,
    });

    const renderButton = () => {
      const nextWidth = Math.floor(Math.min(buttonElement.clientWidth, 400));

      if (nextWidth <= 0 || nextWidth === renderedWidth || !window.google) {
        return;
      }

      renderedWidth = nextWidth;
      buttonElement.replaceChildren();
      window.google.accounts.id.renderButton(buttonElement, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "center",
        width: nextWidth,
      });
    };

    renderButton();

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(renderButton);
    });
    resizeObserver.observe(buttonElement);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [handleCredential, scriptReady]);

  return (
    <div className="w-full">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div
        ref={buttonRef}
        className={`w-full min-w-0 min-h-11 overflow-hidden flex justify-center ${isLoading ? "pointer-events-none opacity-60" : ""}`}
        aria-busy={isLoading}
      />
      {error && (
        <p className="mt-2 text-center text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

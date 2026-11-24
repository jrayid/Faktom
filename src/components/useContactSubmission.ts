"use client";

import { useState } from "react";
import type { ZodType } from "zod";

export function useContactSubmission(endpoint: string, schema: ZodType, successMessage: string) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  function clearField(field: string) {
    setErrors((current) => ({ ...current, [field]: "" }));
    setStatus("");
  }

  async function send(values: unknown) {
    setStatus("");
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) if (issue.path[0]) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      setStatus("Please check the highlighted fields and try again.");
      const firstInvalid = Object.keys(next)[0];
      const prefix = endpoint.endsWith("quote") ? "quote" : "vendor";
      window.requestAnimationFrame(() => {
        const target = firstInvalid === "interests"
          ? document.querySelector<HTMLInputElement>("#vendor-interest-options input")
          : document.getElementById(`${prefix}-${firstInvalid}`);
        target?.focus();
      });
      return false;
    }

    setErrors({});
    setBusy(true);
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      setStatus(successMessage);
      return true;
    } catch {
      setStatus("We couldn’t send your details just now. Your entries are still here; please try again shortly.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  return { errors, status, busy, send, clearField };
}

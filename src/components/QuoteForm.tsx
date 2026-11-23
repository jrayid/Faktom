"use client";

import { FormEvent, useState } from "react";
import { quoteSchema } from "@/lib/schemas";
import { services } from "@/data/services";

const states = ["Rivers", "Cross River", "Bayelsa", "Imo", "Abia", "Akwa Ibom", "Enugu", "Other"];
const initial = { fullName: "", phone: "", email: "", state: "", serviceType: "", siteAddress: "", message: "", consent: false, website: "" };

export default function QuoteForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  function update(field: keyof typeof initial, value: string | boolean) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setStatus("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    const parsed = quoteSchema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) if (issue.path[0]) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      setStatus("Please check the highlighted fields and try again.");
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const response = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not send your request. Please try again.");
      setStatus("Thank you. Your quote request has been received.");
      setValues(initial);
    } catch {
      setStatus("We couldn’t send your request just now. Your details are still here; please try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  const error = (field: keyof typeof initial) => errors[field] ? <span className="field-error" id={`quote-${field}-error`}>{errors[field]}</span> : null;
  const described = (field: keyof typeof initial) => errors[field] ? `quote-${field}-error` : undefined;

  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="honeypot" aria-hidden="true"><label htmlFor="quote-website">Leave this field empty</label><input id="quote-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} /></div>
    <div className="form-grid">
      <div className="form-field"><label htmlFor="quote-fullName">Full name</label><input id="quote-fullName" autoComplete="name" value={values.fullName} onChange={(event) => update("fullName", event.target.value)} aria-invalid={!!errors.fullName} aria-describedby={described("fullName")} />{error("fullName")}</div>
      <div className="form-field"><label htmlFor="quote-phone">Phone</label><input id="quote-phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={!!errors.phone} aria-describedby={described("phone")} />{error("phone")}</div>
      <div className="form-field"><label htmlFor="quote-email">Email</label><input id="quote-email" type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={!!errors.email} aria-describedby={described("email")} />{error("email")}</div>
      <div className="form-field"><label htmlFor="quote-state">State</label><select id="quote-state" value={values.state} onChange={(event) => update("state", event.target.value)} aria-invalid={!!errors.state} aria-describedby={described("state")}><option value="">Select state</option>{states.map((state) => <option key={state}>{state}</option>)}</select>{error("state")}</div>
      <div className="form-field"><label htmlFor="quote-serviceType">Service type</label><select id="quote-serviceType" value={values.serviceType} onChange={(event) => update("serviceType", event.target.value)} aria-invalid={!!errors.serviceType} aria-describedby={described("serviceType")}><option value="">Select a service</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}</select>{error("serviceType")}</div>
      <div className="form-field"><label htmlFor="quote-siteAddress">Site address</label><input id="quote-siteAddress" autoComplete="street-address" value={values.siteAddress} onChange={(event) => update("siteAddress", event.target.value)} aria-invalid={!!errors.siteAddress} aria-describedby={described("siteAddress")} />{error("siteAddress")}</div>
      <div className="form-field form-field-wide"><label htmlFor="quote-message">Message</label><textarea id="quote-message" rows={5} value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={!!errors.message} aria-describedby={described("message")} />{error("message")}</div>
      <div className="form-field form-field-wide"><label className="consent-label"><input type="checkbox" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} aria-invalid={!!errors.consent} aria-describedby={described("consent")} /> <span>I agree to be contacted about this request.</span></label>{error("consent")}</div>
    </div>
    <p className="form-privacy">We’ll use your details to review and respond to this quote request. See our <a href="/privacy">privacy notice</a>.</p>
    <div className="form-submit-row"><button className="button button-amber" type="submit" disabled={busy}>{busy ? "Sending…" : "Send quote request"} <span aria-hidden="true">→</span></button><p className="form-status" role="status" aria-live="polite">{status}</p></div>
  </form>;
}

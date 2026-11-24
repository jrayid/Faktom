"use client";

import { FormEvent, useState } from "react";
import { quoteSchema } from "@/lib/schemas";
import { useContactSubmission } from "@/components/useContactSubmission";
import { services } from "@/data/services";

const states = ["Rivers", "Cross River", "Bayelsa", "Imo", "Abia", "Akwa Ibom", "Enugu", "Other"];
const initial = { fullName: "", phone: "", email: "", state: "", serviceType: "", siteAddress: "", message: "", consent: false, website: "" };

export default function QuoteForm() {
  const [values, setValues] = useState(initial);
  const { errors, status, busy, send, clearField } = useContactSubmission("/api/quote", quoteSchema, "Thank you. Your quote request has been received.");

  function update(field: keyof typeof initial, value: string | boolean) {
    setValues((current) => ({ ...current, [field]: value }));
    clearField(field);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (await send(values)) setValues(initial);
  }

  const error = (field: keyof typeof initial) => errors[field] ? <span className="field-error" id={`quote-${field}-error`}>{errors[field]}</span> : null;
  const described = (field: keyof typeof initial) => errors[field] ? `quote-${field}-error` : undefined;

  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="honeypot" aria-hidden="true"><label htmlFor="quote-website">Leave this field empty</label><input id="quote-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} /></div>
    <div className="form-grid">
      <div className="form-field"><label htmlFor="quote-fullName">Full name</label><input id="quote-fullName" autoComplete="name" required value={values.fullName} onChange={(event) => update("fullName", event.target.value)} aria-invalid={!!errors.fullName} aria-describedby={described("fullName")} />{error("fullName")}</div>
      <div className="form-field"><label htmlFor="quote-phone">Phone</label><input id="quote-phone" type="tel" autoComplete="tel" required value={values.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={!!errors.phone} aria-describedby={described("phone")} />{error("phone")}</div>
      <div className="form-field"><label htmlFor="quote-email">Email</label><input id="quote-email" type="email" autoComplete="email" required value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={!!errors.email} aria-describedby={described("email")} />{error("email")}</div>
      <div className="form-field"><label htmlFor="quote-state">State</label><select id="quote-state" required value={values.state} onChange={(event) => update("state", event.target.value)} aria-invalid={!!errors.state} aria-describedby={described("state")}><option value="">Select state</option>{states.map((state) => <option key={state}>{state}</option>)}</select>{error("state")}</div>
      <div className="form-field"><label htmlFor="quote-serviceType">Service type</label><select id="quote-serviceType" required value={values.serviceType} onChange={(event) => update("serviceType", event.target.value)} aria-invalid={!!errors.serviceType} aria-describedby={described("serviceType")}><option value="">Select a service</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}</select>{error("serviceType")}</div>
      <div className="form-field"><label htmlFor="quote-siteAddress">Site address</label><input id="quote-siteAddress" autoComplete="street-address" required value={values.siteAddress} onChange={(event) => update("siteAddress", event.target.value)} aria-invalid={!!errors.siteAddress} aria-describedby={described("siteAddress")} />{error("siteAddress")}</div>
      <div className="form-field form-field-wide"><label htmlFor="quote-message">Message</label><textarea id="quote-message" rows={5} required value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={!!errors.message} aria-describedby={described("message")} />{error("message")}</div>
      <div className="form-field form-field-wide"><label className="consent-label"><input id="quote-consent" type="checkbox" required checked={values.consent} onChange={(event) => update("consent", event.target.checked)} aria-invalid={!!errors.consent} aria-describedby={described("consent")} /> <span>I agree to be contacted about this request.</span></label>{error("consent")}</div>
    </div>
    <p className="form-privacy">We’ll use your details to review and respond to this quote request. See our <a href="/privacy">privacy notice</a>.</p>
    <div className="form-submit-row"><button className="button button-amber" type="submit" disabled={busy}>{busy ? "Sending…" : "Send quote request"} <span aria-hidden="true">→</span></button><p className="form-status" role="status" aria-live="polite">{status}</p></div>
  </form>;
}

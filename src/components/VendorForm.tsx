"use client";

import { FormEvent, useState } from "react";
import { vendorSchema } from "@/lib/schemas";
import { useContactSubmission } from "@/components/useContactSubmission";

const interests = ["Preventive maintenance", "Corrective maintenance", "Transformer installation", "Meter and DISCO coordination", "Other"];
const initial = { companyName: "", contactPerson: "", role: "", phone: "", email: "", interests: [] as string[], regions: "", message: "", consent: false, website: "" };

export default function VendorForm() {
  const [values, setValues] = useState(initial);
  const { errors, status, busy, send, clearField } = useContactSubmission("/api/vendor", vendorSchema, "Thank you. Your vendor enquiry has been received.");

  function update(field: keyof typeof initial, value: string | boolean | string[]) {
    setValues((current) => ({ ...current, [field]: value }));
    clearField(field);
  }

  function toggleInterest(item: string) {
    update("interests", values.interests.includes(item) ? values.interests.filter((value) => value !== item) : [...values.interests, item]);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (await send(values)) setValues(initial);
  }

  const error = (field: keyof typeof initial) => errors[field] ? <span className="field-error" id={`vendor-${field}-error`}>{errors[field]}</span> : null;
  const described = (field: keyof typeof initial) => errors[field] ? `vendor-${field}-error` : undefined;

  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="honeypot" aria-hidden="true"><label htmlFor="vendor-website">Leave this field empty</label><input id="vendor-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} /></div>
    <div className="form-grid">
      <div className="form-field"><label htmlFor="vendor-companyName">Company name</label><input id="vendor-companyName" autoComplete="organization" required value={values.companyName} onChange={(event) => update("companyName", event.target.value)} aria-invalid={!!errors.companyName} aria-describedby={described("companyName")} />{error("companyName")}</div>
      <div className="form-field"><label htmlFor="vendor-contactPerson">Contact person</label><input id="vendor-contactPerson" autoComplete="name" required value={values.contactPerson} onChange={(event) => update("contactPerson", event.target.value)} aria-invalid={!!errors.contactPerson} aria-describedby={described("contactPerson")} />{error("contactPerson")}</div>
      <div className="form-field"><label htmlFor="vendor-role">Role</label><input id="vendor-role" autoComplete="organization-title" required value={values.role} onChange={(event) => update("role", event.target.value)} aria-invalid={!!errors.role} aria-describedby={described("role")} />{error("role")}</div>
      <div className="form-field"><label htmlFor="vendor-phone">Phone</label><input id="vendor-phone" type="tel" autoComplete="tel" required value={values.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={!!errors.phone} aria-describedby={described("phone")} />{error("phone")}</div>
      <div className="form-field"><label htmlFor="vendor-email">Email</label><input id="vendor-email" type="email" autoComplete="email" required value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={!!errors.email} aria-describedby={described("email")} />{error("email")}</div>
      <fieldset className="form-field form-field-wide interest-field" aria-required="true" aria-invalid={!!errors.interests} aria-describedby={described("interests")}><legend>Interest</legend><div className="interest-options" id="vendor-interest-options">{interests.map((item) => <label className="interest-option" key={item}><input type="checkbox" checked={values.interests.includes(item)} onChange={() => toggleInterest(item)} />{item}</label>)}</div>{error("interests")}</fieldset>
      <div className="form-field form-field-wide"><label htmlFor="vendor-regions">Regions of interest</label><input id="vendor-regions" required value={values.regions} onChange={(event) => update("regions", event.target.value)} aria-invalid={!!errors.regions} aria-describedby={described("regions")} />{error("regions")}</div>
      <div className="form-field form-field-wide"><label htmlFor="vendor-message">Message</label><textarea id="vendor-message" rows={5} required value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={!!errors.message} aria-describedby={described("message")} />{error("message")}</div>
      <div className="form-field form-field-wide"><label className="consent-label"><input id="vendor-consent" type="checkbox" required checked={values.consent} onChange={(event) => update("consent", event.target.checked)} aria-invalid={!!errors.consent} aria-describedby={described("consent")} /> <span>I agree to be contacted about this enquiry.</span></label>{error("consent")}</div>
    </div>
    <p className="form-privacy">We’ll use your details to review and respond to this vendor enquiry. See our <a href="/privacy">privacy notice</a>.</p>
    <div className="form-submit-row"><button className="button button-amber" type="submit" disabled={busy}>{busy ? "Sending…" : "Send vendor enquiry"} <span aria-hidden="true">→</span></button><p className="form-status" role="status" aria-live="polite">{status}</p></div>
  </form>;
}

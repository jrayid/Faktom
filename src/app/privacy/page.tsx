import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice | Fakom International Services Ltd",
  description: "A draft privacy notice for information submitted to Fakom International Services Ltd through this website.",
};

export default function PrivacyPage() {
  return <main id="main" tabIndex={-1}><section className="inner-hero"><div className="container inner-hero-content"><p className="eyebrow"><span className="eyebrow-line"/> Privacy notice</p><h1>Your information<br/><em>and this website.</em></h1><p className="inner-hero-lede">[REVIEW WITH LEGAL]</p></div></section>
    <section className="section privacy-content"><div className="container privacy-copy"><p className="privacy-review">[REVIEW WITH LEGAL]</p><h2>Information you submit</h2><p>When you send a quote request or vendor enquiry, this website collects the contact and project information you provide, including your name, organisation, phone number, email address, location and message.</p><h2>How information is used</h2><p>The information is used to review and respond to your enquiry. During development, submissions may be stored in a local JSONL file and email notifications may be written to the server log when email is not configured.</p><h2>Data protection</h2><p>This draft is intended to be reviewed and completed for compliance with the Nigeria Data Protection Act. Contact Fakom at <a href="mailto:fakomintlservicesltd@gmail.com">fakomintlservicesltd@gmail.com</a> with questions about an enquiry or personal information.</p><h2>Retention and rights</h2><p>Retention periods, applicable rights, and the process for making a data request: [TO CONFIRM].</p></div></section>
  </main>;
}

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | CPLAB",
  description: "How the Cyber Physical Laboratory collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-oxford-50 to-oxford-100 border border-oxford-200 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-oxford-600" />
            </div>
          </div>
          <div className="text-center mb-14">
            <p className="text-xs text-oxford-600 uppercase tracking-widest font-medium mb-4">Legal</p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-gray-500 text-sm">Last updated: August 4, 2026</p>
          </div>

          <div className="space-y-10">
            <Section title="1. Introduction">
              <p>
                The Cyber Physical Laboratory (&quot;CPLAB&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your
                privacy and is committed to protecting the personal information you share with us through
                this website. This Privacy Policy explains what information we collect, how we use it, and
                the choices you have.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p>We collect information you voluntarily provide when you interact with the site, including:</p>
              <ul>
                <li>Contact details submitted through the <strong>Contact</strong> form (name, email, subject, message).</li>
                <li>Application details submitted through the <strong>Recruitment</strong> form (name, email, phone, academic background, research interests, and statement of purpose).</li>
                <li>Your email address if you subscribe to our <strong>Newsletter</strong>.</li>
                <li>Basic usage data such as pages visited, collected automatically to help us maintain and improve the site.</li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>Information collected through this site is used to:</p>
              <ul>
                <li>Respond to inquiries submitted via the contact form.</li>
                <li>Review and process recruitment applications.</li>
                <li>Send newsletter updates to subscribers who opt in.</li>
                <li>Maintain, secure, and improve the functionality of the website.</li>
              </ul>
              <p>We do not sell, rent, or trade your personal information to third parties.</p>
            </Section>

            <Section title="4. Third-Party Services">
              <p>
                This website uses trusted third-party infrastructure providers to operate:
              </p>
              <ul>
                <li><strong>Firebase (Google)</strong> — used to securely store submitted form data and manage administrator authentication.</li>
                <li><strong>Cloudinary</strong> — used to host and deliver images displayed on the site.</li>
              </ul>
              <p>
                These providers process data on our behalf and are bound by their own privacy and security
                practices. We only share the minimum information necessary for the site to function.
              </p>
            </Section>

            <Section title="5. Data Security">
              <p>
                We restrict administrative access to submitted data to authorized CPLAB staff only, using
                authenticated accounts. While no method of transmission or storage is 100% secure, we take
                reasonable technical measures to protect your information from unauthorized access.
              </p>
            </Section>

            <Section title="6. Data Retention">
              <p>
                We retain contact messages, recruitment applications, and newsletter subscriptions for as
                long as necessary to fulfil the purpose they were collected for, or until you request their
                removal.
              </p>
            </Section>

            <Section title="7. Your Rights">
              <p>
                You may request access to, correction of, or deletion of the personal information you have
                submitted to us at any time by contacting us using the details below.
              </p>
            </Section>

            <Section title="8. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page
                with an updated revision date.
              </p>
            </Section>

            <Section title="9. Contact Us">
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:help@cplab.org" className="text-oxford-600 hover:underline">help@cplab.org</a>.
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">{title}</h2>
      <div className="text-gray-600 text-[15px] leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-gray-700">
        {children}
      </div>
    </section>
  );
}

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | CPLAB",
  description: "The terms governing your use of the Cyber Physical Laboratory website.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-oxford-50 to-oxford-100 border border-oxford-200 flex items-center justify-center">
              <FileText className="w-7 h-7 text-oxford-600" />
            </div>
          </div>
          <div className="text-center mb-14">
            <p className="text-xs text-oxford-600 uppercase tracking-widest font-medium mb-4">Legal</p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-gray-500 text-sm">Last updated: August 4, 2026</p>
          </div>

          <div className="space-y-10">
            <Section title="1. Acceptance of Terms">
              <p>
                By accessing or using the Cyber Physical Laboratory (&quot;CPLAB&quot;, &quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;) website, you agree to be bound by these Terms of Service. If you do not agree
                with any part of these terms, please do not use this website.
              </p>
            </Section>

            <Section title="2. Use of the Website">
              <p>
                This website is provided to share information about CPLAB&apos;s research, team, publications,
                projects, and news, and to allow prospective researchers and visitors to get in touch or
                apply to join the lab. You agree to use the site only for lawful purposes and in a manner
                that does not infringe the rights of, or restrict or inhibit the use of, this site by others.
              </p>
            </Section>

            <Section title="3. Intellectual Property">
              <p>
                Unless otherwise stated, all content on this website — including text, research summaries,
                publication listings, graphics, logos, and the site design — is the property of CPLAB or its
                respective authors and is protected by applicable intellectual property laws. Publications
                linked from this site remain subject to the copyright terms of their respective publishers.
              </p>
            </Section>

            <Section title="4. User Submissions">
              <p>
                When you submit information through our Contact, Recruitment, or Newsletter forms, you
                confirm that the information provided is accurate and that you have the right to share it.
                Submitting a recruitment application does not guarantee admission or a position at CPLAB.
              </p>
            </Section>

            <Section title="5. Certificate Verification">
              <p>
                The certificate verification tool is provided for the convenience of confirming certificates
                genuinely issued by CPLAB. Any misuse of this tool, including attempts to forge or falsely
                validate a certificate, is strictly prohibited.
              </p>
            </Section>

            <Section title="6. Prohibited Conduct">
              <p>You agree not to:</p>
              <ul>
                <li>Attempt to gain unauthorized access to any part of the website or its underlying systems.</li>
                <li>Submit false, misleading, or malicious content through any form on this site.</li>
                <li>Interfere with or disrupt the operation of the website.</li>
                <li>Reproduce, duplicate, or resell any part of this website without permission.</li>
              </ul>
            </Section>

            <Section title="7. Disclaimer of Warranties">
              <p>
                This website and its content are provided &quot;as is&quot; without warranties of any kind, express
                or implied. While we strive to keep information accurate and up to date, we make no
                guarantees regarding the completeness or accuracy of the content published here.
              </p>
            </Section>

            <Section title="8. Limitation of Liability">
              <p>
                CPLAB shall not be liable for any direct, indirect, incidental, or consequential damages
                arising from your use of, or inability to use, this website.
              </p>
            </Section>

            <Section title="9. Changes to These Terms">
              <p>
                We may revise these Terms of Service at any time. Continued use of the website after changes
                are posted constitutes acceptance of the updated terms.
              </p>
            </Section>

            <Section title="10. Governing Law">
              <p>
                These terms are governed by the laws of Bangladesh, without regard to its conflict of law
                principles.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>
                Questions about these Terms of Service can be sent to{" "}
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

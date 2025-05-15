
import Header from "../components/shared/Header";

export default function TermsPage() {
  return (
    <>
      <Header />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold my-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: May 1, 2025</p>
          </div>

          <div className="bg-card rounded-2xl p-8 mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>
                Welcome to Wishify ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service")
                govern your use of our website located at wishify.com (the "Service") operated by Wishify.
              </p>
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
                the terms, then you may not access the Service.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">2. Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current
                at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate
                termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any
                activities or actions under your password, whether your password is with our Service or a third-party
                service.
              </p>
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming
                aware of any breach of security or unauthorized use of your account.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">3. Content</h2>
              <h3 className="text-xl font-semibold mt-6 mb-3">3.1 User Content</h3>
              <p>
                Our Service allows you to post, link, store, share and otherwise make available certain information,
                text, graphics, videos, or other material ("User Content"). You are responsible for the User Content that
                you post to the Service, including its legality, reliability, and appropriateness.
              </p>
              <p>
                By posting User Content to the Service, you grant us the right and license to use, modify, publicly
                perform, publicly display, reproduce, and distribute such content on and through the Service. You retain
                any and all of your rights to any User Content you submit, post or display on or through the Service and
                you are responsible for protecting those rights.
              </p>
              <p>You represent and warrant that:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  The User Content is yours (you own it) or you have the right to use it and grant us the rights and
                  license as provided in these Terms, and
                </li>
                <li>
                  The posting of your User Content on or through the Service does not violate the privacy rights,
                  publicity rights, copyrights, contract rights or any other rights of any person.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Content Restrictions</h3>
              <p>
                Wishify reserves the right, but not the obligation, to monitor and edit all User Content provided by
                users. In addition, we have the right to remove any User Content for any reason at our sole discretion,
                including but not limited to User Content that we determine violates the Terms.
              </p>
              <p>You agree that you will not post User Content that is:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, or obscene</li>
                <li>Invasive of another's privacy</li>
                <li>
                  Infringing upon or violating any third party's intellectual property rights or rights of publicity or
                  privacy
                </li>
                <li>
                  Containing software viruses or any other computer code designed to interrupt, destroy, or limit the
                  functionality of any computer software, hardware, or telecommunications equipment
                </li>
                <li>
                  Impersonating any person or entity or falsely stating or otherwise misrepresenting your affiliation
                  with a person or entity
                </li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">4. Wishlist and Gift Reservations</h2>
              <p>
                Wishify provides a platform for users to create wishlists and for other users to view and reserve items
                on those wishlists. By using these features, you acknowledge and agree to the following:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Wishify does not guarantee that items on wishlists will be purchased or gifted by other users.
                </li>
                <li>
                  When you reserve an item on another user's wishlist, you are indicating your intention to purchase that
                  item as a gift, but this does not create a legally binding obligation to do so.
                </li>
                <li>
                  Wishify is not responsible for the quality, safety, or legality of items on wishlists or for the
                  fulfillment of gift reservations between users.
                </li>
                <li>
                  We do not transfer funds between users and are not involved in the actual transaction between gift
                  givers and recipients.
                </li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">5. Links To Other Web Sites</h2>
              <p>
                Our Service may contain links to third-party web sites or services that are not owned or controlled by
                Wishify.
              </p>
              <p>
                Wishify has no control over, and assumes no responsibility for, the content, privacy policies, or
                practices of any third party web sites or services. You further acknowledge and agree that Wishify shall
                not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be
                caused by or in connection with use of or reliance on any such content, goods or services available on or
                through any such web sites or services.
              </p>
              <p>
                We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites
                or services that you visit.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">6. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
                account, you may simply discontinue using the Service or delete your account through the account settings
                page.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">7. Limitation Of Liability</h2>
              <p>
                In no event shall Wishify, nor its directors, employees, partners, agents, suppliers, or affiliates, be
                liable for any indirect, incidental, special, consequential or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Your access to or use of or inability to access or use the Service;</li>
                <li>Any conduct or content of any third party on the Service;</li>
                <li>
                  Any content obtained from the Service; and unauthorized access, use or alteration of your transmissions
                  or content.
                </li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">8. Disclaimer</h2>
              <p>
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE"
                basis. The Service is provided without warranties of any kind, whether express or implied, including, but
                not limited to, implied warranties of merchantability, fitness for a particular purpose,
                non-infringement or course of performance.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">9. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard
                to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
                provisions of these Terms will remain in effect.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">10. Changes</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
                is material we will try to provide at least 30 days notice prior to any new terms taking effect. What
                constitutes a material change will be determine any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:terms@wishify.com" className="text-[#D4B499] hover:underline">
                  terms@wishify.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      </>
  );
}

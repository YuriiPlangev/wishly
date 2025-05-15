import React from 'react'
import Header from '../components/shared/Header'

const page = () => {
  return (<>
    <Header />
    <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">


          <div className="bg-card rounded-2xl p-8  my-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p>
                At Wishify ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal
                information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you visit our website and use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                please do not access the site or use our services.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
              <p>We collect information in the following ways:</p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Personal Information You Provide</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Register for an account</li>
                <li>Create or edit your user profile</li>
                <li>Create and share wishlists</li>
                <li>Reserve gifts for others</li>
                <li>Contact us with inquiries or feedback</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p>This information may include:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Password</li>
                <li>Profile information (such as profile picture, bio, location)</li>
                <li>Gift preferences and wishlist content</li>
                <li>Communications with us</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Information Collected Automatically</h3>
              <p>
                When you visit our website, we may automatically collect certain information about your device and usage
                patterns. This information may include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Device information</li>
                <li>Pages visited and features used</li>
                <li>Time spent on pages</li>
                <li>Referring website</li>
                <li>Click patterns</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and manage your account</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize your experience and provide content and features relevant to your interests</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold certain
                information. Cookies are files with a small amount of data that may include an anonymous unique
                identifier.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
                if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
              <p>We use the following types of cookies:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Essential cookies:</strong> Necessary for the website to function properly
                </li>
                <li>
                  <strong>Preference cookies:</strong> Enable the website to remember your preferences
                </li>
                <li>
                  <strong>Analytics cookies:</strong> Help us understand how visitors interact with our website
                </li>
                <li>
                  <strong>Marketing cookies:</strong> Used to track visitors across websites to display relevant
                  advertisements
                </li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Data Sharing and Disclosure</h2>
              <p>We may share your information in the following situations:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>With your consent:</strong> We may disclose your personal information for any purpose with
                  your consent.
                </li>
                <li>
                  <strong>With service providers:</strong> We may share your information with third-party vendors,
                  service providers, and other business partners who perform services on our behalf.
                </li>
                <li>
                  <strong>For legal reasons:</strong> We may disclose your information if required to do so by law or in
                  response to valid requests by public authorities.
                </li>
                <li>
                  <strong>Business transfers:</strong> We may share or transfer your information in connection with, or
                  during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a
                  portion of our business.
                </li>
                <li>
                  <strong>With other users:</strong> When you share personal information or interact in public areas
                  with other users, such information may be viewed by all users and may be publicly distributed.
                </li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the
                security of any personal information we process. However, please also remember that we cannot guarantee
                that the internet itself is 100% secure.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Your Data Protection Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>The right to access, update, or delete your personal information</li>
                <li>The right to rectification if your information is inaccurate or incomplete</li>
                <li>The right to object to our processing of your personal data</li>
                <li>The right to request restriction of processing your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us at{" "}
                <a href="mailto:privacy@wishify.com" className="text-[#D4B499] hover:underline">
                  privacy@wishify.com
                </a>
                .
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Children's Privacy</h2>
              <p>
                Our service is not intended for use by children under the age of 13. We do not knowingly collect
                personally identifiable information from children under 13. If you are a parent or guardian and you are
                aware that your child has provided us with personal information, please contact us.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                Policy are effective when they are posted on this page.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@wishify.com" className="text-[#D4B499] hover:underline">
                  privacy@wishify.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      </>
  )
}

export default page
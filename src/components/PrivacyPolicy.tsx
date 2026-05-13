import React from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-20"
    >
      <div className="relative w-full max-w-4xl h-full flex flex-col bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-white/5 bg-zinc-900/50">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Privacy Policy</h2>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">THE ELITE CARS LLC — Compliance</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 text-zinc-400 font-light leading-relaxed text-sm scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <section className="space-y-4">
            <p>
              The Elite Cars is committed to maintaining the highest level of privacy protection for its users. Our Privacy Policy, which has been updated for the General Data Protection Regulation (GDPR) launched on 25th May 2018, is designed to help you understand how we collect, use and safeguard the information you provide to us and to assist you in making informed decisions when using our website.
            </p>
            <p>
              By accepting our newly updated Privacy Policy, you consent to our collection, storage, use and disclosure of your personal information as described herein.
            </p>
            <p>
              The Website Policies and Terms & Conditions may be changed or updated occasionally to meet the requirements and standards. Therefore the Customers’ are encouraged to frequently visit these sections in order to be updated about the changes on the website. Modifications will be effective on the day they are posted.
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">I. INFORMATION WE COLLECT</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                We collect “Personal Information.” This includes your name, phone number, and email, which you submit to us through inquiry and contact forms.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">II. PAYMENT DETAILS</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                All credit/debit cards details and personally identifiable information will NOT be stored, sold, shared, rented or leased to any third parties.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">III. HOW WE USE AND SHARE INFORMATION</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                Except as otherwise stated in this Privacy Policy, we do not sell, trade, rent or otherwise share for marketing purposes your Personal Information with third parties without your consent. In general, the Personal Information you provide to us is primarily used to help us communicate with you. For example, we use it to contact users in response to questions, solicit feedback, and notify about our promotional offers.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">IV. EMAIL MARKETING AND NEWSLETTERS</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                Whenever we have a promotion or special announcement, which we believe is of interest to you, we may send out content via email from time to time. The same goes for companies which we deem interested in our services and/or offerings, which may include invitation for partnership and/or events we participate in.
              </p>
              <p>
                If you don’t wish to receive these communications, please let us know by clicking the “unsubscribe” button/ link on all the email correspondence we send out.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">V. HOW WE PROTECT YOUR INFORMATION</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                Our customers trust us to protect their personal information. This is why we take that task seriously and maintain reasonable and appropriate physical, electronic and procedural safeguards to help protect any personal information provided to us.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">VI. YOUR RIGHTS REGARDING THE USE OF YOUR PERSONAL INFORMATION</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                You have the right at any time to prevent us from contacting you for marketing purposes. When we send a promotional communication to a user, the user can opt out of further promotional communications by following the unsubscribe instructions provided in each promotional e-mail and or SMS.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">VII. CONTACT US</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                If you have any questions regarding this Privacy Policy or the practices of this website, please contact us by sending an email to <span className="text-white font-medium">Customer-Care@TheEliteCars.com</span>.
              </p>
            </div>
          </section>

          <section className="pt-10 border-t border-white/5 opacity-50">
            <p className="text-[10px] uppercase tracking-[0.4em]">Effective Date: May 2026</p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

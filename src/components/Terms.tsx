import React from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";

interface TermsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Terms({ isOpen, onClose }: TermsProps) {
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
            <h2 className="text-2xl font-bold tracking-tight">Terms and Conditions</h2>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">THE ELITE CARS LLC — Legal Department</p>
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
              THE ELITE CARS LLC, a company incorporated in the United Arab Emirates, having its registered office at P.O. Box 393316, Dubai, UAE, and, its subsidiaries and affiliated companies, as the case may be (hereinafter, “The Elite Cars LLC”, “we”, “us” or “our”), operates and maintains (as the case may be) this website and any related mobile applications (collectively referred to as the “Platforms”) and all the information, communications, software, scripting, photos, text, video, graphics, music, sounds, images and other materials and services found on the Platforms (collectively the ”Content”) are for the use of our customers, employees and members of the general public and only for the lawful purposes described below.
            </p>
            <p>
              The Platforms are provided as a service to you and are intended to allow you and other users to browse and order products and other goods or services ("Products") offered for sale on the Platforms ("Services"). The Elite Cars LLC reserves the right to delete, modify, or supplement the content of the Platforms at any time for any reason without prior notification, and will use reasonable efforts to include up-to-date and accurate information on the Platforms.
            </p>
            <p>
              The terms and words 'you', 'your', or 'Buyer' shall mean and include a natural or legal person(s) who has or have agreed to these Terms.
            </p>
            <p className="font-bold text-white italic">
              NOTWITHSTANDING ANY ORAL OR WRITTEN INFORMATION, OPINIONS, EVALUATIONS, DESCRIPTIONS, OR CONSULTATIONS OF ANY KIND FURNISHED BY THE ELITE CARS LLC TO THE CONTRARY, YOU SPECIFICALLY AGREE TO THE TERMS SET FORTH BELOW.
            </p>
            <p className="font-bold text-white uppercase tracking-widest text-[10px]">
              PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE USING ANY OF THE PLATFORMS.
            </p>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">1. TERMS AND CONDITIONS</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                1. These Terms and Conditions (the "Terms") are between The Elite Cars LLC and you as an end user of the Platforms and the Services. Changes in law or changes in The Elite Cars LLC’s business may require changes to be made to the Terms from time to time, so The Elite Cars LLC encourages you to review the Terms periodically for any such changes. It is also your responsibility to carefully read, agree with and accept the Terms and Platforms’ Privacy Policy (the "Privacy Policy") on each occasion you use the Platforms and your continued use of the Platforms shall signify your acceptance to be bound by the latest Terms and Privacy Policy. If you do not agree to (or cannot comply with) any of the Terms, do not use the Platforms.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">2. USER CONDUCT AND CONTENT</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4 text-zinc-400">
              <p>
                1. You agree to comply with all legal requirements of the applicable jurisdiction(s) with regard to your use of the Platforms, and you acknowledge that you are entirely responsible for ensuring your own familiarity with such requirements and your own compliance with the same.
              </p>
              <p>
                2. The Platforms may at times provide opportunities for users to post reviews and other comments, questions, suggestions, or other information ("User Content") on or through these Platforms by e-mail or telephone, or otherwise as may be disclosed, submitted or offered in connection with your use of the Platforms. You warrant that any such User Content submitted by you to the Platforms is original (and does not infringe the intellectual property rights of others).
              </p>
              <p>
                3. The Elite Cars LLC will be entitled to use, reproduce, disclose, modify, adapt, create derivative works from, publish, display and distribute any User Content you submit for any purpose whatsoever, without restriction and without compensating you in any way.
              </p>
              <p>
                4. You agree that any User Content submitted by you to the Platforms will not violate the Terms or any right of any third party, including without limitation, copyright, trademark, privacy, or other personal or proprietary right/s.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">3. ORDERS & PAYMENTS</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                When you place an Order with us, then subject to your rights to cancel or return the vehicle, you commit to buy the item described in that Order, at the price indicated including taxes and duties where applicable.
              </p>
              <p>
                A minimum deposit of AED 5000 is required for any reservation valid for X days to arrange for bank finance or full payment. Any extension of the reservation will be at the discretion of The Elite Cars.
              </p>
              <p>
                The Elite Cars is not responsible for typographical or pricing errors that may be discovered on the Website. In such an event where a vehicle or products is listed at an incorrect price or with incorrect information, The Elite Cars has the right, at its sole discretion, to refuse or cancel any orders placed.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">4. CANCELLATION & REFUND</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                You may contact us at any time prior to your Order being confirmed by us to change it. If you do so, we will do our best to change it, subject to stock availability and any applicable price adjustment.
              </p>
              <p>
                The reservation deposit is valid for X days and will be refunded to the original card from which the deposit was paid if the order has not been confirmed within such a period.
              </p>
              <p>
                On physical inspection of the vehicle or product, if it appears that the reserved vehicle or product is not as per your requirement, The Elite Cars agrees to refund your deposit without any interest.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">5. COPYRIGHT & INTELLECTUAL PROPERTY</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                All design, text, graphics, logos, button icons, images, audio and video clips, the selection and arrangement thereof, and all software on the Websites is Copyright (c) 2026 The Elite Cars LLC. All rights reserved.
              </p>
              <p>
                TheEliteCars.com and all page headers, custom graphics and button icons are service marks, trademarks, and/or trade dress of The Elite Cars and may not be used in connection with any product or service that is not offered by The Elite Cars.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">6. DISCLAIMER & LIMITATION OF LIABILITY</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                The Elite Cars will not be liable for any damages of any kind arising out of or in connection with the use of the Websites. This is an all-encompassing limitation of liability that applies to all damages of any kind, including but not limited to direct, indirect, incidental, punitive or consequential damages.
              </p>
              <p>
                You agree to defend, indemnify and hold harmless The Elite Cars (and its officers, directors, agents, subsidiaries, joint ventures, employees and third-party service providers) from all claims, demands, losses, liabilities, costs, and expenses.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight">7. GOVERNING LAW</h3>
            <div className="pl-4 border-l border-zinc-800 space-y-4">
              <p>
                Any dispute or claim arising out of or in connection with this Website shall be governed and construed in accordance with the laws of UAE.
              </p>
            </div>
          </section>

          <section className="pt-10 border-t border-white/5 opacity-50">
            <p className="text-[10px] uppercase tracking-[0.4em]">Last Updated: May 2026</p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

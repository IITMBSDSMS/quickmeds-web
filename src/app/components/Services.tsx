"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    href: "/services/emergency-hospitals",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    iconBg: "bg-red-50 text-emergency",
    tag: "Emergency",
    tagColor: "bg-red-50 text-emergency",
    title: "Emergency Hospital Routing",
    description:
      "We find the nearest hospital with a confirmed available bed and route your ambulance before you arrive. No guessing, no wasted time.",
    cta: "Get Emergency Help",
    ctaClass: "text-emergency hover:text-red-700 font-semibold text-sm",
  },
  {
    href: "/services/medicine-delivery",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    iconBg: "bg-brand-greenLight text-brand-greenDark",
    tag: "30 min delivery",
    tagColor: "bg-brand-greenLight text-brand-greenDark",
    title: "Medicine Delivery at Your Door",
    description:
      "Upload your prescription and get verified medicines delivered from a licensed pharmacy nearby. Fast, reliable, and safe.",
    cta: "Order Medicines",
    ctaClass: "text-brand-greenDark hover:text-brand-green font-semibold text-sm",
  },
  {
    href: "/services/doctor-consultation",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    iconBg: "bg-blue-50 text-blue-600",
    tag: "Available now",
    tagColor: "bg-blue-50 text-blue-600",
    title: "Consult a Doctor Online",
    description:
      "Talk to a verified, experienced doctor from your home via video or chat. Get prescriptions, advice, and follow-up care instantly.",
    cta: "Book Consultation",
    ctaClass: "text-blue-600 hover:text-blue-700 font-semibold text-sm",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-surface section-pad">
      <div className="container-max">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-brand-green uppercase tracking-widest">What we offer</span>
          <h2 className="mt-3 section-title">
            Everything you need,{" "}
            <span className="text-brand-green">right when you need it</span>
          </h2>
          <p className="mt-4 section-subtitle">
            From emergency hospital routing to medicine delivery and doctor consultations — QuickMeds is your complete healthcare partner.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={service.href} className="block h-full">
                <div className="card h-full p-7 flex flex-col group hover:-translate-y-1 transition-transform duration-300">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${service.iconBg}`}>
                    {service.icon}
                  </div>

                  {/* Tag */}
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 w-fit ${service.tagColor}`}>
                    {service.tag}
                  </span>

                  <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-green transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-textSecondary leading-relaxed flex-1">
                    {service.description}
                  </p>

                  <div className={`mt-6 flex items-center gap-1 ${service.ctaClass}`}>
                    {service.cta}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
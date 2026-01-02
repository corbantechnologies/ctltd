const projects = [
  {
    slug: "sacco-platform",
    title: "SACCO Platform",
    shortDescription:
      "Comprehensive financial management system for small and medium SACCOs in Kenya.",
    website: null,
    imagePlaceholder: "/projects/sacco.png",
    techStack: ["Next.js", "Django REST Framework", "PostgreSQL"],
    featured: true,
    highlights: [
      "Currently onboarding Tamarind SACCO and Mwanda Mzedu SACCO",
      "Secure member management and loan tracking",
      "Automated financial reporting",
    ],
    fullDescription: [
      "A robust platform built specifically for Kenyan SACCOs to streamline operations, member management, contributions, loans, and financial reporting.",
      "Designed with compliance and data security as top priorities.",
      "Currently in active onboarding phase with two SACCOs.",
    ],
    goals: "Onboard 5 additional SACCOs by end of 2026.",
  },
  {
    slug: "sherehe-platform",
    title: "Sherehe Platform",
    shortDescription:
      "Event ticketing and management platform for Kenya and East Africa.",
    website: "https://sherehe.co.ke",
    imagePlaceholder: "/projects/sherehe.png",
    techStack: [
      "Next.js",
      "Django REST Framework",
      "PostgreSQL",
      "M-Pesa Daraja API",
    ],
    featured: true,
    highlights: [
      "Processed over KSH 700,000 in ticket sales",
      "100+ attendees in first week of flagship event",
      "Used by Tamarind Hotel Mombasa and L-Boogie",
    ],
    fullDescription: [
      "Sherehe is a modern event ticketing platform designed for the Kenyan and East African market.",
      "First rollout successfully powered the L-Boogie Event on 30th August 2025, enabling seamless ticket sales, attendee check-in, and organizer analytics.",
      "Current second rollout in progress with major enhancements:",
      "- Company accounts (instead of individuals)",
      "- Support for Mastercard and Visa payments",
      "- Multi-event management for organizers",
      "- Improved UI/UX and data analytics dashboard",
      "- Self check-in for attendees",
    ],
    goals: "Onboard 10+ major events by end of 2026.",
  },

  {
    slug: "ct-drive",
    title: "CT Drive",
    shortDescription:
      "Premium car rental and chauffeur services in Mombasa and across Kenya.",
    website: "https://www.ctdrive.co.ke",
    imagePlaceholder: "/projects/ctdrive.png",
    techStack: ["Next.js", "Tailwind CSS", "Custom Booking System"],
    featured: true,
    highlights: [
      "Wide range: sedans, SUVs, vans, luxury cars",
      "Airport transfers & chauffeur-driven options",
      "Available in Mombasa, Nairobi, Diani, Malindi",
    ],
    fullDescription: [
      "CT Drive is a premium car rental company offering reliable, safe, and comfortable transportation across Kenya.",
      "Fleet includes modern vehicles with latest safety and tech features.",
      "Committed to exceptional customer service and satisfaction.",
    ],
    goals: null,
  },
];

export { projects };

/**
 * Curated Verified Civic & Legal Sources Dataset
 * Rule: Only include real official URLs. verified is true only when URL exists and is authentic.
 */
export const VERIFIED_SOURCES = {
  TENANCY: [
    {
      title: "Model Tenancy Act (MTA) Framework — Ministry of Housing and Urban Affairs",
      description: "Central policy framework outlining landlord-tenant rights, security deposit caps, and adjudication guidelines. Note: States may enact or adapt their own Tenancy Acts based on this framework.",
      type: "Model framework",
      url: "https://mohua.gov.in",
      verified: true,
      jurisdictionLevel: "National (Advisory Model)"
    },
    {
      title: "National Legal Services Authority (NALSA)",
      description: "Apex statutory body providing free legal aid, legal awareness, and alternative dispute resolution through Lok Adalats.",
      type: "Central/National law",
      url: "https://nalsa.gov.in",
      verified: true,
      jurisdictionLevel: "Pan India"
    },
    {
      title: "Transfer of Property Principles (Section 106 Notice Norms)",
      description: "Statutory legal principles governing formal written notice and reasonable timeframes prior to civil dispute escalation.",
      type: "Central/National law",
      url: null,
      verified: false,
      jurisdictionLevel: "National Statutory Reference"
    }
  ],

  CONSUMER: [
    {
      title: "National Consumer Helpline (NCH) — Dept. of Consumer Affairs",
      description: "Official Government of India portal and helpline for lodging consumer grievances against sellers, service providers, and e-commerce platforms.",
      type: "Central/National law",
      url: "https://consumerhelpline.gov.in",
      verified: true,
      jurisdictionLevel: "All India (National)"
    },
    {
      title: "e-Daakhil Portal — Consumer Commission E-Filing",
      description: "Official digital filing system established under the Consumer Protection Act, 2019 for filing formal consumer complaints online before District/State Commissions.",
      type: "Central/National law",
      url: "https://edaakhil.nic.in",
      verified: true,
      jurisdictionLevel: "District / State / National Commissions"
    },
    {
      title: "Consumer Protection Act, 2019 Guidelines on Defective Goods & Unfair Trade",
      description: "Codified statutory rights of consumers regarding replacement, refund, product liability, and time-bound grievance resolution.",
      type: "Central/National law",
      url: null,
      verified: false,
      jurisdictionLevel: "National Statutory Law"
    }
  ],

  RTI: [
    {
      title: "RTI Online Portal — Government of India",
      description: "Official Central Government portal for filing RTI applications and first appeals for Central Ministries and Departments only. Note: Does NOT handle State Government RTI applications.",
      type: "Central/National law",
      url: "https://rtionline.gov.in",
      verified: true,
      jurisdictionLevel: "Central Ministries & Central Public Authorities ONLY"
    },
    {
      title: "Right to Information Act, 2005 Statutory Framework",
      description: "Statutory law mandating timely response (within 30 days) to citizen requests for government records and expenditure disclosures.",
      type: "Central/National law",
      url: null,
      verified: false,
      jurisdictionLevel: "Pan India (Central and State Authorities)"
    },
    {
      title: "Central Information Commission (CIC)",
      description: "Statutory appellate body for second appeals concerning Central Government Public Authorities.",
      type: "Central/National law",
      url: "https://cic.gov.in",
      verified: true,
      jurisdictionLevel: "Central Government Jurisdiction"
    }
  ],

  GENERIC: [
    {
      title: "CPGRAMS — Centralized Public Grievance Redress and Monitoring System",
      description: "National platform for citizens to register grievances concerning government services and administrative delays.",
      type: "Central/National law",
      url: "https://pgportal.gov.in",
      verified: true,
      jurisdictionLevel: "Pan India"
    },
    {
      title: "National Legal Services Authority (NALSA)",
      description: "Statutory body providing access to justice and pre-litigation dispute resolution.",
      type: "Central/National law",
      url: "https://nalsa.gov.in",
      verified: true,
      jurisdictionLevel: "Pan India"
    }
  ]
};

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi (NCT)",
  "Chandigarh",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry"
];

export const EXAMPLE_PROBLEMS = [
  {
    id: "tenant-deposit",
    title: "Tenant / Security Deposit",
    text: "My landlord has not returned my ₹15,000 security deposit after I moved out.",
    category: "Tenancy & Housing Rights",
    state: "Uttar Pradesh",
    city: "Prayagraj (Allahabad)"
  },
  {
    id: "consumer-complaint",
    title: "Consumer Complaint",
    text: "Ordered a home appliance online for ₹8,500, received a defective unit and the seller is refusing refund or replacement within the warranty window.",
    category: "Consumer Protection",
    state: "Maharashtra",
    city: "Pune"
  },
  {
    id: "rti-request",
    title: "RTI Request",
    text: "Seeking information and expense audit logs from municipal corporation regarding road maintenance and drainage work delays in Ward 12.",
    category: "Right to Information (RTI)",
    state: "Karnataka",
    city: "Bengaluru"
  },
  {
    id: "govt-service",
    title: "Government Service Issue",
    text: "Applied for domicile certificate and water supply meter connection 4 months ago; application status is stuck with no official response.",
    category: "Public Service Delivery",
    state: "Delhi (NCT)",
    city: "New Delhi"
  }
];

export const DEFAULT_ROADMAP_STEPS = [
  {
    id: 1,
    title: "Collect relevant evidence",
    description: "Gather rent agreement, bank transfer receipts of deposit, move-out inspection notes, photos/videos of the vacant premises, and past chat logs.",
    completed: false
  },
  {
    id: 2,
    title: "Contact the concerned party",
    description: "Make a polite, documented verbal or WhatsApp reminder referencing the handover date and requesting the return transaction details within 3-5 days.",
    completed: false
  },
  {
    id: 3,
    title: "Send a written request",
    description: "Deliver a formal written demand notice via Registered Post / Speed Post or registered email specifying the pending sum and a 7-14 day deadline.",
    completed: false
  },
  {
    id: 4,
    title: "Follow up",
    description: "Track delivery status of the notice, keep the postal acknowledgement receipt, and log all responses or lack thereof.",
    completed: false
  },
  {
    id: 5,
    title: "Explore appropriate escalation options",
    description: "If unanswered, file a grievance before the relevant local Rent Authority/Tribunal, District Consumer Commission (if applicable), or explore mediation / Lok Adalat.",
    completed: false
  }
];

export const MOCK_ANALYSIS_RESULT = {
  summary: {
    title: "Security Deposit Withholding by Landlord",
    category: "Tenancy & Housing Rights / Civil Dispute",
    severity: "Medium Priority (Actionable)",
    jurisdictionNote: "Tenancy rules and escalation routes may depend on jurisdiction.",
    legalBasisDisclaimer: "Do not claim a specific authority or state law without local verification."
  },
  understanding: {
    overview: "You have vacated the rented accommodation after completing your tenancy obligations, but the landlord has withheld your security deposit of ₹15,000 without lawful justification or mutually agreed itemized deductions.",
    keyPoints: [
      "Security deposits are fiduciary funds held in trust to cover unpaid dues or actual damage beyond normal wear and tear.",
      "Landlords are generally obligated to return deposits within a reasonable agreed timeframe (commonly 15 to 30 days) after vacating.",
      "Clear documentary evidence of payment and vacant handover significantly strengthens your position."
    ]
  },
  relevantInfo: [
    {
      label: "Notice Requirement",
      detail: "A formal written communication with a time-bound demand (typically 7-14 business days) is standard practice prior to legal escalation."
    },
    {
      label: "Allowable Deductions",
      detail: "Only verified arrears of utilities/rent or documented structural damages can be deducted; ordinary wear and tear cannot be billed to the tenant."
    },
    {
      label: "Proof of Handover",
      detail: "Move-out inspection checklists, key handover messages, and photos protect against frivolous damage claims."
    }
  ],
  authorityGuidance: {
    name: "Local Rent Authority / Competent Civil & Mediation Forum",
    relevantWhy: "Provides statutory dispute resolution mechanisms for tenancy matters, lease violations, and deposit recovery.",
    requiredDocs: [
      "Copy of original Tenancy Agreement",
      "Bank statement / receipt proving payment of ₹15,000 deposit",
      "Notice of move-out / key surrender proof",
      "Copy of written demand notice & postal tracking acknowledgement"
    ],
    suggestedNextAction: "Serve the formal written demand notice and allow 10 business days for response before lodging a formal petition with the local authority.",
    fallbackMessage: "Jurisdiction-specific authority information is not available in the current knowledge base. Please verify with the relevant official state/local authority."
  },
  verifiedSources: [
    {
      id: "src-1",
      title: "National Consumer Helpline (NCH Portal)",
      description: "Official portal operated by the Department of Consumer Affairs, Government of India for pre-litigation grievance registration.",
      type: "Central Government Portal",
      url: "https://consumerhelpline.gov.in",
      verified: true
    },
    {
      id: "src-2",
      title: "Model Tenancy Act (MTA) Framework",
      description: "Central government model framework outlining principles for fair security deposit return timeline (within 1-2 months upon premises vacation).",
      type: "Central Statutory Policy / Reference",
      url: "https://mohua.gov.in",
      verified: true
    },
    {
      id: "src-3",
      title: "National Legal Services Authority (NALSA)",
      description: "Statutory body constituted to provide free legal services and facilitate pre-litigation Lok Adalats / mediation.",
      type: "Statutory Legal Aid Body",
      url: "https://nalsa.gov.in",
      verified: true
    },
    {
      id: "src-4",
      title: "Standard Civil Notice Protocol under Section 106, Transfer of Property Principles",
      description: "Guiding principles on formal demand notice issuance and procedural timeline for tenancy communication.",
      type: "Statutory Reference",
      url: null,
      verified: true
    }
  ]
};

export const DEFAULT_DOCUMENT_TEMPLATE = {
  senderName: "[Your Full Name]",
  senderAddress: "[Your Current Residential Address, City, Pincode]",
  senderContact: "[Your Phone Number | Email Address]",
  recipientName: "[Landlord / Property Manager Name]",
  recipientAddress: "[Landlord Address / Rental Property Address]",
  rentalProperty: "[Rented Premises Address, Flat No., City]",
  depositAmount: "15,000",
  vacatedDate: "[Date of Handover / Vacation]",
  noticeDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
  deadlineDays: "7",
  bankDetails: "[Bank Name, A/C No: XXXXXXXXXX, IFSC: XXXXXXX, UPI ID: name@upi]"
};

export const ALL_VERIFIED_SOURCES = [
  {
    id: "src-nch",
    title: "National Consumer Helpline (NCH)",
    description: "National portal for lodging civic and consumer disputes across e-commerce, services, housing, and utilities.",
    type: "Central Government Grievance Portal",
    url: "https://consumerhelpline.gov.in",
    verified: true,
    jurisdiction: "All India (National)"
  },
  {
    id: "src-rti",
    title: "RTI Online Portal",
    description: "Official Government of India portal for filing Right to Information applications and first appeals across central ministries and departments.",
    type: "Central Government Service",
    url: "https://rtionline.gov.in",
    verified: true,
    jurisdiction: "Central Ministries / Departments"
  },
  {
    id: "src-nalsa",
    title: "National Legal Services Authority (NALSA)",
    description: "Apex authority providing free legal aid, legal awareness, and alternative dispute resolution through Lok Adalats.",
    type: "Statutory Judicial Body",
    url: "https://nalsa.gov.in",
    verified: true,
    jurisdiction: "Pan India"
  },
  {
    id: "src-pgportal",
    title: "CPGRAMS - Centralized Public Grievance Redress System",
    description: "Web portal for citizens to register grievances concerning government departments and public service delivery.",
    type: "Central Government Grievance Portal",
    url: "https://pgportal.gov.in",
    verified: true,
    jurisdiction: "Pan India (Central / State Public Services)"
  },
  {
    id: "src-mta",
    title: "Model Tenancy Act Reference (MoHUA)",
    description: "Official guidelines on landlord-tenant rights, security deposit caps, and adjudication mechanisms.",
    type: "Central Policy Guideline",
    url: "https://mohua.gov.in",
    verified: true,
    jurisdiction: "Advisory / State Enactment Basis"
  },
  {
    id: "src-e-filing",
    title: "e-Daakhil Portal",
    description: "Online filing portal for consumer commissions across India for dispute redressal under the Consumer Protection Act, 2019.",
    type: "Judicial E-Filing System",
    url: "https://edaakhil.nic.in",
    verified: true,
    jurisdiction: "District / State / National Commissions"
  }
];

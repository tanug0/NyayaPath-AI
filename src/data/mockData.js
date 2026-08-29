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
    text: "My landlord has not returned my security deposit after I moved out.",
    category: "Tenancy & Housing Rights",
    state: "Uttar Pradesh",
    city: "Prayagraj (Allahabad)"
  },
  {
    id: "consumer-complaint",
    title: "Consumer Complaint",
    text: "Ordered an appliance online, received a defective unit and the seller is refusing refund or replacement within the warranty window.",
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

export const CATEGORY_ROADMAPS = {
  TENANCY: [
    {
      id: 1,
      title: "Collect relevant tenancy records and supporting evidence",
      description: "Gather lease deed/agreement, rent receipts, move-out inspection notes, photographs, and past communications with the landlord/tenant.",
      completed: false
    },
    {
      id: 2,
      title: "Communicate with the concerned party where appropriate",
      description: "Make a polite, documented verbal or written request referencing handover/tenancy terms and requesting resolution within a reasonable period, where appropriate.",
      completed: false
    },
    {
      id: 3,
      title: "Follow applicable notice requirements",
      description: "Deliver a formal written notice following the applicable notice requirements for the relevant jurisdiction and matter.",
      completed: false
    },
    {
      id: 4,
      title: "Preserve delivery/communication records",
      description: "Track the delivery status of the notice, retain the postal acknowledgement receipt or delivery confirmation, and log all responses.",
      completed: false
    },
    {
      id: 5,
      title: "Explore appropriate authority, mediation or legal-aid options",
      description: "If unresolved, approach the designated local Rent Authority / Tribunal or seek pre-litigation conciliation via the District Legal Services Authority (DLSA).",
      completed: false
    }
  ],
  CONSUMER: [
    {
      id: 1,
      title: "Collect invoice/order/service records",
      description: "Compile purchase invoice, order ID, payment proof, warranty cards, and technical defect evidence.",
      completed: false
    },
    {
      id: 2,
      title: "Preserve communications and transaction evidence",
      description: "Document unboxing videos, photos of defect, customer support chat transcripts, and email correspondence.",
      completed: false
    },
    {
      id: 3,
      title: "Contact the concerned service provider where appropriate",
      description: "Submit a formal written complaint to the company's designated Grievance Redressal Officer requesting replacement, repair, or refund within a reasonable period, where appropriate.",
      completed: false
    },
    {
      id: 4,
      title: "Check the applicable grievance/consumer redressal channel",
      description: "Register a grievance on the National Consumer Helpline (1915 / consumerhelpline.gov.in) for pre-litigation mediation.",
      completed: false
    },
    {
      id: 5,
      title: "Explore escalation or mediation options where appropriate",
      description: "If unresolved, file a consumer petition online via e-Daakhil (edaakhil.nic.in) before the District Consumer Disputes Redressal Commission (DCDRC).",
      completed: false
    }
  ],
  RTI: [
    {
      id: 1,
      title: "Identify the relevant public authority",
      description: "Determine whether the concerned public department or project falls under Central (e.g. NHAI/Railways) or State/Municipal jurisdiction.",
      completed: false
    },
    {
      id: 2,
      title: "Prepare the RTI request",
      description: "Draft concise, point-wise questions seeking certified copies of work orders, measurement books, or administrative records.",
      completed: false
    },
    {
      id: 3,
      title: "Submit through the applicable RTI channel",
      description: "Submit Form 6(1) with the statutory application fee via Central RTI Online (rtionline.gov.in) or physical Speed Post to the designated State PIO.",
      completed: false
    },
    {
      id: 4,
      title: "Track the response",
      description: "Log the application reference token and track the statutory response window with the designated Public Information Officer.",
      completed: false
    },
    {
      id: 5,
      title: "Consider the appropriate appeal route if required",
      description: "If the requested information is denied, delayed, or incomplete, file a First Appeal under Section 19(1) before the First Appellate Authority.",
      completed: false
    }
  ],
  CIVIC: [
    {
      id: 1,
      title: "Collect application/reference documents",
      description: "Gather application acknowledgement slip, application ID/reference number, and required identity/supporting documents.",
      completed: false
    },
    {
      id: 2,
      title: "Preserve acknowledgement and correspondence",
      description: "Document past submission dates, receipt tokens, and any official responses received to date.",
      completed: false
    },
    {
      id: 3,
      title: "Contact the concerned department/grievance channel",
      description: "Submit a formal written representation to the designated Public Grievance Officer or municipal helpdesk.",
      completed: false
    },
    {
      id: 4,
      title: "Track the grievance",
      description: "Monitor the grievance token on the State/Central Citizen Grievance Portal (e.g. CPGRAMS / State Jansunwai).",
      completed: false
    },
    {
      id: 5,
      title: "Explore the applicable escalation mechanism",
      description: "If delayed beyond standard citizen charter timelines, escalate to the appellate authority or District Legal Services Authority.",
      completed: false
    }
  ]
};

export const DEFAULT_ROADMAP_STEPS = CATEGORY_ROADMAPS.TENANCY;

export const MOCK_ANALYSIS_RESULT = {
  summary: {
    title: "Security Deposit Withholding by Landlord",
    category: "Tenancy & Housing Rights",
    severity: "Actionable Dispute",
    jurisdictionNote: "Tenancy rules and escalation routes depend on State legislation.",
    legalBasisDisclaimer: "The applicable authority and procedure may vary based on jurisdiction and the specific facts of the matter."
  },
  understanding: {
    overview: "You have vacated the rented accommodation after completing your tenancy obligations, but the landlord has withheld your security deposit without providing a verified justification or itemized deduction receipts.",
    keyPoints: [
      "Security deposits are fiduciary funds held in trust to cover unpaid dues or actual damage beyond normal wear and tear.",
      "Landlords are generally expected to return deposits within a reasonable agreed timeframe after vacating.",
      "Clear documentary evidence of payment and vacant handover significantly strengthens your position."
    ]
  },
  relevantInfo: [
    {
      label: "Notice Requirement",
      detail: "Follow the applicable notice requirements for the relevant jurisdiction and matter prior to formal legal escalation."
    },
    {
      label: "Allowable Deductions",
      detail: "Only verified arrears of utilities/rent or documented structural damages can be deducted; ordinary wear and tear cannot be billed to the tenant."
    },
    {
      label: "Proof of Handover",
      detail: "Move-out inspection checklists, key handover messages, and photos protect against arbitrary claims."
    }
  ],
  authorityGuidance: {
    name: "Rent Authority — Prayagraj",
    relevantWhy: "Based on the selected issue and jurisdiction, this authority may be relevant to the reported tenancy dispute. The applicable forum and procedure depend on the nature of the matter and the governing state/central framework.",
    requiredDocs: [
      "Copy of signed Tenancy Agreement / Rent Receipt records",
      "Bank transaction proof / security deposit receipt, if applicable",
      "Relevant communication with landlord/tenant",
      "Copy of written notice and proof of delivery, if already sent"
    ],
    suggestedNextAction: "1. Collect relevant tenancy records and supporting evidence. 2. Prepare and send a formal written notice, where appropriate, and retain proof of delivery. 3. If the dispute remains unresolved, check the applicable authority procedure. 4. Consider mediation or legal assistance where appropriate.",
    legalFramework: "U.P. Regulation of Urban Premises Tenancy Act, 2021",
    fallbackMessage: "The applicable authority and procedure may vary based on jurisdiction and the specific facts of the matter."
  },
  actionRoadmap: CATEGORY_ROADMAPS.TENANCY,
  verifiedSources: [
    {
      id: "src-1",
      title: "Model Tenancy Act (MTA) Framework",
      description: "Central government model framework outlining principles for fair landlord-tenant adjudication and deposit refund guidelines.",
      type: "Central Policy Guideline",
      url: "https://mohua.gov.in",
      verified: true
    },
    {
      id: "src-2",
      title: "National Legal Services Authority (NALSA)",
      description: "Statutory body constituted to provide free legal services and facilitate pre-litigation Lok Adalats and mediation.",
      type: "Statutory Judicial Body",
      url: "https://nalsa.gov.in",
      verified: true
    }
  ]
};

export const DEFAULT_DOCUMENT_TEMPLATE = {
  senderName: "[Your Full Name]",
  senderAddress: "[Your Current Residential Address, City, Pincode]",
  senderContact: "[Your Phone Number | Email Address]",
  recipientName: "[Opposite Party / Landlord / Company Name]",
  recipientAddress: "[Address of Opposite Party / Property Location]",
  rentalProperty: "[Premises Address / Service Ref No.]",
  depositAmount: "[Amount / ₹ Amount]",
  vacatedDate: "[Date of Handover / Vacation]",
  noticeDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
  deadlineDays: "[Notice Period as per Agreement/Rules]",
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
    title: "e-Jagriti Portal",
    description: "Official Government of India platform for online consumer dispute redressal, including complaint filing, case-status tracking and access to consumer commission services.",
    type: "Consumer Dispute E-Filing Portal",
    url: "https://e-jagriti.gov.in",
    verified: true,
    jurisdiction: "District / State / National Commissions"
  }
];

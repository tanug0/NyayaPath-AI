import { CATEGORY_ROADMAPS, ALL_VERIFIED_SOURCES } from '../data/mockData.js';

// State-specific tenancy frameworks lookup for national jurisdiction awareness
export const STATE_TENANCY_MAPPINGS = {
  "uttar pradesh": {
    authorityName: (city) => `Rent Authority — ${city || 'Prayagraj'}`,
    framework: "U.P. Regulation of Urban Premises Tenancy Act, 2021",
    sourceTitle: "U.P. Urban Housing & Tenancy Portal",
    sourceUrl: "http://awas.up.nic.in",
    isVerified: true,
    confidence: "High Confidence"
  },
  "delhi (nct)": {
    authorityName: (city) => `Rent Controller / Additional Rent Controller — ${city || 'Delhi District Court'}`,
    framework: "Delhi Rent Control Act, 1958",
    sourceTitle: "Delhi District Courts Portal",
    sourceUrl: "https://delhicourts.nic.in",
    isVerified: true,
    confidence: "High Confidence"
  },
  "delhi": {
    authorityName: (city) => `Rent Controller / Additional Rent Controller — ${city || 'Delhi District Court'}`,
    framework: "Delhi Rent Control Act, 1958",
    sourceTitle: "Delhi District Courts Portal",
    sourceUrl: "https://delhicourts.nic.in",
    isVerified: true,
    confidence: "High Confidence"
  },
  "maharashtra": {
    authorityName: (city) => `Competent Authority (Rent Control Act) / Court of Small Causes — ${city || 'Mumbai / District Court'}`,
    framework: "Maharashtra Rent Control Act, 1999",
    sourceTitle: "Bombay High Court & District Judiciary",
    sourceUrl: "https://bombayhighcourt.nic.in",
    isVerified: true,
    confidence: "High Confidence"
  },
  "karnataka": {
    authorityName: (city) => `Rent Controller / Court of Small Causes — ${city || 'Bengaluru'}`,
    framework: "Karnataka Rent Act, 1999",
    sourceTitle: "Government of Karnataka Portal",
    sourceUrl: "https://karnataka.gov.in",
    isVerified: true,
    confidence: "High Confidence"
  },
  "tamil nadu": {
    authorityName: (city) => `Rent Court / Rent Tribunal — ${city || 'Chennai / District Court'}`,
    framework: "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017",
    sourceTitle: "Government of Tamil Nadu Portal",
    sourceUrl: "https://www.tn.gov.in",
    isVerified: true,
    confidence: "High Confidence"
  }
};

/**
 * Classify problem category using keywords
 */
export const detectClientCategory = (text = "") => {
  const p = (text || "").toLowerCase();
  
  if (
    p.includes("landlord") || p.includes("tenant") || p.includes("tenancy") || 
    p.includes("rent") || p.includes("deposit") || p.includes("flat") || 
    p.includes("room") || p.includes("lease") || p.includes("evict") || 
    p.includes("eviction") || p.includes("kiraya") || p.includes("kirayedar") || 
    p.includes("makan") || p.includes("मकान") || p.includes("किराया") || 
    p.includes("किरायेदार") || p.includes("खाली") || p.includes("सुरक्षा जमा")
  ) {
    return "TENANCY";
  }

  if (
    p.includes("defective") || p.includes("product") || p.includes("seller") || 
    p.includes("warranty") || p.includes("refund") || p.includes("consumer") || 
    p.includes("amazon") || p.includes("flipkart") || p.includes("appliance") || 
    p.includes("replace") || p.includes("order") || p.includes("खराब") || 
    p.includes("वारंटी") || p.includes("दोषपूर्ण") || p.includes("उपभोक्ता") || 
    p.includes("रिफंड")
  ) {
    return "CONSUMER";
  }

  if (
    p.includes("rti") || p.includes("right to information") || p.includes("road") || 
    p.includes("spending") || p.includes("tender") || p.includes("funds") || 
    p.includes("audit") || p.includes("sadak") || p.includes("सूचना") || 
    p.includes("आरटीआई") || p.includes("सड़क") || p.includes("बजट")
  ) {
    return "RTI";
  }

  return "CIVIC";
};

/**
 * Generate client-side structured analysis result dynamically
 */
export const getDynamicClientAnalysis = ({ problem = "", state = "", city = "", language = "English" }) => {
  const categoryKey = detectClientCategory(problem);
  const normalizedState = (state || "").toLowerCase().trim();
  const normalizedCity = (city || "").trim();
  const locationLabel = [normalizedCity, state].filter(Boolean).join(", ") || "Location: Not specified";

  // 1. TENANCY
  if (categoryKey === "TENANCY") {
    const isTermination = problem.toLowerCase().includes("terminate") || 
                          problem.toLowerCase().includes("evict") || 
                          problem.toLowerCase().includes("khali") || 
                          problem.toLowerCase().includes("bina reason") ||
                          problem.toLowerCase().includes("समाप्त") ||
                          problem.toLowerCase().includes("खाली");

    const stateMap = STATE_TENANCY_MAPPINGS[normalizedState];
    const isMapped = Boolean(stateMap);

    const primaryAuthority = isMapped
      ? stateMap.authorityName(normalizedCity)
      : (normalizedCity ? `Appropriate Local Rent Authority — ${normalizedCity}, ${state || 'State'}` : `Appropriate Local Rent Authority — ${state || 'State'}`);

    const legalFramework = isMapped
      ? stateMap.framework
      : "State-Specific Tenancy Legislation (Subject to local state enactment; Model Tenancy Act advisory framework)";

    const sourceUrl = isMapped ? stateMap.sourceUrl : "https://mohua.gov.in";
    const sourceTitle = isMapped ? stateMap.sourceTitle : "Ministry of Housing and Urban Affairs (MTA Framework)";

    return {
      category: isTermination ? "Tenancy & Eviction Dispute" : "Tenancy & Housing Rights",
      summary: {
        title: isTermination ? "Arbitrary / Unlawful Tenancy Termination Dispute" : "Security Deposit & Tenancy Rights",
        overview: isTermination 
          ? "Your landlord has initiated or threatened early lease termination without verified contractual breach or statutory notice."
          : "You have vacated the premises upon lease completion, but the landlord has withheld your security deposit without providing itemized deduction receipts.",
        keyPoints: [
          "Security deposits and lease terms are governed by the executed tenancy agreement and applicable State tenancy laws.",
          "Landlords are generally expected to return deposits within a reasonable agreed timeframe after keys are handed over.",
          "Documentary records of payments, handover communications, and formal written notices establish crucial pre-litigation proof."
        ]
      },
      jurisdiction: {
        level: "State-specific Tenancy Laws & Local Rent Authorities",
        location: locationLabel,
        statutoryScope: "State-specific",
        note: isMapped 
          ? `Governed by ${legalFramework} in ${state}.`
          : "Tenancy laws and rent authority procedures vary significantly across Indian States and Union Territories. Local verification is required."
      },
      relevantInformation: [
        {
          label: "Notice Requirement",
          detail: "Follow the applicable notice requirements for the relevant jurisdiction and matter prior to formal legal escalation."
        },
        {
          label: "Allowable Deductions",
          detail: "Only verified arrears of utilities/rent or documented structural damages can be deducted; ordinary wear and tear is not deductible."
        },
        {
          label: "Proof of Handover",
          detail: "Move-out inspection checklists, key handover messages, and photos protect against arbitrary damage claims."
        }
      ],
      actionRoadmap: CATEGORY_ROADMAPS.TENANCY,
      authority: {
        channelName: primaryAuthority,
        whyRelevant: "Based on the selected issue and jurisdiction, this authority may be relevant to the reported tenancy dispute. The applicable forum and procedure depend on the nature of the matter and the governing state/central framework.",
        suggestedNextAction: "1. Collect relevant tenancy records and supporting evidence. 2. Prepare and send a formal written notice, where appropriate, and retain proof of delivery. 3. If the dispute remains unresolved, check the applicable authority procedure. 4. Consider mediation or legal assistance where appropriate.",
        legalFramework,
        sourceTitle,
        sourceUrl,
        isVerified: isMapped,
        matchConfidence: isMapped ? "High Confidence" : "Verification Recommended",
        fallbackMessage: !isMapped 
          ? "Authority verification required for this jurisdiction. The applicable authority and procedure may vary based on jurisdiction and the specific facts of the matter."
          : "The applicable authority and procedure may vary based on jurisdiction and the specific facts of the matter."
      },
      sources: [
        {
          id: "src-mta",
          title: sourceTitle,
          description: "Official policy framework outlining landlord-tenant rights, security deposit caps, and adjudication guidelines.",
          type: isMapped ? "State Tenancy Framework" : "Model Framework",
          url: sourceUrl,
          verified: isMapped
        },
        {
          id: "src-nalsa",
          title: "National Legal Services Authority (NALSA)",
          description: "Statutory body providing free legal aid, legal awareness, and alternative dispute resolution through Lok Adalats.",
          type: "Statutory Legal Aid Body",
          url: "https://nalsa.gov.in",
          verified: true
        }
      ],
      isFallback: true
    };
  }

  // 2. CONSUMER
  if (categoryKey === "CONSUMER") {
    const primaryAuthority = normalizedCity 
      ? `District Consumer Disputes Redressal Commission (DCDRC) — ${normalizedCity}`
      : `District Consumer Disputes Redressal Commission (DCDRC) — ${state || 'District Bench'}`;

    return {
      category: "Consumer Protection",
      summary: {
        title: "Defective Product / Service Redressal Dispute",
        overview: "You purchased a product or service that is defective, damaged, or deficient, and the seller/platform has failed to resolve your grievance within policy timelines.",
        keyPoints: [
          "Under the Consumer Protection Act, 2019, consumers have a statutory right to seek replacement, repair, or full refund for defective goods and deficient services.",
          "E-commerce entities and sellers are legally obligated to maintain an active Grievance Redressal mechanism.",
          "Invoice receipts, warranty cards, and documented defect evidence form the foundation of a consumer claim."
        ]
      },
      jurisdiction: {
        level: "Central/National law with District Consumer Commissions (DCDRC)",
        location: locationLabel,
        statutoryScope: "Central/National law",
        note: "The Consumer Protection Act, 2019 applies uniformly across India. Claims up to ₹50 Lakh are filed before the District Consumer Commission."
      },
      relevantInformation: [
        {
          label: "Statutory 1915 Helpline",
          detail: "National Consumer Helpline (NCH) provides free pre-litigation conciliation with registered brands and e-commerce platforms."
        },
        {
          label: "Product Liability",
          detail: "Sellers and manufacturers are jointly liable for harm or financial loss caused by defective goods or deficient services."
        },
        {
          label: "Online e-Daakhil Filing",
          detail: "Formal consumer complaints can be filed digitally via edaakhil.nic.in without requiring an advocate."
        }
      ],
      actionRoadmap: CATEGORY_ROADMAPS.CONSUMER,
      authority: {
        channelName: primaryAuthority,
        whyRelevant: "Under the Consumer Protection Act, 2019, District Consumer Commissions have statutory jurisdiction over consumer complaints for defective goods, deficiency of service, and unfair trade practices up to ₹50 Lakh.",
        suggestedNextAction: "1. Compile purchase invoice, warranty documents, and defect proof. 2. Register a grievance on the National Consumer Helpline (consumerhelpline.gov.in) or call 1915. 3. Serve a formal written demand notice to the company's Grievance Officer. 4. If unaddressed, file via e-Daakhil (edaakhil.nic.in).",
        legalFramework: "Consumer Protection Act, 2019",
        sourceTitle: "National Consumer Helpline (NCH)",
        sourceUrl: "https://consumerhelpline.gov.in",
        isVerified: true,
        matchConfidence: "High Confidence",
        fallbackMessage: "The applicable authority and procedure may vary based on jurisdiction and the specific facts of the matter."
      },
      sources: [
        {
          id: "src-nch",
          title: "National Consumer Helpline (NCH)",
          description: "Official Government of India portal and helpline for lodging consumer grievances against sellers and platforms.",
          type: "Central Government Grievance Portal",
          url: "https://consumerhelpline.gov.in",
          verified: true
        },
        {
          id: "src-edaakhil",
          title: "e-Daakhil Portal — Consumer Commission E-Filing",
          description: "Digital filing system established under the Consumer Protection Act, 2019 for filing formal consumer complaints online.",
          type: "Consumer Dispute E-Filing",
          url: "https://edaakhil.nic.in",
          verified: true
        }
      ],
      isFallback: true
    };
  }

  // 3. RTI
  if (categoryKey === "RTI") {
    const primaryAuthority = normalizedCity
      ? `Public Information Officer (PIO) — Concerned Public Authority (${normalizedCity})`
      : `Public Information Officer (PIO) — Concerned Public Authority (${state || 'State/Central'})`;

    return {
      category: "Right to Information (RTI)",
      summary: {
        title: "Public Works, Budget & Government Transparency Request",
        overview: "You are seeking certified records, budget expenditure details, or project completion status from a designated public authority under statutory transparency laws.",
        keyPoints: [
          "Under Section 6(1) of the RTI Act, 2005, any Indian citizen has the statutory right to request inspection of work and certified copies of official records.",
          "Public authorities are legally mandated to furnish replies within 30 days of receiving a valid application.",
          "Central RTI Online portal covers Central Ministries only (e.g. NHAI/Railways). State works (PWD/Municipal) require State portals or physical post."
        ]
      },
      jurisdiction: {
        level: "Central/National law with Separate State & Central Public Information Officers",
        location: locationLabel,
        statutoryScope: "Central/National law (Executed via State / Central Bodies)",
        note: "RTI Act 2005 applies nationally, but the filing destination depends strictly on whether the authority is Central (rtionline.gov.in) or State/Municipal (State PIO / State RTI Portal)."
      },
      relevantInformation: [
        {
          label: "30-Day Mandatory Limit",
          detail: "The designated Public Information Officer (PIO) must respond within 30 calendar days of receiving a valid application."
        },
        {
          label: "Nominal Application Fee",
          detail: "Standard application fee is typically ₹10 (exempt for Below Poverty Line / BPL cardholders)."
        },
        {
          label: "First Appeal Mechanism",
          detail: "If information is denied, delayed, or incomplete, an appeal can be filed before the First Appellate Authority (FAA) within 30 days."
        }
      ],
      actionRoadmap: CATEGORY_ROADMAPS.RTI,
      authority: {
        channelName: primaryAuthority,
        whyRelevant: "Under Section 6(1) of the Right to Information Act, 2005, every public authority has a designated Public Information Officer (PIO) mandated to furnish certified information within 30 days.",
        suggestedNextAction: "1. Identify whether the department is Central or State/Municipal. 2. Draft concise, point-wise questions. 3. Submit application with ₹10 fee via Central RTI Online or physical post to the State PIO. 4. Track 30-day statutory response window.",
        legalFramework: "Right to Information Act, 2005",
        sourceTitle: "Central RTI Online Portal / State PIO Offices",
        sourceUrl: "https://rtionline.gov.in",
        isVerified: true,
        matchConfidence: "High Confidence",
        fallbackMessage: "Central RTI portal handles Central Ministries only. State departments require filing with the respective State PIO or State portal."
      },
      sources: [
        {
          id: "src-rti",
          title: "RTI Online Portal (rtionline.gov.in)",
          description: "Official Government of India portal for filing RTI applications and first appeals across central ministries.",
          type: "Central Government Service",
          url: "https://rtionline.gov.in",
          verified: true
        },
        {
          id: "src-nalsa",
          title: "National Legal Services Authority (NALSA)",
          description: "Statutory body providing free legal aid, legal awareness, and alternative dispute resolution.",
          type: "Statutory Legal Aid Body",
          url: "https://nalsa.gov.in",
          verified: true
        }
      ],
      isFallback: true
    };
  }

  // 4. CIVIC / PUBLIC SERVICES
  const primaryAuthority = normalizedCity
    ? `District Legal Services Authority (DLSA) / Municipal Grievance Desk — ${normalizedCity}`
    : `District Legal Services Authority (DLSA) — ${state || 'District Level'}`;

  return {
    category: "Public Service Delivery & Civic Grievance",
    summary: {
      title: "Public Service Delivery & Administrative Grievance",
      overview: "Your application, certificate request, or civic service has remained unaddressed beyond standard administrative citizen charter timelines.",
      keyPoints: [
        "Citizens have the right to time-bound public service delivery and formal administrative grievance redressal.",
        "Documented submission receipts, application tracking tokens, and formal written representations form the core basis of civic escalation.",
        "District Legal Services Authorities (DLSA) and Public Grievance Cells provide mediation and grievance resolution channels."
      ]
    },
    jurisdiction: {
      level: "Urban Local Body / State Departmental Grievance Redressal",
      location: locationLabel,
      statutoryScope: "State Public Service Delivery Acts & Municipal Byelaws",
      note: "Public service delivery rules and grievance escalation channels depend on the specific state administration and municipal department."
    },
    relevantInformation: [
      {
        label: "Documented Representation",
        detail: "Preserve application reference tokens and deliver written representations with verifiable acknowledgement."
      },
      {
        label: "CPGRAMS / State Portals",
        detail: "Citizens can register unaddressed departmental grievances on central CPGRAMS or respective State Jansunwai portals."
      },
      {
        label: "Pre-Litigation Legal Aid",
        detail: "District Legal Services Authorities (DLSA) facilitate free mediation and assistance for persistent public service failures."
      }
    ],
    actionRoadmap: CATEGORY_ROADMAPS.CIVIC,
    authority: {
      channelName: primaryAuthority,
      whyRelevant: "The District Legal Services Authority (DLSA) provides free legal aid, counseling, and pre-litigation conciliation/Lok Adalat services for civic and civil grievances.",
      suggestedNextAction: "1. Gather application acknowledgement and reference numbers. 2. Submit a formal written representation to the designated Public Grievance Officer. 3. Monitor the grievance token on the Citizen Grievance Portal. 4. If unresolved, approach the local DLSA for mediation.",
      legalFramework: "Legal Services Authorities Act, 1987 & Applicable State Service Byelaws",
      sourceTitle: "CPGRAMS - Centralized Public Grievance Portal",
      sourceUrl: "https://pgportal.gov.in",
      isVerified: true,
      matchConfidence: "High Confidence",
      fallbackMessage: "The applicable authority and procedure may vary based on jurisdiction and the specific facts of the matter."
    },
    sources: [
      {
        id: "src-pgportal",
        title: "CPGRAMS - Centralized Public Grievance Redress System",
        description: "Web portal for citizens to register grievances concerning government departments and public service delivery.",
        type: "Central Government Grievance Portal",
        url: "https://pgportal.gov.in",
        verified: true
      },
      {
        id: "src-nalsa",
        title: "National Legal Services Authority (NALSA)",
        description: "Statutory body constituted to provide free legal services and facilitate pre-litigation Lok Adalats.",
        type: "Statutory Judicial Body",
        url: "https://nalsa.gov.in",
        verified: true
      }
    ],
    isFallback: true
  };
};

/**
 * Generate client-side document drafts dynamically
 */
export const getDynamicClientDocument = ({ category = "TENANCY", problem = "", state = "", city = "" }) => {
  const cat = (category || "").toUpperCase();
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const locationLabel = [city, state].filter(Boolean).join(", ") || "[City, State]";

  if (cat.includes("CONSUMER")) {
    return {
      title: "Consumer Pre-Litigation Demand Notice",
      content: `SPEED POST / REGISTERED EMAIL WITH PROOF OF DELIVERY

Date: ${today}

TO:
The Grievance Redressal Officer / Customer Care Head
[Company / Seller / Service Provider Name]
[Registered Office / Business Address]
[City, State, Pincode]

FROM:
[Your Full Name]
[Your Address]
${locationLabel}
Contact: [Your Phone Number | Email Address]

SUBJECT: FORMAL NOTICE UNDER SECTION 35 / 38 OF THE CONSUMER PROTECTION ACT, 2019 FOR DEFICIENCY IN SERVICE AND DEFECTIVE PRODUCT / REFUND CLAIM

Sir / Madam,

I, the undersigned consumer, hereby serve this formal demand notice regarding the deficient transaction detailed hereunder:

1. TRANSACTION PARTICULARS:
   - Order / Invoice Reference No.: [Order / Invoice ID]
   - Date of Purchase / Booking: [Date]
   - Transaction Amount: [Amount / ₹ Amount]
   - Product / Service Description: [Details of product/service ordered]

2. STATEMENT OF GRIEVANCE:
   ${problem || "I purchased the aforementioned product/service, which was delivered in a defective condition / suffered from deficiency in service. Despite repeated communications and support tickets, the seller has failed to provide a replacement, repair, or refund."}

3. STATUTORY NOTICE & DEMAND:
   Under the Consumer Protection Act, 2019, sellers and service providers are legally obligated to remedy defect/deficiency or issue a full refund without undue delay.

   You are hereby called upon to:
   a) Process a full refund of [Amount / ₹ Amount] to my original source of payment, OR
   b) Provide an immediate replacement / repair of the defective item,

   within a reasonable period following the applicable notice requirements for the relevant jurisdiction and matter from the receipt of this notice.

4. RESERVATION OF RIGHTS:
   In the event of failure or refusal to resolve this grievance, I shall be constrained to initiate formal legal proceedings before the competent District Consumer Disputes Redressal Commission (DCDRC) under the Consumer Protection Act, 2019, and file a statutory complaint on the National Consumer Helpline (consumerhelpline.gov.in / 1915), claiming the refund amount along with interest, damages, and litigation expenses.

Yours faithfully,


_________________________
[Your Full Name]
Complainant / Consumer`
    };
  }

  if (cat.includes("RTI")) {
    return {
      title: "RTI Application under Section 6(1) of RTI Act, 2005",
      content: `FORM A
APPLICATION FOR OBTAINING INFORMATION UNDER SECTION 6(1) OF
THE RIGHT TO INFORMATION ACT, 2005

Date: ${today}

To:
The Public Information Officer (PIO)
[Name of Department / Public Authority]
[Office / Municipal / Ministry Address]
${locationLabel}

1. APPLICANT DETAILS:
   Full Name: [Your Full Name]
   Father's / Spouse's Name: [Father / Spouse Name]
   Complete Residential Address: [Your Residential Address, Pincode]
   Contact Details: [Phone Number | Email Address]

2. CITIZENSHIP STATUS:
   I am an Indian Citizen and entitled to seek information under Section 3 of the RTI Act, 2005.

3. PARTICULARS OF INFORMATION SOUGHT:
   Subject Matter: ${problem || "Information concerning official records, budget allocation, tenders, and work execution."}

   Specific Point-wise Questions:
   a) Please provide certified copies of the sanction order and budget allocation for the aforementioned work/subject.
   b) Please furnish the name, designation, and office address of the designated executive engineer / officer supervising the work.
   c) Please provide certified copies of the work order, tender agreement, measurement book (MB) entries, and completion certificates.
   d) Please specify the officially scheduled start date, deadline, and reasons recorded on file for any delay.

4. PERIOD TO WHICH INFORMATION PERTAINS:
   From: [Start Date / Month / Year]  To: [End Date / Month / Year]

5. APPLICATION FEE DETAILS:
   A nominal fee of ₹10 (Ten Rupees) is enclosed herewith via:
   [ ] Indian Postal Order (IPO) No.: _____________________
   [ ] Court Fee Stamp affixed on application
   [ ] Online payment receipt transaction reference (if filed via portal)

6. FORMAT & MODE OF DISPATCH:
   Please furnish certified copies of the requested information to my postal address by Registered Post / Speed Post or electronically via email as permissible under the Act.

7. DECLARATION:
   I hereby declare that the information sought does not fall within the exemptions specified under Section 8 or Section 9 of the RTI Act, 2005.


_________________________
[Your Signature]
[Your Full Name]`
    };
  }

  // Default: Tenancy Demand Notice
  return {
    title: "Formal Written Demand Notice for Refund of Security Deposit",
    content: `SPEED POST WITH ACKNOWLEDGEMENT DUE (AD) / REGISTERED EMAIL

Date: ${today}

TO:
[Landlord / Property Manager Name]
[Landlord Residential Address / Office Address]
${locationLabel}

FROM:
[Your Full Name]
[Your Current Residential Address, City, Pincode]
Contact: [Your Phone Number | Email Address]

SUBJECT: FORMAL DEMAND NOTICE FOR RETURN OF SECURITY DEPOSIT REGARDING LEASE OF [Rented Premises Address]

Sir / Madam,

I, the undersigned former tenant of the premises located at [Rented Premises Address, Flat No., City], hereby serve this formal demand notice:

1. TENANCY PARTICULARS & VACANT HANDOVER:
   - I completed my lease obligations and vacated the subject premises on [Date of Handover / Vacation].
   - The physical keys were formally returned and surrendered in peaceful, vacant condition.
   - At the time of handover, all utility bills and rent dues were fully settled with no outstanding arrears.

2. SECURITY DEPOSIT WITHHOLDING:
   - At the commencement of the tenancy, I deposited a sum of [Amount / ₹ Amount] as an interest-free security deposit.
   - As per statutory tenancy principles and lease terms, security deposits are held in trust and must be refunded upon peaceful vacation, subject only to mutually verified, itemized deduction receipts for actual structural damages beyond normal wear and tear.
   - To date, you have withheld the security deposit without providing valid deduction accounts or receipts.

3. FORMAL DEMAND:
   You are hereby called upon to refund the full security deposit of [Amount / ₹ Amount] via bank transfer to the following account:
   
   Bank Account Name: [Your Full Name]
   Bank Name: [Bank Name]
   Account Number: [XXXXXXXXXXXX]
   IFSC Code: [XXXXXXXX]
   UPI ID: [yourname@upi]

   within a reasonable period following the applicable notice requirements for the relevant jurisdiction and matter from the date of receipt of this notice.

4. LEGAL NOTICE OF ESCALATION:
   Please note that in the event of default or non-compliance, I shall be compelled to initiate appropriate legal proceedings before the competent Rent Authority / Civil Court, or approach the District Legal Services Authority (DLSA) for pre-litigation recovery, holding you liable for all consequential costs and interest.

Yours faithfully,


_________________________
[Your Full Name]
Former Tenant`
  };
};

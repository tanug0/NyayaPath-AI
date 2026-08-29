/**
 * National Authority & Redressal Channel Mapping (India-Wide Jurisdiction-Aware Engine)
 * 
 * Supports National frameworks (Consumer Protection Act 2019, RTI Act 2005)
 * and State-specific tenancy frameworks (U.P., Delhi, Maharashtra, Karnataka, Tamil Nadu, etc.)
 * with honest fallback alerts when state-specific authority verification is required.
 */

export const STATE_TENANCY_FRAMEWORKS = {
  "uttar pradesh": {
    authorityName: (city) => `Rent Authority — ${city || 'Prayagraj'}`,
    framework: "U.P. Regulation of Urban Premises Tenancy Act, 2021",
    sourceTitle: "U.P. Housing & Urban Planning Department — Tenancy Portal",
    sourceUrl: "https://upawas.up.gov.in/welcome",
    verified: true,
    confidence: "High Confidence"
  },
  "delhi (nct)": {
    authorityName: (city) => `Rent Controller / Additional Rent Controller — ${city || 'Delhi District Court'}`,
    framework: "Delhi Rent Control Act, 1958",
    sourceTitle: "Delhi District Courts Portal",
    sourceUrl: "https://delhicourts.nic.in",
    verified: true,
    confidence: "High Confidence"
  },
  "delhi": {
    authorityName: (city) => `Rent Controller / Additional Rent Controller — ${city || 'Delhi District Court'}`,
    framework: "Delhi Rent Control Act, 1958",
    sourceTitle: "Delhi District Courts Portal",
    sourceUrl: "https://delhicourts.nic.in",
    verified: true,
    confidence: "High Confidence"
  },
  "maharashtra": {
    authorityName: (city) => `Competent Authority (Rent Control Act) / Court of Small Causes — ${city || 'Mumbai / District Court'}`,
    framework: "Maharashtra Rent Control Act, 1999",
    sourceTitle: "Bombay High Court & District Judiciary",
    sourceUrl: "https://bombayhighcourt.nic.in",
    verified: true,
    confidence: "High Confidence"
  },
  "karnataka": {
    authorityName: (city) => `Rent Controller / Court of Small Causes — ${city || 'Bengaluru'}`,
    framework: "Karnataka Rent Act, 1999",
    sourceTitle: "Government of Karnataka Portal",
    sourceUrl: "https://karnataka.gov.in",
    verified: true,
    confidence: "High Confidence"
  },
  "tamil nadu": {
    authorityName: (city) => `Rent Court / Rent Tribunal — ${city || 'Chennai / District Court'}`,
    framework: "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017",
    sourceTitle: "Government of Tamil Nadu Portal",
    sourceUrl: "https://www.tn.gov.in",
    verified: true,
    confidence: "High Confidence"
  }
};

export const getAuthorityGuidance = (categoryKey = "TENANCY", state = "", city = "", language = "English") => {
  const cat = (categoryKey || "").toUpperCase();
  const normalizedState = (state || "").toLowerCase().trim();
  const normalizedCity = (city || "").trim();
  const lang = (language === "Hindi" || language === "Hinglish") ? language : "English";

  const locationLabel = [normalizedCity, state].filter(Boolean).join(", ") || (
    lang === "Hindi" ? "स्थान निर्दिष्ट नहीं" :
    lang === "Hinglish" ? "Unspecified Location" : "Unspecified Location"
  );

  // 1. TENANCY CATEGORY
  if (cat.includes("TENAN")) {
    const stateMapping = STATE_TENANCY_FRAMEWORKS[normalizedState];
    const isStateMapped = Boolean(stateMapping);

    const primaryAuthority = isStateMapped 
      ? stateMapping.authorityName(normalizedCity)
      : (normalizedCity ? `Appropriate Local Rent Authority — ${normalizedCity}, ${state || 'State'}` : `Appropriate Local Rent Authority — ${state || 'State'}`);

    const legalFramework = isStateMapped 
      ? stateMapping.framework 
      : "State-Specific Tenancy Legislation (Subject to local enactment; Model Tenancy Act advisory framework)";

    const sourceTitle = isStateMapped ? stateMapping.sourceTitle : "Ministry of Housing and Urban Affairs (MTA Framework)";
    const sourceUrl = isStateMapped ? stateMapping.sourceUrl : "https://mohua.gov.in";
    const isVerified = isStateMapped;
    const matchConfidence = isStateMapped ? "High Confidence" : "Verification Recommended";

    const whyRelevant = lang === "Hindi"
      ? "चयनित समस्या और क्षेत्राधिकार के आधार पर, यह प्राधिकरण संबंधित किराएदारी विवाद के लिए प्रासंगिक हो सकता है। लागू मंच और प्रक्रिया मामले की प्रकृति और संबंधित राज्य/केंद्रीय कानूनी ढांचे पर निर्भर करती है।"
      : lang === "Hinglish"
      ? "Selected issue aur jurisdiction ke basis par, yeh authority reported tenancy dispute ke liye relevant ho sakti hai. Applicable forum aur procedure matter ki nature aur governing state/central framework par depend karti hai."
      : "Based on the selected issue and jurisdiction, this authority may be relevant to the reported tenancy dispute. The applicable forum and procedure depend on the nature of the matter and the governing state/central framework.";

    const requiredDocuments = lang === "Hindi" ? [
      "हस्ताक्षरित किराया समझौता (Tenancy Agreement) / किराए की रसीदें",
      "बैंक ट्रांसफर प्रमाण / सुरक्षा जमा रसीद (यदि लागू हो)",
      "मकान मालिक/किरायेदार के साथ हुए प्रासंगिक पत्राचार व संदेश",
      "भेजे गए औपचारिक लिखित नोटिस और डाक ट्रैकिंग/पावती की प्रति"
    ] : lang === "Hinglish" ? [
      "Copy of signed Tenancy Agreement / Rent Receipt records",
      "Bank transaction proof / security deposit receipt, if applicable",
      "Relevant communication with landlord/tenant",
      "Copy of written notice and proof of delivery, if already sent"
    ] : [
      "Copy of signed Tenancy Agreement / Rent Receipt records",
      "Bank transaction proof / security deposit receipt, if applicable",
      "Relevant communication with landlord/tenant",
      "Copy of written notice and proof of delivery, if already sent"
    ];

    const suggestedNextActions = lang === "Hindi" ? [
      "किरायेदारी से संबंधित सभी दस्तावेज और सहायक साक्ष्य एकत्र करें।",
      "जहां उचित हो, औपचारिक लिखित नोटिस तैयार कर भेजें और डिलीवरी का प्रमाण सुरक्षित रखें।",
      "यदि विवाद का समाधान न हो, तो लागू प्राधिकरण की प्रक्रिया और अधिकार क्षेत्र की जांच करें।",
      "जहां उचित हो, मध्यस्थता या विधिक सहायता प्राप्त करने पर विचार करें।"
    ] : lang === "Hinglish" ? [
      "Collect relevant tenancy records and supporting evidence.",
      "Prepare and send a formal written notice, where appropriate, and retain proof of delivery.",
      "If the dispute remains unresolved, check the applicable authority procedure.",
      "Consider mediation or legal assistance where appropriate."
    ] : [
      "Collect relevant tenancy records and supporting evidence.",
      "Prepare and send a formal written notice, where appropriate, and retain proof of delivery.",
      "If the dispute remains unresolved, check the applicable authority procedure.",
      "Consider mediation or legal assistance where appropriate."
    ];

    return {
      channelName: primaryAuthority,
      category: "Tenancy & Housing",
      targetLocation: locationLabel,
      whyRelevant,
      requiredDocuments,
      suggestedNextActionList: suggestedNextActions,
      suggestedNextAction: suggestedNextActions.join(" "),
      legalFramework,
      sourceTitle,
      sourceUrl,
      isVerified,
      matchConfidence,
      matchSupportingText: "Based on selected issue category and jurisdiction.",
      legalAssistanceNotice: "If you need legal assistance or mediation support, you may consider approaching the appropriate District Legal Services Authority or other legal-aid channel, subject to eligibility and the nature of the matter.",
      jurisdictionNotice: "The applicable authority and procedure may vary based on jurisdiction and the specific facts of the matter.",
      verificationRequiredText: !isVerified ? "Authority verification required for this jurisdiction." : null
    };
  }

  // 2. CONSUMER CATEGORY
  if (cat.includes("CONSUMER")) {
    const primaryAuthority = normalizedCity 
      ? `District Consumer Disputes Redressal Commission (DCDRC) — ${normalizedCity}`
      : `District Consumer Disputes Redressal Commission (DCDRC) — ${state || 'District Bench'}`;

    const whyRelevant = lang === "Hindi"
      ? "उपभोक्ता संरक्षण अधिनियम, 2019 के तहत जिला उपभोक्ता आयोग को दोषपूर्ण सामान, सेवा में कमी और अनुचित व्यापार प्रथाओं के खिलाफ ₹50 लाख तक के दावों की सुनवाई का वैधानिक अधिकार है।"
      : lang === "Hinglish"
      ? "Consumer Protection Act, 2019 ke under District Consumer Commission ko defective products, deficiency of service aur unfair trade practices ke khilaf ₹50 Lakh tak ke claims resolve karne ka statutory power hai."
      : "Under the Consumer Protection Act, 2019, District Consumer Commissions have statutory jurisdiction over consumer complaints for defective goods, deficiency of service, and unfair trade practices up to ₹50 Lakh.";

    const requiredDocuments = [
      "Purchase Invoice / Order confirmation / Payment receipt",
      "Photographs, unboxing video, or inspection report demonstrating the defect",
      "Written communication with seller/customer support ticket history",
      "Copy of formal demand notice requesting refund, replacement, or repair"
    ];

    const suggestedNextActions = [
      "Compile purchase invoice, warranty documents, and defect proof.",
      "Register a grievance on the National Consumer Helpline (consumerhelpline.gov.in) or call 1915 for pre-litigation mediation.",
      "Serve a formal written 15-day demand notice to the company's Grievance Officer.",
      "If unaddressed, file a consumer petition online via e-Daakhil (edaakhil.nic.in) before the District Commission."
    ];

    return {
      channelName: primaryAuthority,
      category: "Consumer Protection",
      targetLocation: locationLabel,
      whyRelevant,
      requiredDocuments,
      suggestedNextActionList: suggestedNextActions,
      suggestedNextAction: suggestedNextActions.join(" "),
      legalFramework: "Consumer Protection Act, 2019",
      sourceTitle: "National Consumer Helpline & e-Jagriti Portal",
      sourceUrl: "https://consumerhelpline.gov.in",
      isVerified: true,
      matchConfidence: "High Confidence",
      matchSupportingText: "Based on selected issue category and jurisdiction.",
      legalAssistanceNotice: "If you need legal assistance or mediation support, you may consider approaching the appropriate District Legal Services Authority or other legal-aid channel, subject to eligibility and the nature of the matter.",
      jurisdictionNotice: "The applicable authority and procedure may vary based on jurisdiction and the specific facts of the matter.",
      verificationRequiredText: null
    };
  }

  // 3. RTI CATEGORY
  if (cat.includes("RTI")) {
    const primaryAuthority = normalizedCity
      ? `Public Information Officer (PIO) — Concerned Public Authority (${normalizedCity})`
      : `Public Information Officer (PIO) — Concerned Public Authority (${state || 'State/Central'})`;

    const whyRelevant = lang === "Hindi"
      ? "सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के तहत प्रत्येक सरकारी विभाग में एक जन सूचना अधिकारी (PIO) नियुक्त होता है, जिसे आवेदन प्राप्ति के 30 दिनों में सूचना उपलब्ध कराना अनिवार्य है।"
      : lang === "Hinglish"
      ? "RTI Act, 2005 ke under concerned government department mein designated Public Information Officer (PIO) 30 days ke andar information provide karne ke liye legally mandated hai."
      : "Under Section 6(1) of the Right to Information Act, 2005, every public authority has a designated Public Information Officer (PIO) mandated to furnish certified information within 30 days.";

    const requiredDocuments = [
      "Form 6(1) RTI Application specifying clear, point-wise questions",
      "Application fee receipt (₹10 via IPO / Court Fee Stamp / Online)",
      "Proof of identity or BPL card copy (if fee exemption claimed)"
    ];

    const suggestedNextActions = [
      "Identify whether the subject department is Central (e.g. NHAI/Railways) or State/Municipal (e.g. PWD/Nagar Nigam).",
      "Draft concise, specific questions requesting certified copies of tenders, work orders, or records.",
      "Submit application with ₹10 fee via Central RTI Online (rtionline.gov.in) for Central bodies or State PIO / State portal for State works.",
      "Track the 30-day statutory countdown; file First Appeal under Section 19(1) if unaddressed."
    ];

    return {
      channelName: primaryAuthority,
      category: "Right to Information (RTI)",
      targetLocation: locationLabel,
      whyRelevant,
      requiredDocuments,
      suggestedNextActionList: suggestedNextActions,
      suggestedNextAction: suggestedNextActions.join(" "),
      legalFramework: "Right to Information Act, 2005",
      sourceTitle: "Central RTI Online Portal / State PIO Offices",
      sourceUrl: "https://rtionline.gov.in",
      isVerified: true,
      matchConfidence: "High Confidence",
      matchSupportingText: "Based on selected issue category and jurisdiction.",
      legalAssistanceNotice: "If you need legal assistance or mediation support, you may consider approaching the appropriate District Legal Services Authority or other legal-aid channel, subject to eligibility and the nature of the matter.",
      jurisdictionNotice: "Central RTI portal handles Central Ministries only. State departments require filing with the respective State PIO or State portal.",
      verificationRequiredText: null
    };
  }

  // 4. CIVIC / GENERIC DISPUTES
  const primaryAuthority = normalizedCity
    ? `District Legal Services Authority (DLSA) / Municipal Grievance Desk — ${normalizedCity}`
    : `District Legal Services Authority (DLSA) — ${state || 'District Level'}`;

  const whyRelevant = lang === "Hindi"
    ? "जिला विधिक सेवा प्राधिकरण (DLSA) नागरिकों को नागरिक और दीवानी विवादों के पूर्व-मुकदमेबाजी समाधान हेतु निःशुल्क विधिक सहायता, परामर्श एवं लोक अदालत मध्यस्थता प्रदान करता है।"
    : lang === "Hinglish"
    ? "District Legal Services Authority (DLSA) citizens ko civil aur civic grievances ke resolution ke liye free legal aid, counseling aur Lok Adalat mediation provide karta hai."
    : "The District Legal Services Authority (DLSA) provides free legal aid, counseling, and pre-litigation conciliation/Lok Adalat services for civic and civil grievances.";

  const requiredDocuments = [
    "Written representation detailing the grievance and chronology of events",
    "Copies of previous complaints, tokens, and communications with authorities",
    "Proof of address and identity"
  ];

  const suggestedNextActions = [
    "Organize all relevant receipts, notices, and correspondence in chronological order.",
    "Submit a formal written representation to the concerned administrative department head.",
    "If unresolved, visit the local District Legal Services Authority (DLSA) for free pre-litigation mediation.",
    "Consider participating in the National/State Lok Adalat for amicable settlement."
  ];

  return {
    channelName: primaryAuthority,
    category: "Civic & Administrative Redressal",
    targetLocation: locationLabel,
    whyRelevant,
    requiredDocuments,
    suggestedNextActionList: suggestedNextActions,
    suggestedNextAction: suggestedNextActions.join(" "),
    legalFramework: "Legal Services Authorities Act, 1987 & Applicable State Byelaws",
    sourceTitle: "National Legal Services Authority (NALSA)",
    sourceUrl: "https://nalsa.gov.in",
    isVerified: true,
    matchConfidence: "High Confidence",
    matchSupportingText: "Based on selected issue category and jurisdiction.",
    legalAssistanceNotice: "If you need legal assistance or mediation support, you may consider approaching the appropriate District Legal Services Authority or other legal-aid channel, subject to eligibility and the nature of the matter.",
    jurisdictionNotice: "The applicable authority and procedure may vary based on jurisdiction and the specific facts of the matter.",
    verificationRequiredText: null
  };
};

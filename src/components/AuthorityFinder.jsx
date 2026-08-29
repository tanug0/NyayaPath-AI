import React, { useState } from 'react';
import { 
  Building2, 
  FileCheck, 
  ArrowUpRight, 
  AlertCircle, 
  MapPin, 
  CheckCircle2, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  ExternalLink,
  Scale,
  Layers,
  HelpCircle
} from 'lucide-react';
import { INDIAN_STATES } from '../data/mockData';

// State-specific tenancy frameworks lookup for national scalability
const STATE_TENANCY_MAPPINGS = {
  "uttar pradesh": {
    authorityName: (city) => `Rent Authority — ${city || 'Prayagraj'}`,
    framework: "U.P. Regulation of Urban Premises Tenancy Act, 2021",
    sourceTitle: "U.P. Housing & Urban Planning Department — Tenancy Portal",
    sourceUrl: "https://upawas.up.gov.in/welcome",
    isVerified: true
  },
  "delhi (nct)": {
    authorityName: (city) => `Rent Controller / Additional Rent Controller — ${city || 'Delhi District Court'}`,
    framework: "Delhi Rent Control Act, 1958",
    sourceTitle: "Delhi District Courts Portal",
    sourceUrl: "https://delhicourts.nic.in",
    isVerified: true
  },
  "delhi": {
    authorityName: (city) => `Rent Controller / Additional Rent Controller — ${city || 'Delhi District Court'}`,
    framework: "Delhi Rent Control Act, 1958",
    sourceTitle: "Delhi District Courts Portal",
    sourceUrl: "https://delhicourts.nic.in",
    isVerified: true
  },
  "maharashtra": {
    authorityName: (city) => `Competent Authority (Rent Control Act) / Court of Small Causes — ${city || 'Mumbai / District Court'}`,
    framework: "Maharashtra Rent Control Act, 1999",
    sourceTitle: "Bombay High Court & District Judiciary",
    sourceUrl: "https://bombayhighcourt.nic.in",
    isVerified: true
  },
  "karnataka": {
    authorityName: (city) => `Rent Controller / Court of Small Causes — ${city || 'Bengaluru'}`,
    framework: "Karnataka Rent Act, 1999",
    sourceTitle: "Government of Karnataka Portal",
    sourceUrl: "https://karnataka.gov.in",
    isVerified: true
  },
  "tamil nadu": {
    authorityName: (city) => `Rent Court / Rent Tribunal — ${city || 'Chennai / District Court'}`,
    framework: "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017",
    sourceTitle: "Government of Tamil Nadu Portal",
    sourceUrl: "https://www.tn.gov.in",
    isVerified: true
  }
};

export default function AuthorityFinder({ 
  initialState = "Uttar Pradesh", 
  initialCity = "Prayagraj", 
  initialCategory = "TENANCY" 
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filterState, setFilterState] = useState(initialState);
  const [filterCity, setFilterCity] = useState(initialCity);

  const normalizedState = (filterState || "").toLowerCase().trim();
  const normalizedCity = (filterCity || "").trim();

  // Compute National Jurisdiction Authority Data
  let authorityData = null;

  if (selectedCategory === "TENANCY") {
    const stateMap = STATE_TENANCY_MAPPINGS[normalizedState];
    const isMapped = Boolean(stateMap);

    authorityData = {
      channelName: isMapped 
        ? stateMap.authorityName(normalizedCity) 
        : (normalizedCity ? `Appropriate Local Rent Authority — ${normalizedCity}` : `Appropriate Local Rent Authority — ${filterState || 'State'}`),
      whyRelevant: "Based on the selected issue and jurisdiction, this authority may be relevant to the reported tenancy dispute. The applicable forum and procedure depend on the nature of the matter and the governing state/central framework.",
      requiredDocuments: [
        "Copy of signed Tenancy Agreement / Rent Receipt records",
        "Bank transaction proof / security deposit receipt, if applicable",
        "Relevant communication with landlord/tenant",
        "Copy of written notice and proof of delivery, if already sent"
      ],
      suggestedNextActions: [
        "Collect relevant tenancy records and supporting evidence.",
        "Prepare and send a formal written notice, where appropriate, and retain proof of delivery.",
        "If the dispute remains unresolved, check the applicable authority procedure.",
        "Consider mediation or legal assistance where appropriate."
      ],
      legalFramework: isMapped 
        ? stateMap.framework 
        : "State-Specific Tenancy Legislation (Subject to local state enactment; Model Tenancy Act advisory framework)",
      sourceTitle: isMapped ? stateMap.sourceTitle : "Ministry of Housing and Urban Affairs (MTA Framework)",
      sourceUrl: isMapped ? stateMap.sourceUrl : "https://mohua.gov.in",
      isVerified: isMapped,
      matchConfidence: isMapped ? "High Confidence" : "Verification Recommended"
    };
  } else if (selectedCategory === "CONSUMER") {
    authorityData = {
      channelName: normalizedCity 
        ? `District Consumer Disputes Redressal Commission (DCDRC) — ${normalizedCity}`
        : `District Consumer Disputes Redressal Commission (DCDRC) — ${filterState || 'District Bench'}`,
      whyRelevant: "Under the Consumer Protection Act, 2019, District Consumer Commissions have statutory jurisdiction over consumer complaints for defective goods, deficiency of service, and unfair trade practices for claims up to ₹50 Lakh.",
      requiredDocuments: [
        "Purchase Invoice / Order confirmation / Payment receipt",
        "Photographs, unboxing video, or inspection report demonstrating the defect",
        "Written communication with seller/customer support ticket history",
        "Copy of formal demand notice requesting refund, replacement, or repair"
      ],
      suggestedNextActions: [
        "Compile purchase invoice, warranty documents, and defect proof.",
        "Register a grievance on the National Consumer Helpline (consumerhelpline.gov.in) or call 1915 for pre-litigation mediation.",
        "Serve a formal written 15-day demand notice to the company's Grievance Officer.",
        "If unaddressed, file a consumer petition online via e-Jagriti (ejagriti.gov.in) before the District Commission."
      ],
      legalFramework: "Consumer Protection Act, 2019",
      sourceTitle: "National Consumer Helpline & e-Jagriti Portal",
      sourceUrl: "https://consumerhelpline.gov.in",
      isVerified: true,
      matchConfidence: "High Confidence"
    };
  } else if (selectedCategory === "RTI") {
    authorityData = {
      channelName: normalizedCity
        ? `Public Information Officer (PIO) — Concerned Public Authority (${normalizedCity})`
        : `Public Information Officer (PIO) — Concerned Public Authority (${filterState || 'State/Central'})`,
      whyRelevant: "Under Section 6(1) of the Right to Information Act, 2005, every public authority has a designated Public Information Officer (PIO) mandated to furnish certified information within 30 days.",
      requiredDocuments: [
        "Form 6(1) RTI Application specifying clear, point-wise questions",
        "Application fee receipt (₹10 via IPO / Court Fee Stamp / Online)",
        "Proof of identity or BPL card copy (if fee exemption claimed)"
      ],
      suggestedNextActions: [
        "Identify whether the subject department is Central (e.g. NHAI/Railways) or State/Municipal (e.g. PWD/Nagar Nigam).",
        "Draft concise, specific questions requesting certified copies of tenders, work orders, or records.",
        "Submit application with ₹10 fee via Central RTI Online (rtionline.gov.in) for Central bodies or State PIO / State portal for State works.",
        "Track the 30-day statutory countdown; file First Appeal under Section 19(1) if unaddressed."
      ],
      legalFramework: "Right to Information Act, 2005",
      sourceTitle: "Central RTI Online Portal / State PIO Offices",
      sourceUrl: "https://rtionline.gov.in",
      isVerified: true,
      matchConfidence: "High Confidence"
    };
  } else {
    // Civic & Municipal
    authorityData = {
      channelName: normalizedCity
        ? `District Legal Services Authority (DLSA) / Municipal Grievance Desk — ${normalizedCity}`
        : `District Legal Services Authority (DLSA) — ${filterState || 'District Level'}`,
      whyRelevant: "The District Legal Services Authority (DLSA) provides free legal aid, counseling, and pre-litigation conciliation/Lok Adalat services for civic and civil grievances.",
      requiredDocuments: [
        "Written representation detailing the grievance and chronology of events",
        "Copies of previous complaints, tokens, and communications with authorities",
        "Proof of address and identity"
      ],
      suggestedNextActions: [
        "Organize all relevant receipts, notices, and correspondence in chronological order.",
        "Submit a formal written representation to the concerned administrative department head.",
        "If unresolved, visit the local District Legal Services Authority (DLSA) for free pre-litigation mediation.",
        "Consider participating in the National/State Lok Adalat for amicable settlement."
      ],
      legalFramework: "Legal Services Authorities Act, 1987 & Applicable State Byelaws",
      sourceTitle: "National Legal Services Authority (NALSA)",
      sourceUrl: "https://nalsa.gov.in",
      isVerified: true,
      matchConfidence: "High Confidence"
    };
  }

  return (
    <div className="space-y-6">
      
      {/* Header & National Scope Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
                National Authority Finder
              </span>
              <span className="text-xs text-slate-500 font-medium">India-Wide Jurisdiction Mapping</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Competent Civic Channels & Authorities</h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Identify the appropriate statutory authority, consumer commission, or mediation channel for your specific issue and jurisdiction.
            </p>
          </div>
        </div>

        {/* Dynamic Controls: Category, State, City */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                Problem Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="TENANCY">Tenancy & Rent Disputes</option>
                <option value="CONSUMER">Consumer Protection</option>
                <option value="RTI">Right to Information (RTI)</option>
                <option value="CIVIC">Civic & Municipal Services</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                State / Union Territory
              </label>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Select State / UT --</option>
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* City / District */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                City / District
              </label>
              <input
                type="text"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                placeholder="Enter City / District"
                className="w-full text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Primary Authority Guidance Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-300">
                Primary Designated Authority
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {authorityData.channelName}
              </h4>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>{filterCity ? `${filterCity}, ` : ''}{filterState || 'National Scope'}</span>
              </p>
            </div>

            {/* Authority Match Badge */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-left sm:text-right shrink-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                Authority Match
              </div>
              <div className="text-sm font-bold text-amber-300 flex items-center gap-1 sm:justify-end mt-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{authorityData.matchConfidence}</span>
              </div>
              <div className="text-[10px] text-slate-300 mt-0.5">
                Based on selected issue category and jurisdiction.
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          
          {/* 1. Why it may be relevant */}
          <div>
            <h5 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
              Why It May Be Relevant
            </h5>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {authorityData.whyRelevant}
            </p>
          </div>

          {/* 2. Documentation Checklist */}
          <div>
            <h5 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2.5 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-indigo-600" />
              Documentation Checklist
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {authorityData.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Suggested Next Actions */}
          <div>
            <h5 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
              Suggested Next Action
            </h5>
            <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs sm:text-sm text-indigo-950 space-y-2">
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed font-medium">
                {authorityData.suggestedNextActions.map((action, idx) => (
                  <li key={idx} className="text-slate-800">
                    <span className="text-slate-700">{action}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* 4. Legal / Regulatory Framework & Official Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Applicable Legal / Regulatory Framework
              </span>
              <p className="text-sm font-semibold text-slate-900">
                {authorityData.legalFramework}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Governing statute applicable to the selected jurisdiction and matter.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Official / Verified Source
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  {authorityData.sourceTitle}
                </p>
              </div>
              {authorityData.sourceUrl && (
                <div className="mt-2">
                  <a
                    href={authorityData.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    <span>Visit Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* 5. Need Legal Assistance / Mediation Section */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <h5 className="text-sm font-bold text-white">Need Legal Assistance?</h5>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you need legal assistance or mediation support, you may consider approaching the appropriate District Legal Services Authority or other legal-aid channel, subject to eligibility and the nature of the matter.
              </p>
            </div>
            <a
              href="https://nalsa.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-lg transition-colors shrink-0"
            >
              <span>NALSA Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 6. Jurisdiction Caution & Verification Fallback Alert */}
          {!authorityData.isVerified ? (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <strong className="block font-semibold mb-0.5">Authority verification required for this jurisdiction:</strong>
                Specific statutory authority records for {filterState || 'this state'} are subject to local gazette notification. Please verify with the local district magistrate or competent state rent authority.
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Jurisdiction Notice: </strong>
              The applicable authority and procedure may vary based on jurisdiction and the specific facts of the matter.
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

import { VERIFIED_SOURCES } from './sources.js';
import { getAuthorityGuidance } from './authorities.js';

/**
 * Category Classification with English, Hindi, and Hinglish keywords
 */
export const detectCategory = (problem = "") => {
  const p = (problem || "").toLowerCase();
  
  // 1. Tenancy / Rent / Housing keywords
  if (
    p.includes("landlord") || p.includes("tenant") || p.includes("tenancy") || 
    p.includes("rent") || p.includes("deposit") || p.includes("flat") || 
    p.includes("room") || p.includes("lease") || p.includes("evict") || 
    p.includes("eviction") || p.includes("kiraya") || p.includes("kirayedar") || 
    p.includes("makan") || p.includes("malik") || p.includes("मकान") || 
    p.includes("किराया") || p.includes("किरायेदार") || p.includes("सुरक्षा जमा") ||
    p.includes("खाली") || p.includes("बेदखल")
  ) {
    return "TENANCY";
  }
  
  // 2. Consumer / E-Commerce / Defective Product keywords
  if (
    p.includes("defective") || p.includes("product") || p.includes("seller") || 
    p.includes("warranty") || p.includes("refund") || p.includes("consumer") || 
    p.includes("amazon") || p.includes("flipkart") || p.includes("bought") || 
    p.includes("order") || p.includes("kharida") || p.includes("kharid") || 
    p.includes("replace") || p.includes("replacement") || p.includes("delivery") || 
    p.includes("service center") || p.includes("खराब") || p.includes("वारंटी") || 
    p.includes("दोषपूर्ण") || p.includes("उपभोक्ता") || p.includes("रिफंड") ||
    p.includes("दुकानदार") || p.includes("सामान")
  ) {
    return "CONSUMER";
  }
  
  // 3. RTI / Right to Information / Public Works / Government Transparency keywords
  if (
    p.includes("rti") || p.includes("right to information") || p.includes("road") || 
    p.includes("spending") || p.includes("expenditure") || p.includes("tender") || 
    p.includes("funds") || p.includes("kharcha") || p.includes("paisa spend") || 
    p.includes("budget") || p.includes("audit") || p.includes("sarak") || 
    p.includes("sadak") || p.includes("सूचना") || p.includes("आरटीआई") || 
    p.includes("सड़क") || p.includes("बजट") || p.includes("खर्च") ||
    p.includes("सरकारी योजना") || p.includes("टेंडर")
  ) {
    return "RTI";
  }
  
  return "GENERIC";
};

/**
 * Extract stated currency amounts (e.g. ₹15,000, 15000, Rs 5000) from user text
 */
const extractStatedAmount = (text = "") => {
  const match = text.match(/(?:₹|rs\.?|inr)\s*([0-9,]+(?:\.[0-9]{2})?)/i) || 
                text.match(/([0-9,]+)\s*(?:rupees|rs|rupaye|hazar|k|deposit)/i);
  if (match && match[1]) {
    const val = match[1].replace(/,/g, '');
    if (!isNaN(val) && Number(val) > 0) {
      return `₹${Number(val).toLocaleString('en-IN')}`;
    }
    return `₹${match[1]}`;
  }
  return null;
};

/**
 * Extract named entities (platform/store, product name) from user text
 */
const extractProductOrPlatform = (text = "") => {
  const p = text.toLowerCase();
  let platform = null;
  let item = null;

  if (p.includes("amazon")) platform = "Amazon";
  else if (p.includes("flipkart")) platform = "Flipkart";
  else if (p.includes("myntra")) platform = "Myntra";
  else if (p.includes("meesho")) platform = "Meesho";
  else if (p.includes("zomato")) platform = "Zomato";
  else if (p.includes("swiggy")) platform = "Swiggy";

  if (p.includes("phone") || p.includes("mobile")) item = "mobile phone";
  else if (p.includes("laptop") || p.includes("computer")) item = "laptop";
  else if (p.includes("tv") || p.includes("television")) item = "television";
  else if (p.includes("watch") || p.includes("smartwatch")) item = "smartwatch";
  else if (p.includes("refrigerator") || p.includes("fridge")) item = "refrigerator";
  else if (p.includes("ac") || p.includes("air conditioner")) item = "air conditioner";
  else if (p.includes("shoes") || p.includes("cloth")) item = "apparel/footwear";

  return { platform, item };
};

/**
 * Detect sub-intent within category to avoid incorrect generalizations
 */
const detectSubIntent = (categoryKey, text = "") => {
  const p = text.toLowerCase();

  if (categoryKey === "TENANCY") {
    if (
      p.includes("terminate") || p.includes("termination") || p.includes("evict") || 
      p.includes("eviction") || p.includes("khali") || p.includes("bina reason") || 
      p.includes("nikal") || p.includes("notice") || p.includes("agreement tod") ||
      p.includes("बर्खास्त") || p.includes("खाली") || p.includes("निकाल") || 
      p.includes("समाप्त") || p.includes("बिना कारण") || p.includes("समझौता") ||
      p.includes("हटाने") || p.includes("बेदखल")
    ) {
      return "TENANCY_TERMINATION";
    }
    if (
      p.includes("deposit") || p.includes("security") || p.includes("paisa") || 
      p.includes("return") || p.includes("wapas") || p.includes("कटौती") || 
      p.includes("सुरक्षा जमा") || p.includes("रुपये") || p.includes("₹")
    ) {
      return "TENANCY_DEPOSIT";
    }
    if (p.includes("increase") || p.includes("badha") || p.includes("kiraya badha") || p.includes("बढ़ाया")) {
      return "TENANCY_RENT_INCREASE";
    }
    return "TENANCY_GENERAL";
  }

  if (categoryKey === "CONSUMER") {
    if (p.includes("defective") || p.includes("kharab") || p.includes("faulty") || p.includes("damaged") || p.includes("दोषपूर्ण") || p.includes("खराब")) {
      return "CONSUMER_DEFECT";
    }
    if (p.includes("refund") || p.includes("paisa wapas") || p.includes("wapas nahi") || p.includes("रिफंड")) {
      return "CONSUMER_REFUND";
    }
    if (p.includes("deliver") || p.includes("delivery") || p.includes("not received") || p.includes("पहुंचा नहीं")) {
      return "CONSUMER_DELIVERY";
    }
    return "CONSUMER_GENERAL";
  }

  if (categoryKey === "RTI") {
    if (p.includes("road") || p.includes("sadak") || p.includes("sarak") || p.includes("spending") || p.includes("expenditure") || p.includes("tender") || p.includes("budget") || p.includes("kharcha") || p.includes("सड़क") || p.includes("व्यय") || p.includes("बजट")) {
      return "RTI_SPENDING_WORKS";
    }
    if (p.includes("exam") || p.includes("recruitment") || p.includes("bharti") || p.includes("result") || p.includes("status") || p.includes("परीक्षा") || p.includes("भर्ती")) {
      return "RTI_STATUS_EXAM";
    }
    return "RTI_GENERAL";
  }

  // Generic category sub-intents
  if (
    p.includes("garbage") || p.includes("kachra") || p.includes("safai") || 
    p.includes("sanitation") || p.includes("cleanliness") || p.includes("waste") || 
    p.includes("drainage") || p.includes("sewer") || p.includes("naali") || 
    p.includes("कचरा") || p.includes("सफाई") || p.includes("नाली") || p.includes("कूड़ा")
  ) {
    return "GENERIC_MUNICIPAL_GARBAGE";
  }
  if (p.includes("noise") || p.includes("pollution") || p.includes("sound") || p.includes("ध्वनि") || p.includes("शोर")) {
    return "GENERIC_NOISE_POLLUTION";
  }

  return "GENERIC_CIVIC";
};

/**
 * Dynamic Fallback Analysis Generator
 */
export const getFallbackAnalysis = ({ problem = "", state = "", city = "", language = "English" }) => {
  const categoryKey = detectCategory(problem);
  const subIntent = detectSubIntent(categoryKey, problem);
  const statedAmount = extractStatedAmount(problem);
  const { platform, item } = extractProductOrPlatform(problem);
  const lang = (language === "Hindi" || language === "Hinglish") ? language : "English";

  const locationLabel = [city, state].filter(Boolean).join(", ") || (
    lang === "Hindi" ? "स्थान निर्दिष्ट नहीं" :
    lang === "Hinglish" ? "Unspecified Location" : "Unspecified Location"
  );
  
  const authorityData = getAuthorityGuidance(categoryKey, state, city, lang);

  // =========================================================================
  // 1. TENANCY CATEGORY
  // =========================================================================
  if (categoryKey === "TENANCY") {
    if (subIntent === "TENANCY_TERMINATION") {
      const title = lang === "Hindi" ? "किराया समझौता अनुचित/मनमाने ढंग से समाप्त करने का विवाद" :
                    lang === "Hinglish" ? "Unlawful / Arbitrary Tenancy Agreement Termination Dispute" :
                    "Unlawful / Arbitrary Tenancy Agreement Termination Dispute";

      const overview = lang === "Hindi" ? 
        `आपके मकान मालिक ने बिना किसी वैध कानूनी कारण या उचित सूचना अवधि के किराया समझौता समाप्त कर दिया है अथवा परिसर खाली करने का दबाव बनाया है।` :
        lang === "Hinglish" ?
        `Aapke landlord ne bina kisi valid legal ground ya proper notice period ke rent agreement terminate kar diya hai ya property vacate karne ka pressure banaya hai.` :
        `Your landlord has arbitrarily terminated or threatened termination of your tenancy agreement without valid contractual breach or statutory notice period.`;

      const keyPoints = lang === "Hindi" ? [
        "मान्य किराया समझौते की अवधि के दौरान मकान मालिक बिना अनुबंध के उल्लंघन या निर्धारित नोटिस अवधि के मनमाने ढंग से बेदखल नहीं कर सकता।",
        "संपत्ति अंतरण अधिनियम (Transfer of Property Act) और राज्य किराया नियंत्रण नियमों के अनुसार औपचारिक लिखित नोटिस अनिवार्य होता है।",
        "अवैध बेदखली के विरुद्ध स्थानीय किराया प्राधिकरण या दीवानी अदालत से निषेधाज्ञा (Injunction) या राहत मांगी जा सकती है।"
      ] : lang === "Hinglish" ? [
        "Valid rent agreement period ke dauran landlord bina contractual breach ya prescribed notice period ke tenant ko arbitrarily evict nahi kar sakta.",
        "Transfer of Property Act aur State Tenancy rules ke tehat formal written notice dena mandatory requirement hai.",
        "Unlawful eviction ke against local Rent Authority ya Civil Court se protection aur stay relief claim ki ja sakti hai."
      ] : [
        "A landlord cannot arbitrarily terminate an active lease without contractual breach or serving the stipulated prior notice period.",
        "Statutory tenancy laws and Transfer of Property principles mandate formal written notice before seeking possession.",
        "Tenants facing unlawful eviction can seek protective remedies and mediation through local Rent Authorities or civil forums."
      ];

      const relevantInformation = [
        {
          label: lang === "Hindi" ? "सूचना अवधि की अनिवार्यता" : lang === "Hinglish" ? "Notice Period Mandate" : "Notice Period Mandate",
          detail: lang === "Hindi" ? "अनुबंध में निर्दिष्ट नोटिस अवधि (साधारणतः 30 दिन) देना दोनों पक्षों के लिए अनिवार्य है।" :
                  lang === "Hinglish" ? "Agreement mein specified notice period (usually 30 days) follow karna legally binding hota hai." :
                  "Serving the notice period specified in the agreement (typically 30 days) is legally binding on both parties."
        },
        {
          label: lang === "Hindi" ? "अवैध बेदखली पर रोक" : lang === "Hinglish" ? "Protection against Forceful Eviction" : "Protection against Forceful Eviction",
          detail: lang === "Hindi" ? "बिजली/पानी रोकना या बलपूर्वक ताला लगाना कानूनन दंडनीय कृत्य है।" :
                  lang === "Hinglish" ? "Essential utilities (bijli/paani) disconnect karna ya forcefully lock lagana punishable offence hai." :
                  "Disconnecting utilities or forcefully dispossessing a tenant without due process is legally prohibited."
        },
        {
          label: lang === "Hindi" ? "लिखित आपत्ति का महत्व" : lang === "Hinglish" ? "Formal Objection Record" : "Formal Objection Record",
          detail: lang === "Hindi" ? "अनुचित समाप्ति पर तत्काल औपचारिक लिखित आपत्ति दर्ज कराना विधिक सुरक्षा प्रदान करता है।" :
                  lang === "Hinglish" ? "Unlawful termination par immediate written objection notice bhejna legal protection ensure karta hai." :
                  "Serving an immediate formal written objection creates crucial documentary evidence of unlawful termination."
        }
      ];

      const actionRoadmap = [
        {
          id: 1,
          title: lang === "Hindi" ? "किराया समझौता और रसीदें एकत्र करें" : lang === "Hinglish" ? "Rent agreement aur payment receipts compile karein" : "Compile rent agreement and payment receipts",
          description: lang === "Hindi" ? "मूल किराया अनुबंध, किराये के भुगतान की रसीदें/बैंक स्टेटमेंट और मकान मालिक द्वारा भेजे गए किसी भी संदेश का रिकॉर्ड सहेजें।" :
                        lang === "Hinglish" ? "Original lease agreement, rent transaction proofs aur landlord ke communication ka documented record banayein." :
                        "Organize the signed lease deed, rent payment bank statements, and all correspondence with the landlord.",
          completed: false
        },
        {
          id: 2,
          title: lang === "Hindi" ? "लिखित आपत्ति पत्र (Objection Letter) भेजें" : lang === "Hinglish" ? "Formal written objection letter serve karein" : "Serve a formal written objection notice",
          description: lang === "Hindi" ? "मकान मालिक को स्पीड पोस्ट/ईमेल से नोटिस भेजकर सूचित करें कि यह समाप्ति अनुबंध की शर्तों के विरुद्ध है।" :
                        lang === "Hinglish" ? "Landlord ko Speed Post / Email se formal notice bhejein stating that premature termination violates agreement terms." :
                        "Send a formal written notice to the landlord citing agreement terms and objecting to arbitrary eviction without due cause.",
          completed: false
        },
        {
          id: 3,
          title: lang === "Hindi" ? "आवश्यक सेवाएं बाधित न करने का नोटिस दें" : lang === "Hinglish" ? "Utility disconnection warning record karein" : "Demand non-interference with essential amenities",
          description: lang === "Hindi" ? "स्पष्ट करें कि बिजली, पानी या आवागमन में बाधा उत्पन्न करना वैधानिक नियमों का उल्लंघन होगा।" :
                        lang === "Hinglish" ? "Document karein ki electricity/water supply disconnect karna legal violation hoga." :
                        "Put on record that disconnecting electricity, water, or access constitutes an actionable civil and administrative wrong.",
          completed: false
        },
        {
          id: 4,
          title: lang === "Hindi" ? "स्थानीय किराया प्राधिकरण / SDM से संपर्क करें" : lang === "Hinglish" ? "Local Rent Authority / SDM se contact karein" : "Approach Local Rent Authority / SDM",
          description: lang === "Hindi" ? "यदि मकान मालिक दबाव बनाए, तो स्थानीय रेंट अथॉरिटी या एसडीएम कार्यालय में शिकायत प्रस्तुत करें।" :
                        lang === "Hinglish" ? "Agar landlord arbitrary pressure create kare, toh local Rent Authority ya SDM office mein representation dein." :
                        "If harassment continues, submit a formal petition before the local Rent Authority or Sub-Divisional Magistrate.",
          completed: false
        },
        {
          id: 5,
          title: lang === "Hindi" ? "जिला विधिक सेवा प्राधिकरण (DLSA) में मध्यस्थता" : lang === "Hinglish" ? "DLSA se free legal mediation lein" : "Seek mediation through DLSA",
          description: lang === "Hindi" ? "शांतिपूर्ण समाधान या मुआवजे के लिए जिला विधिक सेवा प्राधिकरण (DLSA) से निःशुल्क विधिक सहायता लें।" :
                        lang === "Hinglish" ? "Amicable settlement ya compensation ke liye District Legal Services Authority (DLSA) approach karein." :
                        "Approach the District Legal Services Authority (DLSA) for pre-litigation mediation and legal aid.",
          completed: false
        }
      ];

      return {
        category: "Tenant / Tenancy Dispute",
        summary: { title, overview, keyPoints },
        jurisdiction: {
          level: "State-specific Tenancy Laws & Local Rent Authorities",
          location: locationLabel,
          statutoryScope: "State-specific",
          note: "Tenancy rules, eviction grounds, and lock-in protections depend on State legislation. Do not assume Model Tenancy Act automatically applies without state enactment."
        },
        relevantInformation,
        actionRoadmap,
        sources: VERIFIED_SOURCES.TENANCY,
        authority: authorityData,
        disclaimer: lang === "Hindi" ? "यह जानकारी केवल सामान्य जागरूकता के लिए है और पेशेवर कानूनी सलाह का विकल्प नहीं है।" :
                    lang === "Hinglish" ? "Yeh information general awareness ke liye hai aur professional legal advice ka substitute nahi hai." :
                    "This information is for general awareness and does not replace professional legal advice.",
        confidence: "High (Curated Tenancy Protection Protocol)",
        isFallback: true
      };
    }

    // Default Tenancy (Security Deposit / General Tenancy)
    const amountStr = statedAmount || (lang === "Hindi" ? "सुरक्षा जमा राशि" : lang === "Hinglish" ? "security deposit" : "security deposit");
    const title = lang === "Hindi" ? `किरायेदार की ${amountStr} रोके जाने का मामला` :
                  lang === "Hinglish" ? `Tenant Security Deposit Withholding Dispute (${amountStr})` :
                  `Withholding of Tenant Security Deposit (${amountStr})`;

    const overview = lang === "Hindi" ?
      `आपके मकान मालिक ने आपकी ${amountStr} वापस नहीं की है, जबकि आपने परिसर खाली कर चाबियां सौंप दी हैं और कोई वैध कटौती विवरण भी नहीं दिया गया है।` :
      lang === "Hinglish" ?
      `Aapke landlord ne ${amountStr} return nahi kiya hai jabki aapne flat khali karke keys handover kar di hain aur koi valid deduction receipt nahi di gayi hai.` :
      `You have vacated the rented premises upon lease completion, but the landlord has withheld your ${amountStr} without providing mutually verified itemized deduction receipts.`;

    const keyPoints = lang === "Hindi" ? [
      "सुरक्षा जमा राशि केवल बकाया किराए या वास्तविक संपत्ति क्षति की भरपाई के लिए होती है, सामान्य टूट-फूट के लिए नहीं।",
      "मकान मालिक से अपेक्षा की जाती है कि वह परिसर खाली होने के 15-30 दिनों के भीतर जमा राशि वापस कर दे।",
      "प्रारंभिक जमा भुगतान का प्रमाण और शांतिपूर्ण चाबी सौंपने का रिकॉर्ड राशि वसूली के लिए सबसे महत्वपूर्ण है।"
    ] : lang === "Hinglish" ? [
      "Security deposit sirf unpaid rent ya actual property damage ke liye hota hai, normal wear & tear deductible nahi hota.",
      "Landlord ko keys handover ke baad 15-30 days ke reasonable time window mein deposit refund karna compulsory hota hai.",
      "Deposit transfer proof aur peaceful handover message/receipt refund paane ke liye core evidence hain."
    ] : [
      "Security deposits are trust funds intended solely for unpaid rent or actual documented property damage beyond normal wear and tear.",
      "Landlords are generally expected to return deposits within a reasonable window (15–30 days) following key handover.",
      "Documentary proof of initial deposit transfer and peaceful handover is key to recovery."
    ];

    const relevantInformation = [
      {
        label: lang === "Hindi" ? "मांग नोटिस की आवश्यकता" : lang === "Hinglish" ? "Notice Requirement" : "Notice Requirement",
        detail: lang === "Hindi" ? "लागू क्षेत्राधिकार और मामले के अनुसार विधिक शिकायत से पूर्व औपचारिक लिखित नोटिस देना मानक प्रक्रिया है।" :
                lang === "Hinglish" ? "Relevant jurisdiction aur matter ke according legal escalation se pehle formal written notice dena standard practice hai." :
                "Follow the applicable notice requirements for the relevant jurisdiction and matter prior to formal legal escalation."
      },
      {
        label: lang === "Hindi" ? "अनुमेय कटौतियां" : lang === "Hinglish" ? "Permissible Deductions" : "Permissible Deductions",
        detail: lang === "Hindi" ? "केवल सत्यापित बकाया उपयोगिता बिल या वास्तविक नुकसान ही काटा जा सकता है; सामान्य टूट-फूट नहीं।" :
                lang === "Hinglish" ? "Sirf unpaid electricity/water bills ya actual physical damage deduct kiya ja sakta hai." :
                "Only verified utility arrears or actual structural damage can be deducted; ordinary wear and tear is not deductible."
      },
      {
        label: lang === "Hindi" ? "चाबी सौंपने का प्रमाण" : lang === "Hinglish" ? "Proof of Handover" : "Proof of Handover",
        detail: lang === "Hindi" ? "खाली कमरे के फोटो/वीडियो और चाबी सौंपने की रसीद या मैसेज मनमानी कटौतियों से बचाते हैं।" :
                lang === "Hinglish" ? "Vacated room ke photos/videos aur keys handover acknowledgment arbitary deductions se protect karte hain." :
                "Move-out inspection notes, photos, and messages surrendering keys protect against arbitrary claims."
      }
    ];

    const actionRoadmap = [
      {
        id: 1,
        title: lang === "Hindi" ? "प्रासंगिक साक्ष्य एकत्र करें" : lang === "Hinglish" ? "Relevant evidence collect karein" : "Collect relevant evidence",
        description: lang === "Hindi" ? "किराया समझौता, जमा राशि के बैंक ट्रांसफर प्रमाण, चाबी सौंपने के मैसेज और खाली कमरे के फोटो सुरक्षित रखें।" :
                      lang === "Hinglish" ? "Rent agreement, deposit bank transfer receipts, keys handover message aur vacant flat ke photos collect karein." :
                      "Gather rent agreement, bank transfer proofs for deposit, key handover message/receipt, and photos/videos of the vacant premises.",
        completed: false
      },
      {
        id: 2,
        title: lang === "Hindi" ? "संबंधित पक्ष से लिखित संपर्क करें" : lang === "Hinglish" ? "Landlord ko written reminder bhejein" : "Contact the concerned party",
        description: lang === "Hindi" ? "मकान मालिक को चाबी सौंपने की तारीख का हवाला देते हुए उचित समयसीमा में समाधान का विनम्र स्मरण पत्र भेजें।" :
                      lang === "Hinglish" ? "Handover date ka reference dete hue WhatsApp ya email reminder bhejein aur reasonable period mein refund details mangein." :
                      "Send a polite, documented verbal or written request referencing the handover date and requesting transaction details within a reasonable period, where appropriate.",
        completed: false
      },
      {
        id: 3,
        title: lang === "Hindi" ? "औपचारिक लिखित नोटिस भेजें" : lang === "Hinglish" ? "Formal Written Notice bhejein" : "Send a written request",
        description: lang === "Hindi" ? "स्पीड पोस्ट या पंजीकृत ईमेल द्वारा लागू क्षेत्राधिकार और मामले के अनुसार औपचारिक नोटिस भेजें।" :
                      lang === "Hinglish" ? "Speed Post with AD ya registered email se applicable notice requirements follow karte hue formal notice bhejein." :
                      "Deliver a formal written notice via Speed Post with AD or registered email following the applicable notice requirements for the relevant jurisdiction and matter.",
        completed: false
      },
      {
        id: 4,
        title: lang === "Hindi" ? "डिलिवरी ट्रैक करें और फॉलो-अप लें" : lang === "Hinglish" ? "Delivery tracking slip save karein" : "Follow up",
        description: lang === "Hindi" ? "स्पीड पोस्ट की ट्रैकिंग रसीद डाउनलोड करें और विपक्षी पार्टी के जवाब या अनिच्छा का पूरा रिकॉर्ड रखें।" :
                      lang === "Hinglish" ? "Speed Post delivery proof track karein aur counterparty ke response ya non-response ka documented record banayein." :
                      "Track postal delivery receipt, keep delivery logs, and record any responses or lack thereof.",
        completed: false
      },
      {
        id: 5,
        title: lang === "Hindi" ? "प्राधिकरण में शिकायत या मध्यस्थता का विकल्प चुनें" : lang === "Hinglish" ? "Authority escalation explore karein" : "Explore appropriate escalation options",
        description: lang === "Hindi" ? "यदि समाधान न हो, तो स्थानीय किराया प्राधिकरण / सक्षम मंच या जिला विधिक सेवा प्राधिकरण (DLSA) में आवेदन करें।" :
                      lang === "Hinglish" ? "Agar resolve na ho, toh local Rent Authority ya District Legal Services Authority (DLSA) se mediation ke liye contact karein." :
                      "If unresolved, file a petition before the designated local Rent Authority or approach the District Legal Services Authority (DLSA) for mediation.",
        completed: false
      }
    ];

    return {
      category: "Tenant / Security Deposit Issue",
      summary: { title, overview, keyPoints },
      jurisdiction: {
        level: "State-specific Tenancy Laws & Local Rent Authorities",
        location: locationLabel,
        statutoryScope: "State-specific",
        note: "Tenancy rules, maximum deposit limits, and escalation routes depend on State legislation. Do not assume Central Model Tenancy Act automatically applies uniformly without state adoption."
      },
      relevantInformation,
      actionRoadmap,
      sources: VERIFIED_SOURCES.TENANCY,
      authority: authorityData,
      disclaimer: lang === "Hindi" ? "यह जानकारी केवल सामान्य जागरूकता के लिए है और पेशेवर कानूनी सलाह का विकल्प नहीं है।" :
                  lang === "Hinglish" ? "Yeh information general awareness ke liye hai aur professional legal advice ka substitute nahi hai." :
                  "This information is for general awareness and does not replace professional legal advice.",
      confidence: "High (Curated Pre-Litigation Protocol)",
      isFallback: true
    };
  }

  // =========================================================================
  // 2. CONSUMER CATEGORY
  // =========================================================================
  if (categoryKey === "CONSUMER") {
    const itemLabel = item || (lang === "Hindi" ? "उत्पाद / सामान" : lang === "Hinglish" ? "product" : "product");
    const platformLabel = platform ? ` (${platform})` : "";
    const amountLabel = statedAmount ? ` [${statedAmount}]` : "";

    const title = lang === "Hindi" ? `उपभोक्ता शिकायत: ${itemLabel}${platformLabel} का विवाद` :
                  lang === "Hinglish" ? `Consumer Grievance: ${itemLabel}${platformLabel} Dispute` :
                  `Consumer Grievance: ${itemLabel}${platformLabel} Dispute`;

    const overview = lang === "Hindi" ?
      `आपने ${platform || "विक्रेता"} से ${itemLabel} खरीदा जो दोषपूर्ण निकला अथवा जिसके संबंध में विक्रेता ने नीतिगत समयसीमा में रिफंड/समाधान प्रदान नहीं किया है।` :
      lang === "Hinglish" ?
      `Aapne ${platform || "seller"} se ${itemLabel} khareeda tha jo defective nikla ya jiska refund/replacement promised timeline mein provide nahi kiya gaya hai.` :
      `You purchased a ${itemLabel} from ${platform || "a seller/e-commerce platform"} which is defective or for which the seller has failed to provide a prompt refund, replacement, or warranty resolution${amountLabel}.`;

    const keyPoints = lang === "Hindi" ? [
      "उपभोक्ता संरक्षण अधिनियम, 2019 के तहत उपभोक्ताओं को दोषपूर्ण सामान और अपूर्ण सेवाओं के खिलाफ निवारण पाने का वैधानिक अधिकार प्राप्त है।",
      "ई-कॉमर्स कंपनियों और अधिकृत विक्रेताओं के लिए प्रभावी शिकायत निवारण तंत्र बनाए रखना कानूनी रूप से अनिवार्य है।",
      "बिल और दोष के पुख्ता प्रमाणों के साथ औपचारिक शिकायत दर्ज करने से क्षतिपूर्ति का मजबूत आधार बनता है।"
    ] : lang === "Hinglish" ? [
      "Consumer Protection Act, 2019 ke under har consumer ko defective goods aur deficiency of service ke khilaf redressal paane ka statutory right hai.",
      "E-commerce platforms aur authorized sellers ke liye proper grievance redressal officer maintain karna mandatory hai.",
      "Purchase invoice aur defect ke proof ke sath formal complaint compensation pane ka strong foundation banati hai."
    ] : [
      "Under the Consumer Protection Act, 2019, consumers have a statutory right to seek redressal against defective goods and deficient services.",
      "E-commerce entities and authorized sellers are legally obligated to maintain an effective grievance redressal mechanism.",
      "Filing a formal complaint with transaction records and proof of defect creates strong grounds for compensation."
    ];

    const relevantInformation = [
      {
        label: lang === "Hindi" ? "हेल्पलाइन 1915 की सुविधा" : lang === "Hinglish" ? "Statutory 1915 Helpline" : "Statutory 1915 Helpline",
        detail: lang === "Hindi" ? "राष्ट्रीय उपभोक्ता हेल्पलाइन (NCH) पंजीकृत कंपनियों के साथ निःशुल्क पूर्व-मुकदमेबाजी मध्यस्थता प्रदान करती है।" :
                lang === "Hinglish" ? "National Consumer Helpline (NCH) free pre-litigation conciliation provide karti hai registered brands ke sath." :
                "National Consumer Helpline (NCH) provides free pre-litigation conciliation with registered companies."
      },
      {
        label: lang === "Hindi" ? "उत्पाद दायित्व (Product Liability)" : lang === "Hinglish" ? "Product Liability" : "Product Liability",
        detail: lang === "Hindi" ? "दोषपूर्ण सामान से होने वाले नुकसान या वित्तीय हानि के लिए विक्रेता और निर्माता संयुक्त रूप से उत्तरदायी हैं।" :
                lang === "Hinglish" ? "Defective goods ke financial loss ke liye seller aur manufacturer jointly liable hote hain." :
                "Sellers and manufacturers are jointly liable for harm or financial loss caused by defective goods."
      },
      {
        label: lang === "Hindi" ? "ऑनलाइन e-Daakhil सुविधा" : lang === "Hinglish" ? "Online e-Daakhil Filing" : "Online e-Daakhil Filing",
        detail: lang === "Hindi" ? "औपचारिक उपभोक्ता शिकायत edaakhil.nic.in के माध्यम से बिना किसी वकील के सीधे डिजिटल रूप से दर्ज की जा सकती है।" :
                lang === "Hinglish" ? "Formal consumer complaints bina advocate ke online edaakhil.nic.in se directly file ki ja sakti hain." :
                "Formal consumer complaints can be filed digitally via edaakhil.nic.in without requiring an advocate."
      }
    ];

    const actionRoadmap = [
      {
        id: 1,
        title: lang === "Hindi" ? "बिल और उत्पाद दोष के साक्ष्य सहेजें" : lang === "Hinglish" ? "Invoice aur defect evidence collect karein" : "Collect invoice and defect evidence",
        description: lang === "Hindi" ? "खरीद बिल (Invoice), वारंटी कार्ड, अनबॉक्सिंग वीडियो/फोटो और कस्टमर सपोर्ट चैट का रिकॉर्ड सहेजें।" :
                      lang === "Hinglish" ? "Invoice, warranty card, unboxing video/photos aur support chat history save karein." :
                      "Save invoice, warranty card, photos/unboxing videos of the defective item, and customer support ticket history.",
        completed: false
      },
      {
        id: 2,
        title: lang === "Hindi" ? "कंपनी के शिकायत निवारण अधिकारी को लिखें" : lang === "Hinglish" ? "Grievance Officer ko escalate karein" : "Escalate to grievance officer",
        description: lang === "Hindi" ? "ऑर्डर नंबर और उपभोक्ता अधिकारों का हवाला देते हुए कंपनी के ग्रीवेंस ऑफिसर को लिखित ईमेल भेजें।" :
                      lang === "Hinglish" ? "Order number aur consumer rights mention karke company ke Grievance Officer ko written complaint email karein." :
                      "Send a written complaint to the company's designated Grievance Officer referencing the order number and consumer protection norms.",
        completed: false
      },
      {
        id: 3,
        title: lang === "Hindi" ? "राष्ट्रीय उपभोक्ता हेल्पलाइन पर शिकायत दर्ज करें" : lang === "Hinglish" ? "National Consumer Helpline par log karein" : "Register on National Consumer Helpline",
        description: lang === "Hindi" ? "consumerhelpline.gov.in पर शिकायत दर्ज करें या 1915 पर कॉल करके आधिकारिक मध्यस्थता शुरू करवाएं।" :
                      lang === "Hinglish" ? "consumerhelpline.gov.in par register karein ya 1915 par call karke official conciliation start karein." :
                      "Lodge a complaint on consumerhelpline.gov.in (or call 1915) to initiate official government pre-litigation mediation.",
        completed: false
      },
      {
        id: 4,
        title: lang === "Hindi" ? "औपचारिक कानूनी मांग नोटिस भेजें" : lang === "Hinglish" ? "Formal 15-day Demand Notice bhejein" : "Send formal legal demand notice",
        description: lang === "Hindi" ? "15 दिनों की अंतिम समयसीमा देते हुए रिप्लेसमेंट या पूर्ण रिफंड की मांग का औपचारिक नोटिस प्रेषित करें।" :
                      lang === "Hinglish" ? "15 days ki deadline dekar replacement ya full refund ki demand ka formal notice bhejein." :
                      "Serve a final 15-day demand notice demanding replacement, repair, or full refund plus incidental damages.",
        completed: false
      },
      {
        id: 5,
        title: lang === "Hindi" ? "जिला उपभोक्ता आयोग में ई-दाखिल करें" : lang === "Hinglish" ? "District Consumer Commission mein file karein" : "File before District Consumer Commission",
        description: lang === "Hindi" ? "यदि समाधान न हो, तो e-Daakhil पोर्टल (edaakhil.nic.in) के माध्यम से अपने जिला उपभोक्ता आयोग में वाद दायर करें।" :
                      lang === "Hinglish" ? "Agar grievance resolve na ho, toh e-Daakhil (edaakhil.nic.in) se District Commission mein consumer petition file karein." :
                      "If unaddressed, file a consumer petition online via e-Daakhil (edaakhil.nic.in) before your local District Commission.",
        completed: false
      }
    ];

    return {
      category: "Consumer Complaint",
      summary: { title, overview, keyPoints },
      jurisdiction: {
        level: "Central/National law with District Consumer Commissions (DCDRC)",
        location: locationLabel,
        statutoryScope: "Central/National law",
        note: "Consumer Protection Act, 2019 applies uniformly across India. Claims up to ₹50 Lakh are filed before the District Consumer Commission."
      },
      relevantInformation,
      actionRoadmap,
      sources: VERIFIED_SOURCES.CONSUMER,
      authority: authorityData,
      disclaimer: lang === "Hindi" ? "यह जानकारी केवल सामान्य जागरूकता के लिए है और पेशेवर कानूनी सलाह का विकल्प नहीं है।" :
                  lang === "Hinglish" ? "Yeh information general awareness ke liye hai aur professional legal advice ka substitute nahi hai." :
                  "This information is for general awareness and does not replace professional legal advice.",
      confidence: "High (Curated Consumer Protection Protocol)",
      isFallback: true
    };
  }

  // =========================================================================
  // 3. RTI CATEGORY
  // =========================================================================
  if (categoryKey === "RTI") {
    const isSpending = subIntent === "RTI_SPENDING_WORKS";
    const title = lang === "Hindi" ? (isSpending ? "सार्वजनिक निर्माण और व्यय के लिए सूचना का अधिकार आवेदन" : "सूचना का अधिकार (RTI) आवेदन एवं पारदर्शिता प्रक्रिया") :
                  lang === "Hinglish" ? (isSpending ? "Right to Information Application for Public Works & Spending" : "Right to Information (RTI) Transparency Protocol") :
                  (isSpending ? "Right to Information Application for Public Works & Spending" : "Right to Information (RTI) Application Guidance");

    const overview = lang === "Hindi" ?
      (isSpending ? 
        `आप अपने इलाके में सड़क निर्माण, मरम्मत अथवा सार्वजनिक कार्यों के स्वीकृत बजट, निविदा (टेंडर) और आधिकारिक व्यय की सत्यापित जानकारी प्राप्त करना चाहते हैं।` :
        `आप लोक प्राधिकारी (Public Authority) से सरकारी रिकॉर्ड, कार्य प्रगति अथवा नियमों की प्रमाणित सूचना प्राप्त करना चाहते हैं।`) :
      lang === "Hinglish" ?
      (isSpending ? 
        `Aap apne area mein road repairs aur public works ke sanctioned budget, expenditure aur contractor audit records ki verified information seek kar rahe hain.` :
        `Aap concerned Public Authority se official records, sanctioned proposals aur status report ki certified information seek kar rahe hain.`) :
      (isSpending ? 
        `You are seeking verified government expenditure, inspection records, and contractor audit logs regarding public work delays or road repairs in your locality.` :
        `You are seeking certified copies of government records, application status, or official decision transcripts from a public authority.`);

    const keyPoints = lang === "Hindi" ? [
      "सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के तहत किसी भी भारतीय नागरिक को सरकारी कार्यों के निरीक्षण, प्रमाणित प्रतियों और व्यय विवरण मांगने का अधिकार है।",
      "सार्वजनिक प्राधिकरणों के लिए आवेदन प्राप्त होने के 30 दिनों के भीतर उत्तर देना कानूनी रूप से अनिवार्य है।",
      "महत्वपूर्ण अंतर: केंद्रीय आरटीआई ऑनलाइन पोर्टल केवल केंद्रीय प्राधिकरणों को कवर करता है। राज्य कार्यों के लिए संबंधित राज्य पोर्टल या डाक अनिवार्य है।"
    ] : lang === "Hinglish" ? [
      "RTI Act, 2005 ke Section 6(1) ke under har Indian citizen ko public records, sanctioned tenders aur work inspection report maangne ka right hai.",
      "Public authorities 30 days ke andar information provide karne ke liye legally bound hain.",
      "Central RTI Online portal sirf Central authorities ko handle karta hai. State PWD/Municipal projects ke liye State portal ya physical post use karein."
    ] : [
      "Under Section 6(1) of the RTI Act, 2005, any Indian citizen can request inspection of work, certified copies of documents, and expenditure records from public authorities.",
      "Public authorities are legally mandated to furnish replies within 30 days of application receipt.",
      "Crucial distinction: Central RTI Online portal ONLY covers Central authorities (e.g. NHAI/Railways). State works (PWD/Municipal) require State portals or physical post."
    ];

    const relevantInformation = [
      {
        label: lang === "Hindi" ? "30 दिनों की वैधानिक सीमा" : lang === "Hinglish" ? "30-Day Mandatory Limit" : "30-Day Mandatory Limit",
        detail: lang === "Hindi" ? "जन सूचना अधिकारी (PIO) को वैध आवेदन प्राप्त होने के 30 कैलेंडर दिनों के भीतर उत्तर देना अनिवार्य है।" :
                lang === "Hinglish" ? "Public Information Officer (PIO) ko valid application receive hone ke 30 calendar days ke andar reply dena compulsory hai." :
                "The designated Public Information Officer (PIO) must respond within 30 calendar days of receiving a valid application."
      },
      {
        label: lang === "Hindi" ? "नाममात्र आवेदन शुल्क" : lang === "Hinglish" ? "Nominal Application Fee" : "Nominal Application Fee",
        detail: lang === "Hindi" ? "मानक आवेदन शुल्क केवल ₹10 है (गरीबी रेखा से नीचे / BPL कार्डधारकों के लिए पूर्णतः निःशुल्क)।" :
                lang === "Hinglish" ? "Standard application fee ₹10 hoti hai (BPL cardholders ke liye completely free/exempt hai)." :
                "Standard central/state application fee is usually ₹10 (exempt for Below Poverty Line / BPL cardholders)."
      },
      {
        label: lang === "Hindi" ? "प्रथम अपील (First Appeal) का अधिकार" : lang === "Hinglish" ? "First Appeal Mechanism" : "First Appeal Mechanism",
        detail: lang === "Hindi" ? "यदि 30 दिनों में जानकारी न मिले या गलत जानकारी दी जाए, तो प्रथम अपीलीय प्राधिकारी (FAA) के समक्ष 30 दिनों में अपील की जा सकती है।" :
                lang === "Hinglish" ? "Agar 30 days mein information na mile ya incomplete ho, toh First Appellate Authority (FAA) ke samne First Appeal file ki ja sakti hai." :
                "If information is denied, delayed, or misleading, an appeal can be filed before the First Appellate Authority (FAA) within 30 days."
      }
    ];

    const actionRoadmap = [
      {
        id: 1,
        title: lang === "Hindi" ? "सटीक सार्वजनिक प्राधिकरण की पहचान करें" : lang === "Hinglish" ? "Exact public authority identify karein" : "Identify the exact public authority",
        description: lang === "Hindi" ? "निर्धारित करें कि संबंधित कार्य नगर निगम, राज्य पीडब्ल्यूडी या केंद्रीय विभाग (जैसे NHAI/रेलवे) के अधीन है।" :
                      lang === "Hinglish" ? "Confirm karein ki work/department Municipal Corporation, State PWD ya Central NHAI ke jurisdiction mein aata hai." :
                      "Determine whether the road/department belongs to Municipal Corporation, State PWD, or Central National Highways Authority (NHAI).",
        completed: false
      },
      {
        id: 2,
        title: lang === "Hindi" ? "बिंदुवार विशिष्ट प्रश्न तैयार करें" : lang === "Hinglish" ? "Point-wise specific questions draft karein" : "Draft point-wise specific questions",
        description: lang === "Hindi" ? "टेंडर, स्वीकृत बजट, मापन पुस्तिका (MB) और कार्य पूर्णता प्रमाणपत्र की प्रमाणित प्रतियों की मांग वाले स्पष्ट प्रश्न लिखें।" :
                      lang === "Hinglish" ? "Sanctioned budget, tender copy, measurement book (MB) aur completion report maangte hue specific questions likhein." :
                      "Formulate concise, specific questions requesting certified copies of tenders, sanctions, and completion certificates.",
        completed: false
      },
      {
        id: 3,
        title: lang === "Hindi" ? "₹10 शुल्क के साथ आरटीआई आवेदन जमा करें" : lang === "Hinglish" ? "RTI application ₹10 fee ke sath submit karein" : "Submit RTI application with fee",
        description: lang === "Hindi" ? "धारा 6(1) का आवेदन ₹10 के शुल्क (IPO / ऑनलाइन रसीद) के साथ संबंधित राज्य/केंद्रीय पीआईओ को ऑनलाइन या स्पीड पोस्ट से भेजें।" :
                      lang === "Hinglish" ? "Section 6(1) application ₹10 fee (IPO / Online) ke sath respective PIO ko submit karein via portal ya Speed Post." :
                      "Submit Form 6(1) with ₹10 fee via the appropriate State/Central portal or physical Speed Post addressed to the PIO.",
        completed: false
      },
      {
        id: 4,
        title: lang === "Hindi" ? "30-दिवसीय वैधानिक समयसीमा को ट्रैक करें" : lang === "Hinglish" ? "30-day statutory timeline track karein" : "Track 30-day statutory timeline",
        description: lang === "Hindi" ? "डाक ट्रैकिंग या ऑनलाइन पंजीकरण संख्या सुरक्षित रखें और 30 दिनों की आधिकारिक उलटी गिनती पर नज़र रखें।" :
                      lang === "Hinglish" ? "Postal tracking number ya online registration ID save karein aur 30-day countdown track karein." :
                      "Keep the postal tracking or online registration number. Log the 30-day countdown for the official reply.",
        completed: false
      },
      {
        id: 5,
        title: lang === "Hindi" ? "असंतोष होने पर प्रथम अपील (First Appeal) दायर करें" : lang === "Hinglish" ? "First Appeal file karein if required" : "File First Appeal if unsatisfied",
        description: lang === "Hindi" ? "यदि 30 दिनों में उत्तर न मिले या जानकारी अधूरी हो, तो धारा 19(1) के तहत प्रथम अपीलीय प्राधिकारी के समक्ष अपील करें।" :
                      lang === "Hinglish" ? "Agar 30 days mein reply na mile, toh Section 19(1) ke under First Appellate Authority ke paas First Appeal karein." :
                      "If no reply is received within 30 days or info is incomplete, file a First Appeal under Section 19(1) with the First Appellate Authority.",
        completed: false
      }
    ];

    return {
      category: "RTI Request",
      summary: { title, overview, keyPoints },
      jurisdiction: {
        level: "Central/National law with Separate State & Central Public Information Officers",
        location: locationLabel,
        statutoryScope: "Central/National law (Executed via State / Central Bodies)",
        note: "RTI Act 2005 applies nationally, but the filing destination depends strictly on whether the authority is Central (rtionline.gov.in) or State/Municipal (State PIO / State RTI Portal)."
      },
      relevantInformation,
      actionRoadmap,
      sources: VERIFIED_SOURCES.RTI,
      authority: authorityData,
      disclaimer: lang === "Hindi" ? "यह जानकारी केवल सामान्य जागरूकता के लिए है और पेशेवर कानूनी सलाह का विकल्प नहीं है।" :
                  lang === "Hinglish" ? "Yeh information general awareness ke liye hai aur professional legal advice ka substitute nahi hai." :
                  "This information is for general awareness and does not replace professional legal advice.",
      confidence: "High (Curated Statutory RTI Protocol)",
      isFallback: true
    };
  }

  // =========================================================================
  // 4. GENERIC CIVIC CATEGORY (e.g. Municipal Garbage, Drainage, Noise)
  // =========================================================================
  if (subIntent === "GENERIC_MUNICIPAL_GARBAGE") {
    const title = lang === "Hindi" ? "नगर पालिका द्वारा कचरा न उठाने व स्वच्छता में कमी की शिकायत" :
                  lang === "Hinglish" ? "Municipal Sanitation & Waste Collection Deficiency Grievance" :
                  "Municipal Sanitation & Waste Collection Deficiency Grievance";

    const overview = lang === "Hindi" ?
      `आपके क्षेत्र में नगर निगम/नगर पालिका द्वारा कचरा संग्रहण एवं सफाई व्यवस्था में गंभीर लापरवाही बरती जा रही है, जिससे स्वास्थ्य जोखिम और नागरिक असुविधा हो रही है।` :
      lang === "Hinglish" ?
      `Aapke area mein municipality/nagar nigam garbage collection aur sanitation maintain karne mein fail ho rahi hai, causing public health hazard aur civic inconvenience.` :
      `The local municipal corporation or civic body is failing to provide regular garbage collection and sanitation in your area, creating severe civic inconvenience and public health risks.`;

    const keyPoints = lang === "Hindi" ? [
      "ठोस अपशिष्ट प्रबंधन नियम, 2016 (Solid Waste Management Rules) के तहत दैनिक कचरा संग्रहण नगर पालिका का वैधानिक दायित्व है।",
      "स्वच्छ भारत पोर्टल, राज्य नागरिक सेवा पोर्टल तथा वार्ड स्वास्थ्य अधिकारी को औपचारिक शिकायत प्रस्तुत की जा सकती है।",
      "सफाई में लगातार लापरवाही पर मुख्य नगर पालिका अधिकारी (CMO) अथवा जिला मजिस्ट्रेट को अभ्यावेदन दिया जा सकता है।"
    ] : lang === "Hinglish" ? [
      "Solid Waste Management Rules, 2016 ke under daily door-to-door waste collection municipality ka statutory duty hai.",
      "Swachhata App, State Municipal Grievance portal aur local Ward Sanitary Inspector ko formal complaint lodge ki ja sakti hai.",
      "Continuous failure par Chief Municipal Officer (CMO) ya District Collector ke pass representation file kiya ja sakta hai."
    ] : [
      "Under Solid Waste Management Rules 2016, regular collection and disposal of municipal waste is a mandatory statutory civic duty.",
      "Complaints can be escalated through the official Swachhata App, municipal grievance desk, or Ward Sanitary Inspector.",
      "Persistent non-action can be formally represented before the Municipal Commissioner, District Magistrate, or State Pollution Control Board."
    ];

    const relevantInformation = [
      {
        label: lang === "Hindi" ? "ठोस अपशिष्ट नियम 2016" : lang === "Hinglish" ? "Solid Waste Management Rules 2016" : "Solid Waste Management Rules 2016",
        detail: lang === "Hindi" ? "स्थानीय निकायों को वार्ड स्तर पर नियमित सफाई और कचरा निस्तारण सुनिश्चित करना कानूनी रूप से अनिवार्य है।" :
                lang === "Hinglish" ? "Municipal bodies legally bound hain daily waste collection aur proper disposal maintain karne ke liye." :
                "Urban Local Bodies (ULBs) are legally mandated to maintain daily door-to-door waste collection and sanitary disposal."
      },
      {
        label: lang === "Hindi" ? "स्वच्छता व नागरिक पोर्टल" : lang === "Hinglish" ? "Swachhata & Municipal Portals" : "Swachhata & Municipal Portals",
        detail: lang === "Hindi" ? "स्मार्टफोन पर 'Swachhata-MoHUA' ऐप अथवा राज्य के नगर निगम पोर्टल पर फोटो अपलोड करके टोकन प्राप्त करें।" :
                lang === "Hinglish" ? "Swachhata App ya local municipal portal par geotagged photo ke sath formal grievance log karein." :
                "Log geotagged photo grievances directly on the central Swachhata-MoHUA app or state municipal portals."
      },
      {
        label: lang === "Hindi" ? "स्वास्थ्य व पर्यावरण अधिकार" : lang === "Hinglish" ? "Public Health & Environment Rights" : "Public Health & Environment Rights",
        detail: lang === "Hindi" ? "संविधान के अनुच्छेद 21 के तहत स्वच्छ और प्रदूषणमुक्त वातावरण में रहना प्रत्येक नागरिक का मौलिक अधिकार है।" :
                lang === "Hinglish" ? "Article 21 ke under clean aur hygienic environment har citizen ka fundamental right hai." :
                "Citizens have a recognized fundamental right to a clean and hygienic environment under Article 21 of the Constitution."
      }
    ];

    const actionRoadmap = [
      {
        id: 1,
        title: lang === "Hindi" ? "कचरे और स्थिति के फोटो/वीडियो साक्ष्य लें" : lang === "Hinglish" ? "Uncollected garbage ke photos/dates record karein" : "Document uncollected garbage with photos and dates",
        description: lang === "Hindi" ? "क्षेत्र में जमा कचरे, गंदगी और तारीख के साथ स्पष्ट फोटोग्राफ एकत्र करें।" :
                      lang === "Hinglish" ? "Locality mein uncollected waste ke dated photos aur location details record karein." :
                      "Capture dated and geotagged photographs of overflowing waste bins or unattended garbage piles in the locality.",
        completed: false
      },
      {
        id: 2,
        title: lang === "Hindi" ? "स्वच्छता ऐप या निगम पोर्टल पर शिकायत दर्ज करें" : lang === "Hinglish" ? "Swachhata App / Portal par ticket create karein" : "Log ticket on Swachhata App / Municipal portal",
        description: lang === "Hindi" ? "आधिकारिक ऐप या नगरपालिका की वेबसाइट पर फोटो अपलोड करके शिकायत संख्या (Token ID) प्राप्त करें।" :
                      lang === "Hinglish" ? "Municipal grievance portal ya Swachhata app par complaint register karke token number generate karein." :
                      "Register an official complaint on the municipal grievance portal or Swachhata App to generate an escalation token.",
        completed: false
      },
      {
        id: 3,
        title: lang === "Hindi" ? "वार्ड सेनेटरी इंस्पेक्टर / स्वास्थ्य अधिकारी को लिखित पत्र दें" : lang === "Hinglish" ? "Ward Sanitary Inspector ko written representation dein" : "Serve representation to Ward Sanitary Officer",
        description: lang === "Hindi" ? "वार्ड पार्षद एवं सेनेटरी इंस्पेक्टर को औपचारिक पत्र सौंपकर पावती (Receiving) लें।" :
                      lang === "Hinglish" ? "Ward Sanitary Inspector aur Councilor ko written representation dekar receiving stamp lein." :
                      "Submit a formal written letter to the Ward Sanitary Inspector or Chief Health Officer demanding daily clearance.",
        completed: false
      },
      {
        id: 4,
        title: lang === "Hindi" ? "मुख्य नगर पालिका अधिकारी (CMO) को प्रेषित करें" : lang === "Hinglish" ? "Municipal Commissioner / CMO ko escalate karein" : "Escalate to Municipal Commissioner",
        description: lang === "Hindi" ? "यदि 48 घंटों में समाधान न हो, तो नगर आयुक्त अथवा जिला मजिस्ट्रेट के जनसुनवाई पोर्टल पर शिकायत भेजें।" :
                      lang === "Hinglish" ? "Agar 48 hours mein action na ho, toh Municipal Commissioner ya DM Jansunwai portal par escalate karein." :
                      "If unresolved within 48-72 hours, escalate with previous token IDs to the Municipal Commissioner or District Magistrate.",
        completed: false
      },
      {
        id: 5,
        title: lang === "Hindi" ? "जिला विधिक सेवा प्राधिकरण (DLSA) में आवेदन करें" : lang === "Hinglish" ? "DLSA / Lok Adalat mein representation lein" : "Approach District Legal Services Authority",
        description: lang === "Hindi" ? "सार्वजनिक स्वास्थ्य उपद्रव (Public Nuisance) के निवारण हेतु जिला विधिक सेवा प्राधिकरण से निःशुल्क सहायता लें।" :
                      lang === "Hinglish" ? "Public health hazard ke resolution ke liye District Legal Services Authority (DLSA) se contact karein." :
                      "Approach the local DLSA for civic conciliation regarding public nuisance and municipal deficiency.",
        completed: false
      }
    ];

    return {
      category: "Municipal Services & Civic Grievance",
      summary: { title, overview, keyPoints },
      jurisdiction: {
        level: "Urban Local Body (Municipal Corporation / Municipality)",
        location: locationLabel,
        statutoryScope: "State & Municipal Solid Waste Rules",
        note: "Municipal sanitation bylaws, collection schedules, and ward escalation officers are governed by local municipal administration."
      },
      relevantInformation,
      actionRoadmap,
      sources: VERIFIED_SOURCES.GENERIC,
      authority: authorityData,
      disclaimer: lang === "Hindi" ? "यह जानकारी केवल सामान्य जागरूकता के लिए है और पेशेवर कानूनी सलाह का विकल्प नहीं है।" :
                  lang === "Hinglish" ? "Yeh information general awareness ke liye hai aur professional legal advice ka substitute nahi hai." :
                  "This information is for general awareness and does not replace professional legal advice.",
      confidence: "High (Curated Municipal Grievance Protocol)",
      isFallback: true
    };
  }

  // Generic fallback
  return {
    category: lang === "Hindi" ? "सामान्य नागरिक विवाद" : lang === "Hinglish" ? "General Civic Dispute" : "General Civic / Legal Dispute",
    summary: {
      title: lang === "Hindi" ? "नागरिक शिकायत और पूर्व-मुकदमेबाजी विश्लेषण" : lang === "Hinglish" ? "Civic Grievance & Pre-Litigation Analysis" : "Civic Grievance & Pre-Litigation Analysis",
      overview: lang === "Hindi" ? "आपकी नागरिक समस्या का विश्लेषण किया गया है। आधिकारिक निवारण हेतु दस्तावेजी साक्ष्य और औपचारिक नोटिस आवश्यक हैं।" : lang === "Hinglish" ? "Aapke civic issue ka analysis kiya gaya hai. Documented evidence aur formal notice necessary hain." : "Your civic grievance has been analyzed. Standard pre-litigation protocol recommends documenting facts, issuing formal written communication, and approaching designated administrative forums.",
      keyPoints: [
        lang === "Hindi" ? "लिखित साक्ष्य और पूर्व पत्राचार किसी भी नागरिक विवाद में मुख्य आधार होते हैं।" : lang === "Hinglish" ? "Written proof aur formal communication grievance resolution ke core foundation hain." : "Documented communications and transaction records form the core foundation of grievance resolution.",
        lang === "Hindi" ? "मुकदमेबाजी से पहले औपचारिक मांग नोटिस समाधान की संभावनाओं को बढ़ाता है।" : lang === "Hinglish" ? "Litigation se pehle formal written notice amicable settlement ke chances increase karta hai." : "Serving a formal demand notice before litigation often leads to faster amicable settlements.",
        lang === "Hindi" ? "मुफ्त कानूनी सहायता के लिए जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क किया जा सकता है।" : lang === "Hinglish" ? "Free legal guidance ke liye District Legal Services Authority (DLSA) available hai." : "District Legal Services Authorities (DLSA) provide free mediation and legal aid across all districts in India."
      ]
    },
    jurisdiction: {
      level: lang === "Hindi" ? "स्थानीय नागरिक एवं प्रशासनिक क्षेत्राधिकार" : lang === "Hinglish" ? "Local Civic & Administrative Jurisdiction" : "Local Civic & Administrative Jurisdiction",
      location: locationLabel,
      statutoryScope: "General information",
      note: lang === "Hindi" ? "नागरिक नियम और शिकायत निवारण चैनल स्थानीय नियमों पर निर्भर करते हैं।" : lang === "Hinglish" ? "Civic rules aur escalation channels local jurisdiction par depend karte hain." : "Civic rules and escalation channels depend on local administration. Verify with concerned district offices."
    },
    relevantInformation: [
      {
        label: lang === "Hindi" ? "लिखित नोटिस का महत्व" : lang === "Hinglish" ? "Written Notice Importance" : "Written Notice Importance",
        detail: lang === "Hindi" ? "स्पीड पोस्ट द्वारा भेजा गया नोटिस पते पर तामील का कानूनी साक्ष्य बनाता है।" : lang === "Hinglish" ? "Speed post notice proof of service create karta hai." : "A notice sent with postal acknowledgement establishes verifiable proof of service."
      },
      {
        label: lang === "Hindi" ? "लोक अदालत और मध्यस्थता" : lang === "Hinglish" ? "Lok Adalat & Mediation" : "Lok Adalat & Mediation",
        detail: lang === "Hindi" ? "लोक अदालत में बिना कोर्ट फीस के त्वरित और अंतिम समझौते कराए जाते हैं।" : lang === "Hinglish" ? "Lok Adalats bina expensive court fees ke dispute resolve karti hain." : "Lok Adalats provide rapid, zero-court-fee dispute resolution with finality."
      },
      {
        label: lang === "Hindi" ? "नागरिक अधिकार" : lang === "Hinglish" ? "Citizen Rights" : "Citizen Rights",
        detail: lang === "Hindi" ? "सार्वजनिक सेवाओं में कमी के खिलाफ संबंधित प्रशासनिक उच्चाधिकारियों को अभ्यावेदन दिया जा सकता है।" : lang === "Hinglish" ? "Public service deficiency ke khilaf representation file kiya ja sakta hai." : "Citizens have the right to represent grievances before senior departmental officers."
      }
    ],
    actionRoadmap: [
      {
        id: 1,
        title: lang === "Hindi" ? "साक्ष्य और दस्तावेज एकत्र करें" : lang === "Hinglish" ? "Documents aur evidence collect karein" : "Gather facts and receipts",
        description: lang === "Hindi" ? "समस्या से संबंधित सभी रसीदें, फोटो, संदेश और पत्राचार कालक्रमानुसार व्यवस्थित करें।" : lang === "Hinglish" ? "Grievance se related saari receipts, photos aur records systematically organize karein." : "Systematically organize all bills, photos, messages, and records related to the grievance.",
        completed: false
      },
      {
        id: 2,
        title: lang === "Hindi" ? "अनौपचारिक स्मरण पत्र भेजें" : lang === "Hinglish" ? "Informal reminder communicate karein" : "Send an informal written reminder",
        description: lang === "Hindi" ? "विपक्षी पक्ष को समस्या का संक्षिप्त विवरण देते हुए उचित समयसीमा में समाधान का अनुरोध करें।" : lang === "Hinglish" ? "Opposite party ko WhatsApp ya email se reasonable period mein resolve karne ka reminder dein." : "Reach out via email or message requesting prompt resolution within a reasonable period, where appropriate.",
        completed: false
      },
      {
        id: 3,
        title: lang === "Hindi" ? "औपचारिक मांग पत्र (Demand Notice) प्रेषित करें" : lang === "Hinglish" ? "Formal demand notice serve karein" : "Serve a formal written representation",
        description: lang === "Hindi" ? "स्पीड पोस्ट (AD सहित) द्वारा लागू क्षेत्राधिकार और प्रक्रिया के अनुसार औपचारिक पत्र भेजें।" : lang === "Hinglish" ? "Speed Post se applicable notice requirements follow karte hue formal written demand letter bhejein." : "Send a formal written notice following the applicable notice requirements for the relevant jurisdiction and matter.",
        completed: false
      },
      {
        id: 4,
        title: lang === "Hindi" ? "डाक ट्रैकिंग और प्रतिक्रिया का रिकॉर्ड रखें" : lang === "Hinglish" ? "Postal delivery tracking log karein" : "Maintain postal delivery logs",
        description: lang === "Hindi" ? "डाक की डिलीवरी रिपोर्ट और प्राप्त किसी भी पत्राचार को भविष्य के संदर्भ हेतु सुरक्षित रखें।" : lang === "Hinglish" ? "Delivery receipt aur responses ka complete trail maintain karein." : "Preserve the postal tracking consignment report and any replies received.",
        completed: false
      },
      {
        id: 5,
        title: lang === "Hindi" ? "विधिक सेवा प्राधिकरण या मध्यस्थता का सहारा लें" : lang === "Hinglish" ? "DLSA ya legal aid cell approach karein" : "Approach District Legal Services Authority",
        description: lang === "Hindi" ? "यदि समाधान न हो, तो जिला विधिक सेवा प्राधिकरण (DLSA) में मध्यस्थता हेतु निःशुल्क आवेदन करें।" : lang === "Hinglish" ? "Agar unresolved rahe, toh DLSA mein free pre-litigation mediation ke liye apply karein." : "If unaddressed, visit your local DLSA office for free pre-litigation mediation.",
        completed: false
      }
    ],
    sources: VERIFIED_SOURCES.GENERIC,
    authority: authorityData,
    disclaimer: lang === "Hindi" ? "यह जानकारी केवल सामान्य जागरूकता के लिए है और पेशेवर कानूनी सलाह का विकल्प नहीं है।" : lang === "Hinglish" ? "Yeh information general awareness ke liye hai aur professional legal advice ka substitute nahi hai." : "This information is for general awareness and does not replace professional legal advice.",
    confidence: "Medium (General Civic Protocol)",
    isFallback: true
  };
};

/**
 * Dynamic Pre-Litigation Document Generator with English, Hindi, and Hinglish Support
 */
export const getFallbackDocument = ({ problem = "", category = "", state = "", city = "", language = "English" }) => {
  const categoryKey = category.toUpperCase().includes("RTI") ? "RTI" :
                      category.toUpperCase().includes("CONSUMER") ? "CONSUMER" :
                      category.toUpperCase().includes("TENAN") ? "TENANCY" : detectCategory(problem);
  
  const subIntent = detectSubIntent(categoryKey, problem);
  const statedAmount = extractStatedAmount(problem) || "[Amount / ₹ Amount]";
  const { platform, item } = extractProductOrPlatform(problem);
  const productOrService = item ? `${item}${platform ? ` (${platform})` : ''}` : (platform ? `Product ordered on ${platform}` : "[Product / Service Name]");
  
  const lang = (language === "Hindi" || language === "Hinglish") ? language : "English";
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const locationLabel = [city, state].filter(Boolean).join(", ") || (
    lang === "Hindi" ? "स्थान: [शहर, राज्य]" :
    lang === "Hinglish" ? "Location: [City, State]" : "Location: [City, State]"
  );

  // =========================================================================
  // 1. TENANCY DOCUMENTS
  // =========================================================================
  if (categoryKey === "TENANCY") {
    if (subIntent === "TENANCY_TERMINATION") {
      if (lang === "Hindi") {
        return {
          title: "किराया समझौते की अनुचित/अवैध समाप्ति पर आपत्ति का औपचारिक नोटिस",
          content: `किराया समझौते की अनुचित/मनमाने ढंग से समाप्ति के विरुद्ध औपचारिक आपत्ति पत्र

प्रेषक (FROM):
[Your Name]
[Address]
संपर्क: [Contact]

दिनांक: ${today}

प्रति (TO):
[Landlord / मकान मालिक का नाम]
[Landlord का पता]
स्थान: ${locationLabel}

विषय: परिसर [किराए के मकान का पूरा पता] के संबंध में किराया समझौते की अनुचित/अवैध समाप्ति के विरुद्ध आपत्ति नोटिस।

महोदय / महोदया,

1. मैं आपके परिसर [किराए के मकान का पूरा पता] में हमारे निष्पादित किराया समझौते (दिनांकित: [Agreement Date]) के अनुसार वैध किरायेदार के रूप में निवासरत हूं।

2. आपके द्वारा दिनांक [सूचना की तारीख] को मुझे किराया समझौता समाप्त करने एवं परिसर खाली करने का मौखिक/लिखित निर्देश दिया गया है, जो हमारे वैध अनुबंध की शर्तों एवं विधिक नियमों के पूर्णतः प्रतिकूल है।

3. हमारे समझौते के अनुसार निर्धारित लॉक-इन अवधि/नोटिस अवधि का पालन किए बिना अथवा बिना किसी विधिक उल्लंघन के मुझे बेदखल करने की कार्यवाही गैर-कानूनी है।

4. इस नोटिस के माध्यम से आपको औपचारिक रूप से सूचित किया जाता है कि:
   क) मनमाने ढंग से समझौते की समाप्ति को तत्काल वापस लिया जाए;
   ख) बिजली, पानी अथवा परिसर में प्रवेश जैसी किसी भी आवश्यक सेवा में कोई व्यवधान न डाला जाए।

5. यदि बिना विधिक प्रक्रिया के मुझे बेदखल करने अथवा परेशान करने का प्रयास किया गया, तो मैं सक्षम किराया प्राधिकरण / दीवानी न्यायालय / जिला विधिक सेवा प्राधिकरण (DLSA) में अपने अधिकारों के संरक्षण एवं हर्जाने हेतु कार्यवाही करने के लिए बाध्य होऊंगा।

भवदीय,

___________________________
[Your Name]
[Contact]`
        };
      }

      if (lang === "Hinglish") {
        return {
          title: "Formal Objection Notice against Arbitrary Tenancy Termination",
          content: `FORMAL OBJECTION NOTICE AGAINST ARBITRARY / PREMATURE TENANCY TERMINATION

FROM:
[Your Name]
[Address]
Contact: [Contact]

DATE: ${today}

TO:
[Landlord / Property Owner Name]
[Landlord Address]
Location: ${locationLabel}

SUBJECT: Formal Written Objection against Arbitrary/Unlawful Termination of Tenancy at [Rented Premises Address]

Sir/Madam,

1. Main aapke premises situated at "[Rented Premises Address]" mein lawful tenant residing hoon as per our executed Rent Agreement dated [Agreement Date].

2. Aapne recently on [Date of Landlord Notice] verbally/in writing rent agreement terminate karke premises vacate karne ka demand kiya hai, which is in direct violation of our agreed tenancy terms.

3. Agreement mein specified notice period (e.g. 30 days) aur lock-in terms follow kiye bina arbitrary eviction attempt karna legally unsustainable hai.

4. You are hereby called upon to:
   a) Withdraw this arbitrary / unlawful termination notice immediately;
   b) Refrain from disconnecting essential services (electricity, water, security) or creating any disturbance.

5. Please note that agar due legal process ke bina forceful eviction attempt kiya gaya, toh main Competent Rent Authority / Civil Court / DLSA mein injunction aur damages ke liye proceedings initiate karunga.

Yours sincerely,

___________________________
[Your Name]
[Contact]`
        };
      }

      return {
        title: "Formal Objection Notice against Unlawful Tenancy Termination",
        content: `FORMAL OBJECTION NOTICE AGAINST ARBITRARY / PREMATURE TENANCY TERMINATION

FROM:
[Your Name]
[Address]
Contact: [Contact]

DATE: ${today}

TO:
[Landlord / Property Owner Name]
[Landlord Address]
Location: ${locationLabel}

SUBJECT: Formal Written Objection against Arbitrary / Unlawful Termination of Tenancy at [Rented Premises Address]

Sir/Madam,

1. I am the lawful tenant residing at the premises situated at "[Rented Premises Address]" in accordance with our executed Tenancy Agreement dated [Agreement Date].

2. You have recently served an arbitrary termination notice / demand to vacate dated [Notice Date] without valid contractual cause or adherence to the mandatory notice period.

3. Under established tenancy laws and Transfer of Property principles, a landlord cannot dispossess a compliant tenant without honoring the contractual notice period and due process of law.

4. You are hereby called upon to:
   a) Withdraw the arbitrary notice of termination forthwith;
   b) Refrain from interfering with peaceful enjoyment or essential amenities (electricity, water supply, access).

5. Take notice that any attempt at forceful dispossession or harassment will constrain me to approach the Competent Rent Authority / Civil Court for injunctive relief and statutory damages.

Yours sincerely,

___________________________
[Your Name]
[Contact]`
      };
    }

    // Default Deposit Demand Notice
    if (lang === "Hindi") {
      return {
        title: "सुरक्षा जमा राशि वापसी हेतु औपचारिक मांग पत्र (Demand Notice)",
        content: `सुरक्षा जमा राशि (SECURITY DEPOSIT) की तत्काल वापसी हेतु औपचारिक मांग पत्र

प्रेषक (FROM):
[Your Name]
[Address]
संपर्क: [Contact]

दिनांक: ${today}

प्रति (TO):
[Landlord / मकान मालिक का नाम]
[Landlord का पता]
स्थान: ${locationLabel}

विषय: किरायेदारी समाप्ति के पश्चात रोकी गई ${statedAmount} की सुरक्षा जमा राशि की तत्काल वापसी हेतु औपचारिक मांग पत्र।

महोदय / महोदया,

1. मैं आपके परिसर [किराए के मकान का पूरा पता] में हमारे वैध किराया समझौते के अनुसार शांतिपूर्ण किरायेदार के रूप में निवासरत था।

2. मैंने दिनांक [चाबी सौंपने की तारीख] को परिसर को पूरी तरह खाली कर सभी बकाया उपयोगिता बिलों का भुगतान करते हुए चाबियां आपको शांतिपूर्वक सौंप दी थीं।

3. किरायेदारी के आरंभ में, मैंने ${statedAmount} की ब्याज-मुक्त वापसी योग्य सुरक्षा जमा राशि का भुगतान किया था, जिसकी पावती आपके द्वारा दी गई थी।

4. परिसर खाली करने के पश्चात मेरे कई विनम्र अनुरोधों के बावजूद, आज दिनांक तक उक्त सुरक्षा जमा राशि वापस नहीं की गई है और न ही किसी वैध कटौती का विवरण दिया गया है।

5. अतः इस नोटिस के माध्यम से आपको सूचित किया जाता है कि इस नोटिस की प्राप्ति के 7 (सात) दिनों के भीतर ${statedAmount} की पूर्ण सुरक्षा जमा राशि मेरे बैंक खाते में अंतरित (Transfer) करें:

   बैंक विवरण:
   [बैंक का नाम, खाता संख्या: XXXXXXXXXX, IFSC: XXXXXXX, UPI: name@upi]

6. यदि निर्धारित 7 दिनों में राशि वापस नहीं की जाती है, तो मैं सक्षम किराया प्राधिकरण / जिला उपभोक्ता फोरम / लोक अदालत के समक्ष वसूली एवं वैधानिक ब्याज हेतु विधिक कार्यवाही प्रारंभ करने के लिए बाध्य होऊंगा।

भवदीय,

___________________________
[Your Name]
[Contact]`
      };
    }

    if (lang === "Hinglish") {
      return {
        title: "Security Deposit Refund Formal Demand Notice",
        content: `FORMAL WRITTEN DEMAND NOTICE FOR REFUND OF SECURITY DEPOSIT

FROM:
[Your Name]
[Address]
Contact: [Contact]

DATE: ${today}

TO:
[Landlord / Owner Name]
[Landlord Address]
Location: ${locationLabel}

SUBJECT: Formal Demand Notice for Immediate Refund of Security Deposit of ${statedAmount} regarding Tenancy at [Rented Premises Address]

Sir/Madam,

1. Main aapke premises situated at "[Rented Premises Address]" mein lawful tenant residing tha as per our tenancy agreement.

2. Maine peacefully premises vacate karke physical possession aur keys [Date of Handover] ko handover kar di thi, leaving the property in clean condition with all utility dues cleared.

3. Tenancy start hone par maine interest-free refundable security deposit of ${statedAmount} pay kiya tha, which was duly acknowledged by you.

4. Handover ke baad multiple polite requests ke bawajood, said security deposit abhi tak refund nahi kiya gaya hai, nor has any itemized statement of lawful deductions been provided.

5. In accordance with established legal principles, aapko request kiya jata hai ki full security deposit of ${statedAmount} mere bank account mein within 7 (seven) days refund karein:

   Bank Details for Transfer:
   [Bank Name, A/C No: XXXXXXXXXX, IFSC: XXXXXXX, UPI: name@upi]

6. Please note ki agar 7 days ke andar refund nahi milta, toh main competent Rent Authority / District Forum / Lok Adalat mein recovery aur legal costs ke liye proceedings initiate karne ke liye constrained hounga.

Yours sincerely,

___________________________
[Your Name]
[Contact]`
      };
    }

    return {
      title: "Formal Demand Notice for Refund of Security Deposit",
      content: `FORMAL WRITTEN DEMAND & NOTICE FOR REFUND OF SECURITY DEPOSIT

FROM:
[Your Name]
[Address]
Contact: [Contact]

DATE: ${today}

TO:
[Landlord / Property Owner Name]
[Landlord Address]
Location: ${locationLabel}

SUBJECT: Formal Demand Notice for Immediate Refund of Security Deposit of ${statedAmount} regarding Tenancy at [Rented Premises Address]

Sir/Madam,

1. I was the lawful tenant residing at the premises situated at "[Rented Premises Address]" in accordance with our tenancy agreement.

2. I have peacefully vacated the premises and handed over physical possession along with keys on [Date of Handover], leaving the property in good and clean condition with all utility dues cleared.

3. At the inception of the tenancy, I deposited an interest-free refundable security deposit of ${statedAmount}, which was duly acknowledged by you.

4. Despite multiple amicable requests following the handover, the said security deposit has not been refunded to date, nor has any itemized statement of lawful deductions been provided.

5. In accordance with established legal principles and standard tenancy norms, you are hereby requested to refund the full security deposit sum of ${statedAmount} to my bank account specified below within 7 (seven) days of receipt of this notice:

   Bank Details for Transfer:
   [Bank Name, A/C No: XXXXXXXXXX, IFSC: XXXXXXX, UPI: name@upi]

6. Please take notice that in the event of failure to refund the amount within the stipulated 7 days, I shall be constrained to initiate appropriate legal and civic grievance proceedings before the Competent Local Rent Authority / District Forum / Lok Adalat for recovery along with applicable statutory interest and incidental costs.

Kindly acknowledge receipt and expedite the refund.

Yours sincerely,

___________________________
[Your Name]
[Contact]`
    };
  }

  // =========================================================================
  // 2. CONSUMER DOCUMENTS
  // =========================================================================
  if (categoryKey === "CONSUMER") {
    if (lang === "Hindi") {
      return {
        title: "उपभोक्ता संरक्षण अधिनियम, 2019 के अंतर्गत औपचारिक मांग नोटिस",
        content: `उपभोक्ता संरक्षण अधिनियम, 2019 के तहत औपचारिक उपभोक्ता शिकायत एवं मांग नोटिस

प्रेषक (FROM):
[Your Name]
[Address]
संपर्क: [Contact]

दिनांक: ${today}

प्रति (TO):
[विक्रेता / कंपनी / ई-कॉमर्स प्लेटफॉर्म का नाम: ${platform || '[Seller / Platform Name]'}]
[ग्राहक सेवा / शिकायत निवारण अधिकारी का पता]
स्थान: ${locationLabel}

विषय: ${productOrService} में दोष / सेवा में कमी के संबंध में औपचारिक मांग पत्र — ऑर्डर संख्या: [Order / Invoice Number]

महोदय / महोदया,

1. मैंने आपके प्लेटफॉर्म से दिनांक [खरीद की तारीख] को ${statedAmount !== '[Amount / ₹ Amount]' ? statedAmount : '[Amount Paid]'} के कुल मूल्य पर ${productOrService} (ऑर्डर संख्या: [Order Number]) खरीदा था।

2. उक्त उत्पाद प्राप्त होने पर, मैंने पाया कि उत्पाद में गंभीर दोष हैं और वह वादे के अनुरूप कार्य नहीं कर रहा है:
   - [दोष का विवरण: दोषपूर्ण उत्पाद / काम न करना / क्षति]

3. मैंने दिनांक [शिकायत की तारीख] को आपके ग्राहक सेवा विभाग में शिकायत दर्ज कराई थी, लेकिन आपकी कंपनी नीतिगत समयसीमा के भीतर समाधान, रिप्लेसमेंट या रिफंड देने में विफल रही।

4. यह विफलता उपभोक्ता संरक्षण अधिनियम, 2019 के तहत "सेवा में कमी (Deficiency in Service)" और "अनुचित व्यापार व्यवहार (Unfair Trade Practice)" की श्रेणी में आती है।

5. अतः आपको इस नोटिस के माध्यम से 15 (पंद्रह) दिनों के भीतर निम्नलिखित में से एक समाधान करने का निर्देश दिया जाता है:
   क) बिना किसी अतिरिक्त शुल्क के तत्काल नया दोषरहित उत्पाद (Replacement) प्रदान करें; अथवा
   ख) पूर्ण खरीद राशि मेरे खाते में वापस (Refund) करें।

6. निर्धारित 15 दिनों में समाधान न होने की स्थिति में, मैं राष्ट्रीय उपभोक्ता हेल्पलाइन (NCH) एवं e-Daakhil के माध्यम से जिला उपभोक्ता विवाद निवारण आयोग के समक्ष हर्जाने सहित वाद दायर करूंगा।

भवदीय,

___________________________
[Your Name]
[Contact]`
      };
    }

    if (lang === "Hinglish") {
      return {
        title: "Consumer Grievance & Pre-Litigation Demand Notice",
        content: `FORMAL CONSUMER GRIEVANCE & DEMAND NOTICE UNDER CONSUMER PROTECTION ACT, 2019

FROM:
[Your Name]
[Address]
Contact: [Contact]

DATE: ${today}

TO:
[Seller / Company / Platform Name: ${platform || '[Seller / Platform Name]'}]
[Customer Service / Grievance Officer Address]
Location: ${locationLabel}

SUBJECT: Formal Notice regarding Defective Product / Deficiency in Service — Order Ref: [Order / Invoice Number]

Sir/Madam,

1. Maine aapke platform se ${productOrService} purchase kiya tha vide Order/Invoice No. [Order Number] dated [Purchase Date] for ${statedAmount !== '[Amount / ₹ Amount]' ? statedAmount : '₹[Amount Paid]'}.

2. Product receive hone ke baad, maine observe kiya ki product defective hai aur promised specifications meet nahi karta:
   - [Describe defect: Defective unit / malfunctioning / damaged item]

3. Maine customer support par [Date of Complaint] ko complaint raise ki thi, par aapki company replacement ya refund provide karne mein fail rahi hai.

4. Yeh failure Consumer Protection Act, 2019 ke under "Deficiency in Service" aur "Unfair Trade Practice" constitute karta hai.

5. You are hereby called upon to resolve this grievance within 15 (fifteen) days of this notice:
   a) Provide an immediate, defect-free replacement; OR
   b) Refund the full purchase amount to my account.

6. Failure ke case mein, main National Consumer Helpline (NCH) aur e-Daakhil ke through District Consumer Commission mein compensation claim ke sath file karunga.

Yours faithfully,

___________________________
[Your Name]
[Contact]`
      };
    }

    return {
      title: "Formal Consumer Grievance & Pre-Litigation Demand Notice",
      content: `FORMAL CONSUMER GRIEVANCE & DEMAND NOTICE UNDER CONSUMER PROTECTION ACT, 2019

FROM:
[Your Name]
[Address]
Contact: [Contact]

DATE: ${today}

TO:
[Seller / Company / Platform Name: ${platform || '[Seller / Platform Name]'}]
[Company Customer Service / Grievance Redressal Officer Address]
Location: ${locationLabel}

SUBJECT: Formal Notice regarding Defective Product / Deficiency in Service — Order Ref: [Order / Invoice Number]

Sir/Madam,

1. I am a bona fide consumer who purchased ${productOrService} vide Order/Invoice No. [Order Number] dated [Purchase Date] for a total consideration of ${statedAmount !== '[Amount / ₹ Amount]' ? statedAmount : '₹[Amount Paid]'}.

2. Upon receipt / usage of the said product, I observed significant defects and non-conformity to promised specifications:
   - [Describe defect: Defective unit / malfunctioning / missing parts]

3. I promptly raised this issue with your customer support on [Date of Complaint], but your company has failed to provide a satisfactory resolution, repair, replacement, or refund within the stipulated policy window.

4. The aforesaid failure constitutes "Deficiency in Service" and "Unfair Trade Practice" under the Consumer Protection Act, 2019.

5. You are hereby called upon to rectify this grievance by either:
   a) Providing an immediate, defect-free replacement; OR
   b) Refunding the full purchase sum to my source account;
   within 15 (fifteen) days of receipt of this notice.

6. In case of failure to resolve the grievance within the said timeframe, I shall proceed to lodge a formal complaint with the National Consumer Helpline (NCH) and file a consumer petition before the Competent District Consumer Disputes Redressal Commission (DCDRC) via e-Daakhil, claiming full refund along with compensation for mental agony and litigation expenses.

Yours faithfully,

___________________________
[Your Name]
[Contact]`
    };
  }

  // =========================================================================
  // 3. RTI DOCUMENTS
  // =========================================================================
  if (categoryKey === "RTI") {
    if (lang === "Hindi") {
      return {
        title: "सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के अंतर्गत आवेदन",
        content: `सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के अंतर्गत आवेदन पत्र

सेवा में:
लोक सूचना अधिकारी (PIO),
[सार्वजनिक प्राधिकरण / नगर निगम / लोक निर्माण विभाग (PWD) / संबंधित विभाग का नाम],
स्थान: ${locationLabel}

दिनांक: ${today}

1. आवेदक का विवरण:
   आवेदक का नाम: [Your Name]
   डाक का पता: [Address]
   संपर्क (फोन/ईमेल): [Contact]
   नागरिकता: भारत का नागरिक

2. मांगी गई सूचना का विवरण:
   विषय: [इलाके / वार्ड / परियोजना का नाम] में सार्वजनिक कार्यों, स्वीकृत बजट, व्यय अथवा विभागीय अभिलेखों की प्रमाणित जानकारी।

   कृपया निम्नलिखित विशिष्ट बिंदुओं पर प्रमाणित प्रतियां एवं सूचना उपलब्ध कराएं:
   क) [वार्ड / क्षेत्र] में किए गए कार्य के वर्क ऑर्डर, स्वीकृत बजट एवं टेंडर विनिर्देशों की प्रमाणित प्रति।
   ख) उक्त कार्य का अनुबंध पाने वाले ठेकेदार/एजेंसी का नाम और संपर्क विवरण।
   ग) बिल पास होने से पूर्व प्रस्तुत मापन पुस्तिका (Measurement Book - MB), गुणवत्ता निरीक्षण रिपोर्ट और सामग्री परीक्षण प्रमाणपत्र की प्रमाणित प्रति।
   घ) ठेकेदार द्वारा प्रस्तुत कुल बिल राशि और प्राधिकरण द्वारा आज दिनांक तक जारी किया गया कुल भुगतान।
   ङ) कार्य शुरू होने की निर्धारित तिथि, अपेक्षित पूर्णता तिथि और परियोजना की वर्तमान आधिकारिक स्थिति।
   च) कार्य की गुणवत्ता एवं निगरानी के लिए उत्तरदायी निरीक्षण इंजीनियर/अधिकारी का नाम एवं पदनाम।

3. वैधानिक समय-सीमा:
   आरटीआई अधिनियम, 2005 की धारा 7(1) के अनुसार, कृपया मांगी गई सूचना 30 (तीस) दिनों के भीतर उपलब्ध कराने की कृपा करें।

4. आवेदन शुल्क विवरण:
   आवेदन शुल्क ₹10 (दस रुपये मात्र) [आईपीओ / डिमांड ड्राफ्ट / ऑनलाइन रसीद संख्या: XXXXXX] दिनांक ${today} संलग्न है।
   [अथवा: आवेदक गरीबी रेखा से नीचे (BPL) श्रेणी से संबंधित है; शुल्क छूट हेतु बीपीएल कार्ड की प्रति संलग्न है]।

भवदीय,

___________________________
[Your Name]
[Address]
[Contact]`
      };
    }

    if (lang === "Hinglish") {
      return {
        title: "RTI Application under Section 6(1) of RTI Act, 2005",
        content: `APPLICATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

TO:
The Public Information Officer (PIO),
[Name of Public Authority / Municipal Corporation / PWD / Department],
Location: ${locationLabel}

DATE: ${today}

1. APPLICANT DETAILS:
   Name: [Your Name]
   Address: [Address]
   Contact: [Contact]
   Citizenship: Citizen of India

2. PARTICULARS OF INFORMATION SOUGHT:
   Subject: Information regarding sanction, budget expenditure, and timeline for public works in [Locality / Ward / District Name].

   Please furnish certified copies and information on following specific points:
   a) Detailed certified copy of project work order, sanctioned budget, and tender specifications for work carried out in [Ward / Area] during [Financial Year/Period].
   b) Name and contact details of the contractor/agency awarded the work.
   c) Certified copy of Measurement Book (MB), quality inspection report, and material testing certificates submitted prior to passing bills.
   d) Total amount billed by the contractor and total amount disbursed by the authority to date.
   e) Stipulated start date, expected completion date, and current official project status.
   f) Name and designation of inspecting engineer/officer responsible for quality monitoring.

3. STATUTORY PERIOD:
   As provided under Section 7(1) of the RTI Act, 2005, requested information may kindly be furnished within 30 (thirty) days.

4. APPLICATION FEE DETAILS:
   Enclosed application fee of ₹10 vide [IPO / Demand Draft / Online Receipt No: XXXXXX] dated ${today}.
   [Or: Applicant belongs to BPL category; BPL card copy enclosed for fee exemption].

Yours sincerely,

___________________________
[Your Name]
[Address]
[Contact]`
      };
    }

    return {
      title: "Application under Section 6(1) of the Right to Information Act, 2005",
      content: `APPLICATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

TO:
The Public Information Officer (PIO),
[Name of Public Authority / Municipal Corporation / Public Works Department / Concerned Office],
Location: ${locationLabel}

DATE: ${today}

1. APPLICANT DETAILS:
   Name of Applicant: [Your Name]
   Postal Address: [Address]
   Contact: [Contact]
   Citizenship: Citizen of India

2. PARTICULARS OF INFORMATION SOUGHT:
   Subject: Information regarding sanction, budget expenditure, and timeline for public works in [Locality / Ward / District Name].

   Please furnish certified copies and information on the following specific points:
   a) Detailed certified copy of the project work order, sanctioned budget, and tender specifications for work carried out in [Ward / Area] during [Financial Year/Period].
   b) Name and contact details of the contractor/agency awarded the said work.
   c) Certified copy of the measurement book (MB), quality inspection report, and material testing certificates submitted prior to passing the bills.
   d) Total amount billed by the contractor and total amount disbursed by the authority to date for this work.
   e) Stipulated start date, expected completion date, and current official status of the project.
   f) Name and designation of the inspecting engineer/officer responsible for monitoring the quality and progress of this work.

3. STATUTORY PERIOD:
   As provided under Section 7(1) of the RTI Act, 2005, the requested information may kindly be furnished within 30 (thirty) days.

4. APPLICATION FEE DETAILS:
   Enclosed herewith application fee of ₹10 (Rupees Ten only) vide [IPO / Demand Draft / Online Receipt No. / Court Fee Stamp No: XXXXXX] dated ${today}.
   [Or: The applicant belongs to the Below Poverty Line (BPL) category; copy of BPL card enclosed for fee exemption].

Yours sincerely,

___________________________
[Your Name]
[Address]
[Contact]`
    };
  }

  // =========================================================================
  // 4. MUNICIPAL / GENERIC CIVIC DOCUMENTS
  // =========================================================================
  if (subIntent === "GENERIC_MUNICIPAL_GARBAGE") {
    if (lang === "Hindi") {
      return {
        title: "कचरा संग्रहण व स्वच्छता व्यवस्थापन हेतु औपचारिक अभ्यावेदन",
        content: `ठोस अपशिष्ट प्रबंधन नियम 2016 के तहत नियमित कचरा संग्रहण हेतु औपचारिक अभ्यावेदन

सेवा में:
मुख्य नगर पालिका अधिकारी / नगर आयुक्त,
[नगर निगम / नगर पालिका परिषद का नाम],
स्थान: ${locationLabel}

दिनांक: ${today}

विषय: [वार्ड संख्या / कॉलोनी / क्षेत्र का नाम] में कचरा संग्रहण न होने एवं स्वच्छता में लापरवाही के संबंध में।

महोदय / महोदया,

1. मैं [कॉलोनी / वार्ड / क्षेत्र का नाम] का निवासी हूं। हमारे क्षेत्र में विगत [दिनों / सप्ताह की संख्या] से नगर निगम द्वारा नियमित डोर-टू-डोर कचरा संग्रहण नहीं किया जा रहा है।

2. क्षेत्र में कचरे के ढेर लगने के कारण भारी दुर्गंध, संक्रामक बीमारियों का खतरा एवं नागरिक असुविधा उत्पन्न हो रही है।

3. ठोस अपशिष्ट प्रबंधन नियम, 2016 के अनुसार दैनिक कचरा संग्रहण एवं स्वच्छता बनाए रखना स्थानीय निकाय का वैधानिक दायित्व है।

4. पूर्व में दर्ज कराई गई शिकायत (टोकन/शिकायत संख्या: [Grievance Token No]) के उपरांत भी अब तक कोई स्थायी समाधान नहीं किया गया है।

5. अतः आपसे सादर अनुरोध है कि हमारे क्षेत्र में तत्काल सफाई कर्मचारी नियुक्त कर दैनिक कचरा संग्रहण सुनिश्चित कराने की कृपा करें।

भवदीय,

___________________________
[Your Name]
[Address]
[Contact]`
      };
    }

    if (lang === "Hinglish") {
      return {
        title: "Formal Representation for Municipal Garbage Collection & Sanitation",
        content: `FORMAL REPRESENTATION FOR MUNICIPAL WASTE COLLECTION & SANITATION UNDER SOLID WASTE RULES 2016

TO:
The Municipal Commissioner / Chief Sanitary Inspector,
[Name of Municipal Corporation / Municipality],
Location: ${locationLabel}

DATE: ${today}

SUBJECT: Formal Representation regarding failure of door-to-door garbage collection in [Locality / Ward Name]

Sir/Madam,

1. I am a resident of [Locality / Ward Name]. In our locality, regular garbage collection has been suspended/neglected for the past [Number of days/weeks].

2. Accumulation of uncollected solid waste is causing severe foul smell, breeding of vectors, and acute public health hazard to residents.

3. Under Solid Waste Management Rules 2016, daily municipal waste collection is a statutory duty of the Urban Local Body.

4. Despite previous complaints (Grievance Token: [Token No]), no permanent sanitation crew has resolved the issue.

5. You are formally requested to inspect the site and ensure immediate deployment of sanitation staff for daily waste collection.

Yours sincerely,

___________________________
[Your Name]
[Address]
[Contact]`
      };
    }

    return {
      title: "Formal Representation for Municipal Garbage Collection & Sanitation",
      content: `FORMAL REPRESENTATION FOR MUNICIPAL WASTE COLLECTION & SANITATION

TO:
The Municipal Commissioner / Chief Sanitary Inspector,
[Name of Municipal Corporation / Municipality],
Location: ${locationLabel}

DATE: ${today}

SUBJECT: Formal Representation regarding failure of door-to-door garbage collection in [Locality / Ward Name]

Sir/Madam,

1. I am a resident of [Locality / Ward Name]. In our locality, regular garbage collection and sanitation has been severely neglected for the past [Number of days/weeks].

2. The accumulation of uncollected solid waste is creating severe hygiene issues and public health risks for residents and children in the area.

3. Under the Solid Waste Management Rules, 2016, maintaining daily door-to-door waste collection is a statutory civic duty of the municipal administration.

4. Despite past informal notifications (Grievance Ref: [Token Number]), the situation remains unaddressed.

5. You are hereby formally requested to arrange immediate clearance of the waste and ensure a regular, monitored daily collection schedule in our ward.

Yours sincerely,

___________________________
[Your Name]
[Address]
[Contact]`
    };
  }

  // Generic Legal Notice template
  return {
    title: lang === "Hindi" ? "औपचारिक लिखित अभ्यावेदन एवं मांग पत्र" : lang === "Hinglish" ? "Formal Written Representation & Demand Notice" : "Formal Written Request & Notice of Representation",
    content: `FORMAL WRITTEN REPRESENTATION & DEMAND NOTICE

FROM / प्रेषक:
[Your Name]
[Address]
Contact / संपर्क: [Contact]

DATE / दिनांक: ${today}

TO / सेवा में:
[Opposite Party / Authority Name]
[Address]
Location: ${locationLabel}

SUBJECT: Formal Representation regarding [Brief Summary of Issue / Grievance]

Sir/Madam,

1. I am writing to place on formal record the grievance regarding [brief description of problem] which has remained unresolved despite previous communications.

2. Summary of facts:
   - [Fact 1: Event and date of occurrence]
   - [Fact 2: Previous communication and reference tokens]
   - [Fact 3: Loss or inconvenience suffered]

3. You are hereby formally requested to examine the matter and initiate corrective action / redressal within 15 (fifteen) business days of receipt of this notice.

4. In the absence of a timely response, I reserve the right to escalate this matter to the relevant statutory authority / grievance forum / District Legal Services Authority.

Kindly acknowledge receipt.

Yours sincerely,

___________________________
[Your Name]
[Contact]`
  };
};

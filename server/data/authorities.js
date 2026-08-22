/**
 * Curated Authority & Redressal Channel Mapping with English, Hindi, and Hinglish Support
 */
export const EXACT_JURISDICTION_FALLBACK_MESSAGE = {
  English: "Jurisdiction-specific authority information is not available in the current knowledge base. Please verify with the relevant official state/local authority.",
  Hindi: "वर्तमान ज्ञानकोष में क्षेत्राधिकार-विशिष्ट प्राधिकरण की जानकारी उपलब्ध नहीं है। कृपया संबंधित आधिकारिक राज्य/स्थानीय प्राधिकरण से पुष्टि करें।",
  Hinglish: "Current knowledge base mein jurisdiction-specific authority information available nahi hai. Please relevant official state/local authority se verify karein."
};

export const getAuthorityGuidance = (categoryKey, state = "", city = "", language = "English") => {
  const lang = (language === "Hindi" || language === "Hinglish") ? language : "English";
  const locationLabel = [city, state].filter(Boolean).join(", ") || (
    lang === "Hindi" ? "आपका स्थानीय क्षेत्राधिकार" :
    lang === "Hinglish" ? "Aapka Local Jurisdiction" : "Your Local Jurisdiction"
  );

  const fallbackMsg = EXACT_JURISDICTION_FALLBACK_MESSAGE[lang] || EXACT_JURISDICTION_FALLBACK_MESSAGE.English;

  if (categoryKey === "TENANCY") {
    if (lang === "Hindi") {
      return {
        channelName: "स्थानीय किराया प्राधिकरण / रेंट कोर्ट / मध्यस्थता प्रकोष्ठ (Rent Authority / SDM)",
        jurisdictionType: "राज्य-विशिष्ट / स्थानीय प्रशासन",
        targetLocation: locationLabel,
        whyRelevant: "राज्य और नगर निगम किराया नियंत्रण कानूनों के तहत स्थानीय किराया प्राधिकरण या एसडीएम (SDM) को किराएदारी विवादों, अनाधिकृत रूप से रोकी गई सुरक्षा जमा राशि और बेदखली के मामलों की सुनवाई का अधिकार है।",
        requiredDocuments: [
          "मूल किराया समझौता (Rent Agreement)",
          "सुरक्षा जमा राशि भुगतान का प्रमाण (बैंक ट्रांसफर / चेक / रसीद)",
          "मकान खाली करने की सूचना / शांतिपूर्ण चाबी सौंपने का प्रमाण",
          "औपचारिक मांग पत्र (Demand Notice) और स्पीड पोस्ट की ट्रैकिंग पर्ची"
        ],
        suggestedNextAction: "7 से 14 दिनों की समयसीमा देते हुए औपचारिक लिखित मांग पत्र भेजें। यदि राशि वापस न मिले, तो स्थानीय किराया प्राधिकरण या जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क करें।",
        statutoryNotice: "किराएदारी मुख्य रूप से राज्य-स्तरीय कानूनों द्वारा नियंत्रित होती है।",
        fallbackMessage: fallbackMsg
      };
    }

    if (lang === "Hinglish") {
      return {
        channelName: "Local Rent Authority / Rent Court / Mediation Cell (SDM Office)",
        jurisdictionType: "State-specific / Local Administration",
        targetLocation: locationLabel,
        whyRelevant: "State aur municipal rent control laws ke tehat local Rent Authority ya SDM ko tenancy disputes, security deposit refund aur eviction cases sunne ka legal authority hota hai.",
        requiredDocuments: [
          "Original Rent Agreement / Lease Deed",
          "Security Deposit payment proof (Bank transfer / Cheque / Receipt)",
          "Move-out notice / Keys handover proof",
          "Formal written demand notice ki copy aur speed post tracking slip"
        ],
        suggestedNextAction: "7 se 14 days ki deadline dekar formal demand notice bhejein. Agar payment na mile, toh local Rent Authority ya District Legal Services Authority (DLSA) se mediation ke liye sampark karein.",
        statutoryNotice: "Tenancy primarily State laws se govern hoti hai. Rules aur deposit limits har state mein alag ho sakti hain.",
        fallbackMessage: fallbackMsg
      };
    }

    return {
      channelName: "Local Rent Authority / Rent Court / Mediation Cell",
      jurisdictionType: "State-specific / Local Administration",
      targetLocation: locationLabel,
      whyRelevant: "State and municipal rent control frameworks designate local Rent Authorities or Sub-Divisional Magistrates to adjudicate tenancy agreements, wrongful deposit retention, and eviction disputes.",
      requiredDocuments: [
        "Original Tenancy Agreement / Lease Deed",
        "Proof of Security Deposit payment (Bank transfer / Cheque / Receipt)",
        "Move-out notice / Proof of peaceful key handover",
        "Copy of formal written demand notice and postal delivery tracking slip"
      ],
      suggestedNextAction: "Serve the formal written demand notice with a 7 to 14 day deadline. If unpaid, approach the local Rent Authority or District Legal Services Authority (DLSA) for pre-litigation mediation.",
      statutoryNotice: "Tenancy is governed primarily by State-level legislation. Rules, deposit caps, and designated tribunals vary by state.",
      fallbackMessage: fallbackMsg
    };
  }

  if (categoryKey === "CONSUMER") {
    if (lang === "Hindi") {
      return {
        channelName: "जिला उपभोक्ता विवाद निवारण आयोग (DCDRC) / राष्ट्रीय उपभोक्ता हेल्पलाइन",
        jurisdictionType: "केंद्रीय / राष्ट्रीय कानून (जिला स्तरीय पीठ)",
        targetLocation: locationLabel,
        whyRelevant: "उपभोक्ता संरक्षण अधिनियम, 2019 के तहत जिला उपभोक्ता आयोग को दोषपूर्ण सामान, सेवा में कमी और अनुचित व्यापार प्रथाओं के खिलाफ सुनवाई का वैधानिक अधिकार है।",
        requiredDocuments: [
          "खरीद बिल (Invoice) / ऑर्डर पुष्टि / भुगतान रसीद",
          "दोष दर्शाने वाले फोटोग्राफ या तकनीकी निरीक्षण रिपोर्ट",
          "विक्रेता/कंपनी के साथ की गई ईमेल या लिखित शिकायत",
          "रिफंड या रिप्लेसमेंट हेतु भेजा गया औपचारिक मांग नोटिस"
        ],
        suggestedNextAction: "राष्ट्रीय उपभोक्ता हेल्पलाइन (consumerhelpline.gov.in) या 1915 पर शिकायत दर्ज करें। यदि 15-30 दिनों में समाधान न हो, तो e-Daakhil (edaakhil.nic.in) के माध्यम से जिला उपभोक्ता आयोग में ई-दाखिल करें।",
        statutoryNotice: "उपभोक्ता संरक्षण अधिनियम, 2019 पूरे भारत में लागू होता है। ₹50 लाख तक के दावे जिला आयोग के अंतर्गत आते हैं।",
        fallbackMessage: fallbackMsg
      };
    }

    if (lang === "Hinglish") {
      return {
        channelName: "District Consumer Commission (DCDRC) / National Consumer Helpline (1915)",
        jurisdictionType: "Central/National law with District-level Benches",
        targetLocation: locationLabel,
        whyRelevant: "Consumer Protection Act, 2019 ke under District Consumer Commission ko defective products, deficiency of service aur unfair trade practices ke khilaf redressal provide karne ka statutory power hai.",
        requiredDocuments: [
          "Purchase Invoice / Order confirmation / Payment receipt",
          "Defect dikhane wale photos ya inspection report",
          "Seller/company ke sath email ya chat complaints",
          "Refund ya replacement ke liye diya gaya formal demand notice"
        ],
        suggestedNextAction: "National Consumer Helpline (consumerhelpline.gov.in ya call 1915) par grievance register karein. Agar 15-30 days mein resolve na ho, toh e-Daakhil (edaakhil.nic.in) se District Consumer Commission mein file karein.",
        statutoryNotice: "Consumer Protection Act, 2019 pure India mein uniformly apply hota hai.",
        fallbackMessage: fallbackMsg
      };
    }

    return {
      channelName: "District Consumer Disputes Redressal Commission (DCDRC) / National Consumer Helpline",
      jurisdictionType: "Central/National law with District-level Benches",
      targetLocation: locationLabel,
      whyRelevant: "Under the Consumer Protection Act, 2019, District Consumer Commissions have statutory jurisdiction over consumer complaints for defective goods, deficiency of service, and unfair trade practices.",
      requiredDocuments: [
        "Purchase Invoice / Order confirmation / Payment receipt",
        "Photographs or technical inspection report showing the defect",
        "Written complaint / email communication with seller/manufacturer",
        "Formal notice given to the seller requesting refund or replacement"
      ],
      suggestedNextAction: "Register a grievance on the National Consumer Helpline (consumerhelpline.gov.in) or call 1915. If unresolved within 15-30 days, file an e-complaint via e-Daakhil (edaakhil.nic.in) before the District Commission.",
      statutoryNotice: "Governed nationally by the Consumer Protection Act, 2019. Consumer claims up to ₹50 Lakh fall under District Commission jurisdiction.",
      fallbackMessage: fallbackMsg
    };
  }

  if (categoryKey === "RTI") {
    if (lang === "Hindi") {
      return {
        channelName: "संबंधित सार्वजनिक प्राधिकरण के जन सूचना अधिकारी (PIO)",
        jurisdictionType: state ? `राज्य सरकार सार्वजनिक प्राधिकरण (${state}) / केंद्रीय पीआईओ` : "केंद्रीय / राज्य सार्वजनिक प्राधिकरण",
        targetLocation: locationLabel,
        whyRelevant: "सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के तहत प्रत्येक सरकारी विभाग (नगर निगम, पीडब्ल्यूडी आदि) में एक जन सूचना अधिकारी (PIO) नियुक्त होता है, जिसे 30 दिनों में सूचना उपलब्ध कराना अनिवार्य है।",
        requiredDocuments: [
          "धारा 6(1) के तहत स्पष्ट और बिंदुवार प्रश्नों वाला आरटीआई आवेदन",
          "निर्धारित आरटीआई आवेदन शुल्क (₹10 का आईपीओ / कोर्ट फीस स्टाम्प / ऑनलाइन रसीद)",
          "पहचान पत्र / बीपीएल कार्ड की प्रति (यदि शुल्क छूट का दावा किया गया हो)"
        ],
        suggestedNextAction: "पहचानें कि सड़क/कार्य नगर निगम, राज्य पीडब्ल्यूडी या केंद्रीय एनएचएआई के अधीन है। आवेदन संबंधित राज्य/केंद्रीय पीआईओ को जमा करें। ध्यान दें: केंद्रीय आरटीआई ऑनलाइन पोर्टल केवल केंद्रीय प्राधिकरणों पर लागू होता है; राज्य आरटीआई के लिए राज्य पोर्टल या डाक का उपयोग करें।",
        statutoryNotice: "सूचना का अधिकार अधिनियम, 2005 द्वारा शासित। आरटीआई ऑनलाइन (rtionline.gov.in) केवल केंद्रीय मंत्रालयों के लिए है।",
        fallbackMessage: fallbackMsg
      };
    }

    if (lang === "Hinglish") {
      return {
        channelName: "Public Information Officer (PIO) - Concerned Public Authority",
        jurisdictionType: state ? `State Public Authority (${state}) / Central PIO` : "Central / State Public Authority",
        targetLocation: locationLabel,
        whyRelevant: "RTI Act, 2005 ke under har government department (Municipal Corp, PWD, NHAI) mein ek Public Information Officer (PIO) hota hai jo 30 days ke andar information provide karne ke liye legally bound hai.",
        requiredDocuments: [
          "Section 6(1) RTI application with point-wise questions",
          "Prescribed RTI Fee receipt (₹10 via IPO / Court Fee Stamp / Online)",
          "BPL card copy agar fee exemption claim kiya hai"
        ],
        suggestedNextAction: "Pehle confirm karein ki road/work Municipal, State PWD ya Central NHAI ka hai. Respective PIO ko apply karein. Note: Central RTI Online portal sirf Central authorities handle karta hai, State RTIs ke liye State portal ya Speed Post use karein.",
        statutoryNotice: "RTI Act 2005 applies nationally. Central RTI portal sirf Central ministries ke liye hai.",
        fallbackMessage: fallbackMsg
      };
    }

    return {
      channelName: "Public Information Officer (PIO) of the Concerned Public Authority",
      jurisdictionType: state ? `State Government Public Authority (${state}) / Central PIO` : "Central / State Public Authority",
      targetLocation: locationLabel,
      whyRelevant: "Under the Right to Information Act, 2005, every public department (such as Municipal Corporation, PWD, or Highway Authority) has a designated Public Information Officer (PIO) mandated to provide records within 30 days.",
      requiredDocuments: [
        "Form 6(1) RTI Application specifying clear, point-wise questions",
        "Prescribed RTI Application Fee receipt (e.g. ₹10 via IPO/Court Fee Stamp/Online)",
        "Proof of identity / BPL card copy (if fee exemption claimed)"
      ],
      suggestedNextAction: "Identify whether the road/department falls under Municipal/State PWD or Central NHAI. Submit application to the respective State/Central PIO. Note: Central RTI Online portal only applies to Central Authorities; State RTIs require the respective State portal or physical post.",
      statutoryNotice: "Governed by the Right to Information Act, 2005. RTI Online (rtionline.gov.in) is strictly for Central ministries only. State matters must be filed with the relevant State PIO.",
      fallbackMessage: fallbackMsg
    };
  }

  // Generic
  if (lang === "Hindi") {
    return {
      channelName: "जिला विधिक सेवा प्राधिकरण (DLSA) / जन शिकायत अधिकारी",
      jurisdictionType: "सामान्य नागरिक जानकारी / जिला स्तर",
      targetLocation: locationLabel,
      whyRelevant: "यह नागरिकों को नागरिक और दीवानी शिकायतों के समाधान के लिए मुफ्त कानूनी सहायता और मध्यस्थता सेवाएं प्रदान करता है।",
      requiredDocuments: [
        "लिखित शिकायत पत्र",
        "सहायक पत्राचार और रसीदें"
      ],
      suggestedNextAction: "विभागाध्यक्ष को औपचारिक आवेदन दें या अपने स्थानीय जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क करें।",
      statutoryNotice: "नागरिक विवाद निवारण प्रक्रिया संबंधित विभाग और राज्य प्रशासन पर निर्भर करती है।",
      fallbackMessage: fallbackMsg
    };
  }

  if (lang === "Hinglish") {
    return {
      channelName: "District Legal Services Authority (DLSA) / Public Grievance Cell",
      jurisdictionType: "General Information / District Level",
      targetLocation: locationLabel,
      whyRelevant: "Citizens ko free legal aid aur pre-litigation mediation provide karta hai.",
      requiredDocuments: [
        "Written grievance statement",
        "Relevant receipts aur documents"
      ],
      suggestedNextAction: "Department head ko formal representation dein ya local District Legal Services Authority (DLSA) se contact karein.",
      statutoryNotice: "Civic dispute resolution specific department aur state administration par depend karta hai.",
      fallbackMessage: fallbackMsg
    };
  }

  return {
    channelName: "District Legal Services Authority (DLSA) / Public Grievance Officer",
    jurisdictionType: "General information / District Level",
    targetLocation: locationLabel,
    whyRelevant: "Provides free legal aid and conciliation services to citizens across civil and civic grievances.",
    requiredDocuments: [
      "Written statement of grievance",
      "Supporting correspondence and receipts"
    ],
    suggestedNextAction: "Submit a formal representation to the department head or visit your local District Legal Services Authority.",
    statutoryNotice: "Civic dispute routes depend heavily on the specific department and state administration.",
    fallbackMessage: fallbackMsg
  };
};

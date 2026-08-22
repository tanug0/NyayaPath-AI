import OpenAI from 'openai';

/**
 * Initialize OpenAI client if OPENAI_API_KEY is configured in env
 */
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return null;
  }

  const config = {
    apiKey: apiKey.trim()
  };

  if (process.env.OPENAI_BASE_URL && process.env.OPENAI_BASE_URL.trim() !== '') {
    config.baseURL = process.env.OPENAI_BASE_URL.trim();
  }

  return new OpenAI(config);
};

/**
 * Validate that the AI returned a compliant JSON object matching our schema
 */
const validateAIResponse = (data) => {
  if (!data || typeof data !== 'object') return false;

  // Validate category
  if (!data.category || typeof data.category !== 'string') return false;

  // Validate summary
  if (!data.summary || typeof data.summary !== 'object') return false;
  if (!data.summary.title || typeof data.summary.title !== 'string') return false;
  if (!data.summary.overview || typeof data.summary.overview !== 'string') return false;
  if (!Array.isArray(data.summary.keyPoints) || data.summary.keyPoints.length === 0) return false;

  // Validate jurisdiction
  if (!data.jurisdiction || typeof data.jurisdiction !== 'object') return false;
  if (!data.jurisdiction.level || typeof data.jurisdiction.level !== 'string') return false;

  // Validate relevantInformation
  if (!Array.isArray(data.relevantInformation) || data.relevantInformation.length === 0) return false;
  for (const item of data.relevantInformation) {
    if (!item.label || !item.detail) return false;
  }

  // Validate actionRoadmap
  if (!Array.isArray(data.actionRoadmap) || data.actionRoadmap.length === 0) return false;
  for (const step of data.actionRoadmap) {
    if (!step.id || !step.title || !step.description) return false;
  }

  return true;
};

/**
 * AI-Powered Problem Analyzer
 * Returns structured JSON or null on any failure (triggering curated fallback)
 */
export const analyzeProblemWithAI = async ({ problem, state = "", city = "", language = "English" }) => {
  const openai = getOpenAIClient();
  if (!openai) {
    return null;
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const systemPrompt = `You are NyayaPath AI, a civic empowerment legal diagnostic engine for Indian citizens.
Analyze the user's civic or pre-litigation problem and return ONLY valid JSON matching this schema:
{
  "category": "String (e.g. Tenancy & Housing, Consumer Protection, Right to Information, Public Works)",
  "summary": {
    "title": "String",
    "overview": "String",
    "keyPoints": ["String", "String", "String"]
  },
  "jurisdiction": {
    "level": "String",
    "location": "${[city, state].filter(Boolean).join(', ') || 'India'}",
    "statutoryScope": "Central/National law | State-specific | Model framework | General information",
    "note": "String emphasizing jurisdiction caveats"
  },
  "relevantInformation": [
    { "label": "String", "detail": "String" },
    { "label": "String", "detail": "String" },
    { "label": "String", "detail": "String" }
  ],
  "actionRoadmap": [
    { "id": 1, "title": "String", "description": "String", "completed": false },
    { "id": 2, "title": "String", "description": "String", "completed": false },
    { "id": 3, "title": "String", "description": "String", "completed": false },
    { "id": 4, "title": "String", "description": "String", "completed": false },
    { "id": 5, "title": "String", "description": "String", "completed": false }
  ],
  "disclaimer": "This information is for general awareness and does not replace professional legal advice."
}

CRITICAL RULES:
1. Output ONLY valid, parsable JSON without markdown wrapping or commentary.
2. NEVER invent fake government websites or URLs.
3. State and local jurisdiction caveats must be respected: Do NOT assume Delhi laws or Model Tenancy Act applies automatically everywhere.
4. If RTI is involved, clarify Central vs State public authority distinction.
5. If Language is Hindi, return all text in Devanagari script. If Hinglish, return in Roman script Hindi + English. If English, return in English.`;

  const userPrompt = `Problem: ${problem}
State: ${state || 'Not specified'}
City/District: ${city || 'Not specified'}
Language: ${language}

Provide structured analysis in ${language}.`;

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
      max_tokens: 1800
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content);
    if (!validateAIResponse(parsed)) {
      console.warn('[NyayaPath AI] AI returned incomplete/invalid JSON schema. Triggering fallback.');
      return null;
    }

    parsed.isFallback = false;
    return parsed;
  } catch (error) {
    console.warn('[NyayaPath AI] AI API unavailable or failed, utilizing curated fallback data. Error:', error.message);
    return null;
  }
};


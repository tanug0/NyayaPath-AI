import express from 'express';
import { getFallbackAnalysis, getFallbackDocument, detectCategory } from '../data/fallback.js';
import { VERIFIED_SOURCES } from '../data/sources.js';
import { getAuthorityGuidance } from '../data/authorities.js';
import { analyzeProblemWithAI } from '../services/ai.js';

const router = express.Router();

/**
 * GET /api/health
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'NyayaPath AI Backend',
    version: '1.0.0 Stage 2',
    timestamp: new Date().toISOString(),
    aiConfigured: Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== '')
  });
});

/**
 * POST /api/analyze
 * Body: { problem, state, city, language }
 */
router.post('/analyze', async (req, res) => {
  try {
    const { problem = '', state = '', city = '', language = 'English' } = req.body || {};

    if (!problem || !problem.trim()) {
      return res.status(400).json({
        error: 'Problem description is required.'
      });
    }

    // Attempt AI Analysis first if configured
    let result = await analyzeProblemWithAI({
      problem: problem.trim(),
      state: state ? state.trim() : '',
      city: city ? city.trim() : '',
      language
    });

    // If AI is not configured or failed, seamlessly use curated fallback
    if (!result) {
      result = getFallbackAnalysis({
        problem: problem.trim(),
        state: state ? state.trim() : '',
        city: city ? city.trim() : '',
        language
      });
    } else {
      // Enrich AI result with verified static source badges and designated authority mappings
      const categoryKey = detectCategory(problem);
      result.sources = VERIFIED_SOURCES[categoryKey] || VERIFIED_SOURCES.GENERIC;
      result.authority = getAuthorityGuidance(categoryKey, state, city, language);
    }

    return res.json(result);
  } catch (err) {
    console.error('[API /analyze error]', err);
    // Even on server exception, return safe fallback so user never sees crash
    const fallback = getFallbackAnalysis({
      problem: req.body?.problem || '',
      state: req.body?.state || '',
      city: req.body?.city || '',
      language: req.body?.language || 'English'
    });
    return res.json(fallback);
  }
});

/**
 * POST /api/generate-document
 * Body: { problem, category, state, city, language, details }
 */
router.post('/generate-document', (req, res) => {
  try {
    const { problem = '', category = '', state = '', city = '', language = 'English', details = {} } = req.body || {};

    const document = getFallbackDocument({
      problem,
      category,
      state,
      city,
      language,
      details
    });

    return res.json({
      title: document.title,
      content: document.content,
      isFallback: true
    });
  } catch (err) {
    console.error('[API /generate-document error]', err);
    return res.status(500).json({
      error: 'Failed to generate document.'
    });
  }
});

export default router;

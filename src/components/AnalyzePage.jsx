import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Send, 
  MapPin, 
  Globe, 
  Layers, 
  CheckCircle2, 
  FileText, 
  Building2, 
  BookmarkCheck, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Info,
  ShieldAlert,
  ServerOff
} from 'lucide-react';
import { 
  INDIAN_STATES, 
  EXAMPLE_PROBLEMS, 
  MOCK_ANALYSIS_RESULT, 
  DEFAULT_ROADMAP_STEPS 
} from '../data/mockData';
import RoadmapComponent from './RoadmapComponent';
import DisclaimerBanner from './DisclaimerBanner';

export default function AnalyzePage({ onNavigateToDocs, onNavigateToAuthority, onNavigateToSources }) {
  // Primary demo pre-loaded
  const [problemText, setProblemText] = useState("My landlord has not returned my ₹15,000 security deposit after I moved out.");
  const [selectedState, setSelectedState] = useState("Uttar Pradesh");
  const [selectedCity, setSelectedCity] = useState("Prayagraj (Allahabad)");
  const [language, setLanguage] = useState("English");
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(true);
  const [connectionError, setConnectionError] = useState(false);

  const [analysisData, setAnalysisData] = useState(MOCK_ANALYSIS_RESULT);
  const [isFallbackMode, setIsFallbackMode] = useState(true);

  const handleExampleSelect = (ex) => {
    setProblemText(ex.text);
    if (ex.state) setSelectedState(ex.state);
    if (ex.city) setSelectedCity(ex.city);
    setHasAnalyzed(false);
    setConnectionError(false);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!problemText.trim()) return;
    setIsAnalyzing(true);
    setConnectionError(false);

    try {
      const response = await fetch('https://nyayapath-ai-backend.onrender.com/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: problemText.trim(),
          state: selectedState,
          city: selectedCity,
          language
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisData(data);
        setIsFallbackMode(Boolean(data.isFallback));
        setConnectionError(false);
      } else {
        // Safe local fallback
        setAnalysisData(MOCK_ANALYSIS_RESULT);
        setIsFallbackMode(true);
        setConnectionError(true);
      }
    } catch (err) {
      console.warn('[AnalyzePage] Connection notice:', err.message);
      setAnalysisData(MOCK_ANALYSIS_RESULT);
      setIsFallbackMode(true);
      setConnectionError(true);
    } finally {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      setTimeout(() => {
        const resultsEl = document.getElementById('analysis-results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleReset = () => {
    setProblemText("");
    setSelectedState("");
    setSelectedCity("");
    setHasAnalyzed(false);
    setConnectionError(false);
  };

  const formattedJurisdiction = (selectedState || selectedCity)
    ? `Jurisdiction: ${[selectedState, selectedCity].filter(Boolean).join(' • ')}`
    : 'Jurisdiction: Not specified';

  return (
    <div className="space-y-8">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
            AI Civic Diagnostic
          </span>
          <span className="text-xs text-slate-500 font-medium">Stage 3 • Live API & Fallback Integrated</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
          Analyze Your Civic or Legal Problem
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
          Describe what happened in plain words. NyayaPath categorizes the dispute, outlines your rights, charts a 5-step action roadmap, and formats formal documents.
        </p>

        {/* Example Problem Quick-Fills */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Quick Demo Scenarios:
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROBLEMS.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => handleExampleSelect(ex)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                  problemText === ex.text
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {ex.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Intake Form */}
      <form onSubmit={handleAnalyze} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-6">
        
        {/* Textarea for Problem */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-bold text-slate-800">
              Describe Your Civic Issue / Problem <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Clear form
            </button>
          </div>
          <textarea
            rows={4}
            value={problemText}
            onChange={(e) => setProblemText(e.target.value)}
            placeholder="e.g. My landlord has not returned my ₹15,000 security deposit after I moved out and handed over keys..."
            className="w-full text-sm sm:text-base bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all leading-relaxed"
            required
          />
        </div>

        {/* Location & Language Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* State Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              State / Union Territory
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">-- Select State / UT --</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
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
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              placeholder="e.g. Prayagraj, Pune, Bengaluru"
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Language Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              Response Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Hinglish">Hinglish (Conversational)</option>
            </select>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500 hidden sm:block">
            Processes securely via backend API with offline fallback resilience
          </p>
          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing Problem...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Analyze Problem
              </>
            )}
          </button>
        </div>
      </form>

      {/* Friendly Connection Notice if server was unreachable */}
      {connectionError && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3 text-sm">
          <ServerOff className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Service Notice: </strong>
            Unable to connect to the analysis service. Please make sure the NyayaPath AI server is running. Using local curated knowledge base for this response.
          </div>
        </div>
      )}

      {/* ================= RESULTS SECTION ================= */}
      {hasAnalyzed && (
        <div id="analysis-results-section" className="space-y-6 pt-4">
          
          {/* 1. Problem & Category Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-5 sm:p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-800/90 text-indigo-200 border border-indigo-700">
                      {analysisData.category || analysisData.summary?.category || "Civic Dispute"}
                    </span>
                    
                    {/* Fallback / Demo Mode Indicator */}
                    {isFallbackMode && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        Demo / Fallback Mode
                      </span>
                    )}

                    <span className="text-xs text-indigo-300 font-medium">
                      {formattedJurisdiction}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {analysisData.summary?.title || "Problem Analysis & Guidance"}
                  </h3>
                </div>

                {/* Generate Document Quick CTA */}
                <button
                  type="button"
                  onClick={() => onNavigateToDocs({
                    problem: problemText,
                    category: analysisData.category,
                    state: selectedState,
                    city: selectedCity,
                    language
                  })}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 self-start sm:self-auto cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-950" />
                  {analysisData.category?.toLowerCase().includes('rti') ? 'Generate RTI Draft' :
                   analysisData.category?.toLowerCase().includes('consumer') ? 'Generate Consumer Notice' :
                   'Generate Demand Document'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Jurisdiction Section */}
            <div className="p-4 bg-amber-50 border-b border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Jurisdiction Notice: </strong>
                  Tenancy rules, consumer forums, and escalation routes depend on jurisdiction. {analysisData.jurisdiction?.note || "Please verify with local state authorities."}
                </div>
              </div>

              {/* Dedicated RTI Jurisdiction Distinction */}
              {analysisData.category?.toLowerCase().includes('rti') && (
                <div className="mt-2 pt-2 border-t border-amber-200/80 pl-6 text-xs text-amber-900 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-white/80 p-2.5 rounded-lg border border-amber-300/60">
                    <strong className="block text-slate-900 mb-0.5">Central Government RTI:</strong>
                    Filed via <code>rtionline.gov.in</code> for Central Ministries, Railways, Defense, National Banks only.
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-lg border border-amber-300/60">
                    <strong className="block text-slate-900 mb-0.5">State Government RTI ({selectedState || 'State'}):</strong>
                    Filed directly with the State/Municipal PIO or respective State RTI portal (NOT handled by the Central RTI portal).
                  </div>
                </div>
              )}
            </div>

            {/* 3. Understanding Section */}
            <div className="p-5 sm:p-7 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
                  Problem Understanding
                </h4>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {analysisData.summary?.overview || analysisData.understanding?.overview}
                </p>
                <div className="mt-3 space-y-1.5">
                  {(analysisData.summary?.keyPoints || analysisData.understanding?.keyPoints || []).map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relevant Information Cards */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">
                  Relevant Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(analysisData.relevantInformation || analysisData.relevantInfo || []).map((info, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h5 className="text-xs font-bold text-slate-900 mb-1">{info.label}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">{info.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Verified Sources Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                  <BookmarkCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Verified Sources</h4>
                  <p className="text-xs text-slate-500">Official statutory frameworks & authentic portals</p>
                </div>
              </div>

              <button
                onClick={onNavigateToSources}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                All Sources <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(analysisData.sources || analysisData.verifiedSources || []).map((src, idx) => (
                <div key={src.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                        {src.type}
                      </span>
                      {src.verified === true && src.url ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" /> Source Verified
                        </span>
                      ) : null}
                    </div>
                    <h5 className="text-xs font-bold text-slate-900">{src.title}</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{src.description}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60">
                    {src.url ? (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                      >
                        Visit Official Portal <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Statutory Reference</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Action Roadmap Component */}
          <RoadmapComponent 
            key={analysisData.category}
            initialSteps={analysisData.actionRoadmap || DEFAULT_ROADMAP_STEPS} 
            onGenerateDoc={() => onNavigateToDocs({
              problem: problemText,
              category: analysisData.category,
              state: selectedState,
              city: selectedCity,
              language
            })}
            showTitle={true}
          />

          {/* 6. Authority Guidance Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Authority Finder</h4>
                  <p className="text-xs text-slate-500">Designated administrative and mediation channels</p>
                </div>
              </div>

              <button
                onClick={onNavigateToAuthority}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                View Full Directory <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Designated Redressal Channel
                </span>
                <p className="font-semibold text-slate-900">
                  {analysisData.authority?.channelName || analysisData.authorityGuidance?.name || "Competent Civil / Rent Authority"}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {analysisData.authority?.whyRelevant || analysisData.authorityGuidance?.relevantWhy}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Suggested Next Action
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {analysisData.authority?.suggestedNextAction || analysisData.authorityGuidance?.suggestedNextAction}
                </p>
              </div>
            </div>

            {/* Authority Fallback Notice */}
            <div className="p-3.5 bg-amber-50/90 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong>Jurisdiction Guidance: </strong>
              {analysisData.authority?.fallbackMessage || "Jurisdiction-specific authority information is not available in the current knowledge base. Please verify with the relevant official state/local authority."}
            </div>
          </div>

          {/* 7. Bottom Generate Document Action Footer */}
          <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-indigo-950">Ready to take formal action?</h4>
              <p className="text-xs text-indigo-800">
                {analysisData.category?.toLowerCase().includes('rti') 
                  ? 'Generate your pre-drafted Section 6(1) RTI application now.' 
                  : 'Generate and customize your pre-litigation demand document now.'}
              </p>
            </div>
            <button
              onClick={() => onNavigateToDocs({
                problem: problemText,
                category: analysisData.category,
                state: selectedState,
                city: selectedCity,
                language
              })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              {analysisData.category?.toLowerCase().includes('rti') ? 'Generate RTI Draft' :
               analysisData.category?.toLowerCase().includes('consumer') ? 'Generate Consumer Notice' :
               'Open Document Generator'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* Persistent Disclaimer */}
      <DisclaimerBanner />

    </div>
  );
}

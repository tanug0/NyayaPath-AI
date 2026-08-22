import React from 'react';
import { 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  FileText, 
  Building2, 
  BookmarkCheck, 
  Layers, 
  MapPin, 
  HelpCircle, 
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import DisclaimerBanner from './DisclaimerBanner';

export default function HomePage({ onStartAnalyze, onNavigateTab }) {
  const workflowSteps = [
    {
      num: "01",
      title: "Problem",
      desc: "Citizen describes issue in plain colloquial language (English/Hindi/Hinglish)."
    },
    {
      num: "02",
      title: "Understanding",
      desc: "Deconstructs factual rights, legal category, and tenant/consumer obligations."
    },
    {
      num: "03",
      title: "Verified Info",
      desc: "Filters out internet speculation; references genuine statutory and portal sources."
    },
    {
      num: "04",
      title: "Action Roadmap",
      desc: "5-stage progressive checklist with clear pre-litigation milestones."
    },
    {
      num: "05",
      title: "Document",
      desc: "Instant pre-drafted formal demand notice ready to copy, print, or download."
    },
    {
      num: "06",
      title: "Authority",
      desc: "Identifies designated forums and escalation routes with jurisdiction safeguards."
    }
  ];

  const features = [
    {
      icon: Sparkles,
      color: "from-blue-500 to-indigo-600",
      title: "AI Problem Understanding",
      description: "Translates everyday disputes into structured civic categorization and identifies core rights without legal jargon."
    },
    {
      icon: MapPin,
      color: "from-emerald-500 to-teal-600",
      title: "Jurisdiction Awareness",
      description: "Recognizes state and district boundaries so you never assume uniform tenancy or municipal rules."
    },
    {
      icon: BookmarkCheck,
      color: "from-amber-500 to-orange-600",
      title: "Verified Sources",
      description: "Zero hallucination guarantee. Lists only authentic .gov.in/.nic.in portals and codified legal frameworks."
    },
    {
      icon: Compass,
      color: "from-indigo-500 to-purple-600",
      title: "Action Roadmap",
      description: "Actionable 5-step checklist tracking evidence collection, informal notice, formal dispatch, and escalation."
    },
    {
      icon: FileText,
      color: "from-rose-500 to-pink-600",
      title: "Document Generator",
      description: "Creates formal demand notices and statutory requests with custom placeholders, printable output, and text export."
    },
    {
      icon: Building2,
      color: "from-cyan-500 to-blue-600",
      title: "Authority Finder",
      description: "Locates competent forums (Rent Authorities, DLSAs, Consumer Commissions) with required filing checklists."
    }
  ];

  const whyPoints = [
    {
      title: "Bridging the Civic Information Asymmetry",
      desc: "Citizens often give up legitimate deposits and claims due to confusing procedures and intimidating legal terminology."
    },
    {
      title: "Pre-Litigation First Approach",
      desc: "90% of disputes can be resolved or settled faster with documented evidence and formal notice before entering court."
    },
    {
      title: "Strict Accuracy & Safety Standard",
      desc: "Never invents fake government websites or misleads citizens on state-specific enactments."
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-4 sm:py-8">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-14 lg:p-20 shadow-xl border border-slate-800">
        
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-indigo-500/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          
          {/* Hackathon Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-indigo-200 backdrop-blur-xs">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>OOSC 4.0 • IIIT Allahabad • Problem Statement 3</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-tight">
            Understand Your Rights. <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-300 via-indigo-200 to-white bg-clip-text text-transparent">
              Know Your Next Step.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            AI-powered civic guidance that turns complex information into clear, actionable steps.
          </p>

          {/* Primary Call to Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartAnalyze}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2.5 text-base cursor-pointer"
            >
              <Compass className="w-5 h-5 text-slate-950" />
              Analyze My Problem
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>
            <button
              onClick={() => onNavigateTab('sources')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-xl border border-white/20 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-400" />
              Browse Verified Sources
            </button>
          </div>

          {/* Proof points below CTA */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero Fake Links</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Jurisdiction Filter</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Action Checklist</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ready Documents</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
            Linear Civic Pipeline
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-3">
            How NyayaPath Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            A 6-pillar framework converting raw citizen grievances into structured, actionable empowerment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {workflowSteps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div>
                <span className="text-2xl font-black text-indigo-200 group-hover:text-indigo-600 transition-colors">
                  {step.num}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-indigo-600 text-[11px] font-semibold">
                <span>Phase {step.num}</span>
                <ChevronRight className="w-3 h-3 ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= KEY FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Engineered Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-3">
            Key Features of NyayaPath AI
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Built specifically for Indian citizens navigating consumer, tenancy, and civic authorities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-indigo-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= WHY NYAYAPATH ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/80 text-indigo-300 border border-indigo-700">
                Civic Mission
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                Why NyayaPath AI Matters
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Most legal platforms focus on complex courtroom litigation for lawyers. NyayaPath focuses on the <strong>first mile of justice</strong>—empowering everyday citizens to organize facts, assert rights, and demand civic accountability.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={onStartAnalyze}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  Try the Demo Intake
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {whyPoints.map((pt, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-amber-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {pt.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATUTORY DISCLAIMER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <DisclaimerBanner />
      </section>

    </div>
  );
}

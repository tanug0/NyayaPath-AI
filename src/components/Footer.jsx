import React from 'react';
import { Scale, Shield } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Scale className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">NyayaPath AI</span>
            </div>
            <p className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">
              AI-Powered Legal & Civic Rights Navigation Platform
            </p>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Helping people understand everyday legal and civic problems through simple explanations, actionable roadmaps, relevant authorities, verified sources, and document assistance.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors cursor-pointer">Home</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analyze')} className="hover:text-white transition-colors cursor-pointer">Analyze Problem</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('roadmap')} className="hover:text-white transition-colors cursor-pointer">Action Roadmap</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('documents')} className="hover:text-white transition-colors cursor-pointer">Document Generator</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sources')} className="hover:text-white transition-colors cursor-pointer">Verified Sources</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('authority')} className="hover:text-white transition-colors cursor-pointer">Authority Finder</button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Core Principles</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Source-First Guidance</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Jurisdiction Awareness</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Plain Language Summaries</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Action-Oriented Guidance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer row in footer */}
        <div className="pt-8 border-t border-slate-800">
          <div className="bg-slate-800/80 rounded-xl p-4 text-xs text-slate-400 border border-slate-700 mb-6">
            <p className="leading-relaxed">
              <strong className="text-slate-200">Legal Disclaimer: </strong>
              NyayaPath AI provides general informational and educational guidance and does not replace professional legal advice. Laws, procedures, and authorities may vary by jurisdiction. Verify important information with official sources or a qualified professional.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <p>© {new Date().getFullYear()} NyayaPath AI. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Empowering Citizens with Accessible Legal Guidance
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

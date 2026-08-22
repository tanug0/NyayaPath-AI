import React from 'react';
import { Scale, Heart, Shield, Award } from 'lucide-react';
import DisclaimerBanner from './DisclaimerBanner';

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
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Civic Rights & Action Navigator converting citizens' everyday civic and legal struggles into structured understanding, verified knowledge, step-by-step action roadmaps, and formal communications.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-xs text-indigo-300 border border-slate-700">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>OOSC 4.0 Hackathon • IIIT Allahabad • Problem Statement 3</span>
            </div>
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
                <span>Zero Hallucinated URLs</span>
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
              <strong className="text-slate-200">Disclaimer: </strong>
              This information is for general awareness and does not replace professional legal advice. NyayaPath AI is an educational civic navigator prototype developed for the OOSC 4.0 Hackathon.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <p>© {new Date().getFullYear()} NyayaPath AI. Built for Civic & Legal Empowerment.</p>
            <p className="flex items-center gap-1">
              AI for Civic Good • Stage 1 MVP
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

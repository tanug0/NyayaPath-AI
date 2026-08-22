import React, { useState } from 'react';
import { Building2, FileCheck, ArrowUpRight, AlertCircle, MapPin, CheckCircle, Search, ShieldAlert, HelpCircle } from 'lucide-react';
import { INDIAN_STATES } from '../data/mockData';

export default function AuthorityFinder({ 
  selectedState = "Uttar Pradesh", 
  selectedCity = "Prayagraj", 
  customAuthority = null 
}) {
  const [filterState, setFilterState] = useState(selectedState);
  const [filterCity, setFilterCity] = useState(selectedCity);

  const fallbackMessage = "Jurisdiction-specific authority information is not available in the current knowledge base. Please verify with the relevant official state/local authority.";

  return (
    <div className="space-y-6">
      
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                Authority & Forum Finder
              </span>
              <span className="text-xs text-slate-500 font-medium">Civic Redressal Mapping</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Competent Civic Channels & Authorities</h3>
            <p className="text-sm text-slate-600">
              Identify the appropriate statutory authority, consumer commission, or mediation channel for dispute escalation.
            </p>
          </div>
        </div>

        {/* Location selector banner */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 shrink-0">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span>Target Jurisdiction:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 grow">
            <div>
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
            <div>
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
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-5 sm:p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-300">
                Primary Designated Forum
              </span>
              <h4 className="text-xl font-bold text-white mt-1">
                Local Rent Authority / Competent Civil & Mediation Forum
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                {filterCity ? `${filterCity}, ` : ''}{filterState || 'India'}
              </p>
            </div>
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm shrink-0">
              <Building2 className="w-6 h-6 text-amber-300" />
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          
          {/* Why it may be relevant */}
          <div>
            <h5 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
              Why It May Be Relevant
            </h5>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              Provides statutory dispute resolution mechanisms for tenancy matters, lease violations, security deposit recovery, and conciliation before approaching full civil litigation.
            </p>
          </div>

          {/* Required Documents */}
          <div>
            <h5 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2.5 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-indigo-600" />
              Required Documentation Checklist
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                "Copy of signed Tenancy Agreement / Rent Receipt records",
                "Bank transaction proof / Cheque counterfoil of ₹15,000 deposit",
                "Proof of key handover & move-out inspection correspondence",
                "Copy of sent formal written notice with postal/delivery tracking slip"
              ].map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Next Action */}
          <div>
            <h5 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
              Suggested Next Action
            </h5>
            <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-sm text-indigo-950">
              <p className="leading-relaxed">
                <strong>Pre-Litigation Notice:</strong> Serve the formal written demand notice and allow 7–14 business days for reply/settlement. If unresponsive, visit the District Legal Services Authority (DLSA) or file an online grievance via the National Consumer Helpline / District Rent Authority.
              </p>
            </div>
          </div>

          {/* Explicit Jurisdiction Fallback Notice */}
          <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-semibold block mb-1">Jurisdiction & Authority Verification Notice:</span>
              {fallbackMessage}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

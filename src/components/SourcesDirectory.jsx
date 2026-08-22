import React, { useState } from 'react';
import { BookmarkCheck, ExternalLink, ShieldCheck, Search, Filter, Globe, Info } from 'lucide-react';
import { ALL_VERIFIED_SOURCES } from '../data/mockData';

export default function SourcesDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const filteredSources = ALL_VERIFIED_SOURCES.filter(src => {
    const matchesQuery = src.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'ALL' || src.type.toLowerCase().includes(typeFilter.toLowerCase());

    return matchesQuery && matchesType;
  });

  return (
    <div className="space-y-6">
      
      {/* Directory Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Verified Civic Sources
              </span>
              <span className="text-xs text-slate-500 font-medium">Authentic Knowledge Base</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Official Portals & Legal References</h3>
            <p className="text-sm text-slate-600">
              Only authentic, government-operated grievance portals and verified statutory frameworks are listed.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search verified portals, statutory frameworks, RTI..."
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="ALL">All Source Types</option>
              <option value="Portal">Grievance Portals</option>
              <option value="Statutory">Statutory Bodies & Laws</option>
              <option value="Service">Public Services</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSources.map((src) => (
          <div
            key={src.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  {src.type}
                </span>
                {src.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Source
                  </span>
                )}
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-2">
                {src.title}
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {src.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Scope: {src.jurisdiction || 'National'}
              </span>

              {src.url ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">
                  Statutory Reference (No Portal URL)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredSources.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
          <Info className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <p className="font-semibold text-slate-700">No matching verified sources found.</p>
          <p className="text-xs mt-1">Try refining your search terms or filter.</p>
        </div>
      )}

      {/* Safety & Integrity Guarantee Notice */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
        <div>
          <strong>Strict Data Integrity Protocol:</strong> NyayaPath AI does not generate or speculate government URLs. Only verified, official portal addresses registered under <code>.gov.in</code> or <code>.nic.in</code> domains or statutory acts are displayed.
        </div>
      </div>

    </div>
  );
}

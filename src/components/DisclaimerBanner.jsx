import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function DisclaimerBanner({ compact = false }) {
  if (compact) {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-md text-xs text-amber-900 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Legal Disclaimer:</strong> This information is for general awareness and does not replace professional legal advice.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="p-2 bg-amber-100 rounded-lg shrink-0">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
        </div>
        <div className="text-sm text-amber-900 leading-relaxed">
          <span className="font-semibold block sm:inline">Statutory Notice & Civic Disclaimer: </span>
          This information is for general awareness and does not replace professional legal advice. Rules, administrative procedures, and authority jurisdictions may vary across states and local districts.
        </div>
      </div>
    </div>
  );
}

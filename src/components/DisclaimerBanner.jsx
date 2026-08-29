import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DisclaimerBanner({ compact = false }) {
  if (compact) {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-md text-xs text-amber-900 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Legal Disclaimer:</strong> NyayaPath AI provides general informational and educational guidance and does not replace professional legal advice. Laws, procedures, and authorities may vary by jurisdiction.
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
          <span className="font-semibold block sm:inline">Legal Disclaimer: </span>
          NyayaPath AI provides general informational and educational guidance and does not replace professional legal advice. Laws, procedures, and authorities may vary by jurisdiction. Verify important information with official sources or a qualified professional.
        </div>
      </div>
    </div>
  );
}

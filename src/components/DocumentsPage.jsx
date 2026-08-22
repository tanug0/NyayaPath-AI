import React, { useState } from 'react';
import { FileText, Copy, Check, Download, Printer, Edit3, Eye, Sparkles, Shield, RotateCcw } from 'lucide-react';
import { DEFAULT_DOCUMENT_TEMPLATE } from '../data/mockData';

export default function DocumentsPage({ initialContext = null }) {
  const [selectedDocType, setSelectedDocType] = useState(
    initialContext?.category?.toLowerCase().includes('consumer') ? 'CONSUMER' :
    initialContext?.category?.toLowerCase().includes('rti') ? 'RTI' : 'TENANCY'
  );
  
  const [docTitle, setDocTitle] = useState('Formal Written Demand Notice');
  const [docContent, setDocContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [serverError, setServerError] = useState(false);

  const fetchDocumentFromBackend = async (categoryType) => {
    setLoadingDoc(true);
    setServerError(false);
    try {
      const payload = {
        category: categoryType,
        problem: initialContext?.problem || (
          categoryType === 'TENANCY' ? 'My landlord has not returned my ₹15,000 security deposit after I moved out.' :
          categoryType === 'CONSUMER' ? 'I bought a defective product online and the seller has not resolved my complaint.' :
          'I want to file an RTI to get information about government spending on road repairs in my district.'
        ),
        state: initialContext?.state || '',
        city: initialContext?.city || '',
        language: initialContext?.language || 'English'
      };

      const res = await fetch('https://nyayapath-ai-backend.onrender.com/api/generate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.title) setDocTitle(data.title);
        if (data.content) setDocContent(data.content);
        setServerError(false);
      } else {
        setServerError(true);
      }
    } catch (err) {
      console.warn('[DocumentsPage] Server connection error:', err.message);
      setServerError(true);
    } finally {
      setLoadingDoc(false);
    }
  };

  const handleDocTypeChange = (type) => {
    setSelectedDocType(type);
    setIsEditing(false);
    fetchDocumentFromBackend(type);
  };

  // Initial load
  React.useEffect(() => {
    fetchDocumentFromBackend(selectedDocType);
  }, [initialContext]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(docContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedDocType}_PreLitigation_Notice.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
                Document Generator
              </span>
              <span className="text-xs text-slate-500 font-medium">Pre-Litigation Draft</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              {docTitle}
            </h3>
            <p className="text-sm text-slate-600">
              Customize, copy, print, or download this formal pre-litigation document with verified statutory citations.
            </p>
          </div>

          {/* Top Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isEditing
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {isEditing ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              {isEditing ? 'Preview Document' : 'Edit Text'}
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download .txt
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
          </div>
        </div>

        {/* Document Template Selector Tabs */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Templates:</span>
          <button
            type="button"
            onClick={() => handleDocTypeChange('TENANCY')}
            className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
              selectedDocType === 'TENANCY'
                ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-2xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Tenant Security Deposit Demand
          </button>
          <button
            type="button"
            onClick={() => handleDocTypeChange('CONSUMER')}
            className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
              selectedDocType === 'CONSUMER'
                ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-2xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Consumer Grievance Notice
          </button>
          <button
            type="button"
            onClick={() => handleDocTypeChange('RTI')}
            className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
              selectedDocType === 'RTI'
                ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-2xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            RTI Section 6(1) Application
          </button>
        </div>

        {/* Guidance tip */}
        <div className="mt-4 p-3.5 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-2.5 text-xs text-blue-900">
          <Shield className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <span>
            <strong>Recommended Dispatch Mode:</strong> Send this notice by <strong>Speed Post with Acknowledgement Due (AD)</strong> or Registered Email to create an admissible postal proof of service.
          </span>
        </div>
      </div>

      {/* Friendly Server Offline Warning */}
      {serverError && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm">
          <strong>Service Notice: </strong>
          Unable to connect to the analysis service. Please make sure the NyayaPath AI server is running.
        </div>
      )}

      {/* Loading State or Editable Area */}
      {loadingDoc ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">Loading document draft from backend...</p>
        </div>
      ) : isEditing ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Edit3 className="w-4 h-4 text-indigo-600" />
              Edit Document Directly
            </h4>
            <button
              onClick={() => setIsEditing(false)}
              className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
            >
              Done Editing
            </button>
          </div>
          <textarea
            rows={22}
            value={docContent}
            onChange={(e) => setDocContent(e.target.value)}
            className="w-full text-xs sm:text-sm font-mono bg-slate-50 border border-slate-300 rounded-xl p-4 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
          />
        </div>
      ) : (
        /* Formatted Printable Letter Paper View */
        <div className="bg-white rounded-2xl border border-slate-300 shadow-md p-6 sm:p-12 text-slate-900 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap selection:bg-indigo-200">
          {docContent}
        </div>
      )}

    </div>
  );
}

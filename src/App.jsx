import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AnalyzePage from './components/AnalyzePage';
import RoadmapComponent from './components/RoadmapComponent';
import DocumentsPage from './components/DocumentsPage';
import SourcesDirectory from './components/SourcesDirectory';
import AuthorityFinder from './components/AuthorityFinder';
import DisclaimerBanner from './components/DisclaimerBanner';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [docContext, setDocContext] = useState(null);

  const handleNavigateToDocs = (context = null) => {
    if (context) {
      setDocContext(context);
    }
    setActiveTab('documents');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 font-sans text-slate-900">
      
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {activeTab === 'home' && (
          <HomePage 
            onStartAnalyze={() => setActiveTab('analyze')}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'analyze' && (
          <AnalyzePage 
            onNavigateToDocs={handleNavigateToDocs}
            onNavigateToAuthority={() => setActiveTab('authority')}
            onNavigateToSources={() => setActiveTab('sources')}
          />
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Roadmap Overview
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                Pre-Litigation Action Roadmap
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Track your dispute progress through the standard 5 pre-litigation phases. Mark tasks completed to calculate your readiness score.
              </p>
            </div>
            <RoadmapComponent 
              onGenerateDoc={() => handleNavigateToDocs({ category: 'TENANCY' })}
              showTitle={false}
            />
            <DisclaimerBanner compact={true} />
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <DocumentsPage initialContext={docContext} />
            <DisclaimerBanner compact={true} />
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-6">
            <SourcesDirectory />
            <DisclaimerBanner compact={true} />
          </div>
        )}

        {activeTab === 'authority' && (
          <div className="space-y-6">
            <AuthorityFinder />
            <DisclaimerBanner compact={true} />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default App;


import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ShieldCheck, 
  RotateCcw, 
  Layers, 
  FileText,
  HelpCircle 
} from 'lucide-react';
import { CATEGORY_ROADMAPS, DEFAULT_ROADMAP_STEPS } from '../data/mockData';

export default function RoadmapComponent({ 
  initialSteps = null,
  category = "TENANCY",
  onGenerateDoc = null,
  showTitle = true,
  allowCategorySwitch = false
}) {
  const [selectedCategory, setSelectedCategory] = useState(category);

  // Normalize steps
  const getStepsForCategory = (cat) => {
    const key = (cat || "").toUpperCase();
    if (key.includes("CONSUMER")) return CATEGORY_ROADMAPS.CONSUMER;
    if (key.includes("RTI")) return CATEGORY_ROADMAPS.RTI;
    if (key.includes("CIVIC") || key.includes("PUBLIC") || key.includes("GOVT")) return CATEGORY_ROADMAPS.CIVIC;
    return CATEGORY_ROADMAPS.TENANCY;
  };

  const [steps, setSteps] = useState(() => {
    if (initialSteps && Array.isArray(initialSteps) && initialSteps.length > 0) {
      return initialSteps;
    }
    return getStepsForCategory(category);
  });

  // Sync with initialSteps if passed from outside
  useEffect(() => {
    if (initialSteps && Array.isArray(initialSteps) && initialSteps.length > 0) {
      setSteps(initialSteps);
    }
  }, [initialSteps]);

  const handleCategoryChange = (newCat) => {
    setSelectedCategory(newCat);
    setSteps(getStepsForCategory(newCat));
  };

  const toggleStep = (id) => {
    setSteps(prev =>
      prev.map(step =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const resetAll = () => {
    setSteps(prev => prev.map(step => ({ ...step, completed: false })));
  };

  const completedCount = steps.filter(s => s.completed).length;
  const progressPercentage = Math.round((completedCount / (steps.length || 1)) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7">
      
      {/* Header */}
      {showTitle && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Action Roadmap
              </span>
              <span className="text-xs text-slate-500 font-medium">5 Sequential Milestones</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Structured Action Plan</h3>
            <p className="text-sm text-slate-600">
              Follow these recommended pre-litigation and civic steps to resolve your dispute systematically.
            </p>
          </div>
          
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={resetAll}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Standalone Category Selector if allowed */}
      {allowCategorySwitch && (
        <div className="my-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Select Issue Roadmap:</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'TENANCY', label: 'Tenancy & Housing' },
              { id: 'CONSUMER', label: 'Consumer Protection' },
              { id: 'RTI', label: 'Right to Information (RTI)' },
              { id: 'CIVIC', label: 'Government & Public Services' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-semibold text-slate-800 flex items-center gap-2">
            <span>Progress:</span>
            <span className="text-indigo-600 font-bold">{completedCount} of {steps.length} Steps Completed</span>
          </span>
          <span className="font-bold text-indigo-700 text-sm">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {progressPercentage === 100 && (
          <p className="text-xs font-medium text-emerald-700 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> All preparatory steps completed. You are ready for formal submission or escalation.
          </p>
        )}
      </div>

      {/* Step items */}
      <div className="space-y-3.5">
        {steps.map((step, index) => {
          const isDone = step.completed;
          return (
            <div
              key={step.id || index}
              onClick={() => toggleStep(step.id)}
              className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 select-none ${
                isDone
                  ? 'bg-emerald-50/70 border-emerald-200 text-slate-900'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs'
              }`}
            >
              {/* Checkbox button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStep(step.id);
                }}
                className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : 'border-2 border-slate-300 hover:border-indigo-500 bg-white'
                }`}
                aria-label={`Mark step ${index + 1} as ${isDone ? 'incomplete' : 'complete'}`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 text-slate-300" />}
              </button>

              {/* Step info */}
              <div className="grow">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    Step {index + 1}
                  </span>
                  <h4 className={`text-sm sm:text-base font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {step.title}
                  </h4>
                </div>
                <p className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${isDone ? 'text-slate-500' : 'text-slate-600'}`}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional CTA to Generate Document */}
      {onGenerateDoc && (
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Need a pre-drafted representation for Step 3?
          </span>
          <button
            type="button"
            onClick={onGenerateDoc}
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            Generate Pre-Drafted Notice
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}

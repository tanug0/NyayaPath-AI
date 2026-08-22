import React, { useState } from 'react';
import { CheckCircle2, Circle, ArrowRight, ShieldCheck, Check, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';
import { DEFAULT_ROADMAP_STEPS } from '../data/mockData';

export default function RoadmapComponent({ 
  initialSteps = DEFAULT_ROADMAP_STEPS, 
  onGenerateDoc = null,
  showTitle = true 
}) {
  const [steps, setSteps] = useState(initialSteps);

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
  const progressPercentage = Math.round((completedCount / steps.length) * 100);

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
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isDone = step.completed;
          return (
            <div
              key={step.id}
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
                className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : 'border-2 border-slate-300 text-transparent hover:border-indigo-500'
                }`}
                aria-label={isDone ? 'Mark as pending' : 'Mark as completed'}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Circle className="w-3.5 h-3.5" />}
              </button>

              {/* Step info */}
              <div className="grow">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      Step {index + 1}
                    </span>
                    <h4 className={`text-base font-semibold ${isDone ? 'line-through text-slate-600' : 'text-slate-900'}`}>
                      {step.title}
                    </h4>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    isDone 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {isDone ? 'Completed' : 'Pending Action'}
                  </span>
                </div>

                <p className={`text-sm mt-1.5 leading-relaxed ${isDone ? 'text-slate-500' : 'text-slate-600'}`}>
                  {step.description}
                </p>

                {/* Contextual action for step 3 */}
                {step.id === 3 && onGenerateDoc && !isDone && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onGenerateDoc();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Open Document Template for this step
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

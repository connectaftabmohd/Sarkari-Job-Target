import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { McqQuestion } from '../types/blog';

interface McqBlockProps {
  questions: McqQuestion[];
}

export function McqBlock({ questions }: McqBlockProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  if (questions.length === 0) return null;

  const handleSelect = (questionId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  return (
    <section aria-labelledby="mcq-practice-heading" className="mt-10 pt-8 border-t border-slate-200">
      <h2 id="mcq-practice-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        अभ्यास प्रश्न (MCQs)
      </h2>
      <p className="text-sm text-slate-600 mb-6">
        अपनी तैयारी की जाँच के लिए नीचे दिए गए बहुविकल्पीय प्रश्नों का उत्तर चुनें:
      </p>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const chosen = selectedAnswers[q.id];
          const isAnswered = chosen !== undefined;
          const isCorrect = isAnswered && chosen === q.correctIndex;

          return (
            <div
              key={q.id}
              className="border border-slate-200 rounded-lg p-5 bg-slate-50/60"
            >
              <p className="text-base font-semibold text-slate-900 mb-4 leading-relaxed">
                <span className="tabular-nums text-[#C81E1E] mr-1.5">प्रश्न {qIdx + 1}.</span>
                {q.question}
              </p>

              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = chosen === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let buttonStyle =
                    'bg-white border-slate-200 text-slate-800 hover:border-[#C81E1E] hover:bg-[#C81E1E]/5';
                  if (isAnswered) {
                    if (isThisCorrect) {
                      buttonStyle = 'bg-emerald-50 border-emerald-600 text-emerald-950 font-medium';
                    } else if (isThisSelected && !isThisCorrect) {
                      buttonStyle = 'bg-rose-50 border-rose-500 text-rose-950';
                    } else {
                      buttonStyle = 'bg-white border-slate-200 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left px-4 py-3 rounded-lg border text-sm flex items-center justify-between gap-3 transition-colors ${buttonStyle}`}
                    >
                      <span>
                        <span className="font-semibold mr-2 tabular-nums">
                          ({String.fromCharCode(65 + optIdx)})
                        </span>
                        {opt}
                      </span>
                      {isAnswered && isThisCorrect && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 shrink-0">
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          सही उत्तर
                        </span>
                      )}
                      {isAnswered && isThisSelected && !isThisCorrect && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-800 shrink-0">
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          गलत उत्तर
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="mt-4 p-3.5 rounded-lg bg-white border border-slate-200 text-sm text-slate-700 leading-relaxed">
                  <span
                    className={`font-semibold mr-1.5 ${
                      isCorrect ? 'text-emerald-800' : 'text-[#C81E1E]'
                    }`}
                  >
                    {isCorrect ? 'सही जवाब — व्याख्या:' : 'सही उत्तर की व्याख्या:'}
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

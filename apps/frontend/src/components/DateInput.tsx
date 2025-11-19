import { useState } from 'react';

interface DateInputProps {
  onCalculate: (date: string) => void;
  loading: boolean;
  calculationComplete: boolean;
  onTravel: () => void;
}

export function DateInput({ onCalculate, loading, calculationComplete, onTravel }: DateInputProps) {
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && !calculationComplete) {
      onCalculate(date);
    }
  };

  const handleTravelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (calculationComplete) {
      onTravel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
            Target Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 bg-sci-fi-dark border border-sci-fi-blue/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sci-fi-blue focus:border-transparent"
            required
            disabled={loading}
          />
        </div>
        <button
          type={calculationComplete ? "button" : "submit"}
          onClick={calculationComplete ? handleTravelClick : undefined}
          disabled={loading || (!calculationComplete && !date)}
          className="px-8 py-3 bg-gradient-to-r from-sci-fi-blue to-sci-fi-cyan text-white font-semibold rounded-lg hover:from-sci-fi-cyan hover:to-sci-fi-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sci-fi-blue/20 flex items-center justify-center gap-2 min-w-[140px]"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Calculating...</span>
            </>
          ) : calculationComplete ? (
            'Travel'
          ) : (
            'Calculate'
          )}
        </button>
      </div>
    </form>
  );
}


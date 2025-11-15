import { useState } from 'react';

interface DateInputProps {
  onCalculate: (date: string) => void;
  loading: boolean;
}

export function DateInput({ onCalculate, loading }: DateInputProps) {
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) {
      onCalculate(date);
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
          type="submit"
          disabled={loading || !date}
          className="px-8 py-3 bg-gradient-to-r from-sci-fi-blue to-sci-fi-cyan text-white font-semibold rounded-lg hover:from-sci-fi-cyan hover:to-sci-fi-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sci-fi-blue/20"
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </div>
    </form>
  );
}


import { useState } from 'react';
import { DateInput } from './components/DateInput';
import { MetricCard } from './components/MetricCard';
import { ResultsTable } from './components/ResultsTable';
import { TimeTravelEffect } from './components/TimeTravelEffect';
import { calculateParameters } from './lib/api';
import { CalculationResponse } from './lib/types';
import { formatDate, formatNumber } from './lib/format';

function App() {
  const [data, setData] = useState<CalculationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [showTimeTravel, setShowTimeTravel] = useState(false);

  const handleCalculate = async (date: string) => {
    setLoading(true);
    setError(null);
    setCalculationComplete(false);
    setData(null);
    try {
      const result = await calculateParameters(date);
      // Wait 10 seconds before showing results
      setTimeout(() => {
        setData(result);
        setCalculationComplete(true);
        setLoading(false);
      }, 10000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleTravel = () => {
    setShowTimeTravel(true);
    // Hide the effect after animation completes
    setTimeout(() => {
      setShowTimeTravel(false);
    }, 5000);
  };

  const handleCopyJSON = () => {
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    }
  };

  const handleDownloadCSV = () => {
    if (!data) return;

    const headers = ['Metric', 'Value', 'Unit', 'Description'];
    const rows = data.metrics.map(m => [
      m.name,
      m.value.toString(),
      m.unit,
      m.description
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `time-travel-parameters-${data.summary.inputDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sci-fi-dark via-purple-900/20 to-sci-fi-dark text-white relative overflow-hidden">
      {showTimeTravel && <TimeTravelEffect />}
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sci-fi-blue to-sci-fi-cyan bg-clip-text text-transparent">
            Time Travel Parameter Calculator
          </h1>
          <p className="text-gray-400 text-lg">
            Calculate temporal displacement metrics for any target date
          </p>
        </header>

        <DateInput 
          onCalculate={handleCalculate} 
          loading={loading}
          calculationComplete={calculationComplete}
          onTravel={handleTravel}
        />

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {data && (
          <div className="space-y-8">
            {/* Summary */}
            <div className="bg-gradient-to-br from-sci-fi-dark/80 to-sci-fi-dark border border-sci-fi-blue/30 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-sci-fi-blue mb-4">Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Input Date</div>
                  <div className="text-lg font-semibold text-white">{formatDate(data.summary.inputDate)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Delta Days</div>
                  <div className="text-lg font-semibold text-white">{formatNumber(data.summary.deltaDays, 0)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Delta Years</div>
                  <div className="text-lg font-semibold text-white">{formatNumber(data.summary.deltaYears, 3)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Seed</div>
                  <div className="text-lg font-semibold text-white">{data.summary.seed}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleCopyJSON}
                className="px-6 py-3 bg-sci-fi-blue/20 border border-sci-fi-blue/50 text-sci-fi-blue rounded-lg hover:bg-sci-fi-blue/30 transition-colors"
              >
                Copy JSON
              </button>
              <button
                onClick={handleDownloadCSV}
                className="px-6 py-3 bg-sci-fi-blue/20 border border-sci-fi-blue/50 text-sci-fi-blue rounded-lg hover:bg-sci-fi-blue/30 transition-colors"
              >
                Download CSV
              </button>
            </div>

            {/* Metric Cards */}
            <div>
              <h2 className="text-2xl font-semibold text-sci-fi-blue mb-6">Time Travel Parameters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.metrics.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>
            </div>

            {/* Results Table */}
            <div>
              <h2 className="text-2xl font-semibold text-sci-fi-blue mb-6">Detailed Results</h2>
              <div className="bg-sci-fi-dark/50 border border-sci-fi-blue/20 rounded-lg p-6">
                <ResultsTable metrics={data.metrics} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


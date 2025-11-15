import { formatNumber } from '../lib/format.js';

interface MetricCardProps {
  name: string;
  value: number;
  unit: string;
  description: string;
}

export function MetricCard({ name, value, unit, description }: MetricCardProps) {
  return (
    <div className="bg-gradient-to-br from-sci-fi-dark to-sci-fi-dark/80 border border-sci-fi-blue/20 rounded-lg p-6 hover:border-sci-fi-blue/40 transition-all duration-300 shadow-lg">
      <h3 className="text-lg font-semibold text-sci-fi-blue mb-2">{name}</h3>
      <div className="mb-3">
        <span className="text-3xl font-bold text-white">{formatNumber(value)}</span>
        <span className="text-sm text-gray-400 ml-2">{unit}</span>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}


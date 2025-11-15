import { formatNumber } from '../lib/format.js';

interface Metric {
  name: string;
  value: number;
  unit: string;
  description: string;
}

interface ResultsTableProps {
  metrics: Metric[];
}

export function ResultsTable({ metrics }: ResultsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-sci-fi-blue/30">
            <th className="text-left py-3 px-4 text-sci-fi-blue font-semibold">Metric</th>
            <th className="text-right py-3 px-4 text-sci-fi-blue font-semibold">Value</th>
            <th className="text-left py-3 px-4 text-sci-fi-blue font-semibold">Unit</th>
            <th className="text-left py-3 px-4 text-sci-fi-blue font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, index) => (
            <tr
              key={index}
              className="border-b border-sci-fi-blue/10 hover:bg-sci-fi-blue/5 transition-colors"
            >
              <td className="py-3 px-4 text-white font-medium">{metric.name}</td>
              <td className="py-3 px-4 text-right text-white">{formatNumber(metric.value)}</td>
              <td className="py-3 px-4 text-gray-400">{metric.unit}</td>
              <td className="py-3 px-4 text-gray-400 text-sm">{metric.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


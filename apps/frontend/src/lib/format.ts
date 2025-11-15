export function formatNumber(value: number, decimals: number = 2): string {
  if (value === 0) return '0';
  if (Math.abs(value) < 0.01) {
    return value.toExponential(decimals);
  }
  if (Math.abs(value) >= 1e6) {
    return value.toExponential(decimals);
  }
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00Z');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}


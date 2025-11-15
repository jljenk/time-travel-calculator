import { CalculationResponse } from './types.js';

const API_BASE = '/api';

export async function calculateParameters(date: string): Promise<CalculationResponse> {
  const response = await fetch(`${API_BASE}/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to calculate parameters');
  }

  return response.json();
}


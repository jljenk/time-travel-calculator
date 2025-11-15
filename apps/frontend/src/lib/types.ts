export interface CalculationResponse {
  summary: {
    inputDate: string;
    deltaDays: number;
    deltaYears: number;
    seed: number;
  };
  metrics: {
    name: string;
    value: number;
    unit: string;
    description: string;
  }[];
}


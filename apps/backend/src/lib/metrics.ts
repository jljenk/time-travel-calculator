import { SeededPRNG } from './prng.js';

const PI = Math.PI;
const E = Math.E;
const C = 299792458; // speed of light in m/s

export interface Metric {
  name: string;
  value: number;
  unit: string;
  description: string;
}

export function calculateAllMetrics(
  deltaDays: number,
  deltaYears: number,
  seed: number
): Metric[] {
  const prng = new SeededPRNG(seed);

  // 1. Temporal Displacement Energy (TDE)
  const tdeNoise = prng.random(0, 0.2);
  const tde = Math.abs(deltaYears) ** 3 * PI * (1 + tdeNoise);

  // 2. Chroniton Density (CD)
  const cd = Math.exp(-Math.abs(deltaDays) / 42) * 1000;

  // 3. Flux Instability Index (FII)
  const fii = Math.sin(deltaDays / 7) + 0.5 * Math.sin(deltaDays / 3);

  // 4. Spacetime Curvature Delta (SCD)
  const m = 5.972e24; // Earth mass in kg
  const r = 6.371e6; // Earth radius in meters
  const scd = (6.674e-11 * m) / (r * r);

  // 5. Quantum Drift Factor (QDF) - Logistic map
  let qdf = 0.5;
  for (let i = 0; i < 20; i++) {
    qdf = 3.7 * qdf * (1 - qdf);
  }

  // 6. Dimensional Overlap Ratio (DOR)
  const dorBase = (Math.sin(deltaYears / 13) + 1) / 2;
  const dorNoise = prng.random(-0.05, 0.05);
  const dor = Math.max(0, Math.min(1, dorBase + dorNoise));

  // 7. Entropy Deviation Coefficient (EDC)
  const edc = Math.log10(Math.abs(deltaDays) + 1) * 0.5;

  // 8. Chronometric Stability Index (CSI)
  const csi = 100 - 250 * (Math.abs(fii) * (qdf + 0.01)) / (cd + 1);
  const csiClamped = Math.max(0, Math.min(100, csi));

  // 9. Relativity Compression Factor (RCF)
  const v = Math.abs(deltaDays) * 1000; // fictional velocity in m/s
  const vOverC = v / (0.01 * C);
  const rcf = 1 / Math.sqrt(1 - vOverC * vOverC);
  const rcfClamped = isFinite(rcf) ? rcf : 1e10;

  // 10. Time Loop Probability (TLP)
  const combined = (tde / 1000) + (cd / 100) + Math.abs(fii) + qdf;
  const tlp = 1 / (1 + Math.exp(-combined / 10));
  const tlpPercent = tlp * 100;

  return [
    {
      name: 'Temporal Displacement Energy',
      value: tde,
      unit: 'TDE',
      description: 'Energy required to shift temporal frame'
    },
    {
      name: 'Chroniton Density',
      value: cd,
      unit: 'chronitons/m³',
      description: 'Chroniton particle density in spacetime'
    },
    {
      name: 'Flux Instability Index',
      value: fii,
      unit: 'FII',
      description: 'Spacetime flux volatility measure'
    },
    {
      name: 'Spacetime Curvature Delta',
      value: scd,
      unit: 'm/s²',
      description: 'Gravitational distortion coefficient'
    },
    {
      name: 'Quantum Drift Factor',
      value: qdf,
      unit: 'QDF',
      description: 'Quantum chaos drift measurement'
    },
    {
      name: 'Dimensional Overlap Ratio',
      value: dor,
      unit: 'DOR',
      description: 'Adjacent dimension overlap percentage'
    },
    {
      name: 'Entropy Deviation Coefficient',
      value: edc,
      unit: 'EDC',
      description: 'Temporal entropy deviation measure'
    },
    {
      name: 'Chronometric Stability Index',
      value: csiClamped,
      unit: 'CSI',
      description: 'Time measurement stability (0-100)'
    },
    {
      name: 'Relativity Compression Factor',
      value: rcfClamped,
      unit: 'RCF',
      description: 'Lorentz-style temporal distortion'
    },
    {
      name: 'Time Loop Probability',
      value: tlpPercent,
      unit: '%',
      description: 'Probability of temporal loop formation'
    }
  ];
}


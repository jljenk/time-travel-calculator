import { Router, Request, Response } from 'express';
import { parseDate, calculateDelta, generateSeed } from '../lib/time.js';
import { calculateAllMetrics } from '../lib/metrics.js';
import { CalculationResponse } from '../lib/types.js';

const router: Router = Router();

router.post('/calculate', (req: Request, res: Response) => {
  try {
    const { date } = req.body;

    if (!date || typeof date !== 'string') {
      return res.status(400).json({ error: 'Date is required (format: YYYY-MM-DD)' });
    }

    const inputDate = parseDate(date);
    const { deltaDays, deltaYears } = calculateDelta(inputDate);
    const seed = generateSeed(inputDate);

    const metrics = calculateAllMetrics(deltaDays, deltaYears, seed);

    const response: CalculationResponse = {
      summary: {
        inputDate: date,
        deltaDays,
        deltaYears,
        seed
      },
      metrics
    };

    res.json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router;


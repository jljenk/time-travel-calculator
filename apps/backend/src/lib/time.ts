export function parseDate(dateStr: string): Date {
  const date = new Date(dateStr + 'T00:00:00Z');
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format. Expected YYYY-MM-DD');
  }
  return date;
}

export function calculateDelta(date: Date): { deltaDays: number; deltaYears: number } {
  const now = new Date();
  const nowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const inputUTC = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  
  const deltaMs = inputUTC.getTime() - nowUTC.getTime();
  const deltaDays = Math.floor(deltaMs / (1000 * 60 * 60 * 24));
  const deltaYears = deltaDays / 365.25;
  
  return { deltaDays, deltaYears };
}

export function generateSeed(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return year * 10000 + month * 100 + day;
}


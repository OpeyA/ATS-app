// A tiny, safe ID helper used everywhere you need a new id
export const recordID = () =>
  (typeof globalThis !== 'undefined' &&
   (globalThis as any).crypto &&
   typeof (globalThis as any).crypto.randomUUID === 'function')
    ? (globalThis as any).crypto.randomUUID()
    : Math.random().toString(36).slice(2);
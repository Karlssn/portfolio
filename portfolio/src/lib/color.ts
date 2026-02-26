/**
 * Parse CSS HSL var (e.g. "45 95% 55%" as used by Tailwind) and return hex number for Three.js/Vanta.
 */
export function cssHslToHex(cssHsl: string): number {
  const parts = cssHsl.trim().split(/\s+/);
  if (parts.length < 3) return 0x0f0f0f;
  const h = Math.max(0, Math.min(360, parseFloat(parts[0]) || 0)) / 360;
  const s = Math.max(0, Math.min(100, parseFloat(parts[1]) || 0)) / 100;
  const l = Math.max(0, Math.min(100, parseFloat(parts[2]) || 0)) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 1 / 6) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 2 / 6) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 3 / 6) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 4 / 6) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 5 / 6) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }
  const toByte = (n: number) => Math.round((n + m) * 255);
  const rr = toByte(r),
    gg = toByte(g),
    bb = toByte(b);
  return (rr << 16) | (gg << 8) | bb;
}

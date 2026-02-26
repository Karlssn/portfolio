interface VantaEffect {
  destroy?: () => void;
}

declare module 'vanta/dist/vanta.trunk.min' {
  export default function TRUNK(options: { el: HTMLElement | null; p5?: unknown; [key: string]: unknown }): VantaEffect;
}

declare module 'p5' {
  const p5: unknown;
  export default p5;
}

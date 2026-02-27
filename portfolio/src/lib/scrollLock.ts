let scrollLockOverride = false;

export function setScrollLockOverride(enabled: boolean) {
  scrollLockOverride = enabled;
}

export function isScrollLockOverridden(): boolean {
  return scrollLockOverride;
}


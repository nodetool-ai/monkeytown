import '@testing-library/jest-dom';
import { vi } from 'vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

Element.prototype.scrollIntoView = vi.fn();

(global as unknown as { CSS: { supports: (query: string) => boolean; escape: (str: string) => string } }).CSS = {
  supports: vi.fn(() => false),
  escape: vi.fn((str: string) => str),
};

const { getComputedStyle } = window;
window.getComputedStyle = (elt: Element) => {
  const styles = getComputedStyle(elt);
  return {
    ...styles,
    getPropertyValue: (prop: string) => {
      if (prop === 'color') return 'rgb(234, 234, 234)';
      if (prop === 'background-color') return 'rgb(26, 26, 46)';
      return styles.getPropertyValue(prop) || '';
    },
  };
};

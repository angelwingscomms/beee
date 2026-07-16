import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { motionMagnetic } from './motion';

beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('motionMagnetic', () => {
  it('translates the node toward the cursor on mousemove', () => {
    const node = document.createElement('button');
    document.body.appendChild(node);
    motionMagnetic(node);

    // getBoundingClientRect() is 0/0/0/0 in jsdom, so the node's center is (0, 0)
    node.dispatchEvent(new MouseEvent('mousemove', { clientX: 40, clientY: 24 }));

    expect(node.style.transform).toBe('translate(5px, 3px) scale(1)');
  });

  it('scales down on mousedown and back up on mouseup', () => {
    const node = document.createElement('button');
    document.body.appendChild(node);
    motionMagnetic(node);

    node.dispatchEvent(new MouseEvent('mousedown'));
    expect(node.style.transform).toBe('translate(0px, 0px) scale(0.97)');

    node.dispatchEvent(new MouseEvent('mouseup'));
    expect(node.style.transform).toBe('translate(0px, 0px) scale(1)');
  });

  it('resets to origin on mouseleave', () => {
    const node = document.createElement('button');
    document.body.appendChild(node);
    motionMagnetic(node);

    node.dispatchEvent(new MouseEvent('mousemove', { clientX: 40, clientY: 24 }));
    node.dispatchEvent(new MouseEvent('mouseleave'));

    expect(node.style.transform).toBe('translate(0px, 0px) scale(1)');
  });

  it('removes all listeners when destroyed', () => {
    const node = document.createElement('button');
    document.body.appendChild(node);
    const handle = motionMagnetic(node);

    handle?.destroy();
    node.dispatchEvent(new MouseEvent('mousemove', { clientX: 40, clientY: 24 }));

    expect(node.style.transform).toBe('');
  });
});

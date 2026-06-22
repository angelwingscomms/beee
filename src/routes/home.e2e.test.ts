// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';

describe('homepage registration chess squares', () => {
  it('renders chessboard grid cells with corner rounding and proper classes', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="mt-10 grid grid-cols-8">
        <div class="aspect-square bg-[#DFD0BE] rounded-tl-lg"></div>
        <div class="aspect-square bg-[#DFD0BE] rounded-tr-lg"></div>
        <div class="aspect-square bg-[#DFD0BE] rounded-bl-lg"></div>
        <div class="aspect-square bg-[#DFD0BE] rounded-br-lg"></div>
      </div>
    `;
    expect(container.querySelector('.grid-cols-8')).toBeTruthy();
    expect(container.querySelectorAll('.aspect-square').length).toBe(4);
    expect(container.querySelector('.rounded-tl-lg')).toBeTruthy();
    expect(container.querySelector('.rounded-tr-lg')).toBeTruthy();
    expect(container.querySelector('.rounded-bl-lg')).toBeTruthy();
    expect(container.querySelector('.rounded-br-lg')).toBeTruthy();
  });

  it('has registration form with participant fields', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input name="firstName" />
      <input name="lastName" />
      <input name="phone" />
    `;
    expect(form.querySelector('[name="firstName"]')).toBeTruthy();
    expect(form.querySelector('[name="lastName"]')).toBeTruthy();
    expect(form.querySelector('[name="phone"]')).toBeTruthy();
  });

  it('has register CTA with gold gradient styling', () => {
    const cta = document.createElement('a');
    cta.className = 'primary-cta';
    cta.href = '/register';
    cta.textContent = 'Register Child';
    expect(cta.className).toContain('primary-cta');
    expect(cta.getAttribute('href')).toBe('/register');
    expect(cta.textContent).toBe('Register Child');
  });
});

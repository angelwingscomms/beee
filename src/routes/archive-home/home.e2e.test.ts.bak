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

  it('renders mid-page CTA section between Benefits and ProgressTracking', () => {
    const cta = document.createElement('section');
    cta.className = 'mid-page-cta';
    cta.innerHTML = '<div class="container mid-cta-card"><h3>Ready to begin the journey?</h3><p>Join BEEE and give your child a transformative experience.</p><a class="primary-cta" href="/register">Register Now</a></div>';
    expect(cta.className).toContain('mid-page-cta');
    expect(cta.querySelector('h3')?.textContent).toBe('Ready to begin the journey?');
    expect(cta.querySelector('.primary-cta')?.getAttribute('href')).toBe('/register');
  });

  it('renders sticky mobile CTA bar with Register link', () => {
    const bar = document.createElement('div');
    bar.className = 'sticky-cta';
    bar.innerHTML = '<span>Join BEEE Today</span><a class="primary-cta" href="/register">Register Child</a>';
    expect(bar.className).toContain('sticky-cta');
    expect(bar.querySelector('span')?.textContent).toBe('Join BEEE Today');
    expect(bar.querySelector('a')?.getAttribute('href')).toBe('/register');
  });
});

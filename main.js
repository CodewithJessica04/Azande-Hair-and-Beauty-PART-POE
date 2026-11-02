/** Azande Hair & Beauty — shared website behaviour (no dependencies). */
(() => {
  'use strict';
  const WHATSAPP_NUMBER = '27614964840';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const value = id => ($(`#${id}`)?.value || '').trim();

  function toast(message) {
    let element = $('#toastContainer');
    if (!element) {
      element = document.createElement('div');
      element.id = 'toastContainer';
      element.setAttribute('role', 'status');
      element.setAttribute('aria-live', 'polite');
      document.body.append(element);
    }
    element.textContent = message;
    element.classList.add('visible');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.classList.remove('visible'), 5000);
  }

  function openWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open WhatsApp to send your request';
      link.className = 'whatsapp-fallback';
      const old = $('.whatsapp-fallback');
      if (old) old.remove();
      ($('form:focus-within') || $('#bookingForm') || $('#contactForm') || document.body).append(link);
      toast('WhatsApp did not open automatically. Use the new link to continue.');
    } else {
      toast('WhatsApp opened. Please press Send there; your request is not yet confirmed.');
    }
  }

  function validPhone(phone) {
    const normalized = phone.replace(/[\s()-]/g, '');
    return /^(?:0[1-8]\d{8}|\+27[1-8]\d{8}|27[1-8]\d{8})$/.test(normalized);
  }

  function localToday() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function initNavigation() {
    const toggle = $('.mobile-toggle');
    const links = $('.nav-links');
    if (toggle && links) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', 'site-navigation');
      links.id = 'site-navigation';
      const close = () => {
        links.classList.remove('mobile-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      };
      toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('mobile-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      });
      $$('a', links).forEach(link => link.addEventListener('click', close));
      document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
      document.addEventListener('click', event => {
        if (!links.contains(event.target) && !toggle.contains(event.target)) close();
      });
      window.addEventListener('resize', () => { if (window.innerWidth > 900) close(); });
    }
    const page = location.pathname.split('/').pop() || 'index.html';
    $$('.nav-links a').forEach(link => {
      const active = link.getAttribute('href') === page;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const nav = $('.navbar');
    if (nav) {
      const update = () => nav.classList.toggle('scrolled', window.scrollY > 60);
      window.addEventListener('scroll', update, { passive: true });
      update();
    }
  }

  function initFaq() {
    const items = $$('.faq-item');
    items.forEach((item, index) => {
      const question = $('.question', item);
      const answer = $('.answer', item);
      if (!question || !answer) return;
      question.setAttribute('role', 'button');
      question.setAttribute('tabindex', '0');
      const id = `faq-answer-${index + 1}`;
      answer.id = id;
      question.setAttribute('aria-controls', id);
      const toggle = () => {
        const next = !item.classList.contains('open');
        items.forEach(other => other.classList.remove('open'));
        if (next) item.classList.add('open');
        items.forEach(other => {
          const q = $('.question', other);
          if (q) q.setAttribute('aria-expanded', String(other.classList.contains('open')));
        });
      };
      question.addEventListener('click', toggle);
      question.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggle();
        }
      });
      item.classList.toggle('open', index === 0);
      question.setAttribute('aria-expanded', String(index === 0));
    });
  }

  function initTabs() {
    const tabs = $$('.tab-btn');
    const panels = $$('.tab-content');
    if (!tabs.length) return;
    tabs.forEach(tab => {
      tab.setAttribute('role', 'tab');
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        if (!panels.some(panel => panel.id === target)) return;
        tabs.forEach(button => {
          const active = button === tab;
          button.classList.toggle('active', active);
          button.classList.toggle('inactive', !active);
          button.setAttribute('aria-selected', String(active));
        });
        panels.forEach(panel => {
          const active = panel.id === target;
          panel.classList.toggle('active', active);
          panel.hidden = !active;
        });
      });
    });
    (tabs.find(tab => tab.classList.contains('active')) || tabs[0]).click();
  }

  function initContact() {
    const form = $('#contactForm');
    if (!form) return;
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = value('contactName');
      const email = value('contactEmail');
      const phone = value('contactPhone');
      const message = value('contactMessage');
      if (!name || !email || !message) return toast('Please complete the required fields.');
      if (phone && !validPhone(phone)) return toast('Enter a valid South African phone number.');
      openWhatsApp(`Hello Azande,\n\nI have a question about your services.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`);
      // Keep the form values until the customer chooses to clear them.
    });
  }

  function initBooking() {
    const form = $('#bookingForm');
    if (!form) return;
    const dateInput = $('#preferredDate');
    const updateMin = () => { if (dateInput) dateInput.min = localToday(); };
    updateMin();
    dateInput?.addEventListener('focus', updateMin);
    form.addEventListener('submit', event => {
      event.preventDefault();
      updateMin();
      if (!form.reportValidity()) return;
      const name = value('fullName');
      const phone = value('phone');
      const hairstyle = value('hairstyle');
      const date = value('preferredDate');
      const time = value('preferredTime');
      if (!name || !phone || !hairstyle || !date || !time) return toast('Complete all required booking details.');
      if (!validPhone(phone)) return toast('Enter a valid South African phone number.');
      if (date < localToday()) return toast('Please choose today or a future date.');
      const selected = new Date(`${date}T${time}:00`);
      if (Number.isNaN(selected.getTime()) || selected <= new Date()) {
        return toast('Please choose a future appointment date and time.');
      }
      const service = $('#serviceType');
      const serviceLabel = service?.selectedOptions[0]?.textContent.trim() || value('serviceType');
      const details = [
        'Hello Azande,', '', 'I would like to request a braiding appointment.', '',
        `Name: ${name}`, `Phone: ${phone}`, `Hairstyle: ${hairstyle}`,
        `Preferred date: ${date}`, `Preferred time: ${time}`,
        `Service type: ${serviceLabel}`,
        `Hairpiece needed: ${value('hairpieceNeeded') || 'Not specified'}`,
        ...(value('notes') ? ['', `Additional notes: ${value('notes')}`] : []),
        '', 'Please confirm the availability and final price. Thank you!'
      ];
      openWhatsApp(details.join('\n'));
    });
  }

  function initAnchors() {
    $$('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      const offset = $('.navbar')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      history.replaceState(null, '', hash);
    }));
  }

  function init() {
    initNavigation();
    initFaq();
    initTabs();
    initContact();
    initBooking();
    initAnchors();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

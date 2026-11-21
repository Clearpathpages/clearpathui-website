/* ClearpathUI — site scripts */
(function () {
  'use strict';

  // Base44 backend: quote requests are saved to the QuoteRequest entity.
  var BASE44_APP_ID = '6b01a63f4beacd839e245e55';
  var BASE44_ENDPOINT = 'https://app.base44.com/api/apps/' + BASE44_APP_ID + '/entities/QuoteRequest';
  var FALLBACK_EMAIL = 'info@clearpathui.com';

  // Web3Forms: emails a copy of each quote request to info@clearpathui.com.
  // The access key is public by design (it can only send to the address it was created for).
  var WEB3FORMS_KEY = 'f8747265-aa2f-48c2-94f1-651418557157';
  var WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

  // Footer year
  document.querySelectorAll('.year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Header border on scroll
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    var setOpen = function (open) {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function () { setOpen(!links.classList.contains('open')); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 820) setOpen(false); });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---------- Quote form ----------
  var form = document.getElementById('quote-form');
  if (!form) return;

  var statusEl = document.getElementById('form-status');
  var submitBtn = document.getElementById('submit-btn');
  var btnLabel = submitBtn.querySelector('.btn-label');
  var servicesGroup = document.getElementById('services-group');
  var successEl = document.getElementById('success');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Preselect a service from ?service=... links
  var preset = new URLSearchParams(window.location.search).get('service');
  if (preset) {
    form.querySelectorAll('input[name="services"]').forEach(function (cb) {
      if (cb.value.toLowerCase().indexOf(preset.toLowerCase()) === 0) cb.checked = true;
    });
  }

  function fieldOf(input) { return input.closest('.field'); }

  function validateInput(input) {
    var v = input.value.trim();
    var ok = v.length > 0;
    if (ok && input.type === 'email') ok = emailRe.test(v);
    fieldOf(input).classList.toggle('invalid', !ok);
    input.setAttribute('aria-invalid', String(!ok));
    return ok;
  }

  function validateServices() {
    var ok = form.querySelectorAll('input[name="services"]:checked').length > 0;
    servicesGroup.classList.toggle('invalid', !ok);
    return ok;
  }

  var required = Array.prototype.slice.call(form.querySelectorAll('[required]'));
  required.forEach(function (input) {
    input.addEventListener('blur', function () { if (input.value.trim()) validateInput(input); });
    input.addEventListener('input', function () { if (fieldOf(input).classList.contains('invalid')) validateInput(input); });
  });
  servicesGroup.addEventListener('change', function () { if (servicesGroup.classList.contains('invalid')) validateServices(); });

  function showError(html) { statusEl.innerHTML = html; statusEl.classList.add('show'); }
  function clearError() { statusEl.innerHTML = ''; statusEl.classList.remove('show'); }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    btnLabel.textContent = loading ? 'Sending…' : 'Send my request';
    var icon = submitBtn.querySelector('svg, .spinner');
    if (loading && icon && icon.tagName.toLowerCase() === 'svg') {
      var s = document.createElement('span'); s.className = 'spinner'; s.setAttribute('aria-hidden', 'true');
      icon.replaceWith(s);
    } else if (!loading && icon && icon.classList && icon.classList.contains('spinner')) {
      icon.outerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    }
  }

  function collect() {
    var fd = new FormData(form);
    return {
      name: (fd.get('name') || '').trim(),
      email: (fd.get('email') || '').trim(),
      phone: (fd.get('phone') || '').trim(),
      business_name: (fd.get('business_name') || '').trim(),
      current_website: (fd.get('current_website') || '').trim(),
      services: fd.getAll('services'),
      budget: fd.get('budget') || 'Not sure yet',
      timeline: fd.get('timeline') || 'Flexible',
      contact_method: fd.get('contact_method') || 'Email',
      details: (fd.get('details') || '').trim(),
      status: 'new'
    };
  }

  function mailtoLink(d) {
    var body = [
      'Name: ' + d.name, 'Email: ' + d.email, 'Phone: ' + (d.phone || '-'),
      'Business: ' + (d.business_name || '-'), 'Current website: ' + (d.current_website || '-'),
      'Services: ' + d.services.join(', '), 'Budget: ' + d.budget, 'Timeline: ' + d.timeline,
      'Best contact: ' + d.contact_method, '', d.details
    ].join('\n');
    return 'mailto:' + FALLBACK_EMAIL + '?subject=' + encodeURIComponent('Quote request from ' + d.name) + '&body=' + encodeURIComponent(body);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearError();

    var okFields = required.map(validateInput).every(Boolean);
    var okServices = validateServices();
    if (!okFields || !okServices) {
      var firstBad = form.querySelector('.field.invalid input, .field.invalid textarea, .choice-group.invalid input');
      if (firstBad) firstBad.focus();
      return;
    }

    // Bots fill the hidden field; pretend success and drop it.
    if (form.querySelector('#company_site').value) { showSuccess(); return; }

    var data = collect();
    setLoading(true);

    var controller = 'AbortController' in window ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) controller.abort(); }, 15000);
    var signal = controller ? controller.signal : undefined;

    // 1) Save to Base44 (your lead list)
    var saveToBase44 = fetch(BASE44_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-App-Id': BASE44_APP_ID },
      body: JSON.stringify(data),
      signal: signal
    }).then(function (res) { if (!res.ok) throw new Error('Base44 HTTP ' + res.status); });

    // 2) Email alert via Web3Forms (skipped until a key is set)
    var emailAlert = !WEB3FORMS_KEY ? Promise.reject(new Error('no key')) : fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: 'New quote request: ' + data.name + (data.business_name ? ' (' + data.business_name + ')' : ''),
        from_name: 'ClearpathUI website',
        name: data.name,
        email: data.email,
        phone: data.phone || '-',
        business_name: data.business_name || '-',
        current_website: data.current_website || '-',
        services: data.services.join(', '),
        budget: data.budget,
        timeline: data.timeline,
        best_contact: data.contact_method,
        project_details: data.details
      }),
      signal: signal
    }).then(function (res) { return res.json(); }).then(function (r) { if (!r.success) throw new Error('Web3Forms failed'); });

    // Success if the request reached at least one place.
    Promise.allSettled([saveToBase44, emailAlert]).then(function (results) {
      if (results.some(function (r) { return r.status === 'fulfilled'; })) { showSuccess(); return; }
      throw new Error('both failed');
    }).catch(function () {
      setLoading(false);
      showError('Sorry, something went wrong sending your request. You can <a href="' + mailtoLink(data) +
        '">send it by email instead</a> or call <a href="tel:+19544482490">(954) 448-2490</a>.');
    }).finally(function () { clearTimeout(timer); });
  });

  function showSuccess() {
    form.hidden = true;
    successEl.hidden = false;
    successEl.focus();
    successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
})();

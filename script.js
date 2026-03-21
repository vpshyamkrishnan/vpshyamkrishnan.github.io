// Persona messages
const personaMessages = {
  hm: "You'll see leadership impact, program scale, and business outcomes — exactly what you need to evaluate fit.",
  rec: "Key metrics, tools, and a downloadable resume are all here. Scroll down for the full picture.",
  pl: "You'll find how I think about product, automation, and customer experience — with real case studies.",
};

function selectPersona(id) {
  document.querySelectorAll('.persona-btns button').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-' + id).classList.add('active');
  document.getElementById('persona-msg').textContent = personaMessages[id] || '';
}

// Modal
function openModal(title, desc) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = desc;
  document.getElementById('modal').classList.add('open');
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Counter animation
function animateCounters() {
  document.querySelectorAll('.metric-val').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = target * ease;
      el.textContent = isDecimal ? val.toFixed(1) : Math.floor(val);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// Trigger counters when metrics section is visible
const metricsSection = document.querySelector('.metrics');
let counted = false;
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !counted) { counted = true; animateCounters(); }
  });
}, { threshold: 0.3 });
if (metricsSection) observer.observe(metricsSection);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Impact bars animation
function animateBars(selector, attr, prop) {
  document.querySelectorAll(selector).forEach(el => {
    el.style[prop] = el.dataset[attr] + '%';
  });
}

const impactObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateBars('.impact-bar', 'width', 'width');
      impactObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
const impactSection = document.querySelector('.impact-chart');
if (impactSection) impactObserver.observe(impactSection);

// Skill bars animation
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateBars('.skillbar-fill', 'fill', 'width');
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.2 });
const skillSection = document.querySelector('.skillbars-section');
if (skillSection) skillObserver.observe(skillSection);

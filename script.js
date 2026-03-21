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

// Rich modal content definitions
const richModals = {
  vo: {
    render: () => `
      <div class="rm-tag">Customer Obsession · Accessibility</div>
      <h3 class="rm-title">Improving Accessibility for Visually Impaired Customers</h3>
      <p class="rm-sub">Cost Avoidance + CX Impact</p>
      <p class="rm-body">Identified a systemic gap in accessibility for visually impaired customers interacting with self-service video content, where background music and text-heavy subtitles limited usability with screen readers.</p>
      <p class="rm-body">Instead of pursuing a ₹35L third-party vendor solution, designed and implemented a scalable voice-enabled alternative using <strong>Amazon Polly</strong>, enabling clear audio narration aligned with accessibility needs.</p>
      <ul class="rm-bullets">
        <li>Eliminated ~₹35L in projected vendor costs through build-over-buy strategy</li>
        <li>Reduced ~16K annual customer contacts by improving self-service success rates</li>
        <li>Partnered across Product, Accessibility, and Engineering teams to standardise the approach across flows</li>
      </ul>
      <p class="rm-body">This initiative improved inclusivity while driving measurable cost efficiency and operational impact.</p>
      <div class="rm-video-section">
        <p class="rm-video-label">Before vs After — Hear the difference</p>
        <div class="rm-videos">
          <div class="rm-video-wrap">
            <p class="rm-vid-caption">Before (Background Music Only)</p>
            <video controls preload="metadata" class="rm-video">
              <source src="vo-pre.mp4" type="video/mp4"/>
            </video>
          </div>
          <div class="rm-video-wrap">
            <p class="rm-vid-caption">After (Amazon Polly Voice-Over)</p>
            <video controls preload="metadata" class="rm-video">
              <source src="vo-post.mp4" type="video/mp4"/>
            </video>
          </div>
        </div>
      </div>
    `
  },
  dyk: {
    render: () => `
      <div class="rm-tag">Ownership · Self-Service · 8 Regional Languages</div>
      <h3 class="rm-title">Dynamic DYK – Contextual Date-Aware Self-Help</h3>
      <p class="rm-sub">764.8K Annualized CR · Expanding to 3 more stores</p>
      <p class="rm-body"><strong>Context:</strong> Customers contacting CS via the mShop app were shown static DYK cards with generic information — no visibility into delivery milestones or specific timelines. ~23% of contacts were anxiety contacts simply wanting to know dates.</p>
      <p class="rm-body"><strong>What I built:</strong> Dynamic DYK with real-time parameters — Estimated Delivery Date, Order Date, Ship Date, Estimated Refund Credit date — across 10 DYK cards on the Foresight Funnel. India required unique customisation across 8 regional languages with no WW precedent to follow.</p>
      <ul class="rm-bullets">
        <li>764.8K annualized contact reduction on launch (6th Oct)</li>
        <li>Covered 10 order states: Preship, In Transit, OOR, Delivered, Return, Refund and more</li>
        <li>8 regional language variants — no existing WW framework to reference</li>
        <li>Expanding to 3 additional stores (H1 2025)</li>
      </ul>
      <div class="rm-compare">
        <p class="rm-video-label">Before vs After</p>
        <div class="rm-img-row">
          <div class="rm-img-wrap">
            <p class="rm-vid-caption">Before — Static DYK</p>
            <div class="rm-img-pair">
              <img src="sic-pre-1.png" alt="Static DYK Screen 1" class="rm-img"/>
              <img src="sic-pre-2.png" alt="Static DYK Screen 2" class="rm-img"/>
            </div>
          </div>
          <div class="rm-img-wrap">
            <p class="rm-vid-caption">After — Dynamic DYK with Dates</p>
            <div class="rm-img-pair">
              <img src="sic-post-1.jpg" alt="Dynamic DYK Screen 1" class="rm-img"/>
              <img src="sic-post-2.jpg" alt="Dynamic DYK Screen 2" class="rm-img"/>
            </div>
          </div>
        </div>
      </div>
    `
  },
  sic: {
    render: () => `
      <div class="rm-tag">Technical Ownership · Self-Service · CX Innovation</div>
      <h3 class="rm-title">Dynamic SIC – Contextual Self-Help at Scale</h3>
      <p class="rm-sub">380K CR · 1300+ lines of JSON · Built without tech support</p>
      <p class="rm-body"><strong>Problem:</strong> Customers in India saw generic SIC (Self-help Issue Codes) regardless of their order status. The H&F experience in India was unique — no WW precedent existed. Tech bandwidth was fully allocated to higher-ROI initiatives, and previous PMs who attempted this had failed, making tech reluctant to allow external code changes.</p>
      <p class="rm-body"><strong>What I did:</strong> Took ownership in Sept 2022. Brushed up JSON coding skills independently, mapped all order states (Preship, In Transit, OOR, Delivered, Return, Refunded) to contextual SIC options like "I want my order sooner" and "I want to postpone delivery." Wrote 1300+ lines of condition codes, tested end-to-end, and aligned the SDM to allow Product to make changes on Linktree. Identified and escalated a CSALT architecture bug mid-build to unblock launch.</p>
      <ul class="rm-bullets">
        <li>380K contact reduction — met in-year goal for IN in 2023</li>
        <li>Tech spent only 1/10th of their usual time on this initiative</li>
        <li>No tech dependency for build — fully self-executed JSON implementation</li>
        <li>Earned trust of Product & Tech leadership for technically complex programs</li>
        <li>Became the foundation for Dynamic DYK (764.8K CR, 2024)</li>
      </ul>
    `
  }
};

function openRichModal(key) {
  const modal = richModals[key];
  if (!modal) return;
  document.getElementById('rich-modal-body').innerHTML = modal.render();
  document.getElementById('rich-modal').classList.add('open');
}

function closeRichModal() {
  // Pause any playing videos
  document.querySelectorAll('#rich-modal video').forEach(v => v.pause());
  document.getElementById('rich-modal').classList.remove('open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeRichModal(); });

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
  sic: {
    render: () => `
      <div class="rm-tag">Technical Ownership · Self-Service · CX Innovation</div>
      <h3 class="rm-title">Dynamic SIC – Contextual Self-Help at Scale</h3>
      <p class="rm-sub">380K CR · Built without tech support · Foundation for Dynamic DYK</p>
      <p class="rm-body"><strong>Problem:</strong> Customers in India saw generic SIC (Self-help Issue Codes) regardless of their order status. The H&F experience in India was unique — no WW precedent existed. Tech bandwidth was fully allocated to higher-ROI initiatives, and previous PMs who attempted this had failed, making tech reluctant to allow external code changes.</p>
      <p class="rm-body"><strong>What I did:</strong> Took ownership in Sept 2022. Independently learned the JSON framework needed, mapped all order states (Preship, In Transit, OOR, Delivered, Return, Refunded) to contextual SIC options like "I want my order sooner" and "I want to postpone delivery." Tested end-to-end, aligned the SDM to allow Product to make changes on Linktree, and identified and escalated a CSALT architecture bug mid-build to unblock launch.</p>
      <ul class="rm-bullets">
        <li>380K contact reduction — met in-year goal for IN in 2023</li>
        <li>Tech spent only 1/10th of their usual time on this initiative</li>
        <li>No tech dependency for build — fully self-executed implementation</li>
        <li>Earned trust of Product & Tech leadership for technically complex programs</li>
        <li>Became the foundation for Dynamic DYK (764.8K CR, 2024)</li>
      </ul>
      <div class="rm-compare">
        <p class="rm-video-label">Before vs After</p>
        <div class="rm-img-single">
          <img src="dynamic-sic.png" alt="Dynamic SIC Before and After" class="rm-img-full"/>
        </div>
      </div>
    `
  },
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
    `
  },
  cx: {
    render: () => `
      <div class="rm-tag">Program Leadership · AI/ML · Cross-Functional Execution</div>
      <h3 class="rm-title">CX Automation & Contact Deflection at Scale</h3>
      <p class="rm-sub">2M+ Contacts Deflected · $1.9M Cost Savings · Worldwide Impact</p>
      <p class="rm-body"><strong>Context:</strong> As the program owner for CS Self-Service & Automation across APAC and Worldwide, I was accountable for driving contact reduction at scale — across multiple concurrent initiatives, teams, and marketplaces. The challenge wasn't executing a single project; it was orchestrating a portfolio of programs across Product, Engineering, and Operations while navigating real constraints.</p>
      <p class="rm-body"><strong>The hard part:</strong> Tech bandwidth was severely constrained due to ongoing tech debt and KTLO commitments. Standard escalation paths weren't moving fast enough. Rather than letting initiatives stall, I stepped in directly — learning and executing JSON-level implementation work myself where needed, while simultaneously managing stakeholder alignment and roadmap prioritisation at the senior leadership level.</p>
      <p class="rm-body"><strong>How I drove it:</strong> Structured the portfolio around highest-ROI deflection opportunities. Worked with Product to sequence initiatives against tech capacity, used weblabs and A/B testing to validate impact before scaling, and built governance mechanisms to track CR performance in real time across initiatives. Where tech couldn't move, I found ways to move without them.</p>
      <ul class="rm-bullets">
        <li>2M+ contacts deflected in 2024–25 across Worldwide programs</li>
        <li>$1.9M in cost savings (~₹15.8 Cr annual impact)</li>
        <li>Coordinated across Product, Engineering, and Operations — without direct authority</li>
        <li>Stepped in on technical execution when bandwidth constraints threatened delivery</li>
        <li>Weblabs and A/B testing used to validate and scale high-confidence initiatives</li>
        <li>Built real-time tracking infrastructure to maintain visibility across the full portfolio</li>
      </ul>
      <p class="rm-body">This program demonstrated what senior program ownership looks like in practice — not just managing delivery, but removing blockers, making technical trade-offs, and keeping a complex portfolio moving under pressure.</p>
    `
  },
  op: {
    render: () => `
      <div class="rm-tag">Invent & Simplify · Analytics · Operational Excellence</div>
      <h3 class="rm-title">OP Dashboard – Eliminating Manual Reporting</h3>
      <p class="rm-sub">168 Hours of Manual Work Eliminated · Real-Time CR Visibility · 7 PMs Impacted</p>
      <p class="rm-body"><strong>Problem:</strong> Every monthly OP check-in required each of the 7 PMs on the team to spend 2 hours manually updating trackers, calculating contact reduction figures by hand, and feeding inputs to the PMO for aggregation. There was no real-time view of goal gaps, no automated variance analysis, and no way to act on data until the monthly cycle completed — by which point course-correction was already late.</p>
      <p class="rm-body"><strong>What I built:</strong> Identified the inefficiency and designed an automated OP dashboard from scratch. The dashboard fetched initiative status in real time, performed CR calculations automatically, and generated a consolidated quarterly view with planned vs. actual variance analysis and drill-down by initiative. No manual inputs. No aggregation lag.</p>
      <p class="rm-body"><strong>Design principles:</strong> Built for the PMO and senior leadership — not just the PM team. The output was structured to enable same-day decision-making: leadership could identify at-risk initiatives, reallocate focus, and adjust sprint priorities without waiting for a monthly report cycle.</p>
      <ul class="rm-bullets">
        <li>Eliminated 168 hours of manual work annually (2 hrs × 7 PMs × 12 months)</li>
        <li>Real-time CR visibility across all active initiatives</li>
        <li>Automated variance analysis — planned vs. actual, with drill-down by initiative</li>
        <li>Removed human error from CR tracking across multiple concurrent programs</li>
        <li>Enabled proactive sprint planning instead of reactive monthly reviews</li>
        <li>Adopted by leadership as the standard OP reporting mechanism for the team</li>
      </ul>
    `
  },
  ausg: {
    render: () => `
      <div class="rm-tag">Governance · Process Design · Stakeholder Management</div>
      <h3 class="rm-title">AU & SG Business Launch Governance</h3>
      <p class="rm-sub">90% PMO Time Saved · 0% Ad-Hoc Requests · $117M OPS Impact</p>
      <p class="rm-body"><strong>Problem:</strong> As PM for AU & SG, business launch requests arrived over email with no structured intake, no SLAs, and no visibility into status. With 56+ launches per year and three distinct tasks per launch — scoping, consultation, and UAT — arriving at different times, Product and LRPM teams were operating in constant ambiguity. 20% of requests were ad-hoc, and PMO coordination was consuming disproportionate time with no accountability framework in place.</p>
      <p class="rm-body"><strong>What I designed:</strong> Collaborated with 5 CTAP Product Managers, 4 CS-CX Program Managers, and AU/SG CS leadership to map the full launch lifecycle and identify failure points. Designed a complete governance framework from the ground up — a RACI matrix, a SIM-based intake mechanism with pre-defined SLAs per task type, and weekly office hours to resolve ambiguity in real time rather than over async threads.</p>
      <p class="rm-body"><strong>Why it worked:</strong> The framework gave every stakeholder a single source of truth — clear ownership, predictable timelines, and a structured escalation path. It removed the informal, relationship-dependent coordination that had been creating churn, and replaced it with a repeatable operating model that scaled across all AU/SG launches.</p>
      <ul class="rm-bullets">
        <li>Resolved 15 business launch requests within 1.5 months of framework launch</li>
        <li>50% reduction in churn for Product Managers</li>
        <li>PMO coordination time reduced by 90%</li>
        <li>Ad-hoc requests dropped from 20% to 0%</li>
        <li>Launch timelines consistently met — zero COE incidents post-implementation</li>
        <li>Contributed to $117M OPS impact through structured AU & SG launch readiness in 2023</li>
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

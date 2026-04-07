/* CLOUDFORM — script.js */

// ---- DEPLOY SIMULATION ----
function triggerDeploy() {
  const btn = document.querySelector('.deploy-btn');
  const body = document.getElementById('terminalBody');

  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Deploying...';
  btn.style.background = '#333';

  const existingLines = body.querySelectorAll('.t-line');
  existingLines.forEach(l => l.style.opacity = '0.3');

  const newLogs = [
    { text: '$ aws deploy create-deployment --app cloudform', cls: '' },
    { text: '⟳  Connecting to AWS (ap-southeast-2)...', cls: 't-dim' },
    { text: '✓ OIDC token exchange successful', cls: 'success' },
    { text: '⟳  Packaging artifact...', cls: 't-dim' },
    { text: '✓ Artifact uploaded → s3://cloudform-artifacts/build-' + Date.now(), cls: 'success' },
    { text: '⟳  CodeDeploy rolling update initiated...', cls: 't-dim' },
    { text: '✓ Instance 1/3 — BeforeInstall ✓ Install ✓ ApplicationStart ✓', cls: 'success' },
    { text: '✓ Instance 2/3 — BeforeInstall ✓ Install ✓ ApplicationStart ✓', cls: 'success' },
    { text: '✓ Instance 3/3 — BeforeInstall ✓ Install ✓ ApplicationStart ✓', cls: 'success' },
    { text: '⟳  ALB health checks...', cls: 't-dim' },
    { text: '✦ DEPLOYMENT SUCCESSFUL — 0 errors · ' + new Date().toLocaleTimeString(), cls: 'highlight' },
  ];

  body.innerHTML = '';

  newLogs.forEach((log, i) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 't-line new-line' + (log.cls ? ' ' + log.cls : '');

      if (log.text.startsWith('$')) {
        div.innerHTML = `<span class="t-prompt mono">$</span><span class="mono">${log.text.slice(2)}</span>`;
      } else {
        div.innerHTML = `<span class="mono ${log.cls}">${log.text}</span>`;
      }

      body.appendChild(div);
      body.scrollTop = body.scrollHeight;

      if (i === newLogs.length - 1) {
        setTimeout(() => {
          btn.disabled = false;
          btn.querySelector('.btn-text').textContent = 'Simulate Deployment';
          btn.style.background = '';
        }, 600);
      }
    }, i * 340);
  });
}

// ---- SCROLL REVEAL ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.pipeline-step, .stack-card').forEach((el, i) => {
  el.style.animationDelay = (i * 0.07) + 's';
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// ---- NAVBAR SCROLL EFFECT ----
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 60) {
    nav.style.top = '10px';
  } else {
    nav.style.top = '20px';
  }
});

// ---- SMOOTH ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

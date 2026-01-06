/* ================= ROLE SELECTION ================= */

function selectRole(role, element) {
  if (!element) return;

  element.classList.add('loading');

  if (role === 'student') {
    window.location.href = 'student-login.html';
  } else if (role === 'instructor') {
    window.location.href = 'instructor-login.html';
  }
}

/* ================= POPUPS ================= */

function showDemo() {
  openPopup('🎬 Demo Tour', `
    <ul style="padding-left:1.2rem;line-height:1.6;">
      <li>Interactive course builder</li>
      <li>Real-time collaboration</li>
      <li>Advanced analytics</li>
      <li>Mobile-responsive design</li>
    </ul>
  `);
}

function showHelp() {
  openPopup('📖 Getting Started', `
    <ol style="padding-left:1.2rem;line-height:1.6;">
      <li>Select Student or Instructor</li>
      <li>Log in with credentials</li>
      <li>Complete profile</li>
      <li>Access dashboard</li>
    </ol>
  `);
}

function showSupport() {
  openPopup('🛠️ Support Center', `
    <ul style="padding-left:1.2rem;line-height:1.6;">
      <li>24/7 Technical Support</li>
      <li>Live Chat Available</li>
      <li>Video Tutorials</li>
      <li>Community Forums</li>
    </ul>
  `);
}

/* ================= KEYBOARD SHORTCUTS ================= */

document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  if (e.key === '1' || e.key.toLowerCase() === 's') {
    document.querySelector('.student-card')?.click();
  }

  if (e.key === '2' || e.key.toLowerCase() === 'i') {
    document.querySelector('.instructor-card')?.click();
  }
});

/* ================= ENTRANCE ANIMATION ================= */

window.addEventListener('load', () => {
  const container = document.querySelector('.container');
  if (!container) return;

  container.style.opacity = '0';
  container.style.transform = 'translateY(40px) scale(0.95)';

  setTimeout(() => {
    container.style.transition =
      'opacity 0.8s cubic-bezier(0.175,0.885,0.32,1.275), transform 0.8s cubic-bezier(0.175,0.885,0.32,1.275)';
    container.style.opacity = '1';
    container.style.transform = 'translateY(0) scale(1)';
  }, 150);
});

/* ================= SAFE PARALLAX ================= */

document.addEventListener('mousemove', (e) => {
  const container = document.querySelector('.container');
  if (!container) return;

  const x = (e.clientX / window.innerWidth) * 6 - 3;
  const y = (e.clientY / window.innerHeight) * 6 - 3;

  container.style.setProperty('--parallax-x', `${x}px`);
  container.style.setProperty('--parallax-y', `${y}px`);
});

/* ================= MODAL ================= */

function openPopup(title, html) {
  const existing = document.getElementById('rls-popup');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'rls-popup';
  overlay.style.cssText = `
    position:fixed;inset:0;
    background:rgba(0,0,0,0.5);
    display:flex;align-items:center;justify-content:center;
    z-index:9999;
  `;

  const box = document.createElement('div');
  box.style.cssText = `
    background:#fff;
    padding:1.5rem;
    border-radius:14px;
    max-width:420px;
  `;

  box.innerHTML = `<h3>${title}</h3>${html}`;
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', esc);
    }
  });
}

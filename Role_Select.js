function selectRole(role, element) {
    // Add loading state
    element.classList.add('loading');
    
    // Simulate loading and redirect
    setTimeout(() => {
        if (role === 'student') {
            // Redirect to student login page
            window.location.href = 'student-login.html';
        } else if (role === 'instructor') {
            // Redirect to instructor login page
            window.location.href = 'instructor-login.html';
        }
        
        // Remove loading state (in case redirect fails)
        element.classList.remove('loading');
    }, 800);
}

function showDemo() {
    openPopup('🎬 Demo Tour', `
        <ul style="margin: 0; padding-left: 1.2rem; line-height: 1.6;">
            <li>Interactive course builder</li>
            <li>Real-time collaboration</li>
            <li>Advanced analytics</li>
            <li>Mobile-responsive design</li>
        </ul>
        <p style="margin-top: 1rem; color: #555;">Contact us to schedule your personalized demo.</p>
    `);
}

function showHelp() {
    openPopup('📖 Getting Started', `
        <ol style="margin: 0; padding-left: 1.2rem; line-height: 1.6;">
            <li>Select Student or Instructor</li>
            <li>Log in with your credentials</li>
            <li>Complete profile setup</li>
            <li>Explore your dashboard</li>
        </ol>
        <div style="margin-top: 1rem; color: #555;">
            <div>📧 <strong>Email:</strong> help@edulearn.com</div>
            <div>📞 <strong>Phone:</strong> 1-800-EDU-LEARN</div>
        </div>
    `);
}

function showSupport() {
    openPopup('🛠️ Support Center', `
        <ul style="margin: 0; padding-left: 1.2rem; line-height: 1.6;">
            <li>24/7 Technical Support</li>
            <li>Live Chat Available</li>
            <li>Video Tutorials</li>
            <li>Community Forums</li>
        </ul>
        <div style="margin-top: 1rem; color: #555;">
            <div>📧 <strong>Email:</strong> support@edulearn.com</div>
            <div>🌐 <strong>Website:</strong> help.edulearn.com</div>
        </div>
    `);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === '1' || event.key.toLowerCase() === 's') {
        document.querySelector('.student-card').click();
    } else if (event.key === '2' || event.key.toLowerCase() === 'i') {
        document.querySelector('.instructor-card').click();
    }
});

// Entrance animation
window.addEventListener('load', function() {
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(40px) scale(0.95)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0) scale(1)';
    }, 200);
});

// Add subtle parallax effect on mouse move
document.addEventListener('mousemove', function(e) {
    const container = document.querySelector('.container');
    const x = (e.clientX / window.innerWidth) * 10 - 5;
    const y = (e.clientY / window.innerHeight) * 10 - 5;
    
    container.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

// Lightweight reusable popup (modal)
function openPopup(title, html) {
    // Close existing popup if any
    const existing = document.getElementById('rls-popup');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'rls-popup';
    Object.assign(overlay.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: '9999', animation: 'rlsFadeIn 150ms ease'
    });

    const card = document.createElement('div');
    Object.assign(card.style, {
        background: '#fff', borderRadius: '14px', padding: '18px 20px', width: 'min(520px, 92vw)',
        boxShadow: '0 12px 30px rgba(0,0,0,0.2)', transform: 'translateY(8px)', animation: 'rlsSlideUp 180ms ease forwards'
    });

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';
    header.style.marginBottom = '10px';

    const h = document.createElement('h3');
    h.textContent = title;
    h.style.margin = '0';
    h.style.fontSize = '1.1rem';
    h.style.color = '#1e3c72';

    const close = document.createElement('button');
    close.setAttribute('aria-label', 'Close');
    close.textContent = '✕';
    Object.assign(close.style, {
        border: 'none', background: 'transparent', fontSize: '1rem', cursor: 'pointer', color: '#555'
    });

    const body = document.createElement('div');
    body.innerHTML = html;
    body.style.fontSize = '0.95rem';

    header.appendChild(h);
    header.appendChild(close);
    card.appendChild(header);
    card.appendChild(body);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    function removePopup() { if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay); }
    close.addEventListener('click', removePopup);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) removePopup(); });
    document.addEventListener('keydown', function onKey(e){ if(e.key==='Escape'){ removePopup(); document.removeEventListener('keydown', onKey);} });

    // Minimal animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rlsFadeIn { from { opacity: 0 } to { opacity: 1 } }
      @keyframes rlsSlideUp { from { transform: translateY(12px); opacity: .96 } to { transform: translateY(0); opacity: 1 } }
    `;
    document.head.appendChild(style);
}
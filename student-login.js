// Password toggle functionality
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Form submission
document.getElementById('studentLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loginBtn = document.getElementById('loginBtn');
    const studentId = document.getElementById('studentId').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate form
    if (!studentId || !email || !password) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Add loading state
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    
    // Simulate authentication
    setTimeout(() => {
        // Check credentials (demo purposes)
        if (studentId === 'STU2024001' && email === 'student@edulearn.com' && password === 'student123') {
            showNotification('Login successful! Redirecting to dashboard...', 'success');
            setTimeout(() => {
                // Redirect to student dashboard
                window.location.href = 'student-dashboard.html';
            }, 1500);
        } else {
            showNotification('Invalid credentials. Demo: STU2024001 / student@edulearn.com / student123', 'error');
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }
    }, 2000);
});

// Forgot password handler
function forgotPassword() {
    const email = prompt('Enter your email address to reset password:');
    if (email) {
        showNotification(`Password reset link sent to ${email}`, 'success');
    }
}

function getHelp() {
    openPopup('📚 Student Support Help', `
        <div style="line-height: 1.6;">
            <div style="margin-bottom: 1rem;">
                <h4 style="margin: 0 0 0.5rem 0; color: #1e3c72;">Contact Support</h4>
                <div style="display: flex; align-items: center; margin-bottom: 0.3rem;">
                    <span style="display: inline-block; width: 24px;">📧</span>
                    <span>Email: student-help@edulearn.com</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 0.3rem;">
                    <span style="display: inline-block; width: 24px;">📞</span>
                    <span>Phone: 1-800-EDU-STUDENT</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 0.3rem;">
                    <span style="display: inline-block; width: 24px;">💬</span>
                    <span>Live Chat: Available 24/7</span>
                </div>
            </div>
            <div>
                <h4 style="margin: 0 0 0.5rem 0; color: #1e3c72;">Common Issues</h4>
                <ul style="margin: 0; padding-left: 1.2rem; color: #444;">
                    <li>Forgot Student ID? Contact Admin</li>
                    <li>Account locked? Wait 15 minutes</li>
                    <li>Technical issues? Clear browser cache</li>
                </ul>
            </div>
        </div>
    `);
}

// Lightweight popup function
function openPopup(title, html) {
    // Close existing popup if any
    const existing = document.getElementById('sls-popup');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'sls-popup';
    Object.assign(overlay.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', 
        justifyContent: 'center', zIndex: '9999', animation: 'fadeIn 0.3s ease'
    });

    const card = document.createElement('div');
    Object.assign(card.style, {
        background: '#fff', borderRadius: '14px', padding: '18px 20px', 
        width: 'min(520px, 92vw)', boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
        transform: 'translateY(8px)', animation: 'slideUp 0.3s ease forwards'
    });

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'space-between';
    header.style.marginBottom = '10px';

    const h = document.createElement('h3');
    h.textContent = title;
    h.style.margin = '0';
    h.style.fontSize = '1.2rem';
    h.style.color = '#1e3c72';

    const close = document.createElement('button');
    close.setAttribute('aria-label', 'Close');
    close.textContent = '✕';
    Object.assign(close.style, {
        border: 'none', background: 'transparent', 
        fontSize: '1.2rem', cursor: 'pointer', color: '#555'
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

    function removePopup() { 
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay); 
    }
    
    close.addEventListener('click', removePopup);
    overlay.addEventListener('click', (e) => { 
        if (e.target === overlay) removePopup(); 
    });
    
    document.addEventListener('keydown', function onKey(e) { 
        if(e.key === 'Escape') { 
            removePopup(); 
            document.removeEventListener('keydown', onKey);
        } 
    });

    // Add animations if not already present
    if (!document.getElementById('sls-animations')) {
        const style = document.createElement('style');
        style.id = 'sls-animations';
        style.textContent = `
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { 
                from { transform: translateY(20px); opacity: 0; } 
                to { transform: translateY(0); opacity: 1; } 
            }
        `;
        document.head.appendChild(style);
    }
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${getNotificationIcon(type)}</span>
        <span class="notification-message">${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: getNotificationColor(type),
        color: 'white',
        padding: '12px 20px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '1000',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontSize: '0.9rem',
        maxWidth: '300px',
        animation: 'slideIn 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return '✅';
        case 'error': return '❌';
        case 'info': return 'ℹ️';
        default: return '📢';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#4CAF50';
        case 'error': return '#f44336';
        case 'info': return '#2196F3';
        default: return '#666';
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Form validation styling
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.required) {
            this.style.borderColor = '#f44336';
            this.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
        } else {
            this.style.borderColor = '#e8e8e8';
            this.style.boxShadow = 'none';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#4CAF50';
        this.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
    });
});

// Entrance animation
window.addEventListener('load', function() {
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.6s ease-out';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 200);
});

// Auto-focus first input
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('studentId').focus();
});
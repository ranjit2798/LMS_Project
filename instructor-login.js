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
document.getElementById('instructorLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loginBtn = document.getElementById('loginBtn');
    const employeeId = document.getElementById('employeeId').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate form
    if (!employeeId || !email || !password) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate email domain (institutional email)
    if (!email.includes('@') || (!email.includes('.edu') && !email.includes('.ac.'))) {
        showNotification('Please use your institutional email address', 'error');
        return;
    }
    
    // Add loading state
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    
    // Simulate authentication
    setTimeout(() => {
        // Check credentials (demo purposes)
        if (employeeId === 'EMP2024001' && email === 'instructor@edulearn.edu' && password === 'teacher123') {
            showNotification('Authentication successful! Loading dashboard...', 'success');
            setTimeout(() => {
                // Redirect to instructor dashboard
                window.location.href = 'instructor-dashboard.html';
            }, 1500);
        } else {
            showNotification('Invalid credentials. Demo: EMP2024001 / instructor@edulearn.edu / teacher123', 'error');
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }
    }, 2000);
});

function forgotPassword() {
    const email = prompt('Enter your institutional email address:');
    if (email) {
        if (email.includes('@') && (email.includes('.edu') || email.includes('.ac.'))) {
            showNotification(`Password reset instructions sent to ${email}`, 'success');
        } else {
            showNotification('Please enter a valid institutional email address', 'error');
        }
    }
}

function getHelp() {
    openPopup('🎓 Instructor Support', `
        <div style="line-height: 1.6;">
            <div style="margin-bottom: 1rem;">
                <h4 style="margin: 0 0 0.5rem 0; color: #1e3c72;">Contact Support</h4>
                <div style="display: flex; align-items: center; margin-bottom: 0.3rem;">
                    <span style="display: inline-block; width: 24px;">📧</span>
                    <span>Email: faculty-help@edulearn.edu</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 0.3rem;">
                    <span style="display: inline-block; width: 24px;">📞</span>
                    <span>Phone: 1-800-EDU-FACULTY</span>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 0.3rem;">
                    <span style="display: inline-block; width: 24px;">💻</span>
                    <span>Remote Support: Available via screen share</span>
                </div>
            </div>
            <div style="margin-bottom: 1rem;">
                <h4 style="margin: 0 0 0.5rem 0; color: #1e3c72;">Technical Issues</h4>
                <ul style="margin: 0; padding-left: 1.2rem; color: #444;">
                    <li>LMS platform guidance</li>
                    <li>Course migration assistance</li>
                    <li>Gradebook setup</li>
                    <li>Student communication tools</li>
                </ul>
            </div>
            <div>
                <h4 style="margin: 0 0 0.5rem 0; color: #1e3c72;">Training Resources</h4>
                <ul style="margin: 0; padding-left: 1.2rem; color: #444;">
                    <li>Weekly webinars every Tuesday</li>
                    <li>Video tutorial library</li>
                    <li>Best practices documentation</li>
                    <li>Peer mentoring program</li>
                </ul>
            </div>
        </div>
    `);
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
        maxWidth: '350px',
        animation: 'slideIn 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds (instructor needs more time to read)
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
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
        case 'info': return '#FF6B35';
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

// Enhanced form validation for institutional requirements
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', function() {
        let isValid = true;
        let errorMessage = '';
        
        if (this.value.trim() === '' && this.required) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (this.type === 'email' && this.value) {
            if (!this.value.includes('@') || (!this.value.includes('.edu') && !this.value.includes('.ac.'))) {
                isValid = false;
                errorMessage = 'Please use institutional email';
            }
        } else if (this.id === 'employeeId' && this.value) {
            if (this.value.length < 4) {
                isValid = false;
                errorMessage = 'Employee ID too short';
            }
        }
        
        if (!isValid) {
            this.style.borderColor = '#f44336';
            this.style.boxShadow = '0 0 0 3px rgba(244, 67, 54, 0.1)';
            // Show error tooltip
            showFieldError(this, errorMessage);
        } else {
            this.style.borderColor = '#e8e8e8';
            this.style.boxShadow = 'none';
            hideFieldError(this);
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#FF6B35';
        this.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
        hideFieldError(this);
    });
});

function showFieldError(field, message) {
    hideFieldError(field); // Remove existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        background: #f44336;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        white-space: nowrap;
        z-index: 10;
        margin-top: 2px;
    `;
    
    field.parentNode.style.position = 'relative';
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

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
    document.getElementById('employeeId').focus();
});

// Session timeout warning for security
let sessionTimeout;
function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    // Set a new timeout (30 minutes)
    sessionTimeout = setTimeout(() => {
        showNotification('Your session will expire soon due to inactivity.', 'info');
    }, 30 * 60 * 1000);
}

// Reset timeout on user activity
document.addEventListener('click', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);
resetSessionTimeout(); // Initialize timeout

// Lightweight popup function
function openPopup(title, html) {
    // Close existing popup if any
    const existing = document.getElementById('ils-popup');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'ils-popup';
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
    if (!document.getElementById('ils-animations')) {
        const style = document.createElement('style');
        style.id = 'ils-animations';
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
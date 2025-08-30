// ---------------- Sidebar Navigation ----------------
const sidebarButtons = document.querySelectorAll('.sidebar-btn');
const contentSections = document.querySelectorAll('.content-section');

sidebarButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sidebarButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    contentSections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(btn.dataset.section).classList.add('active');
  });
});

// ---------------- Tab Switching for Materials ----------------
const tabButtons = document.querySelectorAll('.tab-buttons button');
const tabContents = document.querySelectorAll('.tab-content > div');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.hidden = true);
    button.classList.add('active');
    document.getElementById(button.getAttribute('aria-controls')).hidden = false;
  });
});

// ---------------- Q&A Messaging ----------------
const qnaInput = document.getElementById('qnaInput');
const sendQnA = document.getElementById('sendQnA');
const qnaFeedback = document.getElementById('qnaFeedback');

sendQnA?.addEventListener('click', () => {
  const msg = qnaInput.value.trim();
  if (!msg) {
    qnaFeedback.textContent = "Please enter a message.";
    return;
  }
  const p = document.createElement('p');
  p.innerHTML = `<strong>You:</strong> ${msg}`;
  document.querySelector('#communication .messages').appendChild(p);
  qnaInput.value = '';
  qnaFeedback.textContent = "Sent!";
  document.querySelector('#communication .messages').scrollTop =
    document.querySelector('#communication .messages').scrollHeight;
});

// Simple Logout Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the logout button
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Add click event to the logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a simple confirmation dialog
            const shouldLogout = confirm('Are you sure you want to logout?');
            
            if (shouldLogout) {
                // Clear any stored session data
                localStorage.removeItem('studentToken');
                // Redirect to role select page
                window.location.href = 'Role_Select.html';
            }
        });
    }
});

// Sign Out
signOutCurrentBtn?.addEventListener('click', () => {
  signOutMessage.textContent = "Sign out from this device?";
  showModal(signOutConfirmDiv, true);
});
signOutAllSessionsBtn?.addEventListener('click', () => {
  signOutMessage.textContent = "Sign out from all devices?";
  showModal(signOutConfirmDiv, true);
});
signOutConfirmYes?.addEventListener('click', () => {
  const all = signOutMessage.textContent.includes("all");
  logoutRedirect(all);
});
signOutConfirmNo?.addEventListener('click', () => showModal(signOutConfirmDiv, false));

// ---------------- Course Card Navigation ----------------
function enterCourse(courseName) {
  alert(`Entering course: ${courseName}`);
}
window.enterCourse = enterCourse;

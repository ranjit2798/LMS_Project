// DOM Elements
const logoutBtn = document.getElementById('logoutBtn');
const logoutBtnSettings = document.getElementById('logoutBtnSettings');
const sidebarButtons = document.querySelectorAll('.sidebar-btn');
const contentSections = document.querySelectorAll('.content-section');
const lectureUploadForm = document.getElementById('lectureUploadForm');
const assignmentForm = document.getElementById('assignmentForm');
const announcementForm = document.getElementById('announcementForm');
const messageBox = document.getElementById('messageBox');
const qnaInput = document.getElementById('qnaInput');
const sendQnA = document.getElementById('sendQnA');
const logoutConfirm = document.getElementById('logoutConfirm');
const logoutYesBtn = document.querySelector('.logout-yes');
const logoutNoBtn = document.querySelector('.logout-no');

// Show logout confirmation modal
function openLogoutConfirm(e) {
  e.preventDefault();
  logoutConfirm.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close modal function
function closeLogoutModal() {
  logoutConfirm.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Event Listeners for logout buttons
if (logoutBtn) {
  logoutBtn.addEventListener('click', openLogoutConfirm);
}

if (logoutBtnSettings) {
  logoutBtnSettings.addEventListener('click', openLogoutConfirm);
}

// Handle logout confirmation
if (logoutYesBtn) {
  logoutYesBtn.addEventListener('click', () => {
    window.location.href = 'Role_Select.html';
  });
}

// Close modal when clicking No or outside the modal
if (logoutNoBtn) {
  logoutNoBtn.addEventListener('click', closeLogoutModal);
}

// Close modal when clicking outside the modal content
logoutConfirm?.addEventListener('click', (e) => {
  if (e.target === logoutConfirm) {
    closeLogoutModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && logoutConfirm.style.display === 'flex') {
    closeLogoutModal();
  }
});

// Sidebar navigation - show selected section
sidebarButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sidebarButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const sectionId = btn.getAttribute('data-section');
    contentSections.forEach(sec => {
      sec.id === sectionId ? sec.classList.add('active') : sec.classList.remove('active');
    });
  });
});

// Course management buttons placeholder alert
document.querySelectorAll('.management-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Functionality coming soon!');
  });
});

// Lecture upload form submit
lectureUploadForm?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Lecture uploaded (dummy action).');
  lectureUploadForm.reset();
});

// Assignment form submit
assignmentForm?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Assignment created (dummy action).');
  assignmentForm.reset();
});

// Announcement form submit
announcementForm?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Announcement posted (dummy action).');
  announcementForm.reset();
});

// Send Q&A message
sendQnA?.addEventListener('click', () => {
  const question = qnaInput.value.trim();
  if (!question) {
    alert('Please enter a message before sending.');
    return;
  }
  const p = document.createElement('p');
  p.innerHTML = `<strong>You:</strong> ${question}`;
  messageBox.appendChild(p);
  messageBox.scrollTop = messageBox.scrollHeight;
  qnaInput.value = '';
});

// Simple alert placeholder for course card (if needed)
function enterCourse(courseName) {
  alert(`Opening course management: ${courseName} (dummy action)`);
}
window.enterCourse = enterCourse;

/* ===================== DOM REFERENCES ===================== */

// Sidebar + sections
const sidebarButtons = document.querySelectorAll('.sidebar-btn');
const contentSections = document.querySelectorAll('.content-section');

// Logout
const logoutBtn = document.getElementById('logoutBtn');
const logoutBtnSettings = document.getElementById('logoutBtnSettings');
const logoutConfirm = document.getElementById('logoutConfirm');
const logoutYesBtn = document.querySelector('.logout-yes');
const logoutNoBtn = document.querySelector('.logout-no');

// Lecture upload
const lectureUploadForm = document.getElementById('lectureUploadForm');
const uploadFileInput = document.getElementById('uploadFile');
const subjectNameDisplay = document.getElementById('subjectNameDisplay');

// Communication
const sendQnA = document.getElementById('sendQnA');
const qnaInput = document.getElementById('qnaInput');
const messageBox = document.getElementById('messageBox');


/* ===================== SIDEBAR NAVIGATION ===================== */

sidebarButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active button
    sidebarButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show matching section
    const targetId = btn.getAttribute('data-section');
    contentSections.forEach(section => {
      section.classList.toggle('active', section.id === targetId);
    });
  });
});


/* ===================== LOGOUT MODAL ===================== */

function openLogoutModal() {
  logoutConfirm.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeLogoutModal() {
  logoutConfirm.classList.remove('show');
  document.body.style.overflow = '';
}

logoutBtn?.addEventListener('click', openLogoutModal);
logoutBtnSettings?.addEventListener('click', openLogoutModal);

logoutNoBtn?.addEventListener('click', closeLogoutModal);

logoutConfirm?.addEventListener('click', (e) => {
  if (e.target === logoutConfirm) {
    closeLogoutModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && logoutConfirm.classList.contains('show')) {
    closeLogoutModal();
  }
});

logoutYesBtn?.addEventListener('click', () => {
  // Backend logout should happen here
  window.location.href = 'Role_Select.html';
});


/* ===================== FILE → SUBJECT NAME ===================== */

uploadFileInput?.addEventListener('change', () => {
  if (uploadFileInput.files.length > 0) {
    subjectNameDisplay.textContent = uploadFileInput.files[0].name;
  } else {
    subjectNameDisplay.textContent = 'Not selected';
  }
});


/* ===================== LECTURE UPLOAD ===================== */

lectureUploadForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(lectureUploadForm);

  // 🔴 Backend API call goes here
  // fetch('/api/material/upload', { method: 'POST', body: formData })

  lectureUploadForm.reset();
  subjectNameDisplay.textContent = 'Not selected';
});


/* ===================== COMMUNICATION (Q&A) ===================== */

sendQnA?.addEventListener('click', () => {
  const message = qnaInput.value.trim();
  if (!message) return;

  const p = document.createElement('p');
  p.textContent = message;
  messageBox.appendChild(p);

  messageBox.scrollTop = messageBox.scrollHeight;
  qnaInput.value = '';

  // 🔴 Backend message send should go here
});


/* ===================== END ===================== */

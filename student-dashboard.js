/* =========================================================
   SIDEBAR SECTION NAVIGATION
========================================================= */
const sidebarBtns = document.querySelectorAll('.sidebar-btn');
const sections = document.querySelectorAll('.content-section');

sidebarBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    sidebarBtns.forEach(b => b.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.section)?.classList.add('active');
  });
});

/* =========================================================
   MATERIALS TABS
========================================================= */
const tabButtons = document.querySelectorAll('.tab-buttons button');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.hidden = true);

    btn.classList.add('active');
    document.getElementById(btn.getAttribute('aria-controls')).hidden = false;
  });
});

/* =========================================================
   COURSE CLICK (INLINE onclick SUPPORT)
========================================================= */
function enterCourse(courseName) {
  alert(`Entering course: ${courseName}`);
}
window.enterCourse = enterCourse;

/* =========================================================
   FLASHCARDS (RELOAD + FULLSCREEN)
========================================================= */
(function flashcardControls() {
  const iframe = document.getElementById('flashcardIframe');
  const reloadBtn = document.getElementById('fcReload');
  const fsBtn = document.getElementById('fcFullscreen');

  if (!iframe) return;

  reloadBtn?.addEventListener('click', () => {
    const src = iframe.src;
    iframe.src = '';
    setTimeout(() => {
      iframe.src = src;
    }, 50);
  });

  fsBtn?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      iframe.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  });
})();

/* =========================================================
   TEACHER UPLOADS – APPLY FILTERS → BACKEND
========================================================= */
const applyFiltersBtn = document.getElementById('applyFiltersBtn');
const uploadsStatus = document.getElementById('uploadsStatus');
const uploadsList = document.getElementById('teacherUploads');

applyFiltersBtn?.addEventListener('click', async () => {
  const semester = document.getElementById('filterSemester').value;
  const subject = document.getElementById('filterSubject').value;
  const teacher = document.getElementById('filterTeacher').value;
  const type = document.getElementById('filterType').value;

  uploadsStatus.textContent = 'Fetching materials...';
  uploadsList.innerHTML = '';

  const params = new URLSearchParams();
  if (semester) params.append('semester', semester);
  if (subject) params.append('subject', subject);
  if (teacher) params.append('teacher', teacher);
  if (type) params.append('type', type);

  try {
    // 🔁 CHANGE this URL to your backend endpoint
    const response = await fetch(
      `http://localhost:8080/api/materials?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error('Backend error');
    }

    const materials = await response.json();

    if (materials.length === 0) {
      uploadsStatus.textContent = 'No materials found.';
      return;
    }

    uploadsStatus.textContent = `Found ${materials.length} materials`;
    renderTeacherUploads(materials);

  } catch (err) {
    uploadsStatus.textContent = 'Failed to load materials';
    console.error(err);
  }
});

function renderTeacherUploads(materials) {
  uploadsList.innerHTML = '';

  materials.forEach(m => {
    const li = document.createElement('li');
    li.className = 'material-item';
    li.innerHTML = `
      <strong>${m.title}</strong>
      <span class="material-meta">
        ${m.subject} | ${m.teacher} | Sem ${m.semester}
      </span>
    `;
    uploadsList.appendChild(li);
  });
}

/* =========================================================
   ASSIGNMENTS
========================================================= */
let selectedAssignmentId = null;

function getAssignments() {
  try {
    return JSON.parse(localStorage.getItem('lms_assignments')) || [];
  } catch {
    return [];
  }
}

function renderAssignments() {
  const list = document.getElementById('assignmentList');
  if (!list) return;

  const assignments = getAssignments();
  list.innerHTML = '';

  if (assignments.length === 0) {
    list.innerHTML = '<li class="task-item">No assignments yet.</li>';
    return;
  }

  assignments.forEach(a => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <strong>${a.course}</strong> – ${a.title} (Due ${a.deadline})
    `;

    const btn = document.createElement('button');
    btn.textContent = 'Submit';
    btn.addEventListener('click', () => openSubmissionBox(a));

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function openSubmissionBox(assignment) {
  selectedAssignmentId = assignment.id;
  document.getElementById('submitTitle').textContent =
    `Submit Assignment: ${assignment.title}`;
  document.getElementById('submissionBox').style.display = 'block';
}

document.getElementById('submitAssignmentBtn')?.addEventListener('click', () => {
  const fileInput = document.getElementById('submissionFile');
  const feedback = document.getElementById('submissionFeedback');

  if (!fileInput.files.length || !selectedAssignmentId) {
    feedback.textContent = 'Please select a file.';
    return;
  }

  feedback.textContent = 'Assignment submitted!';
  document.getElementById('submissionBox').style.display = 'none';
});

/* =========================================================
   COMMUNICATION / Q&A
========================================================= */
const qnaInput = document.getElementById('qnaInput');
const sendQnA = document.getElementById('sendQnA');
const qnaFeedback = document.getElementById('qnaFeedback');

sendQnA?.addEventListener('click', () => {
  const msg = qnaInput.value.trim();
  if (!msg) {
    qnaFeedback.textContent = 'Please enter a message.';
    return;
  }

  const messagesBox = document.querySelector('#communication .messages');
  const p = document.createElement('p');
  p.innerHTML = `<strong>You:</strong> ${msg}`;
  messagesBox.appendChild(p);

  qnaInput.value = '';
  qnaFeedback.textContent = 'Sent!';
});

/* =========================================================
   LOGOUT / SIGN OUT
========================================================= */
const logoutBtn = document.getElementById('logoutBtn');
const logoutBtnSettings = document.getElementById('logoutBtnSettings');
const signOutCurrent = document.getElementById('signOutCurrent');
const signOutAll = document.getElementById('signOutAllSessions');

const signOutModal = document.getElementById('signOutConfirm');
const signOutMessage = document.getElementById('signOutMessage');

function showSignOut(message) {
  signOutMessage.textContent = message;
  signOutModal.style.display = 'flex';
}

logoutBtn?.addEventListener('click', () =>
  showSignOut('Sign out from this device?')
);

logoutBtnSettings?.addEventListener('click', () =>
  showSignOut('Sign out from this device?')
);

signOutCurrent?.addEventListener('click', () =>
  showSignOut('Sign out from this device?')
);

signOutAll?.addEventListener('click', () =>
  showSignOut('Sign out from all devices?')
);

document.querySelector('.signout-confirm-yes')?.addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'Role_Select.html';
});

document.querySelector('.signout-confirm-no')?.addEventListener('click', () => {
  signOutModal.style.display = 'none';
});

/* =========================================================
   INIT
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderAssignments();
});

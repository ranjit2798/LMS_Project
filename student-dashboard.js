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
  const strong = document.createElement('strong');
  strong.textContent = 'You:';
  p.appendChild(strong);
  p.appendChild(document.createTextNode(' ' + msg));
  const messages = document.querySelector('#communication .messages');
  messages.appendChild(p);
  qnaInput.value = '';
  qnaFeedback.textContent = "Sent!";
  messages.scrollTop = messages.scrollHeight;
});

// Unified Logout and Sign Out via modal
const logoutBtn = document.getElementById('logoutBtn');
const logoutBtnSettings = document.getElementById('logoutBtnSettings');
const signOutCurrentBtn = document.getElementById('signOutCurrent');
const signOutAllSessionsBtn = document.getElementById('signOutAllSessions');
const signOutConfirmDiv = document.getElementById('signOutConfirm');
const signOutConfirmYes = document.querySelector('.signout-confirm-yes');
const signOutConfirmNo = document.querySelector('.signout-confirm-no');
const signOutMessage = document.getElementById('signOutMessage');

function showModal(el, show) { if (el) el.style.display = show ? 'flex' : 'none'; }
function logoutRedirect(all) {
  try { localStorage.removeItem('studentToken'); } catch (_) {}
  // TODO: handle `all` for multi-device sign-out if you add backend sessions later
  window.location.href = 'Role_Select.html';
}

logoutBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  signOutMessage.textContent = 'Sign out from this device?';
  showModal(signOutConfirmDiv, true);
});

logoutBtnSettings?.addEventListener('click', (e) => {
  e.preventDefault();
  signOutMessage.textContent = 'Sign out from this device?';
  showModal(signOutConfirmDiv, true);
});

signOutCurrentBtn?.addEventListener('click', () => {
  signOutMessage.textContent = 'Sign out from this device?';
  showModal(signOutConfirmDiv, true);
});

signOutAllSessionsBtn?.addEventListener('click', () => {
  signOutMessage.textContent = 'Sign out from all devices?';
  showModal(signOutConfirmDiv, true);
});

signOutConfirmYes?.addEventListener('click', () => {
  const all = signOutMessage.textContent.includes('all');
  logoutRedirect(all);
});

signOutConfirmNo?.addEventListener('click', () => showModal(signOutConfirmDiv, false));

// ---------------- Course Card Navigation ----------------
function enterCourse(courseName) {
  alert(`Entering course: ${courseName}`);
}
window.enterCourse = enterCourse;

// ---------------- Local Storage Helpers ----------------
function readStore(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch (_) { return []; }
}

// ---------------- IndexedDB for files ----------------
let dbPromise;
function getDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open('LMS_DB', 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files', { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  return dbPromise;
}

async function getFile(id) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('files', 'readonly');
    const req = tx.objectStore('files').get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ---------------- Render Lectures ----------------
function renderLectures() {
  const ul = document.getElementById('lectureList');
  if (!ul) return;
  const lectures = readStore('lms_lectures');
  ul.innerHTML = '';
  if (lectures.length === 0) {
    ul.innerHTML = '<li>No lectures yet.</li>';
    return;
  }
  lectures
    .sort((a,b)=> new Date(b.date) - new Date(a.date))
    .forEach(l => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = `${l.course} - ${l.topic} (${l.date})`;
      btn.addEventListener('click', async () => {
        const rec = await getFile(l.id);
        if (!rec) { alert('File missing'); return; }
        const url = URL.createObjectURL(rec.blob);
        const a = document.createElement('a');
        a.href = url; a.download = rec.name || 'lecture';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(()=>URL.revokeObjectURL(url), 1000);
      });
      li.appendChild(btn);
      ul.appendChild(li);
    });
}

// ---------------- Render Assignments & Handle Submission ----------------
let selectedAssignmentId = null;
function renderAssignments() {
  const list = document.getElementById('assignmentList');
  if (!list) return;
  const assignments = readStore('lms_assignments');
  list.innerHTML = '';
  if (assignments.length === 0) {
    list.innerHTML = '<li class="task-item">No assignments yet.</li>';
    return;
  }
  assignments
    .sort((a,b)=> new Date(a.deadline) - new Date(b.deadline))
    .forEach(a => {
      const li = document.createElement('li');
      li.className = 'task-item';
      li.innerHTML = `${a.course}: <strong>${a.title}</strong> - Due ${a.deadline} `;
      const btn = document.createElement('button');
      btn.textContent = 'Submit';
      btn.addEventListener('click', () => openSubmissionBox(a));
      li.appendChild(btn);
      list.appendChild(li);
    });
}

function openSubmissionBox(assignment) {
  selectedAssignmentId = assignment.id;
  document.getElementById('submitTitle').textContent = `Submit: ${assignment.title}`;
  const fileEl = document.getElementById('submissionFile');
  if (fileEl) fileEl.value = '';
  document.getElementById('submissionFeedback').textContent = '';
  document.getElementById('submissionBox').style.display = 'block';
}

document.getElementById('submitAssignmentBtn')?.addEventListener('click', async () => {
  const fileInput = document.getElementById('submissionFile');
  const feedback = document.getElementById('submissionFeedback');
  const file = fileInput.files && fileInput.files[0];
  if (!selectedAssignmentId) { feedback.textContent = 'No assignment selected.'; return; }
  if (!file) { feedback.textContent = 'Please choose a file.'; return; }

  const assignments = readStore('lms_assignments');
  const asg = assignments.find(a => a.id === selectedAssignmentId);
  const submissions = readStore('lms_submissions');
  const subId = `sub_${Date.now()}`;

  // Save file to IndexedDB via instructor DB schema (shared name)
  const db = await getDB();
  await new Promise((resolve, reject) => {
    const tx = db.transaction('files', 'readwrite');
    tx.objectStore('files').put({ id: subId, name: file.name, type: file.type, blob: file });
    tx.oncomplete = resolve; tx.onerror = () => reject(tx.error);
  });

  submissions.push({
    id: subId,
    assignmentId: selectedAssignmentId,
    course: asg ? asg.course : 'Unknown Course',
    studentName: document.getElementById('studentName')?.textContent || 'Student',
    fileId: subId,
    submittedAt: new Date().toISOString()
  });
  localStorage.setItem('lms_submissions', JSON.stringify(submissions));
  feedback.textContent = 'Submitted!';
  document.getElementById('submissionBox').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
  renderLectures();
  renderAssignments();
  setupFlashcards();
});

// ---------------- Flashcards controls ----------------
function setupFlashcards() {
  const section = document.getElementById('flashcards');
  if (!section) return;
  const frameBox = section.querySelector('.flashcard-embed-frame');
  const iframe = section.querySelector('.flashcard-frame');
  const reloadBtn = document.getElementById('fcReload');
  const fsBtn = document.getElementById('fcFullscreen');

  // Show loading overlay until first paint
  if (iframe && frameBox) {
    frameBox.classList.add('loading');
    iframe.addEventListener('load', () => frameBox.classList.remove('loading'));
  }

  reloadBtn?.addEventListener('click', () => {
    if (!iframe) return;
    frameBox?.classList.add('loading');
    const src = iframe.src;
    // Force reload even if same URL
    iframe.src = src;
  });

  fsBtn?.addEventListener('click', () => {
    const el = frameBox || iframe;
    if (!document.fullscreenElement) {
      el?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    const inFs = !!document.fullscreenElement;
    const btn = document.getElementById('fcFullscreen');
    if (btn) btn.textContent = inFs ? 'Exit Fullscreen' : 'Fullscreen';
  });
}

// Auto-refresh when instructor adds lectures/assignments in another tab
window.addEventListener('storage', (e) => {
  if (e.key === 'lms_lectures') {
    renderLectures();
  }
  if (e.key === 'lms_assignments') {
    renderAssignments();
  }
});

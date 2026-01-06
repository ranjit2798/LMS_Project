// ===================== PASSWORD TOGGLE =====================
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.querySelector(".toggle-password");

  if (!passwordInput || !toggleBtn) return;

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    toggleBtn.textContent = "👁️";
  }
}
window.togglePassword = togglePassword;

// ===================== LOGIN HANDLER =====================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentLoginForm");
  if (!form) return; // 🚨 prevents JS crash

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const studentId = document.getElementById("studentId")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();
    const remember = document.getElementById("remember")?.checked;

    // -------- BASIC VALIDATION --------
    if (!studentId || !email || !password) {
      showNotification("All fields are required", "error");
      return;
    }

    // -------- BACKEND-READY PAYLOAD --------
    const payload = {
      role: "student",
      studentId,
      email,
      password,
    };

    /*
      REAL BACKEND FLOW (later):

      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => { ... })
    */

    // -------- FRONTEND SIMULATION --------
    const authData = {
      role: "student",
      studentId,
      email,
      loginTime: Date.now(),
    };

    if (remember) {
      localStorage.setItem("edulearn_auth", JSON.stringify(authData));
    } else {
      sessionStorage.setItem("edulearn_auth", JSON.stringify(authData));
    }

    showNotification("Login successful! Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "student-dashboard.html";
    }, 800);
  });

  // -------- AUTO FOCUS --------
  document.getElementById("studentId")?.focus();
});

// ===================== FORGOT PASSWORD =====================
function forgotPassword() {
  showNotification(
    "Please contact the institution admin to reset your password.",
    "info"
  );
}
window.forgotPassword = forgotPassword;

// ===================== HELP =====================
function getHelp() {
  openPopup(
    "🎓 Student Support",
    `
    <div style="line-height:1.6">
      <p><strong>Email:</strong> student-help@edulearn.com</p>
      <p><strong>Phone:</strong> 1-800-EDU-STUDENT</p>
    </div>
  `
  );
}
window.getHelp = getHelp;

// ===================== POPUP =====================
function openPopup(title, html) {
  const existing = document.getElementById("sls-popup");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "sls-popup";
  Object.assign(overlay.style, {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  });

  const card = document.createElement("div");
  Object.assign(card.style, {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    width: "min(520px, 92vw)",
  });

  card.innerHTML = `
    <div style="display:flex;justify-content:space-between">
      <h3>${title}</h3>
      <button id="popupCloseBtn">✕</button>
    </div>
    ${html}
  `;

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  document.getElementById("popupCloseBtn").onclick = () => overlay.remove();
  overlay.onclick = (e) => e.target === overlay && overlay.remove();
}

// ===================== NOTIFICATION =====================
function showNotification(message, type) {
  const note = document.createElement("div");
  note.textContent = message;
  note.style.position = "fixed";
  note.style.top = "20px";
  note.style.right = "20px";
  note.style.background =
    type === "success" ? "#16a34a" : type === "error" ? "#dc2626" : "#2563eb";
  note.style.color = "#fff";
  note.style.padding = "12px 18px";
  note.style.borderRadius = "12px";
  note.style.zIndex = 9999;

  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3000);
}

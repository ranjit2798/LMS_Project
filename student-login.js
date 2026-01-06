// ===================== PASSWORD TOGGLE =====================
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.querySelector(".toggle-password");

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
document
  .getElementById("instructorLoginForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const loginBtn = document.getElementById("loginBtn");
    const instructorId = document.getElementById("instructorId").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const remember = document.getElementById("remember").checked;

    // -------- VALIDATION --------
    if (!instructorId || !email || !password) {
      showNotification("All fields are required", "error");
      return;
    }

    if (!email.includes("@")) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    if (password.length < 6) {
      showNotification("Password must be at least 6 characters", "error");
      return;
    }

    // -------- LOADING STATE --------
    loginBtn.classList.add("loading");
    loginBtn.disabled = true;

    // -------- PAYLOAD (BACKEND READY) --------
    const payload = {
      role: "instructor",
      instructorId,
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

    // -------- TEMP FRONTEND SIMULATION --------
    setTimeout(() => {
      const authData = {
        role: "instructor",
        instructorId,
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
        window.location.href = "instructor-dashboard.html";
      }, 1000);
    }, 1200);
  });

// ===================== FORGOT PASSWORD =====================
function forgotPassword() {
  showNotification(
    "Password reset is handled by the institution admin.",
    "info"
  );
}
window.forgotPassword = forgotPassword;

// ===================== HELP POPUP =====================
function getHelp() {
  openPopup(
    "🧑‍🏫 Instructor Support",
    `
    <div style="line-height:1.6">
      <p><strong>Email:</strong> faculty-support@edulearn.com</p>
      <p><strong>Phone:</strong> 1-800-EDU-FACULTY</p>
      <ul>
        <li>Account locked → Contact admin</li>
        <li>Access issues → Verify role</li>
        <li>Upload problems → Check file size & format</li>
      </ul>
    </div>
  `
  );
}
window.getHelp = getHelp;

// ===================== POPUP SYSTEM =====================
function openPopup(title, html) {
  const existing = document.getElementById("ils-popup");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "ils-popup";
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
    padding: "20px 22px",
    width: "min(520px, 92vw)",
    boxShadow: "0 14px 36px rgba(0,0,0,0.25)",
  });

  card.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h3 style="margin:0">${title}</h3>
      <button id="popupCloseBtn" style="border:none;background:none;font-size:1.1rem;cursor:pointer">✕</button>
    </div>
    <div style="margin-top:0.6rem">${html}</div>
  `;

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  document.getElementById("popupCloseBtn").onclick = () => overlay.remove();
  overlay.onclick = (e) => e.target === overlay && overlay.remove();
}

// ===================== NOTIFICATION SYSTEM =====================
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.innerHTML = `
    <span style="margin-right:6px">${getIcon(type)}</span>
    ${message}
  `;

  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: getColor(type),
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "12px",
    fontSize: "0.9rem",
    zIndex: 1000,
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    animation: "slideIn 0.3s ease",
  });

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease forwards";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function getIcon(type) {
  return type === "success"
    ? "✅"
    : type === "error"
    ? "❌"
    : "ℹ️";
}

function getColor(type) {
  return type === "success"
    ? "#16a34a"
    : type === "error"
    ? "#dc2626"
    : "#2563eb";
}

// ===================== ANIMATIONS =====================
const style = document.createElement("style");
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

// ===================== INPUT UX =====================
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", () => {
    input.style.borderColor = "#e67e22";
  });
  input.addEventListener("blur", () => {
    input.style.borderColor = "#d1d5db";
  });
});

// ===================== PAGE ENTRANCE =====================
window.addEventListener("load", () => {
  const container = document.querySelector(".container");
  container.style.opacity = "0";
  container.style.transform = "translateY(30px)";
  setTimeout(() => {
    container.style.transition = "all 0.6s ease";
    container.style.opacity = "1";
    container.style.transform = "translateY(0)";
  }, 200);
});

// ===================== AUTO FOCUS =====================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("instructorId").focus();
});

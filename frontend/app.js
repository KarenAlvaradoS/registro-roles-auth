const API = "http://localhost:4000";

// UTILIDADES
function setMsg(id, text, ok = true) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.style.color = ok ? "green" : "red";
}

function showTab(tab) {
  document.getElementById("registerBox").classList.toggle("hidden", tab !== "register");
  document.getElementById("loginBox").classList.toggle("hidden", tab !== "login");
  document.getElementById("tabRegister").classList.toggle("active", tab === "register");
  document.getElementById("tabLogin").classList.toggle("active", tab === "login");
}

// TOKEN + USER
function saveToken(token) {
  localStorage.setItem("token", token);
}
function getToken() {
  return localStorage.getItem("token");
}
function clearToken() {
  localStorage.removeItem("token");
}

function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
function getUser() {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
}
function clearUser() {
  localStorage.removeItem("user");
}

// BIENVENIDA
function renderWelcome() {
  const box = document.getElementById("welcomeBox");
  const title = document.getElementById("welcomeTitle");
  const subtitle = document.getElementById("welcomeSubtitle");

  const user = getUser();
  const token = getToken();

  if (token && user) {
    box.classList.remove("hidden");
    title.innerText = `👋 Bienvenido/a ${user.name}`;
    subtitle.innerText = `Rol: ${user.role}`;
  } else {
    box.classList.add("hidden");
  }
}

// REGISTRO
async function registerUser() {
  try {
    setMsg("r_msg", "Registrando...");

    const body = {
      name: r_name.value.trim(),
      email: r_email.value.trim(),
      password: r_pass.value,
      roleName: r_role.value
    };

    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg("r_msg", data.message, false);
      return;
    }

    setMsg("r_msg", "✅ Usuario creado");
    showTab("login");
    l_email.value = body.email;
    l_pass.value = body.password;
  } catch {
    setMsg("r_msg", "❌ Error de conexión", false);
  }
}

// LOGIN
async function loginUser() {
  try {
    setMsg("l_msg", "Iniciando sesión...");

    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: l_email.value,
        password: l_pass.value
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg("l_msg", data.message, false);
      return;
    }

    saveToken(data.token);
    saveUser(data.user);
    renderWelcome();
    setMsg("l_msg", "✅ Sesión iniciada");
  } catch {
    setMsg("l_msg", "❌ Error de conexión", false);
  }
}

// ZONA PROTEGIDA
async function getProtected() {
  const token = getToken();
  if (!token) {
    setMsg("p_msg", "⚠️ Debes iniciar sesión", false);
    return;
  }

  const res = await fetch(`${API}/api/protected`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  document.getElementById("protectedBox").textContent = JSON.stringify(data, null, 2);
  setMsg("p_msg", "🔐 Acceso permitido");
}

// LOGOUT
function logout() {
  clearToken();
  clearUser();
  renderWelcome();
  document.getElementById("protectedBox").textContent = "";
  setMsg("p_msg", "Sesión cerrada");
}

renderWelcome();

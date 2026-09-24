const box = document.getElementById("admin");

box.innerHTML = `
  <div class="wrap" style="max-width:480px">
    <div class="card">
      <h1>CareerJob Admin</h1>
      <p class="muted">Restricted administrator access</p>

      <form id="f" class="form">
        <input
          class="input"
          name="email"
          type="email"
          value="admin@careerjob.local"
          placeholder="Admin email"
        >

        <input
          class="input"
          name="password"
          type="password"
          value="Admin@12345"
          placeholder="Password"
        >

        <button class="btn" type="submit">Login as Admin</button>
      </form>

      <p>
        <a href="/" style="color:#8f9bca">← Back to CareerJob</a>
      </p>
    </div>
  </div>
`;

document.getElementById("f").onsubmit = async (e) => {
  e.preventDefault();

  try {
    const d = await api("/api/auth/admin-login", {
      method: "POST",
      body: JSON.stringify(
        Object.fromEntries(new FormData(e.target))
      )
    });

    saveAuth(d);
    location.href = "/admin.html";

  } catch (x) {
    toast(x.message);
  }
};
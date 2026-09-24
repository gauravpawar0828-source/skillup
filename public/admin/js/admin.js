if (!CJ.user || CJ.user.role !== "ADMIN") {
  location.href = "/admin-login.html";
}

const root = document.getElementById("admin");

function shell(content) {
  root.innerHTML = `
    <div class="bar">
      <div class="logo">Career<span>Job</span> Admin</div>
      <button class="btn" onclick="logout()">Logout</button>
    </div>

    <div class="wrap">
      ${content}
    </div>
  `;
}

async function load() {
  try {
    const [s, j, u] = await Promise.all([
      api("/api/admin/stats"),
      api("/api/admin/jobs"),
      api("/api/admin/users")
    ]);

    shell(`
      <h1>Admin Dashboard</h1>
      <p class="muted">
        Manage the database, jobs, users and synchronization.
      </p>

      <div class="grid">

        <div class="card">
          <div class="muted">Users</div>
          <div class="stat">${s.stats.users}</div>
        </div>

        <div class="card">
          <div class="muted">Jobs</div>
          <div class="stat">${s.stats.jobs}</div>
        </div>

        <div class="card">
          <div class="muted">Companies</div>
          <div class="stat">${s.stats.companies}</div>
        </div>

        <div class="card">
          <div class="muted">Applications</div>
          <div class="stat">${s.stats.applications}</div>
        </div>

      </div>

      <div class="actions" style="margin:20px 0">
        <button class="btn" onclick="sync()">Run Job Sync</button>
        <button class="btn" onclick="addJob()">Add Job</button>
      </div>

      <div class="grid2">

        <div class="card">
          <h2>Jobs</h2>

          <table class="table">
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Source</th>
              <th>Action</th>
            </tr>

            ${j.jobs.map(x => `
              <tr>
                <td>
                  ${esc(x.title)}
                  <br>
                  <span class="muted">${esc(x.location)}</span>
                </td>

                <td>${esc(x.company_name)}</td>

                <td>
                  <span class="tag">${x.source_type}</span>
                </td>

                <td>
                  <button
                    class="btn"
                    onclick="toggleJob(${x.id})"
                  >
                    ${x.is_active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            `).join("")}
          </table>
        </div>


        <div class="card">
          <h2>Users</h2>

          <table class="table">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
            </tr>

            ${u.users.map(x => `
              <tr>
                <td>${esc(x.name)}</td>
                <td>${esc(x.email)}</td>
                <td>
                  ${new Date(x.created_at).toLocaleDateString()}
                </td>
              </tr>
            `).join("")}
          </table>
        </div>

      </div>


      <div class="card" style="margin-top:18px">

        <h2>Synchronization history</h2>

        <table class="table">
          <tr>
            <th>Provider</th>
            <th>Status</th>
            <th>Received</th>
            <th>Added</th>
            <th>Date</th>
          </tr>

          ${s.logs.map(x => `
            <tr>
              <td>${esc(x.provider)}</td>
              <td>${esc(x.status)}</td>
              <td>${x.jobs_received}</td>
              <td>${x.jobs_added}</td>
              <td>
                ${new Date(x.synced_at).toLocaleString()}
              </td>
            </tr>
          `).join("")}

        </table>

      </div>
    `);

  } catch (e) {
    toast(e.message);
  }
}


async function sync() {
  try {
    const d = await api("/api/admin/sync", {
      method: "POST"
    });

    toast(`Sync complete: ${d.added} added`);
    load();

  } catch (e) {
    toast(e.message);
  }
}


async function toggleJob(id) {
  try {
    await api(`/api/admin/jobs/${id}/toggle`, {
      method: "PATCH"
    });

    load();

  } catch (e) {
    toast(e.message);
  }
}


async function addJob() {
  const title = prompt("Job title");

  if (!title) {
    return;
  }

  const company = prompt("Exact company name from database");
  const location = prompt("Location");
  const skills = prompt("Skills, comma separated");

  try {
    await api("/api/admin/jobs", {
      method: "POST",

      body: JSON.stringify({
        title,
        company_name: company,
        location,
        skills,
        description: "Admin-created opportunity",
        application_url: "#",
        min_salary: 0,
        max_salary: 0
      })
    });

    toast("Job added");
    load();

  } catch (e) {
    toast(e.message);
  }
}


load();
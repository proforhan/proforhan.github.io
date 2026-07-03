// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") links.classList.remove("open");
});

// GitHub repos — fetched live so the cards stay up to date
const GITHUB_USER = "proforhan";

const LANG_COLORS = {
  Python: "#3572A5", HTML: "#e34c26", JavaScript: "#f1e05a", CSS: "#563d7c",
  "Jupyter Notebook": "#DA5B0B", R: "#198CE7", PowerShell: "#012456", TeX: "#3D6117",
};

async function loadRepos() {
  const grid = document.getElementById("repo-grid");
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`
    );
    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
    const repos = (await res.json()).filter((r) => !r.fork);

    if (repos.length === 0) {
      grid.innerHTML = '<p class="repo-error">No public repositories yet.</p>';
      return;
    }

    grid.innerHTML = repos
      .map((r) => {
        const color = LANG_COLORS[r.language] || "#8b949e";
        const updated = new Date(r.pushed_at).toLocaleDateString("en-US", {
          year: "numeric", month: "short", day: "numeric",
        });
        return `
        <a class="repo-card" href="${r.html_url}" target="_blank" rel="noopener">
          <div class="repo-name">${r.name}</div>
          <p class="repo-desc">${r.description || "No description provided."}</p>
          <div class="repo-meta">
            ${r.language ? `<span><span class="lang-dot" style="background:${color}"></span>${r.language}</span>` : ""}
            <span>★ ${r.stargazers_count}</span>
            <span>Updated ${updated}</span>
          </div>
        </a>`;
      })
      .join("");
  } catch (err) {
    grid.innerHTML = `<p class="repo-error">Couldn’t load repositories right now —
      visit <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">github.com/${GITHUB_USER}</a> instead.</p>`;
  }
}

loadRepos();

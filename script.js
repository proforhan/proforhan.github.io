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

// Projects that don't live under GITHUB_USER (e.g. joint work) — shown as matching cards.
const MANUAL_PROJECTS = [
  {
    name: "LLM Portfolio Battle",
    description:
      "Four AI models — DeepSeek, Claude, ChatGPT, and Grok — each manage a $1,000 portfolio in a weekly battle against the S&P 500.",
    url: "https://manasareddy2417.github.io/LLM-performance-tracker/",
    language: "JavaScript",
    metaRight: "<span>Live demo ↗</span><span>with Manasa Reddy</span>",
  },
];

function projectCard(name, description, url, language, metaRight) {
  const color = LANG_COLORS[language] || "#8b949e";
  const lang = language
    ? `<span><span class="lang-dot" style="background:${color}"></span>${language}</span>`
    : "";
  return `
    <a class="repo-card" href="${url}" target="_blank" rel="noopener">
      <div class="repo-name">${name}</div>
      <p class="repo-desc">${description}</p>
      <div class="repo-meta">${lang}${metaRight}</div>
    </a>`;
}

async function loadRepos() {
  const grid = document.getElementById("repo-grid");
  const manualCards = MANUAL_PROJECTS.map((p) =>
    projectCard(p.name, p.description, p.url, p.language, p.metaRight)
  );
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`
    );
    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
    const repos = (await res.json()).filter(
      (r) => !r.fork && r.name !== `${GITHUB_USER}.github.io`
    );

    const repoCards = repos.map((r) => {
      const updated = new Date(r.pushed_at).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      });
      return projectCard(
        r.name,
        r.description || "No description provided.",
        r.html_url,
        r.language,
        `<span>★ ${r.stargazers_count}</span><span>Updated ${updated}</span>`
      );
    });

    grid.innerHTML = [...repoCards, ...manualCards].join("");
  } catch (err) {
    grid.innerHTML =
      manualCards.join("") +
      `<p class="repo-error">Couldn’t load the rest from GitHub right now —
       visit <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">github.com/${GITHUB_USER}</a> instead.</p>`;
  }
}

loadRepos();

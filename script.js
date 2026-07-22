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

// ===== Config: paste one value into each to switch the feature on =====

// Walmart Inflation Tracker chart.
// In Google Sheets: File → Share → Publish to web → choose the chart →
// Embed → copy the URL inside src="..." and paste it below (keep the quotes).
const WALMART_CHART_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhdq30a-BoalCItw-ZlbBAHyrrx2US1Lu98C1HMhjFxOuRQVs7cEHi5qe24HvMx83zyEOPzpkRgyO1/pubchart?oid=271917230&format=interactive";

// Morning Book newsletter (Buttondown). Create a free account at buttondown.com,
// then put your username here (the part after buttondown.com/…). Leave "" to keep
// the current email-me button.
const BUTTONDOWN_USER = "orhan";

// ===== Wire up the config =====

// Show the Walmart chart once a publish URL is provided.
const walmartEl = document.getElementById("walmart-tracker");
if (walmartEl && WALMART_CHART_URL) {
  walmartEl.querySelector(".data-embed").innerHTML =
    `<iframe src="${WALMART_CHART_URL}" title="Walmart Inflation Tracker chart" loading="lazy"></iframe>`;
  walmartEl.hidden = false;
}

// Swap the mailto "Subscribe" button for a real signup form once Buttondown is set.
const subscribeEl = document.getElementById("subscribe-cta");
if (subscribeEl && BUTTONDOWN_USER) {
  const form = document.createElement("form");
  form.className = "subscribe-form";
  form.action = `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USER}`;
  form.method = "post";
  form.target = "popupwindow";
  form.addEventListener("submit", () =>
    window.open(`https://buttondown.com/${BUTTONDOWN_USER}`, "popupwindow")
  );
  form.innerHTML =
    `<input type="email" name="email" placeholder="you@example.com" aria-label="Email address" required />
     <button type="submit" class="btn btn-primary">Subscribe</button>`;
  const note = document.createElement("p");
  note.className = "subscribe-note";
  note.textContent = "You’ll get a confirmation email — check your inbox to confirm.";
  const wrap = document.createElement("div");
  wrap.className = "subscribe-cta-wrap";
  wrap.append(form, note);
  subscribeEl.replaceWith(wrap);
}

// Assemble the contact email at runtime so scrapers don't see a raw mailto.
const emailEl = document.getElementById("contact-email");
if (emailEl) {
  const addr = emailEl.dataset.user + "@" + emailEl.dataset.domain;
  emailEl.href = "mailto:" + addr;
  emailEl.setAttribute("aria-label", "Email " + addr);
}

// GitHub repos — fetched live so the cards stay up to date
const GITHUB_USER = "proforhan";

const LANG_COLORS = {
  Python: "#3572A5", HTML: "#e34c26", JavaScript: "#f1e05a", CSS: "#563d7c",
  "Jupyter Notebook": "#DA5B0B", R: "#198CE7", PowerShell: "#012456", TeX: "#3D6117",
};

// Friendly display titles for repos (keyed by GitHub repo name).
const DISPLAY_NAMES = {
  "orhans-morning-book": "Orhan's Morning Book",
  "isochronic-maps": "World Isochronic Map",
};

// Inline SVG thumbnails (inherit the card's accent color via currentColor).
const ICON_MAP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M4.6 7.5h14.8M4.6 16.5h14.8"/></svg>`;
const ICON_CHART = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><rect x="5" y="11" width="3" height="7" rx="1"/><rect x="10.5" y="7" width="3" height="11" rx="1"/><rect x="16" y="4" width="3" height="14" rx="1"/></svg>`;
const ICON_STOCKS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15l3.5-4 3 2.2L21 6"/><path d="M16.5 6H21v4.5"/></svg>`;
const ICON_DEFAULT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 8.5 5.5 12 9 15.5M15 8.5 18.5 12 15 15.5"/></svg>`;
const ICON_BANK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 3 8h18z"/><path d="M4 21h16M5 21V10M9.5 21V10M14.5 21V10M19 21V10"/></svg>`;
const ICON_CART = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 3h2l2.2 12.2a1.5 1.5 0 0 0 1.5 1.3h8.6a1.5 1.5 0 0 0 1.5-1.2L21.5 7H6"/><circle cx="9" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/></svg>`;

// Per-repo icon overrides (keyed by GitHub repo name).
const REPO_ICONS = {
  "isochronic-maps": ICON_MAP,
  "orhans-morning-book": ICON_CHART,
};

// Projects that don't live under GITHUB_USER (e.g. joint work) — shown as matching cards.
const MANUAL_PROJECTS = [
  {
    name: "Fed Chair Game",
    description:
      "An interactive macro simulation: set the fed funds rate each quarter to steer inflation and unemployment through shocks and a drifting neutral rate. Can you survive 40 quarters?",
    url: "fed-chair-game.html",
    language: "",
    metaRight: "<span>Play in browser ↗</span>",
    icon: ICON_BANK,
  },
  {
    name: "LLM Portfolio Battle (with M. Dontireddy)",
    description:
      "Four AI models — DeepSeek, Claude, ChatGPT, and Grok — each manage a $1,000 portfolio in a weekly battle against the S&P 500.",
    url: "https://manasareddy2417.github.io/LLM-performance-tracker/",
    language: "JavaScript",
    metaRight: "<span>Live demo ↗</span>",
    icon: ICON_STOCKS,
  },
  {
    name: "Walmart Inflation Tracker",
    description:
      "A fixed grocery basket at a Walmart in Irving, Texas, tracked over time as a real-world inflation gauge versus the official CPI.",
    url: "#walmart",
    language: "",
    metaRight: "<span>View the tracker ↓</span>",
    icon: ICON_CART,
  },
];

function projectCard(name, description, url, language, metaRight, icon) {
  const color = LANG_COLORS[language] || "#8b949e";
  const lang = language
    ? `<span><span class="lang-dot" style="background:${color}"></span>${language}</span>`
    : "";
  // In-page anchors (e.g. #walmart) scroll on this page; everything else opens a new tab.
  const target = url.startsWith("#") ? "" : ` target="_blank" rel="noopener"`;
  return `
    <a class="repo-card" href="${url}"${target}>
      <div class="repo-head">
        <span class="repo-icon">${icon || ICON_DEFAULT}</span>
        <div class="repo-name">${name}</div>
      </div>
      <p class="repo-desc">${description}</p>
      <div class="repo-meta">${lang}${metaRight}</div>
    </a>`;
}

async function loadRepos() {
  const grid = document.getElementById("repo-grid");
  const manualCards = MANUAL_PROJECTS.map((p) =>
    projectCard(p.name, p.description, p.url, p.language, p.metaRight, p.icon)
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
      const stars = r.stargazers_count >= 10 ? `<span>★ ${r.stargazers_count}</span>` : "";
      return projectCard(
        DISPLAY_NAMES[r.name] || r.name,
        r.description || "No description provided.",
        r.html_url,
        r.language,
        `${stars}<span>Updated ${updated}</span>`,
        REPO_ICONS[r.name]
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

document.getElementById("year").textContent = new Date().getFullYear();

const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

function closeMenu() {
  links.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation menu");
}

function openMenu() {
  links.classList.add("open");
  toggle.setAttribute("aria-expanded", "true");
  toggle.setAttribute("aria-label", "Close navigation menu");
}

toggle?.addEventListener("click", () => {
  links.classList.contains("open") ? closeMenu() : openMenu();
});

links?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && links?.classList.contains("open")) {
    closeMenu();
    toggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) closeMenu();
});

const WALMART_CHART_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhdq30a-BoalCItw-ZlbBAHyrrx2US1Lu98C1HMhjFxOuRQVs7cEHi5qe24HvMx83zyEOPzpkRgyO1/pubchart?oid=271917230&format=interactive";
const BUTTONDOWN_USER = "orhan";

const walmartEl = document.getElementById("walmart-tracker");
const walmartFullscreen = document.getElementById("walmart-fullscreen");
if (WALMART_CHART_URL) {
  walmartFullscreen.href = WALMART_CHART_URL;
  if (walmartEl && window.matchMedia("(min-width: 721px)").matches) {
    const iframe = document.createElement("iframe");
    iframe.src = WALMART_CHART_URL;
    iframe.title = "Walmart Inflation Tracker interactive chart";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    walmartEl.querySelector(".data-embed").appendChild(iframe);
    walmartEl.hidden = false;
  }
}

const subscribeEl = document.getElementById("subscribe-cta");
if (subscribeEl && BUTTONDOWN_USER) {
  const form = document.createElement("form");
  form.className = "subscribe-form";
  form.action = `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USER}`;
  form.method = "post";
  form.target = "popupwindow";
  form.addEventListener("submit", () => window.open(`https://buttondown.com/${BUTTONDOWN_USER}`, "popupwindow"));

  const input = document.createElement("input");
  input.type = "email";
  input.name = "email";
  input.placeholder = "you@example.com";
  input.setAttribute("aria-label", "Email address");
  input.required = true;

  const button = document.createElement("button");
  button.type = "submit";
  button.className = "btn btn-primary";
  button.textContent = "Subscribe";
  form.append(input, button);

  const note = document.createElement("p");
  note.className = "subscribe-note";
  note.textContent = "You’ll receive a confirmation email.";

  const wrap = document.createElement("div");
  wrap.className = "subscribe-cta-wrap";
  wrap.append(form, note);
  subscribeEl.replaceWith(wrap);
}

const emailEl = document.getElementById("contact-email");
if (emailEl) {
  const address = `${emailEl.dataset.user}@${emailEl.dataset.domain}`;
  emailEl.href = `mailto:${address}`;
  emailEl.setAttribute("aria-label", `Email ${address}`);
}

const bookCarousel = document.getElementById("book-carousel");
const bookPrev = document.getElementById("books-prev");
const bookNext = document.getElementById("books-next");
function scrollBooks(direction) {
  const card = bookCarousel?.querySelector(".book-card");
  if (!card) return;
  const gap = parseFloat(getComputedStyle(bookCarousel).columnGap || "0");
  bookCarousel.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
}
bookPrev?.addEventListener("click", () => scrollBooks(-1));
bookNext?.addEventListener("click", () => scrollBooks(1));
bookCarousel?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") scrollBooks(1);
  if (event.key === "ArrowLeft") scrollBooks(-1);
});

const ICON_MAP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M4.6 7.5h14.8M4.6 16.5h14.8"/></svg>`;
const ICON_GAME = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 7.5h7a5.5 5.5 0 0 1 5.2 7.3l-1 2.9a2.4 2.4 0 0 1-4.1.7l-1.1-1.4h-5l-1.1 1.4a2.4 2.4 0 0 1-4.1-.7l-1-2.9a5.5 5.5 0 0 1 5.2-7.3Z"/><path d="M7.5 11v4M5.5 13h4"/><circle cx="16.5" cy="11.8" r=".8" fill="currentColor" stroke="none"/><circle cx="18.5" cy="14" r=".8" fill="currentColor" stroke="none"/></svg>`;
const ICON_STOCKS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="M7 15l3.5-4 3 2.2L21 6"/><path d="M16.5 6H21v4.5"/></svg>`;

const FEATURED_PROJECTS = [
  {
    title: "World Isochronic Map",
    description: "Explore how far travelers could reach from major world cities within different travel-time bands, inspired by Francis Galton's 1881 isochronic map.",
    url: "https://proforhan.github.io/isochronic-maps/",
    meta: "Explore the interactive map ↗",
    icon: ICON_MAP
  },
  {
    title: "Fed Chair Game",
    description: "An interactive economics game: set interest rates, manage inflation and unemployment, and guide the economy through 40 quarters.",
    url: "fed-chair-game.html",
    meta: "Play the game ↗",
    icon: ICON_GAME,
    tag: "Interactive economics game",
    variant: "game"
  },
  {
    title: "LLM Portfolio Battle",
    description: "Four AI models manage competing portfolios in a weekly comparison against the S&P 500.",
    url: "https://manasareddy2417.github.io/LLM-performance-tracker/",
    meta: "View the live project ↗",
    icon: ICON_STOCKS
  }
];

function projectCard({ title, description, url, meta, icon, tag, variant }) {
  const anchor = document.createElement("a");
  anchor.className = `repo-card${variant ? ` repo-card-${variant}` : ""}`;
  anchor.href = url;
  if (!url.startsWith("#")) {
    anchor.target = "_blank";
    anchor.rel = "noopener";
  }

  const head = document.createElement("div");
  head.className = "repo-head";
  const iconEl = document.createElement("span");
  iconEl.className = "repo-icon";
  iconEl.innerHTML = icon;
  const nameEl = document.createElement("div");
  nameEl.className = "repo-name";
  nameEl.textContent = title;
  head.append(iconEl, nameEl);

  const tagEl = tag ? document.createElement("span") : null;
  if (tagEl) {
    tagEl.className = "project-tag";
    tagEl.textContent = tag;
  }

  const descriptionEl = document.createElement("p");
  descriptionEl.className = "repo-desc";
  descriptionEl.textContent = description;

  const metaEl = document.createElement("div");
  metaEl.className = "repo-meta";
  const metaSpan = document.createElement("span");
  metaSpan.textContent = meta;
  metaEl.appendChild(metaSpan);

  anchor.append(head);
  if (tagEl) anchor.append(tagEl);
  anchor.append(descriptionEl, metaEl);
  return anchor;
}

const projectGrid = document.getElementById("repo-grid");
if (projectGrid) {
  projectGrid.replaceChildren(...FEATURED_PROJECTS.map(projectCard));
}

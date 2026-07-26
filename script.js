
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

const BUTTONDOWN_USER = "orhan";

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

/* ===== Walmart Google Sheets auto-update ===== */
const WALMART_SHEET_ID = "1qOdMjkWm0JccWKO6gTpHF5wDVZE3MuQj6oKXnURuKVk";
const WALMART_SHEET_GID = "0";
const WALMART_QUERY = "select A,I,J,L where A is not null";
const WALMART_FALLBACK_DATA = [
  { label: "Jan 2026", walmart: 100.00, mom: null, cpi: 100.00 },
  { label: "Feb 2026", walmart: 100.00, mom: 0.00, cpi: 100.27 },
  { label: "Mar 2026", walmart: 101.42, mom: 1.42, cpi: 101.13 },
  { label: "Apr 2026", walmart: 101.42, mom: 0.00, cpi: 101.78 },
  { label: "May 2026", walmart: 101.72, mom: 0.29, cpi: 102.26 },
  { label: "Jun 2026", walmart: 101.42, mom: -0.29, cpi: 101.83 },
  { label: "Jul 2026", walmart: 98.75, mom: -2.64, cpi: null }
];

function walmartCellText(cell) {
  if (!cell) return "";
  const value = cell.f ?? cell.v ?? "";
  return String(value).trim();
}

function walmartCellNumber(cell) {
  if (!cell) return null;
  if (typeof cell.v === "number" && Number.isFinite(cell.v)) return cell.v;
  const parsed = Number.parseFloat(
    walmartCellText(cell).replace(/[$,%\s]/g, "").replace(/,/g, "")
  );
  return Number.isFinite(parsed) ? parsed : null;
}

function walmartCellPercent(cell) {
  if (!cell) return null;
  const formatted = walmartCellText(cell);
  if (formatted.includes("%")) {
    const parsed = Number.parseFloat(formatted.replace(/[,%\s]/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }
  const raw = walmartCellNumber(cell);
  if (raw === null) return null;
  return Math.abs(raw) <= 1 ? raw * 100 : raw;
}

function walmartMonthDate(label) {
  const match = String(label).match(
    /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})$/i
  );
  if (!match) return null;
  const months = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };
  return new Date(Number(match[2]), months[match[1].slice(0, 3).toLowerCase()], 1);
}

function parseWalmartResponse(response) {
  if (!response || response.status === "error" || !response.table?.rows) {
    const message = response?.errors?.[0]?.detailed_message || "Google Sheets returned no usable data.";
    throw new Error(message);
  }

  const rows = response.table.rows
    .map((row) => {
      const cells = row.c || [];
      const label = walmartCellText(cells[0]);
      const date = walmartMonthDate(label);
      const walmart = walmartCellNumber(cells[1]);
      const mom = walmartCellPercent(cells[2]);
      const cpi = walmartCellNumber(cells[3]);
      return { label, date, walmart, mom, cpi };
    })
    .filter((row) => row.date && Number.isFinite(row.walmart))
    .sort((a, b) => a.date - b.date);

  if (!rows.length) throw new Error("No monthly Walmart index rows were found.");

  rows.forEach((row, index) => {
    if (row.mom === null && index > 0) {
      row.mom = ((row.walmart / rows[index - 1].walmart) - 1) * 100;
    }
  });

  return rows;
}

function loadWalmartJsonp() {
  return new Promise((resolve, reject) => {
    const callbackName = `receiveWalmartData_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Google Sheets took too long to respond."));
    }, 10000);

    const scriptTag = document.createElement("script");

    function cleanup() {
      window.clearTimeout(timeout);
      scriptTag.remove();
      try {
        delete window[callbackName];
      } catch {
        window[callbackName] = undefined;
      }
    }

    window[callbackName] = (response) => {
      cleanup();
      try {
        resolve(parseWalmartResponse(response));
      } catch (error) {
        reject(error);
      }
    };

    const params = new URLSearchParams({
      gid: WALMART_SHEET_GID,
      headers: "3",
      tq: WALMART_QUERY,
      tqx: `responseHandler:${callbackName}`,
      _: String(Date.now())
    });

    scriptTag.src =
      `https://docs.google.com/spreadsheets/d/${WALMART_SHEET_ID}/gviz/tq?${params}`;
    scriptTag.async = true;
    scriptTag.onerror = () => {
      cleanup();
      reject(new Error("The Google Sheets data feed could not be loaded."));
    };
    document.head.appendChild(scriptTag);
  });
}

function formatWalmartPercent(value) {
  if (!Number.isFinite(value)) return "n/a";
  const rounded = Math.abs(value) < 0.005 ? 0 : value;
  const sign = rounded < 0 ? "−" : rounded > 0 ? "+" : "";
  return `${sign}${Math.abs(rounded).toFixed(1)}%`;
}

function walmartShortMonth(label) {
  return String(label).slice(0, 3);
}

function svgNode(name, attributes = {}, text = null) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });
  if (text !== null) element.textContent = text;
  return element;
}

function appendSvgText(svg, x, y, text, attributes = {}) {
  const node = svgNode("text", {
    x,
    y,
    "font-family": "Inter, Arial, sans-serif",
    fill: "#55606f",
    ...attributes
  }, text);
  svg.appendChild(node);
  return node;
}

function buildSeriesPath(rows, valueKey, xScale, yScale) {
  const points = rows
    .filter((row) => Number.isFinite(row[valueKey]))
    .map((row, index) => ({
      x: xScale(rows.indexOf(row)),
      y: yScale(row[valueKey]),
      index
    }));

  return points.map((point, index) =>
    `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`
  ).join(" ");
}

function renderWalmartChart(rows) {
  const svg = document.getElementById("walmart-chart");
  if (!svg || !rows.length) return;

  const width = 1040;
  const height = 620;
  const left = 90;
  const right = 55;
  const top = 118;
  const bottom = 85;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const allValues = rows.flatMap((row) =>
    [row.walmart, row.cpi].filter(Number.isFinite)
  );
  const rawMin = Math.min(100, ...allValues);
  const rawMax = Math.max(100, ...allValues);
  let yMin = Math.floor(rawMin - 0.75);
  let yMax = Math.ceil(rawMax + 0.75);
  if (yMax - yMin < 5) {
    const midpoint = (yMin + yMax) / 2;
    yMin = Math.floor(midpoint - 2.5);
    yMax = Math.ceil(midpoint + 2.5);
  }

  const xScale = (index) =>
    rows.length === 1 ? left + plotWidth / 2 : left + (index / (rows.length - 1)) * plotWidth;
  const yScale = (value) =>
    top + ((yMax - value) / (yMax - yMin)) * plotHeight;

  const latest = rows[rows.length - 1];
  const latestOfficial = [...rows].reverse().find((row) => Number.isFinite(row.cpi));

  svg.replaceChildren();
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-labelledby", "walmart-chart-title walmart-chart-desc");

  svg.append(
    svgNode("title", { id: "walmart-chart-title" },
      "Walmart Basket Price Index and official US CPI"),
    svgNode("desc", { id: "walmart-chart-desc" },
      `The Walmart basket index is shown from ${rows[0].label} through ${latest.label}. ` +
      `The latest index is ${latest.walmart.toFixed(2)}, a monthly change of ` +
      `${formatWalmartPercent(latest.mom)}.`),
    svgNode("rect", { width: "100%", height: "100%", rx: 24, fill: "#ffffff" })
  );

  appendSvgText(svg, left, 48, "Walmart Basket Price Index", {
    "font-size": 27,
    "font-weight": 700,
    fill: "#1c2230"
  });
  appendSvgText(svg, left, 80, "Base = 100 in January 2026 · compared with official US CPI", {
    "font-size": 16
  });

  const calloutX = width - 250;
  svg.appendChild(svgNode("rect", {
    x: calloutX, y: 28, width: 195, height: 62, rx: 14,
    fill: "#fde5df", stroke: "#f7b6a6"
  }));
  appendSvgText(svg, calloutX + 20, 52, `${walmartShortMonth(latest.label).toUpperCase()} MONTHLY CHANGE`, {
    "font-size": 12, "font-weight": 700, "letter-spacing": 1, fill: "#9b3d2b"
  });
  appendSvgText(svg, calloutX + 20, 77, formatWalmartPercent(latest.mom), {
    "font-family": "Source Serif 4, Georgia, serif",
    "font-size": 25, "font-weight": 700, fill: "#f0603f"
  });

  const tickCount = 5;
  for (let index = 0; index <= tickCount; index += 1) {
    const value = yMin + ((yMax - yMin) * index) / tickCount;
    const y = yScale(value);
    svg.appendChild(svgNode("line", {
      x1: left, y1: y, x2: width - right, y2: y,
      stroke: Math.abs(value - 100) < 0.15 ? "#cfc7ba" : "#e9e3da",
      "stroke-width": Math.abs(value - 100) < 0.15 ? 2 : 1
    }));
    appendSvgText(svg, left - 18, y + 5, value.toFixed(value % 1 ? 1 : 0), {
      "text-anchor": "end", "font-size": 13, fill: "#687383"
    });
  }

  rows.forEach((row, index) => {
    const x = xScale(index);
    svg.appendChild(svgNode("line", {
      x1: x, y1: top + plotHeight, x2: x, y2: top + plotHeight + 7,
      stroke: "#b9b1a6"
    }));
    appendSvgText(svg, x, top + plotHeight + 30, walmartShortMonth(row.label), {
      "text-anchor": "middle", "font-size": 14
    });
  });

  svg.appendChild(svgNode("line", {
    x1: left, y1: top + plotHeight, x2: width - right, y2: top + plotHeight,
    stroke: "#aaa197"
  }));

  const cpiPath = buildSeriesPath(rows, "cpi", xScale, yScale);
  if (cpiPath) {
    svg.appendChild(svgNode("path", {
      d: cpiPath, fill: "none", stroke: "#6d5ae0", "stroke-width": 5,
      "stroke-linecap": "round", "stroke-linejoin": "round"
    }));
  }

  const walmartPath = buildSeriesPath(rows, "walmart", xScale, yScale);
  svg.appendChild(svgNode("path", {
    d: walmartPath, fill: "none", stroke: "#0e7c72", "stroke-width": 6,
    "stroke-linecap": "round", "stroke-linejoin": "round"
  }));

  rows.forEach((row, index) => {
    const x = xScale(index);
    if (Number.isFinite(row.cpi)) {
      svg.appendChild(svgNode("circle", {
        cx: x, cy: yScale(row.cpi), r: 5.5, fill: "#fff",
        stroke: "#6d5ae0", "stroke-width": 3
      }));
    }
    svg.appendChild(svgNode("circle", {
      cx: x, cy: yScale(row.walmart), r: index === rows.length - 1 ? 8 : 6,
      fill: "#fff", stroke: "#0e7c72", "stroke-width": 4
    }));
  });

  const latestX = xScale(rows.length - 1);
  const latestY = yScale(latest.walmart);
  const labelWidth = 150;
  const labelHeight = 58;
  const labelX = Math.max(left + 10, Math.min(width - right - labelWidth, latestX - labelWidth - 25));
  const labelY = Math.max(top + 30, Math.min(top + plotHeight - labelHeight - 20, latestY - 95));

  svg.appendChild(svgNode("line", {
    x1: latestX - 7, y1: latestY - 7,
    x2: labelX + labelWidth - 15, y2: labelY + labelHeight - 13,
    stroke: "#0e7c72", "stroke-width": 2
  }));
  svg.appendChild(svgNode("rect", {
    x: labelX, y: labelY, width: labelWidth, height: labelHeight, rx: 10,
    fill: "#dcf1ee", stroke: "#a4d6d0"
  }));
  appendSvgText(svg, labelX + 15, labelY + 25,
    `${walmartShortMonth(latest.label).toUpperCase()} INDEX`, {
      "font-size": 12, "font-weight": 700, fill: "#0e7c72"
    });
  appendSvgText(svg, labelX + 15, labelY + 48, latest.walmart.toFixed(2), {
    "font-family": "Source Serif 4, Georgia, serif",
    "font-size": 22, "font-weight": 700, fill: "#0e7c72"
  });

  const legendY = height - 27;
  svg.appendChild(svgNode("line", {
    x1: left, y1: legendY, x2: left + 34, y2: legendY,
    stroke: "#0e7c72", "stroke-width": 6, "stroke-linecap": "round"
  }));
  appendSvgText(svg, left + 45, legendY + 5, "Walmart fixed basket", {
    "font-size": 14, fill: "#1c2230"
  });
  svg.appendChild(svgNode("line", {
    x1: left + 245, y1: legendY, x2: left + 279, y2: legendY,
    stroke: "#6d5ae0", "stroke-width": 5, "stroke-linecap": "round"
  }));
  appendSvgText(svg, left + 290, legendY + 5, "Official US CPI", {
    "font-size": 14, fill: "#1c2230"
  });

  const caption = document.getElementById("walmart-chart-caption");
  if (caption) {
    caption.textContent =
      `Walmart basket index through ${latest.label}. ` +
      (latestOfficial
        ? `Official CPI is shown through ${latestOfficial.label}.`
        : "Official CPI data are not currently available.");
  }
}

function updateWalmartSummary(rows, isLive) {
  const latest = rows[rows.length - 1];
  const change = document.getElementById("walmart-latest-change");
  const index = document.getElementById("walmart-latest-index");
  const result = document.getElementById("walmart-result");
  const status = document.getElementById("walmart-sync-status");

  if (change) {
    change.textContent = `${walmartShortMonth(latest.label)}: ${formatWalmartPercent(latest.mom)}`;
  }
  if (index) {
    index.textContent = `Walmart basket index: ${latest.walmart.toFixed(2)}`;
  }
  if (result) {
    result.setAttribute(
      "aria-label",
      `Latest monthly change: ${latest.label}, ${formatWalmartPercent(latest.mom)}. ` +
      `Walmart basket index: ${latest.walmart.toFixed(2)}.`
    );
  }
  if (status) {
    status.textContent = isLive
      ? "Live data from Google Sheets"
      : "Showing the latest saved snapshot";
    status.classList.toggle("is-live", isLive);
  }
}

async function refreshWalmartTracker() {
  updateWalmartSummary(WALMART_FALLBACK_DATA, false);
  renderWalmartChart(WALMART_FALLBACK_DATA);

  try {
    const liveRows = await loadWalmartJsonp();
    updateWalmartSummary(liveRows, true);
    renderWalmartChart(liveRows);
  } catch (error) {
    console.warn("Walmart tracker live update failed:", error);
    const status = document.getElementById("walmart-sync-status");
    if (status) {
      status.textContent = "Showing the latest saved snapshot · Google Sheets is temporarily unavailable";
    }
  }
}

refreshWalmartTracker();

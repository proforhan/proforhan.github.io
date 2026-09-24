#!/usr/bin/env python3
"""Refresh data/zhvi.json from Zillow's public ZHVI research files.

Zillow Home Value Index (ZHVI): all homes (single-family + condo), mid tier
(33rd-67th percentile), smoothed and seasonally adjusted, monthly.
Source: https://www.zillow.com/research/data/

Run by .github/workflows/update-data.yml each month; can also be run by hand:
    python3 update_data.py
"""
import csv, io, json, os, sys, urllib.request
from datetime import datetime, timezone

BASE = "https://files.zillowstatic.com/research/public_csvs/zhvi/"
CITY_FILE = BASE + "City_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv"
US_FILE = BASE + "Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv"

# Zillow RegionIDs (stable identifiers, safer than matching names)
AREAS = [
    ("Dallas", CITY_FILE, "38128"),
    ("Plano", CITY_FILE, "53915"),
    ("Frisco", CITY_FILE, "18208"),
    ("United States", US_FILE, "102001"),
]
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "zhvi.json")


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "proforhan.github.io data updater"})
    return urllib.request.urlopen(req, timeout=180).read().decode("utf-8")


cache, series = {}, {}
for name, url, rid in AREAS:
    if url not in cache:
        cache[url] = list(csv.reader(io.StringIO(fetch(url))))
    header, *rows = cache[url]
    row = next((r for r in rows if r[0] == rid), None)
    if row is None:
        sys.exit(f"RegionID {rid} ({name}) not found in {url}")
    pts = [[h[:7], round(float(v))] for h, v in zip(header, row) if h[:2] in ("19", "20") and v]
    if len(pts) < 24:
        sys.exit(f"Too little data for {name}")
    series[name] = pts

latest = max(s[-1][0] for s in series.values())
data = {
    "source": "Zillow Home Value Index (ZHVI), all homes, mid tier, smoothed & seasonally adjusted",
    "source_url": "https://www.zillow.com/research/data/",
    "latest_month": latest,
    "updated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
    "series": series,
}

# Only rewrite the file when the numbers changed, so the workflow commits nothing otherwise.
if os.path.exists(OUT):
    old = json.load(open(OUT))
    if old.get("series") == series:
        print(f"UNCHANGED latest={latest}")
        sys.exit(0)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w") as f:
    json.dump(data, f, separators=(",", ":"))
print(f"UPDATED latest={latest} " + " ".join(f"{k}={v[-1][1]}" for k, v in series.items()))

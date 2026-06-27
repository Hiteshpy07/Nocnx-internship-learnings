# 🎬 Netflix Streamer: The Pagination Benchmark Dashboard

A high-performance, dark-themed React & Node.js dashboard designed to benchmark data-fetching architectures. Built to demonstrate how server-side chunking and modern browser APIs optimize network bandwidth, reduce API costs, and eliminate browser main-thread layout thrashing.

---

## 💡 The Problem Space
During my internship, I was tasked with loading a massive volume of files and folders into a responsive tabular grid. Fetching raw, unoptimized data clumps causes catastrophic UI stuttering and massive network overhead. 

This project was built as a visual, metrics-driven proof-of-concept to pit three distinct data-fetching patterns head-to-head using the OMDb API.

---

## 🕹️ Architecture & Core Components

The application divides the user viewport into three isolated, independently scrollable tracking zones to record live performance anomalies:

### 1️⃣ Column 1: The Bulk Avalanche (Unoptimized)
* **Mechanism:** The local Express proxy server utilizes `Promise.all` to concurrently query across 10 separate API pagination registers simultaneously, flattening 100+ items into a single mega-packet response.
* **The Catch:** Spikes instantaneous network payloads to **~20+ KB**, spikes server latency, and triggers a custom **Mukesh Ambani Jio Data Warning Popup** mimicking real-world mobile data exhaustion.

### 2️⃣ Column 2: The Retro Clicker (Manual Pagination)
* **Mechanism:** Traditional state-driven chunking mutating reactive URL parameters (`&page=${currentPage}`).
* **The Catch:** Data footprint drops down to an ultra-lean **~3 KB** per network cycle. While highly optimal for bandwidth budgets, it interrupts user retention by requiring continuous manual button interactions.

### 3️⃣ Column 3: The Netflix Streamer (View-Driven Infinite Scroll)
* **Mechanism:** Bypasses legacy window scroll event listeners (which cause layout thrashing) in favor of the browser's optimized native **Intersection Observer API**.
* **The Catch:** Attaches a React `useRef` hook to an invisible anchor node at the bottom of the grid layout container. The instant the viewport intersects the boundary (threshold: `0.1`), next-page segments smoothly stream and append into the array stream buffer (`[...prev, ...incoming]`) with an ultra-snappy execution latency of **~120ms**.

---

## 📊 Live Metrics Engine
A global tracking strip is pinned (`sticky top-0 z-50`) to the top of the interface. Using `performance.now()` metrics and inspecting the raw network `Content-Length` headers, it surfaces:
* **Cumulative Bandwidth Consumption** (Formatted live from raw bytes into KB/MB).
* **API Round-Trip Latency** (Tracked instantly in real-time milliseconds).

---

## 🛠️ Tech Stack & Tooling

* **Frontend:** React, Tailwind CSS (Slate Theme), JavaScript (ES6+), React Hooks (`useState`, `useEffect`, `useRef`)
* **Backend Layers:** Node.js, Express, Axios (API Proxy Middleware Layer)
* **Browser APIs:** Intersection Observer API, Performance Web API

---

## 🚀 Installation & Local Environment Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/netflix-pagination-benchmark.git](https://github.com/your-username/netflix-pagination-benchmark.git)
cd netflix-pagination-benchmark
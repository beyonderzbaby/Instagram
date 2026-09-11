const STORAGE_KEY = "insight_posts_v3";

const defaultPosts = [
  {
    id: 1,
    username: "creator_demo",
    image: "https://picsum.photos/seed/insight01/900/900",
    caption: "New content ✨",
    metrics: {
      views: 1000,
      likes: 120,
      comments: 18,
      shares: 9,
      saves: 24,
      reach: 820
    }
  },
  {
    id: 2,
    username: "creator_demo",
    image: "https://picsum.photos/seed/insight02/900/900",
    caption: "Behind the scenes 🎬",
    metrics: {
      views: 2400,
      likes: 310,
      comments: 42,
      shares: 27,
      saves: 61,
      reach: 1900
    }
  },
  {
    id: 3,
    username: "creator_demo",
    image: "https://picsum.photos/seed/insight03/900/900",
    caption: "Another day.",
    metrics: {
      views: 5200,
      likes: 740,
      comments: 83,
      shares: 54,
      saves: 120,
      reach: 4100
    }
  },
  {
    id: 4,
    username: "creator_demo",
    image: "https://picsum.photos/seed/insight04/900/900",
    caption: "Content drop 🚀",
    metrics: {
      views: 8700,
      likes: 1100,
      comments: 124,
      shares: 91,
      saves: 230,
      reach: 7200
    }
  },
  {
    id: 5,
    username: "creator_demo",
    image: "https://picsum.photos/seed/insight05/900/900",
    caption: "Weekend vibes.",
    metrics: {
      views: 14500,
      likes: 2100,
      comments: 190,
      shares: 140,
      saves: 410,
      reach: 11200
    }
  },
  {
    id: 6,
    username: "creator_demo",
    image: "https://picsum.photos/seed/insight06/900/900",
    caption: "Latest upload 🔥",
    metrics: {
      views: 22000,
      likes: 3400,
      comments: 270,
      shares: 220,
      saves: 590,
      reach: 17500
    }
  }
];

let posts = loadPosts();
let selectedPostId = null;

function loadPosts() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return structuredClone(defaultPosts);
  }

  try {
    return JSON.parse(saved);
  } catch {
    return structuredClone(defaultPosts);
  }
}

function savePosts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function formatNumber(value) {
  value = Number(value) || 0;

  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace(".0", "") + "M";
  }

  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(".0", "") + "K";
  }

  return value.toLocaleString();
}


/* NAVIGATION */

function showPage(page) {

  document.querySelectorAll(".page").forEach(element => {
    element.classList.remove("active");
  });

  const target = document.getElementById(page + "Page");

  if (target) {
    target.classList.add("active");
  }

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.remove("active");
  });

  if (page === "home") {
    renderHome();
  }

  if (page === "profile") {
    renderProfile();
  }

  if (page === "explore") {
    renderExplore();
  }

  if (page === "reels") {
    renderReels();
  }
}


/* HOME */

function renderHome() {

  const container = document.getElementById("homePosts");

  if (!container) return;

  container.innerHTML = "";

  posts.forEach(post => {

    const article = document.createElement("article");

    article.className = "feed-post";

    article.innerHTML = `
      <div class="feed-header">

        <div class="feed-avatar">
          <img src="https://i.pravatar.cc/100?img=12">
        </div>

        <div>
          <div class="feed-username">
            ${escapeHTML(post.username)}
          </div>

          <div style="font-size:11px;color:#777">
            Original content
          </div>
        </div>

      </div>

      <img
        class="feed-image"
        src="${post.image}"
        onclick="openInsights(${post.id})"
      >

      <div class="feed-actions">

        <button onclick="likePost(${post.id})">
          ♡
        </button>

        <button>
          ♧
        </button>

        <button>
          ↗
        </button>

        <button style="margin-left:auto">
          ♡
        </button>

      </div>

      <div class="feed-info">

        <strong>
          ${formatNumber(post.metrics.likes)} likes
        </strong>

        <div>
          <strong>${escapeHTML(post.username)}</strong>
          ${escapeHTML(post.caption)}
        </div>

        <button onclick="openInsights(${post.id})">
          View insights
        </button>

      </div>
    `;

    container.appendChild(article);
  });
}


/* PROFILE */

function renderProfile() {

  const grid = document.getElementById("profilePosts");

  if (!grid) return;

  grid.innerHTML = "";

  posts.forEach(post => {

    const item = document.createElement("div");

    item.className = "grid-post";

    item.innerHTML = `
      <img
        src="${post.image}"
        onclick="openInsights(${post.id})"
      >

      <div class="grid-overlay">

        <span>
          ♥ ${formatNumber(post.metrics.likes)}
        </span>

        <span>
          ▶ ${formatNumber(post.metrics.views)}
        </span>

      </div>
    `;

    grid.appendChild(item);
  });

  const count = document.getElementById("postCount");

  if (count) {
    count.textContent = posts.length;
  }
}


/* EXPLORE */

function renderExplore() {

  const grid = document.getElementById("exploreGrid");

  if (!grid) return;

  grid.innerHTML = "";

  posts.forEach(post => {

    const image = document.createElement("img");

    image.src = post.image;

    image.onclick = () => openInsights(post.id);

    grid.appendChild(image);
  });
}


/* REELS */

function renderReels() {

  const container = document.getElementById("reelsContainer");

  if (!container) return;

  container.innerHTML = "";

  posts.forEach(post => {

    const reel = document.createElement("div");

    reel.className = "reel";

    reel.innerHTML = `
      <img src="${post.image}">

      <div class="reel-info">
        <strong>@${escapeHTML(post.username)}</strong>
        <p>${escapeHTML(post.caption)}</p>
      </div>

      <div class="reel-actions">

        <button>♡</button>
        <button>💬</button>
        <button>↗</button>
        <button onclick="openInsights(${post.id})">⋯</button>

      </div>
    `;

    container.appendChild(reel);
  });
}


/* INSIGHTS */

function openInsights(id) {

  selectedPostId = id;

  const post = posts.find(item => item.id === id);

  if (!post) return;

  document.getElementById("insightPostName").textContent =
    post.username;

  document.getElementById("insightPostImage").src =
    post.image;

  renderInsights();

  showPage("insights");
}

function renderInsights() {

  const post = posts.find(item => item.id === selectedPostId);

  if (!post) return;

  const metrics = post.metrics;

  setText("views", formatNumber(metrics.views));
  setText("likes", formatNumber(metrics.likes));
  setText("comments", formatNumber(metrics.comments));
  setText("shares", formatNumber(metrics.shares));
  setText("saves", formatNumber(metrics.saves));
  setText("reach", formatNumber(metrics.reach));

  renderChart();
}


/* EDIT METRIC */

function editMetric(metric) {

  const post = posts.find(item => item.id === selectedPostId);

  if (!post) return;

  const current = post.metrics[metric];

  const value = prompt(
    `Enter new ${metric}:`,
    current
  );

  if (value === null) return;

  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    alert("Enter a valid number.");
    return;
  }

  post.metrics[metric] = Math.floor(number);

  savePosts();

  renderInsights();
}


/* EDIT EVERYTHING */

function editAll() {

  const post = posts.find(item => item.id === selectedPostId);

  if (!post) return;

  const metrics = [
    "views",
    "likes",
    "comments",
    "shares",
    "saves",
    "reach"
  ];

  for (const metric of metrics) {

    const value = prompt(
      `Enter ${metric}:`,
      post.metrics[metric]
    );

    if (value === null) continue;

    const number = Number(value);

    if (Number.isFinite(number) && number >= 0) {
      post.metrics[metric] = Math.floor(number);
    }
  }

  savePosts();

  renderInsights();
}


/* CHART */

function renderChart() {

  const canvas = document.getElementById("analyticsChart");

  if (!canvas) return;

  const post = posts.find(item => item.id === selectedPostId);

  if (!post) return;

  const ctx = canvas.getContext("2d");

  const width = canvas.clientWidth;
  const height = 260;

  const ratio = window.devicePixelRatio || 1;

  canvas.width = width * ratio;
  canvas.height = height * ratio;

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  ctx.clearRect(0, 0, width, height);

  const views = Number(post.metrics.views) || 1;

  const points = [
    views * .08,
    views * .15,
    views * .24,
    views * .38,
    views * .51,
    views * .72,
    views
  ];

  const padding = 20;
  const max = Math.max(...points);

  ctx.beginPath();

  points.forEach((value, index) => {

    const x =
      padding +
      index *
      ((width - padding * 2) /
      (points.length - 1));

    const y =
      height -
      padding -
      (value / max) *
      (height - padding * 2);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

  });

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  points.forEach((value, index) => {

    const x =
      padding +
      index *
      ((width - padding * 2) /
      (points.length - 1));

    const y =
      height -
      padding -
      (value / max) *
      (height - padding * 2);

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);

    ctx.fillStyle = "#111";
    ctx.fill();

  });
}


/* SEARCH */

function searchUser() {

  const input = document.getElementById("usernameInput");

  if (!input) return;

  let username = input.value.trim();

  if (!username) return;

  username = username.replace(/^@/, "");

  const result = document.getElementById("searchResult");

  result.innerHTML = `
    <div class="profile-top" style="padding:20px 0">

      <img
        class="profile-avatar"
        src="https://i.pravatar.cc/200?u=${encodeURIComponent(username)}"
      >

      <div class="profile-details">

        <div class="profile-title">

          <h2>@${escapeHTML(username)}</h2>

          <button
            class="profile-button"
            onclick="openSearchedProfile('${escapeHTML(username)}')"
          >
            View profile
          </button>

        </div>

        <div class="profile-stats">

          <span>
            <strong>${posts.length}</strong>
            posts
          </span>

          <span>
            <strong>12.4K</strong>
            followers
          </span>

          <span>
            <strong>540</strong>
            following
          </span>

        </div>

      </div>

    </div>
  `;
}

function openSearchedProfile(username) {

  document.getElementById("profileUsername").textContent =
    "@" + username;

  document.getElementById("profileAvatar").src =
    "https://i.pravatar.cc/200?u=" +
    encodeURIComponent(username);

  showPage("profile");
}


/* LIKE */

function likePost(id) {

  const post = posts.find(item => item.id === id);

  if (!post) return;

  post.metrics.likes++;

  savePosts();

  renderHome();
}


/* HELPERS */

function setText(id, value) {

  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* START */

document.addEventListener("DOMContentLoaded", () => {

  renderHome();
  renderProfile();
  renderExplore();
  renderReels();

});

window.addEventListener("resize", () => {

  if (selectedPostId) {
    renderChart();
  }

});

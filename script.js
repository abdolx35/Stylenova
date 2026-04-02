/* ═══════════════════════════════════
   STYLENOVA — Script
═══════════════════════════════════ */

const stylesData = {
  casual: {
    label: "Casual",
    tagline: "Laid-back & effortlessly cool",
    emoji: "🌿",
    palette: [
      { color: "#C9A96E", name: "Sand" },
      { color: "#4A4A4A", name: "Graphite" },
      { color: "#F0EDE8", name: "Ivory" },
      { color: "#8B7355", name: "Taupe" },
      { color: "#D4C5B0", name: "Linen" },
      { color: "#2C2C2C", name: "Noir" }
    ],
    tags: ["Oversized", "Relaxed Fit", "Earth Tones", "Minimalist", "Everyday"],
    message: "Your style reads effortless and comfortable — here are pieces that match your energy.",
    products: [
      { name: "Oversized Cotton T-Shirt", price: "350 EGP", img: "casual1.jpg" },
      { name: "Baggy Cargo Jeans", price: "700 EGP", img: "casual2.jpg" },
      { name: "White Low-Top Sneakers", price: "1,200 EGP", img: "casual3.jpg" }
    ]
  },
  sporty: {
    label: "Sporty",
    tagline: "Performance meets street cred",
    emoji: "⚡",
    palette: [
      { color: "#1A1A2E", name: "Midnight" },
      { color: "#16213E", name: "Navy" },
      { color: "#0F3460", name: "Cobalt" },
      { color: "#E94560", name: "Pulse" },
      { color: "#FFFFFF", name: "White" },
      { color: "#C0C0C0", name: "Silver" }
    ],
    tags: ["Athletic", "Performance", "Bold Colors", "Functional", "Dynamic"],
    message: "High energy, high performance — these picks were built for your active lifestyle.",
    products: [
      { name: "Dry-Fit Sport T-Shirt", price: "400 EGP", img: "sporty1.jpg" },
      { name: "Tapered Training Pants", price: "650 EGP", img: "sporty2.jpg" },
      { name: "Running Sneakers Pro", price: "1,500 EGP", img: "sporty3.jpg" }
    ]
  },
  classic: {
    label: "Classic",
    tagline: "Timeless elegance, always sharp",
    emoji: "✦",
    palette: [
      { color: "#1C1C1C", name: "Charcoal" },
      { color: "#F5F5F0", name: "Cream" },
      { color: "#8B1A1A", name: "Burgundy" },
      { color: "#2F4F4F", name: "Forest" },
      { color: "#D4AF37", name: "Gold" },
      { color: "#708090", name: "Slate" }
    ],
    tags: ["Tailored", "Sophisticated", "Timeless", "Formal", "Sharp"],
    message: "You have an eye for elegance — these refined pieces will complete your polished look.",
    products: [
      { name: "Oxford Formal Shirt", price: "500 EGP", img: "classic1.jpg" },
      { name: "Slim Black Trousers", price: "800 EGP", img: "classic2.jpg" },
      { name: "Premium Leather Shoes", price: "1,800 EGP", img: "classic3.jpg" }
    ]
  },
  street: {
    label: "Street",
    tagline: "Urban edge with bold attitude",
    emoji: "◈",
    palette: [
      { color: "#000000", name: "Black" },
      { color: "#FF4500", name: "Fire" },
      { color: "#FFFF00", name: "Volt" },
      { color: "#8A2BE2", name: "Neon" },
      { color: "#808080", name: "Ash" },
      { color: "#FFFFFF", name: "White" }
    ],
    tags: ["Urban", "Graphic", "Oversized", "Bold", "Statement"],
    message: "You dress like a statement — we matched you with pieces that demand attention.",
    products: [
      { name: "Graphic Hoodie", price: "600 EGP", img: "street1.jpg" },
      { name: "Wide Leg Cargo Pants", price: "850 EGP", img: "street2.jpg" },
      { name: "High-Top Boots", price: "1,600 EGP", img: "street3.jpg" }
    ]
  }
};

let detectedStyle = "";

/* ── Navigation ── */
function launchApp() {
  document.getElementById("landingPage").style.display = "none";
  document.getElementById("appPrototype").style.display = "flex";
  document.getElementById("appPrototype").style.flexDirection = "column";
  window.scrollTo(0, 0);
  goTo(1);
}

function backToLanding() {
  document.getElementById("appPrototype").style.display = "none";
  document.getElementById("landingPage").style.display = "block";
  window.scrollTo(0, 0);
  stopCamera();
}

function goTo(num) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen" + num).classList.add("active");
}

/* ── Camera ── */
let stream = null;

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
    .then(s => {
      stream = s;
      const video = document.getElementById("video");
      video.srcObject = s;
      document.getElementById("camStatus").innerText = "Camera active — ready to scan";
      const beam = document.getElementById("scanBeam");
      if (beam) beam.classList.add("active");
    })
    .catch(() => {
      document.getElementById("camStatus").innerText = "Camera blocked — tap Analyze to proceed";
    });
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }
}

/* ── Analysis ── */
function analyze() {
  goTo(3);
  stopCamera();

  const steps = ["ls1", "ls2", "ls3", "ls4"];
  steps.forEach((id, i) => {
    setTimeout(() => {
      document.getElementById(id).classList.add("done");
    }, 500 + i * 600);
  });

  setTimeout(generateResult, 3200);
}

function generateResult() {
  const styles = ["casual", "sporty", "classic", "street"];
  detectedStyle = styles[Math.floor(Math.random() * styles.length)];
  buildMoodboard(detectedStyle);
  goTo(4);
}

/* ── Moodboard ── */
function buildMoodboard(style) {
  const data = stylesData[style];

  document.getElementById("moodTitle").innerText = data.emoji + "  " + data.label + " Style";

  const grid = document.getElementById("moodboard");
  grid.innerHTML = "";
  data.palette.forEach(item => {
    const swatch = document.createElement("div");
    swatch.className = "mb-swatch";
    swatch.style.background = item.color;
    swatch.innerHTML = `<span>${item.name}</span>`;
    grid.appendChild(swatch);
  });

  const tagsEl = document.getElementById("styleTags");
  tagsEl.innerHTML = "";
  data.tags.forEach((tag, i) => {
    const t = document.createElement("span");
    t.className = "s-tag" + (i === 0 ? " accent" : "");
    t.innerText = tag;
    tagsEl.appendChild(t);
  });
}

/* ── Products ── */
function goToProducts() {
  const data = stylesData[detectedStyle];

  document.getElementById("resultBadge").innerText = data.emoji + "  " + data.label + " Style";
  document.getElementById("aiMessage").innerText = data.message;

  const box = document.getElementById("products");
  box.innerHTML = "";
  data.products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" onerror="this.style.background='#e8e7e3'">
      <div class="prod-info">
        <h3>${p.name}</h3>
        <span class="price">${p.price}</span>
      </div>
    `;
    box.appendChild(card);
  });

  goTo(5);
}

/* ── Reset ── */
function resetApp() {
  detectedStyle = "";
  document.querySelectorAll(".ls").forEach(el => el.classList.remove("done"));
  const beam = document.getElementById("scanBeam");
  if (beam) beam.classList.remove("active");
  goTo(1);
}

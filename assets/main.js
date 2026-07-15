// Shared behavior for ไทย Care pages: marquee toggle, accessibility toggles,
// mobile nav drawer, and active-nav-link highlighting.

(function () {
  // Marquee pause/play
  const marquee = document.getElementById("marquee");
  const toggleBtn = document.getElementById("toggleMarquee");
  const marqueeIcon = document.getElementById("marqueeIcon");
  let isPaused = false;

  if (toggleBtn && marquee && marqueeIcon) {
    toggleBtn.setAttribute("aria-pressed", "false");
    toggleBtn.addEventListener("click", () => {
      isPaused = !isPaused;
      marquee.classList.toggle("paused", isPaused);
      marqueeIcon.textContent = isPaused ? "play_circle" : "pause_circle";
      toggleBtn.setAttribute("aria-label", isPaused ? "เล่นข้อความวิ่ง" : "หยุดข้อความวิ่ง");
      toggleBtn.setAttribute("aria-pressed", String(isPaused));
    });
  }

  // High-contrast accessibility toggle (persists across pages)
  const contrastBtn = document.querySelector('[data-icon="contrast"]')?.parentElement;
  if (contrastBtn) {
    const initialContrast = localStorage.getItem("thaicare-high-contrast") === "on";
    if (initialContrast) {
      document.documentElement.classList.add("high-contrast");
    }
    contrastBtn.setAttribute("aria-pressed", String(initialContrast));
    contrastBtn.addEventListener("click", () => {
      const isOn = document.documentElement.classList.toggle("high-contrast");
      contrastBtn.setAttribute("aria-pressed", String(isOn));
      localStorage.setItem("thaicare-high-contrast", isOn ? "on" : "off");
    });
  }

  // Font size toggle
  const fontBtn = document.querySelector('[data-icon="format_size"]')?.parentElement;
  if (fontBtn) {
    const savedLargeText = localStorage.getItem("thaicare-large-text") === "on";
    if (savedLargeText) document.body.classList.add("a11y-large-text");
    fontBtn.setAttribute("aria-pressed", String(savedLargeText));
    fontBtn.addEventListener("click", () => {
      const isLarge = document.body.classList.toggle("a11y-large-text");
      fontBtn.setAttribute("aria-pressed", String(isLarge));
      localStorage.setItem("thaicare-large-text", isLarge ? "on" : "off");
    });
  }

  // Mobile nav drawer
  const menuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.setAttribute("aria-controls", "mobileMenu");
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute("aria-label", isOpen ? "ปิดเมนู" : "เปิดเมนู");
      menuBtn.querySelector(".material-symbols-outlined").textContent = isOpen
        ? "close"
        : "menu";
    });
  }

  // Highlight the current page in both desktop and mobile nav
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
})();

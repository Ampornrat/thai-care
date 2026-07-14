// Shared behavior for ไทย Care pages: marquee toggle, accessibility toggles,
// mobile nav drawer, and active-nav-link highlighting.

(function () {
  // Marquee pause/play
  const marquee = document.getElementById("marquee");
  const toggleBtn = document.getElementById("toggleMarquee");
  const marqueeIcon = document.getElementById("marqueeIcon");
  let isPaused = false;

  if (toggleBtn && marquee && marqueeIcon) {
    toggleBtn.addEventListener("click", () => {
      isPaused = !isPaused;
      marquee.classList.toggle("paused", isPaused);
      marqueeIcon.textContent = isPaused ? "play_circle" : "pause_circle";
      toggleBtn.setAttribute("aria-pressed", String(isPaused));
    });
  }

  // Contrast (dark mode) toggle
  const contrastBtn = document.querySelector('[data-icon="contrast"]')?.parentElement;
  if (contrastBtn) {
    contrastBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
    });
  }

  // Font size toggle
  const fontBtn = document.querySelector('[data-icon="format_size"]')?.parentElement;
  if (fontBtn) {
    fontBtn.addEventListener("click", () => {
      document.body.classList.toggle("a11y-large-text");
    });
  }

  // Mobile nav drawer
  const menuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
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

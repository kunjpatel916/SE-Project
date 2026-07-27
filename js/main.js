/* =========================================================
   LIFELINE — main.js (shared across all pages)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavbar();
  initDarkMode();
  initScrollTop();
  initFaqAccordions();
  setActiveNavLink();
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
});

/* ---------- Loading animation ---------- */
function initLoader(){
  const overlay = document.querySelector(".loader-overlay");
  if(!overlay) return;
  window.addEventListener("load", () => {
    setTimeout(() => overlay.classList.add("hide"), 350);
  });
  // fallback in case load already fired
  setTimeout(() => overlay.classList.add("hide"), 1500);
}

/* ---------- Mobile navigation ---------- */
function initNavbar(){
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if(toggle && links){
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
  }
  const nav = document.querySelector(".navbar");
  if(nav){
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 12);
    });
  }
}

function setActiveNavLink(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if(href === path) a.classList.add("active");
  });
}

/* ---------- Dark mode (persisted via localStorage) ---------- */
function initDarkMode(){
  const btn = document.querySelector(".dark-toggle");
  const saved = localStorage.getItem("lifeline-theme");
  if(saved === "dark"){
    document.body.classList.add("dark");
    if(btn) btn.textContent = "☀️";
  }
  if(!btn) return;
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("lifeline-theme", isDark ? "dark" : "light");
    btn.textContent = isDark ? "☀️" : "🌙";
  });
}

/* ---------- Scroll to top ---------- */
function initScrollTop(){
  const btn = document.querySelector(".scroll-top-btn");
  if(!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  });
  btn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
}

/* ---------- Generic FAQ accordion (used on multiple pages) ---------- */
function initFaqAccordions(){
  document.querySelectorAll(".accordion-item .accordion-head").forEach(head => {
    head.addEventListener("click", () => {
      const item = head.closest(".accordion-item");
      const body = item.querySelector(".accordion-body");
      const isOpen = item.classList.contains("open");
      // close siblings within the same accordion container
      const container = item.parentElement;
      container.querySelectorAll(".accordion-item.open").forEach(open => {
        if(open !== item){
          open.classList.remove("open");
          open.querySelector(".accordion-body").style.maxHeight = null;
        }
      });
      item.classList.toggle("open", !isOpen);
      body.style.maxHeight = !isOpen ? body.scrollHeight + "px" : null;
    });
  });
}

/* ---------- Toast notifications ---------- */
function showToast(message, type = "success"){
  let stack = document.querySelector(".toast-stack");
  if(!stack){
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  const toast = document.createElement("div");
  toast.className = "toast" + (type === "error" ? " toast-error" : "");
  toast.textContent = message;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity .3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ---------- Modal helper ---------- */
function openModal(id){
  const modal = document.getElementById(id);
  if(modal) modal.classList.add("open");
}
function closeModal(id){
  const modal = document.getElementById(id);
  if(modal) modal.classList.remove("open");
}
document.addEventListener("click", (e) => {
  if(e.target.classList && e.target.classList.contains("modal-overlay")){
    e.target.classList.remove("open");
  }
});

/* ---------- Animated counters (used in stats sections) ---------- */
function animateCounters(selector = "[data-count]"){
  const els = document.querySelectorAll(selector);
  if(!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const tick = () => {
          current += step;
          if(current >= target){
            el.textContent = target.toLocaleString();
          } else {
            el.textContent = current.toLocaleString();
            requestAnimationFrame(tick);
          }
        };
        tick();
        observer.unobserve(el);
      }
    });
  }, {threshold:0.4});
  els.forEach(el => observer.observe(el));
}

/* ---------- Smooth scroll for in-page anchors ---------- */
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if(!link) return;
  const targetId = link.getAttribute("href");
  if(targetId.length > 1){
    const el = document.querySelector(targetId);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:"smooth", block:"start"});
    }
  }
});

const projects = window.PORTFOLIO_PROJECTS;
const list = document.querySelector("#project-list");

function projectMedia(project) {
  if (project.heroVideo) {
    return `<video class="project-media" src="${project.heroVideo}" muted loop playsinline preload="metadata" aria-hidden="true"></video>`;
  }
  return `<img class="project-media" src="${project.hero}" alt="" loading="lazy" style="object-position:${project.heroPosition || "center"}">`;
}

list.innerHTML = projects.map(project => `
  <a class="project-strip reveal" href="project.html?project=${project.slug}" aria-label="View ${project.title} project">
    ${projectMedia(project)}
    <span class="project-shade"></span>
    <span class="project-number">${project.number}</span>
    <span class="project-meta">
      <span class="project-category">${project.category}</span>
      <strong>${project.title}</strong>
      <span class="project-intro">${project.intro}</span>
    </span>
    <span class="project-arrow" aria-hidden="true">↗</span>
  </a>
`).join("");

document.querySelectorAll(".project-strip video").forEach(video => {
  const strip = video.closest(".project-strip");
  strip.addEventListener("mouseenter", () => video.play().catch(() => {}));
  strip.addEventListener("mouseleave", () => video.pause());
  strip.addEventListener("focus", () => video.play().catch(() => {}));
  strip.addEventListener("blur", () => video.pause());
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  toggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
}));

document.querySelector("#year").textContent = new Date().getFullYear();

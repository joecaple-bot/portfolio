const params = new URLSearchParams(window.location.search);
const slug = params.get("project") || "w15";
const projects = window.PORTFOLIO_PROJECTS;
const projectIndex = projects.findIndex(item => item.slug === slug);
const project = projectIndex >= 0 ? projects[projectIndex] : projects[0];
const root = document.querySelector("#project-root");

document.title = `${project.title} - Joe Caple`;
document.body.classList.toggle("has-light-hero", Boolean(project.lightHero));
if (project.group === "web") {
  document.querySelectorAll('a[href="index.html#work"]').forEach(link => {
    link.href = "index.html#web-work";
    link.textContent = "Web & Digital";
  });
}

const videos = project.videos || (project.video ? [{ title: "Project film", src: project.video, poster: project.hero }] : []);
const videoBlock = videos.length ? `
  <section class="project-film content-width reveal" aria-labelledby="film-title">
    <div class="mini-heading"><p class="eyebrow">Motion</p><h2 id="film-title">${videos.length > 1 ? "Project films" : "Project film"}</h2></div>
    <div class="project-film-grid ${videos.length > 1 ? "is-multiple" : ""}">
      ${videos.map(video => `<figure>
        <video controls playsinline preload="metadata" ${video.poster ? `poster="${video.poster}"` : ""}>
          <source src="${video.src}" type="video/mp4">
          Your browser does not support embedded video.
        </video>
        ${videos.length > 1 ? `<figcaption>${video.title}</figcaption>` : ""}
      </figure>`).join("")}
    </div>
  </section>` : "";

const galleryBlock = project.images.length ? `
  <section class="gallery content-width" aria-label="${project.title} gallery">
    ${project.images.map((image, index) => `<figure class="gallery-item reveal"><img src="${image}" alt="${project.title} project image ${index + 1}" loading="${index === 0 ? "eager" : "lazy"} style="object-fit:${project.galleryFit || "cover"}"></figure>`).join("")}
  </section>` : "";

const previous = projects[(projectIndex - 1 + projects.length) % projects.length];
const next = projects[(projectIndex + 1) % projects.length];

root.innerHTML = `
  <article>
    <header class="project-hero">
      ${project.projectHeroVideo ? `<video id="campaign-hero" src="${project.projectHeroVideo}" poster="${project.projectHeroPoster}" muted loop playsinline preload="metadata" aria-label="Seoul and Sesame seasonal food campaign film"></video>` : project.heroVideo ? `<video src="${project.heroVideo}" autoplay muted loop playsinline aria-hidden="true"></video>` : `<img src="${project.hero}" alt="${project.title}" style="object-position:${project.heroPosition || "center"}">`}
      <span class="project-shade"></span>
      <div class="project-hero-copy">
        <p class="eyebrow">${project.number} / ${project.category}</p>
        <h1>${project.title}</h1>
        <p class="project-year">${project.year}</p>
        ${project.projectHeroVideo ? `<button class="campaign-playback" type="button" aria-controls="campaign-hero">Play hero film</button>` : ""}
        ${project.slug === "m4-hybrid" ? `<a class="cerus-hero-link" href="cerus-blacksite.html">Explore CERUS BLACKSITE <span aria-hidden="true">↗</span></a>` : ""}
        ${project.links?.length && project.slug !== "seoul-sesame" ? `<div class="project-external-links">
          ${project.links.map(link => `<a href="${link.href}" target="_blank" rel="noopener noreferrer" aria-label="${link.label} (opens in a new tab)">${link.label} <span aria-hidden="true">↗</span></a>`).join("")}
        </div>` : ""}
      </div>
    </header>

    ${project.slug === "seoul-sesame" ? `
    <section class="live-demo content-width" aria-labelledby="live-demo-title">
      <div class="live-demo-heading"><div><p class="eyebrow">Interactive website / Fictional restaurant</p><h2 id="live-demo-title">Try Seoul & Sesame</h2></div><a href="seoul-sesame-demo.html" target="_blank" rel="noopener">Open full screen ↗</a></div>
      <p class="live-demo-hint">Explore the menu, try the mock basket and browse the gallery inside the window below. No real orders or bookings.</p>
      <div class="live-demo-window"><div class="live-demo-bar" aria-hidden="true"><span>● ● ●</span><span>Seoul & Sesame — live demo</span></div><iframe src="seoul-sesame-demo.html?embedded=1" title="Seoul and Sesame interactive restaurant website demo" sandbox="allow-scripts allow-same-origin" loading="eager"></iframe></div>
    </section>` : ""}

    ${project.slug === "m4-hybrid" ? `
    <section class="cerus-feature content-width" aria-labelledby="cerus-feature-title">
      <a class="cerus-feature-link" href="cerus-blacksite.html">
        <img src="assets/cerus/lab.webp" alt="The M4 Hybrid components on a cold-blue-lit CERUS laboratory workbench" width="1920" height="1080" loading="lazy">
        <div class="cerus-feature-copy">
          <p class="eyebrow">M4 Hybrid / The cinematic case study</p>
          <h2 id="cerus-feature-title">CERUS<br>BLACKSITE</h2>
          <p>One experimental weapon. An entire fictional world. Follow the project from corporate manufacture to field deployment.</p>
          <span class="cerus-feature-cta">Explore the full breakdown <span aria-hidden="true">↗</span></span>
        </div>
        <div class="cerus-feature-stages" aria-hidden="true"><span>01 / Corporate</span><span>02 / Manufacture</span><span>03 / Assembly</span><span>04 / Storage</span><span>05 / Deployment</span></div>
      </a>
    </section>` : ""}

    <section class="project-overview content-width reveal">
      <p class="project-kicker">${project.intro}</p>
      <div class="project-description">
        <p>${project.description}</p>
        <dl>
          <div><dt>Role</dt><dd>${project.role}</dd></div>
          <div><dt>Disciplines</dt><dd>${project.services.join(" / ")}</dd></div>
        </dl>
      </div>
    </section>

    ${videoBlock}
    ${galleryBlock}

    <section class="project-notes content-width reveal" aria-labelledby="details-title">
      <div class="mini-heading"><p class="eyebrow">Project detail</p><h2 id="details-title">At a glance</h2></div>
      <div class="notes-list">
        ${project.notes.map(([label, value], index) => `<div><span>0${index + 1}</span><h3>${label}</h3><p>${value}</p></div>`).join("")}
      </div>
    </section>

    <nav class="project-pagination content-width" aria-label="More projects">
      <a href="project.html?project=${previous.slug}"><span>← Previous</span><strong>${previous.title}</strong></a>
      <a href="project.html?project=${next.slug}"><span>Next →</span><strong>${next.title}</strong></a>
    </nav>
  </article>`;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();
const campaignHero = document.querySelector("#campaign-hero");
if (campaignHero) {
  const playback = document.querySelector(".campaign-playback");
  playback.addEventListener("click", () => {
    if (campaignHero.paused) campaignHero.play().catch(() => {});
    else campaignHero.pause();
  });
  campaignHero.addEventListener("play", () => { playback.textContent = "Pause hero film"; });
  campaignHero.addEventListener("pause", () => { playback.textContent = "Play hero film"; });
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) campaignHero.play().catch(() => {});
}

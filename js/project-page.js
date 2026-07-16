const params = new URLSearchParams(window.location.search);
const slug = params.get("project") || "w15";
const projects = window.PORTFOLIO_PROJECTS;
const projectIndex = projects.findIndex(item => item.slug === slug);
const project = projectIndex >= 0 ? projects[projectIndex] : projects[0];
const root = document.querySelector("#project-root");

document.title = `${project.title} - Joe Caple`;
document.body.classList.toggle("has-light-hero", Boolean(project.lightHero));

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
      ${project.heroVideo ? `<video src="${project.heroVideo}" autoplay muted loop playsinline aria-hidden="true"></video>` : `<img src="${project.hero}" alt="${project.title}" style="object-position:${project.heroPosition || "center"}">`}
      <span class="project-shade"></span>
      <div class="project-hero-copy">
        <p class="eyebrow">${project.number} / ${project.category}</p>
        <h1>${project.title}</h1>
        <p class="project-year">${project.year}</p>
        ${project.links?.length ? `<div class="project-external-links">
          ${project.links.map(link => `<a href="${link.href}" target="_blank" rel="noopener noreferrer" aria-label="${link.label} (opens in a new tab)">${link.label} <span aria-hidden="true">↗</span></a>`).join("")}
        </div>` : ""}
      </div>
    </header>

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

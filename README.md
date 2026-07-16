# Joe Caple portfolio

A static, build-free multidisciplinary portfolio designed for GitHub Pages. It presents CGI, web-development and digital marketing/branding work using only HTML, CSS and JavaScript, so the contents of this folder can be published directly.

## Preview locally

From this folder, run:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload everything in this folder to the repository root.
3. In the repository, open **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.

## Add or edit projects

All project content is in `js/projects.js`. Each item controls both the expanding home-page strip and its project detail page.

- Add images or MP4 videos to `assets/`.
- Duplicate a project object in `js/projects.js`.
- Give it a unique `slug`, the next `number`, a hero image or video, and gallery content.
- Keep filenames lowercase and use hyphens instead of spaces.

Project links use `project.html?project=the-project-slug`, so no extra HTML page is needed when adding work.

## Personalise contact details

LinkedIn and the supplied CV are already linked. To add an email address, place a `mailto:` link in the contact section of `index.html`.

## Asset note

The site includes optimised WebP versions of the supplied stills and the original MP4 project films. The unused Mercedes W15 image sequence is intentionally excluded to keep the repository lightweight.

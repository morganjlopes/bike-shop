# Peachtree Bikes

An interactive sales platform prototype for a bike shop, built as a single-page React application. It demonstrates multi-role workflows for admins, in-store associates, and customers — including sales pipeline management, an AI-driven bike finder questionnaire, accessory cross-selling, and analytics dashboards.

**[View Live Demo](https://morganjlopes.github.io/bike-shop/peachtree-bikes-gh-pages/)**

## Features

- **Admin Dashboard** — Analytics, product catalog, multi-store management, user roles, and deal pipeline overview
- **In-Store Sales Workspace** — Kanban-style deal tracking, guided bike finder questionnaire, smart accessory recommendations, and a customer-facing mode
- **Customer View** — Self-guided product exploration with questionnaire-based bike recommendations and purchase summary
- **Demo Mode** — Extended platform showcase with sales leaderboard, omni-channel view, workflow automation, attribution tracking, and price watch ([view demo](https://morganjlopes.github.io/bike-shop/peachtree-bikes-gh-pages/))

## Tech Stack

- React 18 (via CDN)
- Tailwind CSS (via CDN)
- Babel Standalone (JSX transpilation)
- Lucide React Icons

No build step required — all dependencies load from CDN.

## Project Structure

```
peachtree-bikes-prototype.html   # Main prototype (Admin, In-Store, Customer views)
peachtree-bikes-prototype.jsx    # Source JSX component
peachtree-bikes-demo.html        # Advanced demo with real product data
peachtree-bikes-gh-pages/        # GitHub Pages deployment
  index.html                     # Landing page (demo mode)
  prototype.html                 # Product catalog prototype
images/                          # Product images (bikes, helmets, shoes, accessories)
```

## Running Locally

Open any of the HTML files directly in a browser. No server or install required.

## License

All rights reserved.

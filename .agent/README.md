# Project Memory (.agent)

Welcome to the project memory index for **Tupe Brothers / Elevatura Interior Design Studio**.

This folder serves as the central documentation and persistent context directory for understanding, developing, maintaining, and scaling this project to production.

## Memory Documentation Index

1. **[System Architecture](file:///c:/Users/ghode/playground/tupe-fork/.agent/architecture.md)**
   - Complete technical stack (React 19, Vite, Express v5, MongoDB Atlas, Cloudinary, Nodemailer, Framer Motion).
   - High-level system architecture and client-server communication.
   - Complete database schema definitions for all models (`Admin`, `Enquiry`, `LandingContent`, `Portfolio`, `Post`, `Gallery`).
   - Authentication & JWT session security flows.

2. **[Codebase Summary & File Inventory](file:///c:/Users/ghode/playground/tupe-fork/.agent/codebase-summary.md)**
   - Full repository folder tree and module breakdown.
   - Comprehensive table of all REST API endpoints.
   - Context providers (`AuthContext`, `ThemeContext`), custom hooks (`useLenis`), and page components.

3. **[Project Status & Technical Debt Audit](file:///c:/Users/ghode/playground/tupe-fork/.agent/project-status.md)**
   - Audit of what is currently working across the system.
   - Detailed breakdown of critical bugs, missing routes, and API mismatches.
   - Dead code, duplicate models, and security vulnerabilities identified.

4. **[Production-Readiness Master Plan & Roadmap](file:///c:/Users/ghode/playground/tupe-fork/.agent/production-roadmap.md)**
   - Specific action checklist for bug remediation.
   - Backend hardening & security requirements (Rate limiting, helmet, validation, Cloudinary direct upload).
   - High-impact feature roadmap (Interactive Cost Estimator, Before/After slider, Lightbox, Rich Text Editor, CSV export).
   - SEO, OpenGraph tags, schema markup, performance optimization, and Docker/CI-CD setup.
   - Phased execution timeline from prototype to production deployment.

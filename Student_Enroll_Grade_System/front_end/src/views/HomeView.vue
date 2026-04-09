<template>
  <div class="portfolio">
    <!-- Subtle grid background -->
    <div class="grid-bg"></div>

    <!-- Hero -->
    <header class="hero">
      <div class="hero-badge">Portfolio</div>
      <h1 class="hero-title">
        <span class="title-line">Built with</span>
        <span class="title-line gradient-text">Modern Web Tech</span>
      </h1>
      <p class="hero-desc">
        A collection of full-stack applications — designed, developed, and deployed.
      </p>
    </header>

    <!-- Project Cards -->
    <section class="projects">
      <router-link to="/spin" class="project-card">
        <div class="card-glow glow-orange"></div>
        <div class="card-content">
          <div class="card-header">
            <span class="card-tag tag-orange">Vue 3</span>
            <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </div>
          <h2>Food Selector</h2>
          <p>A fun spinning wheel that randomly picks your next meal. Let fate decide what you eat today.</p>
          <div class="card-tech">
            <span>Vue 3</span>
            <span>CSS Animation</span>
            <span>Randomizer</span>
          </div>
        </div>
      </router-link>

      <router-link to="/login" class="project-card">
        <div class="card-glow glow-blue"></div>
        <div class="card-content">
          <div class="card-header">
            <span class="card-tag tag-blue">Vue + Django</span>
            <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </div>
          <h2>Student System</h2>
          <p>Course enrollment, grade management, and role-based access control with JWT authentication.</p>
          <div class="card-tech">
            <span>Vue 3</span>
            <span>Element Plus</span>
            <span>Django REST</span>
            <span>SQLite</span>
          </div>
        </div>
      </router-link>

      <a href="/box/" class="project-card">
        <div class="card-glow glow-purple"></div>
        <div class="card-content">
          <div class="card-header">
            <span class="card-tag tag-purple">React + Django</span>
            <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </div>
          <h2>3D Box Packer</h2>
          <p>Interactive 3D visualization of box packing algorithms with real-time space optimization.</p>
          <div class="card-tech">
            <span>React</span>
            <span>Three.js</span>
            <span>Material UI</span>
            <span>Django</span>
          </div>
        </div>
      </a>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-line"></div>
      <div class="footer-content">
        <span class="footer-copy">&copy; {{ currentYear }}</span>
        <div class="footer-links">
          <a href="https://github.com/L1TangDingZhen" target="_blank" class="footer-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "HomeView",
  setup() {
    const currentYear = computed(() => new Date().getFullYear());
    return { currentYear };
  },
});
</script>

<style scoped>
/* ── Reset & Base ─────────────────────────────── */
.portfolio {
  min-height: 100vh;
  background: #0a0a0b;
  color: #e4e4e7;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
  position: relative;
  overflow-x: hidden;
  padding: 0 24px;
}

/* Subtle dot grid background */
.grid-bg {
  position: fixed;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  z-index: 0;
}

/* ── Hero ─────────────────────────────────────── */
.hero {
  max-width: 720px;
  margin: 0 auto;
  padding: 140px 0 80px;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: fadeIn 1s ease-out;
}

.hero-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #71717a;
  border: 1px solid #27272a;
  border-radius: 100px;
  padding: 6px 20px;
  margin-bottom: 32px;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin: 0 0 24px;
}

.title-line {
  display: block;
  color: #fafafa;
}

.gradient-text {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #a1a1aa;
  max-width: 480px;
  margin: 0 auto;
}

/* ── Project Cards ────────────────────────────── */
.projects {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  padding-bottom: 100px;
  position: relative;
  z-index: 1;
  animation: fadeInUp 1s ease-out 0.3s both;
}

.project-card {
  position: relative;
  background: #111113;
  border: 1px solid #1e1e22;
  border-radius: 16px;
  padding: 32px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  overflow: hidden;
  display: block;
}

.project-card:hover {
  border-color: #2a2a30;
  transform: translateY(-4px);
}

/* Glow effect on hover */
.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.project-card:hover .card-glow {
  opacity: 1;
}

.glow-blue {
  background: radial-gradient(circle at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 60%);
}
.glow-purple {
  background: radial-gradient(circle at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 60%);
}
.glow-green {
  background: radial-gradient(circle at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 60%);
}
.glow-orange {
  background: radial-gradient(circle at 50% 50%, rgba(249,115,22,0.06) 0%, transparent 60%);
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-tag {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  border-radius: 100px;
}

.tag-blue {
  background: rgba(59,130,246,0.12);
  color: #60a5fa;
}
.tag-purple {
  background: rgba(139,92,246,0.12);
  color: #a78bfa;
}
.tag-green {
  background: rgba(16,185,129,0.12);
  color: #34d399;
}
.tag-orange {
  background: rgba(249,115,22,0.12);
  color: #fb923c;
}

.card-arrow {
  width: 20px;
  height: 20px;
  color: #3f3f46;
  transition: all 0.3s ease;
}

.project-card:hover .card-arrow {
  color: #a1a1aa;
  transform: translate(3px, -3px);
}

.card-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fafafa;
  margin: 0 0 12px;
  letter-spacing: -0.02em;
}

.card-content p {
  font-size: 0.9rem;
  line-height: 1.7;
  color: #71717a;
  margin: 0 0 24px;
}

.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.card-tech span {
  font-size: 0.7rem;
  padding: 4px 10px;
  border-radius: 6px;
  background: #18181b;
  color: #a1a1aa;
  border: 1px solid #27272a;
}

/* ── Footer ───────────────────────────────────── */
.footer {
  max-width: 1080px;
  margin: 0 auto;
  padding-bottom: 48px;
  position: relative;
  z-index: 1;
}

.footer-line {
  height: 1px;
  background: #1e1e22;
  margin-bottom: 24px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-copy {
  font-size: 0.8rem;
  color: #3f3f46;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #52525b;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #a1a1aa;
}

/* ── Animations ───────────────────────────────── */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Responsive ───────────────────────────────── */
@media (max-width: 768px) {
  .hero {
    padding: 100px 0 60px;
  }

  .projects {
    grid-template-columns: 1fr;
  }

  .footer-content {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
</style>

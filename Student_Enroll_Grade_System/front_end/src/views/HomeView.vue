<template>
  <div class="home-view">
    <div class="animated-background"></div>

    <div class="content-wrapper">
      <div class="welcome-section">
        <h1 class="main-title">Hey there! 👋</h1>
        <p class="subtitle">What would you like to do today?</p>
      </div>

      <div class="time-display">
        <div class="time-text">{{ currentTime }}</div>
      </div>

      <div class="cards-container">
        <router-link to="/spin" class="card-link">
          <div class="card card-food">
            <div class="card-icon">🍽️</div>
            <h3>Food Selector</h3>
            <p>Choose what to eat today</p>
            <div class="card-arrow">→</div>
          </div>
        </router-link>

        <router-link to="/login" class="card-link">
          <div class="card card-student">
            <div class="card-icon">📚</div>
            <h3>Student System</h3>
            <p>Enrollment & Grade Management</p>
            <div class="card-arrow">→</div>
          </div>
        </router-link>

        <a href="https://thezbr.com/box" target="_blank" class="card-link">
          <div class="card card-3d">
            <div class="card-icon">📦</div>
            <h3>3D Visualizer</h3>
            <p>Space Optimization Tool</p>
            <div class="card-arrow">→</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "HomeView",
  setup() {
    const currentTime = ref<string>("");

    const updateTime = () => {
      const now = new Date();
      currentTime.value = now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    };

    onMounted(() => {
      updateTime();
      setInterval(updateTime, 1000);
    });

    return {
      currentTime,
    };
  },
});
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  z-index: 0;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeInDown 0.8s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-title {
  font-size: 4rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
}

.subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 10px 0 0 0;
  font-weight: 300;
}

.time-display {
  text-align: center;
  margin-bottom: 50px;
  animation: fadeIn 1s ease-out 0.3s both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.time-text {
  font-size: 1.3rem;
  color: white;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 15px 30px;
  border-radius: 50px;
  display: inline-block;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 300;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  animation: fadeInUp 0.8s ease-out 0.5s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-link {
  text-decoration: none;
  display: block;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.3));
  opacity: 0;
  transition: opacity 0.4s;
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.card:hover::before {
  opacity: 1;
}

.card-food:hover { border-color: #ff6b6b; }
.card-student:hover { border-color: #4ecdc4; }
.card-3d:hover { border-color: #ffe66d; }

.card-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  transition: transform 0.4s;
}

.card:hover .card-icon {
  transform: scale(1.2) rotate(5deg);
}

.card h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0 0 10px 0;
  font-weight: 600;
}

.card p {
  font-size: 1rem;
  color: #7f8c8d;
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.card-arrow {
  font-size: 2rem;
  color: #667eea;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.4s;
}

.card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .time-text {
    font-size: 1rem;
    padding: 10px 20px;
  }

  .cards-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .card {
    padding: 30px 20px;
  }
}
</style>

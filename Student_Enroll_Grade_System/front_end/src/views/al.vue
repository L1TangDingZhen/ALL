<template>
  <div id="app" class="container">
    <div class="back-button-wrapper">
      <router-link to="/" class="back-button">
        ← Back to Home
      </router-link>
    </div>

    <div class="header-section">
      <h1 class="main-title">🎰 Food Wheel</h1>
      <p class="subtitle">Let fate decide your meal</p>
    </div>

    <div class="slot-machine">
      <div class="slot-wrapper">
        <div class="slot-container">
          <div
            v-for="(item, index) in elements"
            :key="item.id"
            class="slot-item"
            :style="{ backgroundColor: item.bgColor, color: item.color }"
            :class="{ active: index === activeIndex, spinning: spinning }"
          >
            <span class="slot-text">{{ item.name }}</span>
          </div>
        </div>
      </div>

      <button @click="spin" :disabled="spinning" class="spin-button">
        <span v-if="!spinning">🎲 Spin the Wheel</span>
        <span v-else>⏳ Spinning...</span>
      </button>
    </div>

    <transition name="result-fade">
      <div v-if="selectedItem" class="result-section">
        <div class="result-card">
          <div class="result-icon">🎉</div>
          <h2>Your Meal is</h2>
          <div class="result-name">{{ selectedItem.name }}</div>
          <div class="confetti">✨</div>
        </div>
      </div>
    </transition>

    <div class="manage-section">
      <h3>📝 Customize Options</h3>
      <div class="input-wrapper">
        <textarea
          v-model="elementInput"
          placeholder="Enter each food option on a new line...&#10;Example:&#10;Pizza&#10;Sushi&#10;Burger"
          class="food-input"
        ></textarea>
        <button @click="updateElements" class="update-button">
          ✓ Update Options
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  interface SlotItem {
    id: number
    name: string
    bgColor: string
    color: string
  }
  
  // Generate random color function
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Calculate luminance of a color
  function getLuminance(hex: string) {
    const rgb = parseInt(hex.slice(1), 16); 
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
  
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance;
  }
  
  // Get contrasting color (black or white) based on background color luminance
  function getContrastingColor(bgColor: string) {
    const luminance = getLuminance(bgColor);
    return luminance > 128 ? '#000000' : '#FFFFFF';
  }
  
  // Change the initial value of elementInput to new default elements
  const elementInput = ref('Taco\nChinese Food\nPizza\nMaccas\nKFC\nBurger\nSushi\nPasta\nSalad')
  const elements = ref<SlotItem[]>([])
  const activeIndex = ref(-1)
  const spinning = ref(false)
  const selectedItem = ref<SlotItem | null>(null)
  
  function updateElements() {
    const lines = elementInput.value.split('\n').filter(line => line.trim() !== '');
    elements.value = lines.map((line, index) => {
      const bgColor = getRandomColor();
      const color = getContrastingColor(bgColor);
      return {
        id: index + 1,
        name: line,
        bgColor,
        color,
      };
    });
    selectedItem.value = null; // Reset selected item
  }
  
  function spin() {
    if (elements.value.length === 0) return;

    spinning.value = true;
    selectedItem.value = null; // Reset selected item

    // Add randomness: base spins (30) + random extra spins (0-elements.length*3)
    // This ensures different results each time
    let totalSpins = 30 + Math.floor(Math.random() * elements.value.length * 3);
    let delay = 100; // Initial delay

    function highlightNext() {
      if (totalSpins > 0) {
        activeIndex.value = (activeIndex.value + 1) % elements.value.length;
        totalSpins--;
        setTimeout(highlightNext, delay);
      } else {
        spinning.value = false;
        selectedItem.value = elements.value[activeIndex.value]; // Set selected item
      }
    }

    highlightNext();
  }
  
  updateElements(); // Initialize elements list
  </script>
  
<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  position: relative;
}

.back-button-wrapper {
  max-width: 900px;
  margin: 0 auto 20px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateX(-5px);
}

.header-section {
  text-align: center;
  margin-bottom: 50px;
  animation: fadeInDown 0.6s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-title {
  font-size: 3.5rem;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
  font-weight: 700;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 10px 0 0;
  font-weight: 300;
}

.slot-machine {
  max-width: 900px;
  margin: 0 auto 50px;
  animation: fadeInUp 0.6s ease-out 0.2s both;
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

.slot-wrapper {
  background: white;
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
}

.slot-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
  max-width: 100%;
}

.slot-item {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  padding: 15px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.slot-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.3));
  opacity: 0;
  transition: opacity 0.3s;
}

.slot-item:hover::before {
  opacity: 1;
}

.slot-text {
  position: relative;
  z-index: 1;
}

.slot-item.active {
  background: linear-gradient(135deg, #FFD700, #FFA500) !important;
  color: #000 !important;
  transform: scale(1.15);
  box-shadow: 0 8px 30px rgba(255, 215, 0, 0.5);
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1.15); }
  50% { transform: scale(1.25); }
}

.slot-item.spinning {
  animation: shake 0.1s infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.spin-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 18px 50px;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  display: block;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.spin-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.spin-button:hover::before {
  width: 300px;
  height: 300px;
}

.spin-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
}

.spin-button:active {
  transform: translateY(0);
}

.spin-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spin-button span {
  position: relative;
  z-index: 1;
}

.result-section {
  max-width: 600px;
  margin: 0 auto 50px;
}

.result-fade-enter-active,
.result-fade-leave-active {
  transition: all 0.5s ease;
}

.result-fade-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(-20px);
}

.result-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.result-card {
  background: white;
  border-radius: 25px;
  padding: 50px 40px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  animation: celebrate 0.6s ease-out;
}

@keyframes celebrate {
  0% {
    transform: scale(0.5) rotate(-5deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.1) rotate(2deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.result-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.result-card h2 {
  font-size: 1.5rem;
  color: #7f8c8d;
  margin: 0 0 15px;
  font-weight: 400;
}

.result-name {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 20px 0;
}

.confetti {
  font-size: 2rem;
  margin-top: 20px;
  animation: sparkle 1.5s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.manage-section {
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.manage-section h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0 0 25px;
  font-weight: 600;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.food-input {
  width: 100%;
  min-height: 180px;
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s;
  line-height: 1.6;
}

.food-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.update-button {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 25px rgba(78, 205, 196, 0.3);
  align-self: center;
}

.update-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(78, 205, 196, 0.5);
}

.update-button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .slot-wrapper {
    padding: 25px;
  }

  .slot-container {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
  }

  .slot-item {
    min-height: 50px;
    font-size: 0.9rem;
  }

  .spin-button {
    padding: 15px 40px;
    font-size: 1.1rem;
  }

  .result-name {
    font-size: 2rem;
  }

  .manage-section {
    padding: 25px;
  }
}
</style>
  
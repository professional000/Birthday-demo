/* ======================================
   ROYAL DIGITAL HUB
   LUXURY BIRTHDAY SURPRISE
====================================== */

// CUSTOMIZE YOUR DEMO HERE

const CONFIG = {
  name: "Happy Birthday",
  age: "00",

  // Replace with your business WhatsApp number.
  // Format: 919876543210
  whatsapp: "918220848715"
};


// ELEMENTS

const welcomeScreen = document.getElementById("welcomeScreen");
const mainContent = document.getElementById("mainContent");
const openSurprise = document.getElementById("openSurprise");


// SET NAME AND AGE

document.getElementById("birthdayName").textContent = CONFIG.name;
document.getElementById("birthdayAge").textContent = CONFIG.age;

document.getElementById("currentYear").textContent =
  new Date().getFullYear();


// OPEN SURPRISE

openSurprise.addEventListener("click", () => {

  welcomeScreen.classList.add("hide");

  mainContent.classList.remove("hidden");

  startMusic();

  startCelebration();

  setTimeout(() => {
    welcomeScreen.style.display = "none";
  }, 900);

});


// ======================================
// BACKGROUND MUSIC
// Original Web Audio celebratory melody
// ======================================

let audioContext = null;
let musicTimer = null;
let musicPlaying = false;
let noteIndex = 0;

const musicButton = document.getElementById("musicButton");

const melody = [
  523.25, 659.25, 783.99, 659.25,
  587.33, 698.46, 880.00, 783.99,
  659.25, 783.99, 987.77, 880.00,
  783.99, 659.25, 523.25, 587.33
];

function playNote(frequency) {

  if (!audioContext || !musicPlaying) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.045,
    audioContext.currentTime + 0.04
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + 0.42
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.45);

}

function startMusic() {

  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  musicPlaying = true;

  musicButton.innerHTML = "♫ <span>Music On</span>";

  clearInterval(musicTimer);

  musicTimer = setInterval(() => {

    playNote(melody[noteIndex]);

    noteIndex = (noteIndex + 1) % melody.length;

  }, 430);

}

function stopMusic() {

  musicPlaying = false;

  clearInterval(musicTimer);

  musicButton.innerHTML = "♫ <span>Music Off</span>";

}

musicButton.addEventListener("click", () => {

  if (musicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }

});


// ======================================
// CAKE CANDLE
// ======================================

const blowButton = document.getElementById("blowButton");
const cakeFlame = document.getElementById("cakeFlame");
const cakeMessage = document.getElementById("cakeMessage");

blowButton.addEventListener("click", () => {

  cakeFlame.classList.add("off");

  cakeMessage.textContent =
    "Your wish is on its way! ✨ உன் ஆசைகள் அனைத்தும் நிறைவேறட்டும்! ❤️";

  blowButton.textContent = "WISH MADE! ❤️";

  startCelebration();

  playCelebrationSound();

});


// ======================================
// GIFT REVEAL
// ======================================

const giftButton = document.getElementById("giftButton");
const giftResult = document.getElementById("giftResult");

giftButton.addEventListener("click", () => {

  giftButton.classList.add("hidden");

  giftResult.classList.remove("hidden");

  startCelebration();

  playCelebrationSound();

});


// ======================================
// CELEBRATION SOUND
// ======================================

function playCelebrationSound() {

  if (!audioContext) return;

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const frequencies = [523.25, 659.25, 783.99];

  frequencies.forEach((frequency, index) => {

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;

    const start = audioContext.currentTime + index * 0.12;

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.08, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(start);
    oscillator.stop(start + 0.4);

  });

}


// ======================================
// CONFETTI & FIREWORKS
// ======================================

const canvas = document.getElementById("celebrationCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animationFrame = null;
let celebrationUntil = 0;

function resizeCanvas() {

  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


function createBurst(x, y, amount = 65) {

  for (let i = 0; i < amount; i++) {

    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 5;

    particles.push({

      x,
      y,

      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,

      size: 2 + Math.random() * 4,

      life: 1,
      decay: 0.009 + Math.random() * 0.014,

      color: [
        "#d8b66d",
        "#fff0bc",
        "#ffffff",
        "#b88b3b"
      ][Math.floor(Math.random() * 4)]

    });

  }

}


function animateCelebration() {

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles = particles.filter(p => p.life > 0);

  particles.forEach(p => {

    p.x += p.vx;
    p.y += p.vy;

    p.vy += 0.035;

    p.life -= p.decay;

    ctx.globalAlpha = Math.max(0, p.life);

    ctx.fillStyle = p.color;

    ctx.fillRect(p.x, p.y, p.size, p.size);

  });

  ctx.globalAlpha = 1;

  if (Date.now() < celebrationUntil || particles.length > 0) {

    if (Math.random() < 0.045) {

      createBurst(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight * 0.6,
        45
      );

    }

    animationFrame = requestAnimationFrame(animateCelebration);

  } else {

    cancelAnimationFrame(animationFrame);
    animationFrame = null;

  }

}


function startCelebration() {

  celebrationUntil = Date.now() + 5000;

  createBurst(
    window.innerWidth / 2,
    window.innerHeight / 3,
    110
  );

  if (!animationFrame) {
    animateCelebration();
  }

}


// ======================================
// CELEBRATE BUTTONS
// ======================================

document.getElementById("celebrateButton")
  .addEventListener("click", () => {

    startCelebration();
    playCelebrationSound();

  });


document.getElementById("finalCelebrate")
  .addEventListener("click", () => {

    startCelebration();
    playCelebrationSound();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


// ======================================
// WHATSAPP ORDER
// ======================================

document.getElementById("orderButton")
  .addEventListener("click", event => {

    event.preventDefault();

    if (!/^91\d{10}$/.test(CONFIG.whatsapp)) {

      alert(
        "WhatsApp number is not configured yet. Please contact ROYAL DIGITAL HUB."
      );

      return;

    }

    const message =
`Hello ROYAL DIGITAL HUB! 👋

I saw your Birthday Surprise Demo.

I want to create a personalized Birthday Website for someone special.

Please share your pricing and details.

Thank you! ❤️`;

    const url =
      "https://wa.me/" +
      CONFIG.whatsapp +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");

  });


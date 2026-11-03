// ======================================
// ROYAL DIGITAL HUB
// LUXURY BIRTHDAY SURPRISE
// COMPLETE WORKING JAVASCRIPT
// ======================================


// CUSTOMIZE YOUR DEMO HERE

const CONFIG = {
  name: "Happy Birthday",
  age: "00",
  whatsapp: "918220848715"
};


// ======================================
// ELEMENTS
// ======================================

const welcomeScreen = document.getElementById("welcomeScreen");
const mainContent = document.getElementById("mainContent");
const openSurprise = document.getElementById("openSurprise");

const musicButton = document.getElementById("musicButton");

const birthdayName = document.getElementById("birthdayName");
const birthdayAge = document.getElementById("birthdayAge");


// ======================================
// INITIAL SETUP
// ======================================

birthdayName.textContent = CONFIG.name;
birthdayAge.textContent = CONFIG.age;

document.getElementById("currentYear").textContent =
  new Date().getFullYear();


// ======================================
// BACKGROUND MUSIC
// ======================================

let audioContext = null;
let musicTimer = null;
let musicPlaying = false;
let noteIndex = 0;

const melody = [
  523.25, 659.25, 783.99, 659.25,
  587.33, 698.46, 880.00, 783.99,
  659.25, 783.99, 987.77, 880.00,
  783.99, 659.25, 523.25, 587.33
];


function createAudioContext() {

  if (audioContext) return audioContext;

  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    console.warn("Web Audio is not supported.");
    return null;
  }

  audioContext = new AudioContextClass();

  return audioContext;

}


function playNote(frequency) {

  if (!audioContext || !musicPlaying) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  const now = audioContext.currentTime;

  gain.gain.setValueAtTime(0.0001, now);

  gain.gain.exponentialRampToValueAtTime(
    0.045,
    now + 0.04
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.42
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.45);

}


async function startMusic() {

  const audio = createAudioContext();

  if (!audio) return;

  if (audio.state === "suspended") {
    await audio.resume();
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


musicButton.addEventListener("click", async () => {

  if (musicPlaying) {
    stopMusic();
  } else {
    await startMusic();
  }

});


// ======================================
// OPEN SURPRISE - FIXED
// ======================================

let surpriseOpened = false;

openSurprise.addEventListener("click", async function () {

  if (surpriseOpened) return;

  surpriseOpened = true;

  openSurprise.disabled = true;

  // Show main birthday page
  mainContent.classList.remove("hidden");

  // Hide welcome page
  welcomeScreen.classList.add("hide");

  // Celebration
  startCelebration();

  // Start music
  try {
    await startMusic();
  } catch (error) {
    console.error("Music could not start:", error);
  }

  // Remove welcome screen after transition
  setTimeout(() => {
    welcomeScreen.style.display = "none";
  }, 850);

});


// ======================================
// CELEBRATION SOUND
// ======================================

function playCelebrationSound() {

  const audio = createAudioContext();

  if (!audio) return;

  if (audio.state === "suspended") {
    audio.resume();
  }

  const frequencies = [523.25, 659.25, 783.99];

  frequencies.forEach((frequency, index) => {

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;

    const start = audio.currentTime + index * 0.12;

    gain.gain.setValueAtTime(0.0001, start);

    gain.gain.exponentialRampToValueAtTime(
      0.08,
      start + 0.03
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      start + 0.35
    );

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start(start);
    oscillator.stop(start + 0.4);

  });

}


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

  blowButton.disabled = true;

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
// FIREWORKS & CONFETTI
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

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

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

  if (
    Date.now() < celebrationUntil ||
    particles.length > 0
  ) {

    if (Math.random() < 0.045) {

      createBurst(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight * 0.6,
        45
      );

    }

    animationFrame = requestAnimationFrame(
      animateCelebration
    );

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

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  });


// ======================================
// WEBSITE READY
// ======================================

console.log("ROYAL DIGITAL HUB Birthday Demo Ready!");

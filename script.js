
/* ======================================
   BABYKALA BIRTHDAY SURPRISE
   ROYAL DIGITAL HUB
====================================== */


/* GIFT DATA */

const gifts = [

    {
        title: "My Dear Akka ❤️",
        photo: "photo1..jpg",

        poem: `உறவுகள் பல இருந்தாலும்...
அதில் தனி அன்பு கொண்ட உறவு நீ...


என் வாழ்க்கையின் அழகான உறவு
என் அன்பு அக்கா BABYKALA ❤️`
    },

    {
        title: "Beautiful Memories 🌸",
        photo: "photo2..jpg",

        poem: `நினைவுகள் என்பது
கடந்து போன நாட்கள் அல்ல...

மீண்டும் மீண்டும்
மனதில் மலரும் அழகான தருணங்கள்...


    },

    {
        title: "Special Words 💌",
        photo: "photo3..jpg",

        poem: `வாழ்க்கையில் எத்தனை மாற்றங்கள் வந்தாலும்...

உங்கள் முகத்தில் சிரிப்பு
என்றும் குறையக்கூடாது...

உங்கள் கனவுகள் அனைத்தும்
நிஜமாக வேண்டும்...

நீங்கள் நினைத்த வாழ்க்கை
உங்களைத் தேடி வர வேண்டும்! 🌹`
    },

    {
        title: "Final Surprise 👑",
        photo: "photo4..jpg",

        poem: `இன்று உங்கள் பிறந்தநாள்...

உங்கள் வாழ்க்கை முழுவதும்
மகிழ்ச்சி நிறைந்திருக்கட்டும்...

ஆயிரம் ஆண்டுகள்
ஆரோக்கியமாக வாழ வேண்டும்...

Happy Birthday BABYKALA!

என்றும் உங்கள் அன்பு தம்பி ❤️`
    }

];


/* ELEMENTS */

const welcomeScreen = document.getElementById("welcomeScreen");
const mainScreen = document.getElementById("mainScreen");

const giftModal = document.getElementById("giftModal");

const finalScreen = document.getElementById("finalScreen");

const feedbackSection = document.getElementById("feedbackSection");

const music = document.getElementById("bgMusic");

const giftTitle = document.getElementById("giftTitle");
const giftPhoto = document.getElementById("giftPhoto");
const giftPoem = document.getElementById("giftPoem");

const giftCount = document.getElementById("giftCount");

const giftBoxes = document.querySelectorAll(".gift-box");


/* STATE */

let openedGifts = new Set();

let currentGift = null;


/* START SURPRISE */

document.getElementById("startBtn").addEventListener("click", function() {

    welcomeScreen.classList.add("hidden");

    mainScreen.classList.remove("hidden");

    music.volume = 0.45;

    music.play().catch(() => {
        console.log("Music requires browser interaction.");
    });

});


/* OPEN GIFT */

giftBoxes.forEach(function(box) {

    box.addEventListener("click", function() {

        const index = Number(this.dataset.gift);

        openGift(index);

    });

});


function openGift(index) {

    const gift = gifts[index];

    if (!gift) return;

    currentGift = index;

    giftTitle.textContent = gift.title;

    giftPhoto.src = gift.photo;

    giftPhoto.alt = gift.title;

    giftPoem.textContent = gift.poem;

    giftModal.classList.remove("hidden");

    const popupEmoji = document.querySelector(".popup-emoji");

    popupEmoji.textContent = index === 3 ? "👑" : "💝";

    // Mark gift as opened

    openedGifts.add(index);

    updateGiftProgress();

}


/* UPDATE GIFT STATUS */

function updateGiftProgress() {

    giftBoxes.forEach(function(box, index) {

        const status = box.querySelector(".gift-status");

        if (openedGifts.has(index)) {

            box.classList.add("opened");

            status.textContent = "✓ Opened";

        }

    });

    giftCount.textContent =
        openedGifts.size + " / 4 Gifts Opened ❤️";

}


/* CLOSE GIFT */

function closeGift() {

    giftModal.classList.add("hidden");

    // All gifts opened?

    if (openedGifts.size === 4) {

        setTimeout(function() {

            mainScreen.classList.add("hidden");

            finalScreen.classList.remove("hidden");

            feedbackSection.classList.remove("hidden");

            finalScreen.scrollIntoView({
                behavior: "smooth"
            });

        }, 350);

    }

}


document.getElementById("closeGift").addEventListener("click", closeGift);

document.getElementById("backBtn").addEventListener("click", closeGift);


/* FLOATING HEARTS */

function createHeart() {

    const heartsContainer = document.getElementById("hearts");

    const heart = document.createElement("span");

    heart.className = "heart";

    const emojis = ["❤️", "💕", "💖", "🌸", "✨"];

    heart.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        (15 + Math.random() * 20) + "px";

    heartsContainer.appendChild(heart);

    setTimeout(function() {

        heart.remove();

    }, 7000);

}

setInterval(createHeart, 600);


/* ======================================
   FEEDBACK FORM
====================================== */

const feedbackForm = document.getElementById("feedbackForm");

const submitBtn = document.getElementById("submitBtn");

const successMessage = document.getElementById("successMessage");


feedbackForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    submitBtn.disabled = true;

    submitBtn.textContent = "Sending Feedback... ❤️";

    document.getElementById("feedbackTime").value =
        new Date().toLocaleString("en-IN");

    try {

        const response = await fetch(
            "https://formspree.io/f/xzepljrz",
            {
                method: "POST",

                body: new FormData(feedbackForm),

                headers: {
                    "Accept": "application/json"
                }
            }
        );


        if (response.ok) {

            feedbackForm.classList.add("hidden");

            successMessage.classList.remove("hidden");

            successMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        } else {

            throw new Error("Feedback submission failed");

        }

    } catch (error) {

        alert(
            "Feedback send ஆகவில்லை. Internet connection check செய்து மீண்டும் முயற்சி செய்யவும்."
        );

        submitBtn.disabled = false;

        submitBtn.textContent = "Submit Feedback ❤️";

    }

});


/* END */

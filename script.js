
/* ======================================
   BABYKALA BIRTHDAY SURPRISE
   ROYAL DIGITAL HUB ❤️
====================================== */

// ELEMENTS

const welcomeScreen = document.getElementById("welcomeScreen");
const mainScreen = document.getElementById("mainScreen");
const giftModal = document.getElementById("giftModal");
const finalScreen = document.getElementById("finalScreen");
const feedbackSection = document.getElementById("feedbackSection");

const giftBox = document.getElementById("giftBox");
const giftPhoto = document.getElementById("giftPhoto");
const giftPoem = document.getElementById("giftPoem");

const music = document.getElementById("bgMusic");

const feedbackForm = document.getElementById("feedbackForm");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

let giftOpened = false;


// START SURPRISE

document.getElementById("startBtn").addEventListener("click", function() {

    welcomeScreen.classList.add("hidden");
    mainScreen.classList.remove("hidden");

    music.volume = 0.45;

    music.play().catch(error => {
        console.log("Music playback unavailable:", error);
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// OPEN SINGLE GIFT

giftBox.addEventListener("click", function() {

    if (giftOpened) return;

    giftOpened = true;

    giftPhoto.src = "photo1.jpg";

    giftPhoto.onerror = function() {
        console.error("photo1.jpg not found. Check the file name.");
    };

    giftModal.classList.remove("hidden");

    giftBox.classList.add("opened");

    document.querySelector(".gift-status").textContent = "✓ Opened";

});


// CLOSE GIFT AND SHOW FINAL SCREEN

function closeGift() {

    if (giftModal.classList.contains("hidden")) return;

    giftModal.classList.add("hidden");

    mainScreen.classList.add("hidden");

    finalScreen.classList.remove("hidden");

    feedbackSection.classList.remove("hidden");

    setTimeout(function() {

        finalScreen.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 200);

}


// CLOSE BUTTON

document.getElementById("closeGift").addEventListener("click", closeGift);

document.getElementById("backBtn").addEventListener("click", closeGift);


// ESCAPE KEY

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeGift();
    }

});


// FLOATING HEARTS

function createHeart() {

    const heartsContainer = document.getElementById("hearts");

    const heart = document.createElement("span");

    heart.className = "heart";

    const emojis = [
        "❤️",
        "💕",
        "💖",
        "🌸",
        "✨"
    ];

    heart.textContent = emojis[
        Math.floor(Math.random() * emojis.length)
    ];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize = (15 + Math.random() * 20) + "px";

    heartsContainer.appendChild(heart);

    setTimeout(function() {
        heart.remove();
    }, 7000);

}

setInterval(createHeart, 600);


// ======================================
// FEEDBACK SYSTEM - FORMSPREE
// ======================================

feedbackForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (!feedbackForm.reportValidity()) return;

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

        console.error(error);

        alert(
            "Feedback அனுப்ப முடியவில்லை. Internet connection check செய்து மீண்டும் முயற்சி செய்யுங்கள்."
        );

        submitBtn.disabled = false;

        submitBtn.textContent = "Submit Feedback ❤️";

    }

});


// ======================================
// END - ROYAL DIGITAL HUB
// ======================================

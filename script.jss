const gifts = [
{
    title: "My Dear Akka ❤️",
    photo: "images/photo1.jpg",
    poem: `உறவுகள் பல இருந்தாலும்...
அதில் தனி அன்பு கொண்ட உறவு நீ...

என் வாழ்க்கையின் அழகான உறவு
என் அன்பு அக்கா BABYKALA ❤️`
},
{
    title: "Beautiful Memories 🌸",
    photo: "images/photo2.jpg",
    poem: `நினைவுகள் என்பது
கடந்து போன நாட்கள் அல்ல...

மீண்டும் மீண்டும்
மனதில் மலரும் அழகான தருணங்கள்...

},
{
    title: "Special Words 💌",
    photo: "images/photo3.jpg",
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
    photo: "images/photo4.jpg",
    poem: `இன்று உங்கள் பிறந்தநாள்...

உங்கள் வாழ்க்கை முழுவதும்
மகிழ்ச்சி நிறைந்திருக்கட்டும்...

ஆயிரம் ஆண்டுகள்
ஆரோக்கியமாக வாழ வேண்டும்...

Happy Birthday BABYKALA Akka!

என்றும் உங்கள் அன்பு தம்பி ❤️`
}
];

function startSurprise() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("main").style.display = "block";

    const music = document.getElementById("music");
    music.play().catch(() => {});
}

function openGift(index) {

    const gift = gifts[index];

    document.getElementById("giftTitle").innerText = gift.title;

    document.getElementById("giftPhoto").src = gift.photo;

    document.getElementById("giftPoem").innerText = gift.poem;

    document.getElementById("popup").style.display = "flex";

    document.querySelector(".popup-emoji").innerText = "💝";

    if(index === 3) {
        document.querySelector(".popup-emoji").innerText = "👑";
    }
}

function closeGift() {

    document.getElementById("popup").style.display = "none";

    const opened = document.querySelectorAll(".gift");

    if(opened.length === 4) {
        // Final surprise is available after opening all gifts.
    }
}

// Floating hearts

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = ["❤️","💖","💕","🌸","✨"][
        Math.floor(Math.random()*5)
    ];

    heart.style.left = Math.random()*100 + "vw";

    heart.style.fontSize = (15 + Math.random()*20) + "px";

    document.getElementById("hearts").appendChild(heart);

    setTimeout(() => heart.remove(),7000);
}

setInterval(createHeart,500);

const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", async function(e) {

    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const successMessage = document.getElementById("successMessage");

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending... ❤️";

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

            feedbackForm.reset();

            feedbackForm.style.display = "none";

            successMessage.style.display = "block";

        } else {

            alert("Feedback send ஆகவில்லை. மீண்டும் முயற்சி செய்யவும்.");

            submitBtn.disabled = false;
            submitBtn.innerText = "Submit Feedback ❤️";
        }

    } catch (error) {

        alert("Internet connection check செய்து மீண்டும் முயற்சி செய்யவும்.");

        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Feedback ❤️";
    }

});

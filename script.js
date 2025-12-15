const tg = Telegram.WebApp;
tg.expand();


// 🌐 IP info
async function loadIP() {
const res = await fetch("https://ipapi.co/json/");
const d = await res.json();


document.getElementById("ip").innerText = d.ip;
document.getElementById("isp").innerText = d.org;
document.getElementById("country").innerText = `${d.country_name} (${d.country_code})`;
document.getElementById("city").innerText = d.city;
document.getElementById("timezone").innerText = d.timezone;


window.collected = { ip: d.ip, country: d.country_name, city: d.city };
}


// 📱 Telegram info
const user = tg.initDataUnsafe?.user;
document.getElementById("tg-platform").innerText = tg.platform;
document.getElementById("tg-lang").innerText = user?.language_code || "unknown";
document.getElementById("tg-dark").innerText = tg.colorScheme;
document.getElementById("tg-user").innerText = user?.username || "—";
document.getElementById("tg-premium").innerText = user?.is_premium ? "Yes" : "No";


// 🖥 Device info
const ua = navigator.userAgent;
document.getElementById("device").innerText = /Mobi/.test(ua) ? "Mobile" : "Desktop";
document.getElementById("os").innerText = navigator.platform;
document.getElementById("browser").innerText = ua;
document.getElementById("screen").innerText = `${screen.width} x ${screen.height}`;
document.getElementById("pixel").innerText = window.devicePixelRatio;


// 🌍 Environment
document.getElementById("time").innerText = new Date().toLocaleString();
document.getElementById("lang").innerText = navigator.language;
document.getElementById("net").innerText = navigator.connection?.effectiveType || "unknown";


// 📤 Send to bot
document.getElementById("send").onclick = () => {
tg.sendData(JSON.stringify({
ip: document.getElementById("ip").innerText,
platform: tg.platform,
device: document.getElementById("device").innerText
}));
};


loadIP();

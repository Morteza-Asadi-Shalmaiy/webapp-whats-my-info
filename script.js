// IPv4
fetch("https://api.ipify.org?format=json")
  .then(r => r.json())
  .then(d => document.getElementById("ipv4").innerText = d.ip)
  .catch(() => document.getElementById("ipv4").innerText = "Unavailable");

// IPv6
fetch("https://api64.ipify.org?format=json")
  .then(r => r.json())
  .then(d => document.getElementById("ipv6").innerText = d.ip)
  .catch(() => document.getElementById("ipv6").innerText = "Not supported");

// IP Information
fetch("https://ipapi.co/json/")
  .then(r => r.json())
  .then(d => {
    document.getElementById("isp").innerText = d.org || "—";
    document.getElementById("asn").innerText = d.asn || "—";
    document.getElementById("city").innerText = d.city || "—";
    document.getElementById("region").innerText = d.region || "—";
    document.getElementById("country").innerText = `${d.country_name} (${d.country_code})`;
    document.getElementById("lat").innerText = d.latitude;
    document.getElementById("lon").innerText = d.longitude;
    document.getElementById("timezone").innerText = d.timezone;
  });

// System info
const ua = navigator.userAgent;

document.getElementById("os").innerText = ua.includes("Windows") ? "Windows" : "Other";
document.getElementById("platform").innerText = navigator.platform;
document.getElementById("arch").innerText = navigator.userAgentData?.architecture || "Unknown";
document.getElementById("browser").innerText = ua;
document.getElementById("screen").innerText = `${screen.width} × ${screen.height}`;
document.getElementById("pixel").innerText = window.devicePixelRatio;

// Send summary to bot
const sendBtn = document.getElementById("send");
if (tg && sendBtn) {
  sendBtn.onclick = () => {
    tg.sendData(JSON.stringify({
      ipv4: document.getElementById("ipv4").innerText,
      ipv6: document.getElementById("ipv6").innerText,
      isp: document.getElementById("isp").innerText,
      os: document.getElementById("os").innerText
    }));
  };
}

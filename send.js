document.addEventListener("DOMContentLoaded", async () => {
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
    localStorage.setItem("deviceId", deviceId);
  }

  let ipAddress = "Unknown";
  try {
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    ipAddress = ipData.ip;
  } catch (error) {
    console.error("Could not fetch IP address:", error);
  }

  const data = {
    deviceId: deviceId,
    ipAddress: ipAddress,
    gameSlug: window.gameSlug || "",
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    language: navigator.language,
    requestTime: Math.floor(Date.now() / 1000),
  };

  await fetch(
    "https://script.google.com/macros/s/AKfycbyod-mCGDKc4zZbRrRNhM-kd1IBS1qu6uiCfd94YZNEY2AXtwiTUGJvC7t9Bmz43NsKbg/exec",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      mode: "no-cors",
    }
  );
});

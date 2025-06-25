document.addEventListener("DOMContentLoaded", async () => {
  const { api: apiUrl, target: targetSelector } = document.currentScript.dataset;

  const target = document.querySelector(targetSelector);

  if (!target) {
    console.error("Target container not found:", targetSelector);
    return;
  }

  try {
    const response = await fetch(apiUrl);

    if (!response.ok)
      throw new Error(`Failed to fetch games JSON: ${response.statusText}`);

    const games = await response.json();

    target.innerHTML = games.map(game => `
      <div
        onclick="openGame('${apiUrl}', '${game.alt}')"
        style="
          cursor: pointer;
          background: #ffffff;
          border-radius: 12px;
          padding: 12px;
          margin: 10px;
          display: inline-block;
          width: 200px;
          text-align: center;
        "
        onmouseenter="this.style.transform='scale(1.05)'"
        onmouseleave="this.style.transform='scale(1)'"
      >
        <img src="${apiUrl}/images/${game.alt}.webp" alt="${game.title} thumbnail" style="width: clamp(50px, 120px, 240px); border-radius:8px; height: 120px; object-fit: cover;" onerror="this.onerror=null;this.src='https://placehold.co/200x120/cccccc/333333?text=No+Image';" />
        <h3 style="margin-top:10px; font-size:18px; color: #333333;">${game.title}</h3>
      </div>
    `).join("");
  } catch (err) {$
    target.innerHTML = "<p style='color:red; text-align: center; font-family: sans-serif;'>Error loading games. Please try again later.</p>";
    console.error("Error loading games:", err);
  }
});

window.openGame = (apiUrl, alt) => {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("gameFrame");
  iframe.src = `${apiUrl}/g/${alt}`;
  modal.style.display = "block"; 
  document.body.style.overflow = 'hidden';
};


window.closeGame = () => {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("gameFrame");
  iframe.src = "";
  modal.style.display = "none";
  document.body.style.overflow = '';
};

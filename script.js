const streakText = document.getElementById("streakText");
const longestText = document.getElementById("longestText");
const trackBtn = document.querySelector(".track-btn");
const relapseBtn = document.querySelector(".relapse-btn");
const reasonSelect = document.getElementById("reason");
const historyList = document.getElementById("historyList");
const copyBtn = document.getElementById("copyBtn");

let currentStreak = Number(localStorage.getItem("currentStreak")) || 0;
let longestStreak = Number(localStorage.getItem("longestStreak")) || 0;

let relapseHistory = localStorage.getItem("relapseHistory")
  ? JSON.parse(localStorage.getItem("relapseHistory"))
  : [];

function updateUI() {
  streakText.innerText = `🔥 ${currentStreak} Days Clean`;
  longestText.innerText = `Longest streak: ${longestStreak} days`;
}

function updateHistory() {
  historyList.innerHTML = "";

  relapseHistory.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.date} — ${item.reason}`;
    historyList.appendChild(li);
  });
}

trackBtn.addEventListener("click", () => {
  const today = new Date().toDateString();
  const lastSuccessDate = localStorage.getItem("lastSuccessDate");

  if (lastSuccessDate === today) {
    alert("Today is already counted.");
    return;
  }

  currentStreak += 1;
  localStorage.setItem("currentStreak", currentStreak);
  localStorage.setItem("lastSuccessDate", today);

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
    localStorage.setItem("longestStreak", longestStreak);
  }

  updateUI();
});

relapseBtn.addEventListener("click", () => {
  const confirmReset = confirm(
    "Are you sure? This will reset your streak for today."
  );

  if (!confirmReset) return;

  const today = new Date().toDateString();
  const reason = reasonSelect.value || "Not specified";

  relapseHistory.unshift({
    date: today,
    reason: reason
  });

  localStorage.setItem(
    "relapseHistory",
    JSON.stringify(relapseHistory)
  );

  currentStreak = 0;
  localStorage.setItem("currentStreak", currentStreak);
  localStorage.setItem("lastRelapseDate", today);

  reasonSelect.value = "";

  updateUI();
  updateHistory();
});

copyBtn.addEventListener("click", () => {
  if (relapseHistory.length === 0) {
    alert("No history to copy.");
    return;
  }

  let text = "Henka — Slip History\n\n";

  relapseHistory.forEach(item => {
    text += `${item.date} - ${item.reason}\n`;
  });

  navigator.clipboard.writeText(text);
  alert("History copied to clipboard.");
});

updateUI();
updateHistory();
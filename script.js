// Get elements
const copyBtn = document.getElementById("copyBtn");
const reasonSelect = document.getElementById("reason");
const historyList = document.getElementById("historyList");
const streakTitle = document.querySelector(".card h2");
const longestText = document.querySelector(".card p");
const relapseBtn = document.querySelector(".relapse-btn");

// Load saved data or default
let relapseHistory = localStorage.getItem("relapseHistory")
  ? JSON.parse(localStorage.getItem("relapseHistory"))
  : [];
let currentStreak = localStorage.getItem("currentStreak")
  ? Number(localStorage.getItem("currentStreak"))
  : 0;

let longestStreak = localStorage.getItem("longestStreak")
  ? Number(localStorage.getItem("longestStreak"))
  : 0;

// Update UI
function updateHistory() {
  historyList.innerHTML = "";

  relapseHistory.forEach(item => {
    const li = document.createElement("li");

    // Handle old data (string)
    if (typeof item === "string") {
      li.innerText = item;
    } 
    // Handle new data (object)
    else {
      li.innerText = `${item.date} — ${item.reason}`;
    }

    historyList.appendChild(li);
  });
}

function updateUI() {
  streakTitle.innerText = `🔥 ${currentStreak} Days Clean`;
  longestText.innerText = `Longest streak: ${longestStreak} days`;
}

// Relapse button logic
relapseBtn.addEventListener("click", () => {
  const confirmReset = confirm(
    "Are you sure? This will reset your current streak."
  );

 

  if (!confirmReset) return;

  const today = new Date().toDateString();

  const reason = reasonSelect.value || "Not specified";

relapseHistory.unshift({
  date: today,
  reason: reason
});

reasonSelect.value = "";
  localStorage.setItem("relapseHistory", JSON.stringify(relapseHistory));

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
    localStorage.setItem("longestStreak", longestStreak);
  }

  currentStreak = 0;
  localStorage.setItem("currentStreak", currentStreak);
  localStorage.setItem("lastDate", today);

  updateUI();
  function updateHistory() {
  historyList.innerHTML = "";

  relapseHistory.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.date} — ${item.reason}`;
    historyList.appendChild(li);
  });
}
});
copyBtn.addEventListener("click", () => {
  if (relapseHistory.length === 0) {
    alert("No relapse history to copy.");
    return;
  }

  let text = "Henka — Relapse History\n\n";

  relapseHistory.forEach(item => {
    text += `${item.date} - ${item.reason}\n`;
  });

  navigator.clipboard.writeText(text);
  alert("History copied to clipboard.");
});

// Run on page load
updateUI();
// Daily streak increase (once per day)
const lastDate = localStorage.getItem("lastDate");
const today = new Date().toDateString();

if (lastDate !== today) {
  currentStreak += 1;
  localStorage.setItem("currentStreak", currentStreak);
  localStorage.setItem("lastDate", today);
  updateUI();
}
updateHistory();
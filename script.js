
let coins = 0;
let power = 1;
let upgradeCost = 50;
let collection = [];

const rewards = {
  Common: ["Slime", "Little Dragon", "Lucky Cat", "Blue Blob"],
  Rare: ["Neon Fox", "Golden Knight", "Cyber Bot"],
  Epic: ["Galaxy Dragon", "Shadow King", "Thunder Beast"],
  Legendary: ["Cosmic Phoenix", "Golden Titan", "Infinity Lord"]
};

function clickCoin() {
  coins += power;
  update();
}

function buyUpgrade() {
  if (coins >= upgradeCost) {
    coins -= upgradeCost;
    power += 1;
    upgradeCost = Math.floor(upgradeCost * 1.8);
    showMessage("Upgrade purchased! Your clicks are stronger!");
  } else {
    showMessage("Not enough coins for this upgrade!");
  }

  update();
}

function buyPack(price, rarity) {
  if (coins < price) {
    showMessage("You need more coins to buy this pack!");
    return;
  }

  coins -= price;

  const possibleRewards = rewards[rarity];
  const reward = possibleRewards[
    Math.floor(Math.random() * possibleRewards.length)
  ];

  collection.push({ name: reward, rarity: rarity });

  showMessage("🎉 You opened a " + rarity + " Pack and got " + reward + "!");
  update();
}

function showMessage(message) {
  document.getElementById("message").textContent = message;
}

function update() {
  document.getElementById("coins").textContent = coins.toLocaleString();
  document.getElementById("power").textContent = power;
  document.getElementById("upgrade-cost").textContent =
    upgradeCost.toLocaleString();

  const collectionBox = document.getElementById("collection");

  if (collection.length === 0) {
    collectionBox.textContent = "No rewards yet. Open a pack!";
  } else {
    collectionBox.innerHTML = collection.map(item =>
      "<p>🎁 " + item.name + " <strong>(" +
      item.rarity + ")</strong></p>"
    ).join("");
  }
}

update();

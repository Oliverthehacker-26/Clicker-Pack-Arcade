
"use strict";

// ================================
// ARCADE ARENA - GAME DATA
// ================================

let coins = 1000;
let power = 1;
let upgradeCost = 50;
let owned = [];
let luckEnabled = false;

const ADMIN_PASSWORD = "841036";

const packs = [
  {
    name: "Steal an Egg Pets Pack",
    price: 500,
    emoji: "🥚",
    characters: [
      { name: "Chicken", emoji: "🐤", chance: 50, rarity: "Common" },
      { name: "World burner", emoji: "🌍🔥", chance: 30, rarity: "Rare" },
      { name: "Celestial Sunlion", emoji: "🦁🌌", chance: 20, rarity: "Epic" }
    ]
  },
  {
    name: "Classmates Pack",
    price: 10000,
    emoji: "🎒",
    characters: [
      { name: "Di.uh.ree.uh", emoji: "🚽", chance: 10, rarity: "Common" },
      { name: "Flat.yoo.lens", emoji: "💨", chance: 10, rarity: "Common" },
      { name: "Boog.er", emoji: "🤧", chance: 10, rarity: "Common" },
      { name: "Kon.sti.pay.shun", emoji: "🧱", chance: 10, rarity: "Rare" },
      { name: "Barf.o.ram.uh", emoji: "🤢", chance: 10, rarity: "Rare" },
      { name: "Smel.ee", emoji: "🦨", chance: 10, rarity: "Rare" },
      { name: "Stink.bomb", emoji: "💣", chance: 10, rarity: "Epic" },
      { name: "Snot.rak.et", emoji: "🚀", chance: 10, rarity: "Epic" },
      { name: "Toot.sy", emoji: "🎈", chance: 5, rarity: "Legendary" },
      { name: "Belch.er", emoji: "🐸", chance: 5, rarity: "Legendary" },
      { name: "Wang Tianxin", emoji: "🌟", chance: 0.00000000001, rarity: "Mystical" },
      { name: "Ong Yi Oliver", emoji: "👑", chance: 0.00000000001, rarity: "Mystical" },
      { name: "John Do Khoa Kien", emoji: "🔥", chance: 0.00000000001, rarity: "Mystical" },
      { name: "Secret Classmate", emoji: "🔮", chance: 0.00000000001, rarity: "Secret" }
    ]
  },
  {
    name: "Teachers Pack",
    price: 2000,
    emoji: "📚",
    characters: [
      { name: "Mr. De.ten.shun", emoji: "⏰", chance: 10, rarity: "Common" },
      { name: "Ms. Home.Wurk", emoji: "📓", chance: 10, rarity: "Common" },
      { name: "Mrs. Pop.Kwiz", emoji: "📝", chance: 10, rarity: "Common" },
      { name: "Mr. Eks.pelled", emoji: "🚪", chance: 10, rarity: "Rare" },
      { name: "Ms. Tar.dee", emoji: "🏃", chance: 10, rarity: "Rare" },
      { name: "Mrs. Fail.yur", emoji: "📉", chance: 10, rarity: "Rare" },
      { name: "Mr. Strickt", emoji: "📏", chance: 10, rarity: "Epic" },
      { name: "Ms. Lek.chur", emoji: "🎤", chance: 10, rarity: "Epic" },
      { name: "Mrs. Ru.brik", emoji: "📋", chance: 5, rarity: "Legendary" },
      { name: "Mr. Sil.uh.bus", emoji: "📖", chance: 5, rarity: "Legendary" },
      { name: "Mr. Ang.ry.Kahboom", emoji: "💣", chance: 0.1, rarity: "Mystical" }
    ]
  }
];

// ================================
// GAME FUNCTIONS
// ================================

function saveGame() {
  // Saving is intentionally disabled.
}

function showMessage(message) {
  const element = document.getElementById("message");
  if (element) element.textContent = message;
}

function clickCoin() {
  coins += power;
  const reward = document.getElementById("floatingRewards");

  if (reward) reward.textContent = "+" + power + " 🪙";

  update();
}

function buyUpgrade() {
  if (coins < upgradeCost) {
    showMessage("Not enough coins!");
    return;
  }

  coins -= upgradeCost;
  power++;
  upgradeCost = Math.floor(upgradeCost * 1.8);

  showMessage("Click power upgraded!");
  update();
}

// ================================
// ADMIN
// ================================

function openAdmin() {
  const code = prompt("ENTER ADMIN PASSWORD:");

  if (code === null) return;

  if (code === ADMIN_PASSWORD) {
    coins = Infinity;
    update();
    showMessage("ADMIN ACTIVATED!");
    alert("ADMIN ACCESS GRANTED!");
  } else {
    alert("ACCESS DENIED!");
  }
}

// ================================
// SECRET + MYSTICAL LUCK MODE
// ================================

function toggleLuck() {
  const code = prompt("ENTER ADMIN PASSWORD:");

  if (code === null) return;

  if (code !== ADMIN_PASSWORD) {
    alert("ACCESS DENIED!");
    return;
  }

  luckEnabled = !luckEnabled;

  const button = document.getElementById("luckButton");

  if (button) {
    button.textContent = luckEnabled
      ? "🍀 LUCK MODE: ON"
      : "🍀 LUCK MODE: OFF";
  }

  showMessage(
    luckEnabled
      ? "100% SECRET OR MYSTICAL ONLY!"
      : "Luck Mode disabled."
  );
}

// ================================
// CHARACTER SELECTION
// ================================

function chooseCharacter(characters) {
  if (luckEnabled) {
    const eligible = characters.filter(character =>
      character.rarity === "Secret" ||
      character.rarity === "Mystical"
    );

    if (eligible.length === 0) {
      return null;
    }

    return eligible[
      Math.floor(Math.random() * eligible.length)
    ];
  }

  const totalChance = characters.reduce(
    (sum, character) => sum + character.chance,
    0
  );

  let roll = Math.random() * totalChance;

  for (const character of characters) {
    roll -= character.chance;

    if (roll < 0) {
      return character;
    }
  }

  return characters[characters.length - 1];
}

// ================================
// BUY PACK
// ================================

function buyPack(index) {
  const pack = packs[index];

  if (!pack) return;

  if (coins < pack.price) {
    showMessage("Not enough coins!");
    return;
  }

  let character;

  // Luck Mode has its OWN selection rule.
  // Legendary characters cannot pass this filter.
  if (luckEnabled) {
    const eligible = pack.characters.filter(character =>
      character.rarity === "Secret" ||
      character.rarity === "Mystical"
    );

    if (eligible.length === 0) {
      showMessage("NO SECRET OR MYSTICAL IN THIS PACK!");
      return;
    }

    character = eligible[
      Math.floor(Math.random() * eligible.length)
    ];
  } else {
    character = chooseCharacter(pack.characters);
  }

  // Final safety check before revealing.
  if (
    luckEnabled &&
    character.rarity !== "Secret" &&
    character.rarity !== "Mystical"
  ) {
    showMessage("ERROR: INVALID LUCK MODE CHARACTER!");
    return;
  }

  if (!character) return;

  coins -= pack.price;

  if (!owned.includes(character.name)) {
    owned.push(character.name);
  }

  const reveal = document.getElementById("reveal");

  if (reveal) {
    reveal.innerHTML =
      "<div style='font-size:60px'>" + character.emoji + "</div>" +
      "<strong>" + character.name + "</strong><br>" +
      character.rarity + "<br>" +
      "You opened: " + pack.name;
  }

  showMessage("You got " + character.name + "!");
  update();
}

// ================================
// PACK SHOP
// ================================

function drawPacks() {
  const shop = document.getElementById("packShop");

  if (!shop) return;

  shop.innerHTML = packs.map((pack, index) =>
    "<div class='pack'>" +
      "<h3>" + pack.emoji + " " + pack.name + "</h3>" +
      "<p>Price: " + pack.price.toLocaleString() + " coins</p>" +
      "<button type='button' onclick='buyPack(" + index + ")'>" +
        "BUY PACK" +
      "</button>" +
    "</div>"
  ).join("");
}

// ================================
// COLLECTION
// ================================

function drawCollection() {
  const collection = document.getElementById("collection");

  if (!collection) return;

  collection.innerHTML = packs.map(pack =>
    "<h3>" + pack.emoji + " " + pack.name + "</h3>" +
    "<div class='pack-grid'>" +
      pack.characters.map(character => {
        const unlocked = owned.includes(character.name);

        return (
          "<div class='character " +
          (unlocked ? "" : "locked") + "'>" +
            "<div style='font-size:35px'>" +
              (unlocked ? character.emoji : "❓") +
            "</div>" +
            "<strong>" +
              (unlocked ? character.name : "???") +
            "</strong><br>" +
            (unlocked ? character.rarity : "Locked") +
            (unlocked ? "<br><small>Unlocked!</small>" : "") +
          "</div>"
        );
      }).join("") +
    "</div>"
  ).join("");
}

// ================================
// UPDATE SCREEN
// ================================

function update() {
  const coinDisplay = document.getElementById("coins");
  const powerDisplay = document.getElementById("power");
  const upgradeButton = document.getElementById("upgradeButton");

  if (coinDisplay) {
    coinDisplay.textContent = coins.toLocaleString();
  }

  if (powerDisplay) {
    powerDisplay.textContent = power;
  }

  if (upgradeButton) {
    upgradeButton.textContent =
      "Upgrade Click Power — " +
      upgradeCost.toLocaleString() +
      " Coins";
  }

  drawCollection();
  saveGame();
}

// ================================
// START GAME
// ================================

drawPacks();
update();


let coins = 1000;
let power = 1;
let upgradeCost = 50;
let owned = [];
let luckEnabled = false;

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

function saveGame() {
  // Saving is disabled.
}

function clickCoin() {
  coins += power;
  document.getElementById("floatingRewards").textContent =
    "+" + power + " 🪙";
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

function openAdmin() {
  const code = prompt("ENTER ADMIN PASSWORD:");

  if (code === null) return;

  if (code === "841036") {
    coins = Infinity;
    update();
    showMessage("ADMIN ACTIVATED!");
    alert("ADMIN ACCESS GRANTED!");
  } else {
    alert("ACCESS DENIED!");
  }
}

function toggleLuck() {
  const code = prompt("ENTER ADMIN PASSWORD:");

  if (code === null) return;

  if (code !== "841036") {
    alert("ACCESS DENIED!");
    return;
  }

  luckEnabled = !luckEnabled;

  document.getElementById("luckButton").textContent =
    luckEnabled ? "🍀 LUCK MODE: ON" : "🍀 LUCK MODE: OFF";

  showMessage(
    luckEnabled
      ? "100% SECRET OR MYSTICAL LUCK ACTIVATED!"
      : "Luck Mode disabled."
  );
}


function buyPack(index) {
  const pack = packs[index];

  if (coins < pack.price) {
    showMessage("Not enough coins!");
    return;
  }

  let character;

  if (luckEnabled) {
    // Only Secret and Mystical characters are allowed!
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

  if (!character) return;

  coins -= pack.price;

  if (!owned.includes(character.name)) {
    owned.push(character.name);
  }

  document.getElementById("reveal").innerHTML =
    "<div style='font-size:60px'>" + character.emoji + "</div>" +
    "<strong>" + character.name + "</strong><br>" +
    character.rarity + "<br>" +
    "You opened: " + pack.name;

  showMessage("You got " + character.name + "!");

  update();
}
  const pack = packs[index];

  if (coins < pack.price) {
    showMessage("Not enough coins!");
    return;
  }

  const character = chooseCharacter(pack.characters);

  if (!character) {
    showMessage("This pack has no Secret or Mystical characters!");
    return;
  }

  coins -= pack.price;

  if (!owned.includes(character.name)) {
    owned.push(character.name);
  }

  document.getElementById("reveal").innerHTML =
    "<div style='font-size:60px'>" + character.emoji + "</div>" +
    "<strong>" + character.name + "</strong><br>" +
    character.rarity + "<br>" +
    "You opened: " + pack.name;

  showMessage("You got " + character.name + "!");

  update();
}

function chooseCharacter(characters) {
  if (luckEnabled) {
    const luckyCharacters = characters.filter(character =>
      character.rarity === "Mystical" ||
      character.rarity === "Secret"
    );

    if (luckyCharacters.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(
      Math.random() * luckyCharacters.length
    );

    return luckyCharacters[randomIndex];
  }

  const totalChance = characters.reduce(
    (sum, character) => sum + character.chance, 0
  );

  let roll = Math.random() * totalChance;
  let total = 0;

  for (const character of characters) {
    total += character.chance;

    if (roll < total) {
      return character;
    }
  }

  return characters[characters.length - 1];
}

function showMessage(message) {
  document.getElementById("message").textContent = message;
}

function drawPacks() {
  document.getElementById("packShop").innerHTML = packs.map((pack, index) =>
    "<div class='pack'>" +
    "<h3>" + pack.emoji + " " + pack.name + "</h3>" +
    "<p>Price: " + pack.price.toLocaleString() + " coins</p>" +
    "<button onclick='buyPack(" + index + ")'>BUY PACK</button>" +
    "</div>"
  ).join("");
}

function drawCollection() {
  document.getElementById("collection").innerHTML = packs.map(pack =>
    "<h3>" + pack.emoji + " " + pack.name + "</h3>" +
    pack.characters.map(character => {
      const unlocked = owned.includes(character.name);

      return "<div class='character " + (unlocked ? "" : "locked") + "'>" +
        "<div style='font-size:35px'>" +
        (unlocked ? character.emoji : "❓") +
        "</div>" +
        "<strong>" + (unlocked ? character.name : "???") + "</strong><br>" +
        (unlocked ? character.rarity : "Locked") +
        (unlocked ? "<br><small>Unlocked!</small>" : "") +
        "</div>";
    }).join("")
  ).join("");
}

function update() {
  document.getElementById("coins").textContent =
    coins.toLocaleString();

  document.getElementById("power").textContent = power;

  document.getElementById("upgradeButton").textContent =
    "Upgrade Click Power — " + upgradeCost.toLocaleString() + " Coins";

  drawCollection();
  saveGame();
}

drawPacks();
update();

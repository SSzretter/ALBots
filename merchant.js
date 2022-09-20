

console.log("master starting");


const colorGreen = "#1ED97C";
const colorWhite = "#EFF6FF";
const colorShading = "#909CC0";
const colorNavy = "#1C222B";


var Characters;
(function (Characters) {
  Characters["Warrior"] = "codedevW";
  Characters["Mage"] = "codedev";
  Characters["Ranger"] = "codedevR";
  Characters["Merchant"] = "codedevB";
})(Characters || (Characters = {}));

var CharacterTypes;
(function (CharacterTypes) {
  CharacterTypes["Mage"] = "mage";
  CharacterTypes["Merchant"] = "merchant";
  CharacterTypes["Priest"] = "priest";
  CharacterTypes["Ranger"] = "ranger";
  CharacterTypes["Rogue"] = "rogue";
  CharacterTypes["Warrior"] = "warrior";
})(CharacterTypes || (CharacterTypes = {}));

var ItemTypes;
(function (ItemTypes) {
  ItemTypes["Activator"] = "activator";
  ItemTypes["Amulet"] = "amulet";
  ItemTypes["Belt"] = "belt";
  ItemTypes["Booster"] = "booster";
  ItemTypes["Box"] = "box";
  ItemTypes["Cape"] = "Cape";
  ItemTypes["Chest"] = "chest";
  ItemTypes["CompoundScroll"] = "cscroll";
  ItemTypes["Computer"] = "computer";
  ItemTypes["Cosmetics"] = "cosmetics";
  ItemTypes["Earring"] = "earring";
  ItemTypes["Elixir"] = "elixir";
  ItemTypes["Figurine"] = "figurine";
  ItemTypes["Flute"] = "flute";
  ItemTypes["Gem"] = "gem";
  ItemTypes["Gloves"] = "gloves";
  ItemTypes["Helmet"] = "helmet";
  ItemTypes["Jar"] = "jar";
  ItemTypes["Key"] = "key";
  ItemTypes["Licence"] = "licence";
  ItemTypes["Material"] = "material";
  ItemTypes["Misc"] = "misc";
  ItemTypes["MiscOffhand"] = "misc_offhand";
  ItemTypes["Offering"] = "offering";
  ItemTypes["Orb"] = "orb";
  ItemTypes["Pants"] = "pants";
  ItemTypes["Pet"] = "pet";
  ItemTypes["PetLicence"] = "petlicence";
  ItemTypes["PlayerScroll"] = "pscroll";
  ItemTypes["Potion"] = "pot";
  ItemTypes["Qubics"] = "qubics";
  ItemTypes["Quest"] = "quest";
  ItemTypes["Quiver"] = "quiver";
  ItemTypes["Ring"] = "ring";
  ItemTypes["Shield"] = "shield";
  ItemTypes["Shoes"] = "shoes";
  ItemTypes["SkillItem"] = "skill_item";
  ItemTypes["Source"] = "source";
  ItemTypes["Stand"] = "stand";
  ItemTypes["Stone"] = "stone";
  ItemTypes["Throw"] = "throw";
  ItemTypes["Token"] = "token";
  ItemTypes["Tome"] = "tome";
  ItemTypes["UpgradeScroll"] = "uscroll";
  ItemTypes["Weapon"] = "weapon";
  ItemTypes["XP"] = "xp";
})(ItemTypes || (ItemTypes = {}));

var JewelryTypes;
(function (JewelryTypes) {
  JewelryTypes["Amulet"] = "amulet";
  JewelryTypes["Earring"] = "earring";
  JewelryTypes["Orb"] = "orb";
  JewelryTypes["Ring"] = "ring";
})(JewelryTypes || (JewelryTypes = {}));

var ArmorTypes;
(function (ArmorTypes) {
  ArmorTypes["Belt"] = "belt";
  ArmorTypes["Cape"] = "Cape";
  ArmorTypes["Chest"] = "chest";
  ArmorTypes["Gloves"] = "gloves";
  ArmorTypes["Helmet"] = "helmet";
  ArmorTypes["Pants"] = "pants";
  ArmorTypes["Shield"] = "shield";
  ArmorTypes["Shoes"] = "shoes";
})(ArmorTypes || (ArmorTypes = {}));

var WeaponTypes;
(function (WeaponTypes) {
  WeaponTypes["Axe"] = "axe";
  WeaponTypes["Basher"] = "basher";
  WeaponTypes["Bow"] = "bow";
  WeaponTypes["Dagger"] = "dagger";
  WeaponTypes["Dart"] = "dart";
  WeaponTypes["Fist"] = "fist";
  WeaponTypes["Hammer"] = "hammer";
  WeaponTypes["Mace"] = "mace";
  WeaponTypes["ShortSword"] = "short_sword";
  WeaponTypes["Spear"] = "spear";
  WeaponTypes["Staff"] = "staff";
  WeaponTypes["Stars"] = "stars";
  WeaponTypes["WonderBlade"] = "wblade";
})(WeaponTypes || (WeaponTypes = {}));

var DamageTypes;
(function (DamageTypes) {
  DamageTypes["Heal"] = "heal";
  DamageTypes["Magical"] = "magical";
  DamageTypes["Physical"] = "physical";
})(DamageTypes || (DamageTypes = {}));

var MageSkills;
(function (MageSkills) {
  MageSkills["Blink"] = {
    name: "blink",
    mp: 1600,
    cd: 1200
  };
  MageSkills["ManaBurst"] = {
    name: "burst",
    cd: 6000
  };
  MageSkills["ControlledManaBurst"] = {
    name: "cburst",
    cd: 6000,
    level: 75
  };
  MageSkills["Energize"] = {
    name: "energize",
    cd: 4000,
    range: 320,
    level: 20
  };
  MageSkills["Light"] = {
    name: "light",
    mp: 2000
  };
  MageSkills["Magiport"] = {
    name: "magiport",
    mp: 900
  };
})(MageSkills || (MageSkills = {}));

var Merchantkills;
(function (Merchantkills) {
  Merchantkills["Courage"] = {
    name: "mcourage",
    mp: 2400,
    cd: 2000,
    level: 70
  };
  Merchantkills["Luck"] = {
    name: "mluck",
    mp: 10,
    cd: 100,
    range: 320,
    level: 40
  };
  Merchantkills["ThrowStuff"] = {
    name: "throw",
    mp: 200,
    cd: 400,
    range: 200,
    level: 60
  };
})(Merchantkills || (Merchantkills = {}));

var PriestSkills;
(function (PriestSkills) {
  PriestSkills["Blink"] = {
    name: "blink"
  };
  PriestSkills["ManaBurst"] = {
    name: "burst"
  };
  PriestSkills["ControlledManaBurst"] = {
    name: "cburst"
  };
  PriestSkills["Energize"] = {
    name: "energize"
  };
  PriestSkills["Light"] = {
    name: "light"
  };
  PriestSkills["Magiport"] = {
    name: "magiport"
  };
})(PriestSkills || (PriestSkills = {}));

var RangerSkills;
(function (RangerSkills) {
  RangerSkills["ThreeShot"] = {
    name: "3shot",
    mp: 300,
    level: 60
  };
  RangerSkills["FourFingerTechnique"] = {
    name: "4fingers",
    mp: 260,
    duration: 5000,
    cd: 40000,
    range: 120,
    level: 64
  };
  RangerSkills["FiveShot"] = {
    name: "5shot",
    mp: 420,
    level: 75
  };
  RangerSkills["PoisonArrow"] = {
    name: "poisonarrow",
    mp: 360,
    cd: 300
  };
  RangerSkills["Supershot"] = {
    name: "supershot",
    mp: 400,
    cd: 30000
  };
  RangerSkills["Track"] = {
    name: "track",
    mp: 80,
    cd: 1600,
    range: 1440
  };
})(RangerSkills || (RangerSkills = {}));

var RogueSkills;
(function (RogueSkills) {
  RogueSkills["Blink"] = {
    name: "blink"
  };
  RogueSkills["ManaBurst"] = {
    name: "burst"
  };
  RogueSkills["ControlledManaBurst"] = {
    name: "cburst"
  };
  RogueSkills["Energize"] = {
    name: "energize"
  };
  RogueSkills["Light"] = {
    name: "light"
  };
  RogueSkills["Magiport"] = {
    name: "magiport"
  };
})(RogueSkills || (RogueSkills = {}));

var WarriorSkills;
(function (WarriorSkills) {
  WarriorSkills["Agitate"] = {
    name: "agitate",
    mp: 420,
    cd: 2200,
    range: 320,
    level: 68
  };
  WarriorSkills["Charge"] = {
    name: "charge",
    duration: 3200,
    cd: 40000
  };
  WarriorSkills["Cleave"] = {
    name: "cleave",
    mp: 720,
    cd: 1200,
    range: 160,
    level: 52
  };
  WarriorSkills["HardShell"] = {
    name: "hardshell",
    mp: 480,
    duration: 8000,
    cd: 16000,
    level: 60
  };
  WarriorSkills["Stomp"] = {
    name: "stomp",
    mp: 120,
    duration: 3200,
    cd: 24000,
    range: 400,
    level: 52
  };
  WarriorSkills["Taunt"] = {
    name: "taunt",
    mp: 40,
    cd: 3000,
    range: 200
  };
  WarriorSkills["WarCry"] = {
    name: "warcry",
    mp: 320,
    duration: 8000,
    cd: 60000,
    range: 600,
    level: 70
  };
})(WarriorSkills || (WarriorSkills = {}));

function fastTravelTown() {
  console.log("fastTravelTown");
  use_skill("use_town");
}

function travelTo(destination, destinationInTown) {
  game_log('trav:' + destination);
  if (destinationInTown) smart.use_town = true;
  smart_move({ to: destination });

  /*switch (destination) {
    case "upgrade":
    case "compound":
      smart_move({ to: destination });
      break;
    case "exchange":
      smart_move({ to: destination });
      break;
    case "potions":
      smart_move({ to: destination });
      break;
    case "scrolls":
      smart_move({ to: destination });
      break;
    default:
      smart_move({ to: destination });
  }*/
}



function goToTown() {
  if (mycharacter.spsCurrStatus['goToTown'] === '') // blank = go to town
  {
    console.log('gt:' + mycharacter.spsCurrStatus['goToTown']);
    mycharacter.spsCurrStatus['goToTown'] = 'goingToTown';
    set_message("goingToTown");
    (async () => {
      result = await town()
      if (result['success'] == true) {
        mycharacter.spsCurrStatus['goToTown'] = 'atTown';
      }
      else
        errorState(result);
    })();
  }
  else if (mycharacter.spsCurrStatus['goToTown'] == 'atTown') {
    console.log('at:' + mycharacter.spsCurrStatus['goToTown']);
    mycharacter.spsCurrActionFn.shift();
    console.log(mycharacter.spsCurrActionFn);
    mycharacter.spsCurrStatus['goToTown'] = '';
  }
  else if (mycharacter.spsCurrStatus['goToTown'] == 'goingToTown') {
    console.log('gtt:' + mycharacter.spsCurrStatus['goToTown']);
  }

}

function walkHalfwayToTarget(target) {
  game_log('walk halfway to target');
  move(
    character.x + (target.x - character.x) / 2,
    character.y + (target.y - character.y) / 2
  );
}

function walkToTargetWithinAttackRange(target) {
  //TODO: walk towards target to hit it (useful for ranged chars)
  //character.range
  game_log('walk to target within range');
  move(
    character.x + (target.x - character.x) / 2,
    character.y + (target.y - character.y) / 2
  );
}


let healthPotion = 50;
let manaPoition = 100;
let lastPotion = new Date(0);

let healthThreshold = 0.5;
let manaThreshold = 0.3;

function restoreHealthOrMana() {
  if (safeties && mssince(lastPotion) < 600) return;
  var used = false;
  if (new Date() < parent.next_potion) return;
  used = useHealthPotion(character);
  if (!used) used = useManaPotion(character);
  if (used) lastPotion = new Date();
}

function useHealthPotion() {
  if (
    (getDifference(character.max_hp, character.hp) >= healthPotion && isAbovePercent(character.mp, character.max_mp, manaThreshold)) // we have enough mana and could heal so go ahead and heal
    || isBelowPercent(character.hp, character.max_hp, healthThreshold)  //  OR (override) we are getting low on health so heal!
  ) {
    use_skill("use_hp", character);
    return true;
  }
  return false;
}

function useManaPotion() {
  if (getDifference(character.max_mp, character.mp) >= manaPoition) {
    use_skill("use_mp", character);
    return true;
  }
  return false;
}

function checkHealthAndManaPotionsInInventory() {
  let found = false;
  let potions = getPotionsInInventory();
  Object.values(potions).map(potion => {
    let itemStats = parent.G.items[potion.name].gives;
    if (itemStats) {
      let type = itemStats[0][0];
      let amount = itemStats[0][1];

      setPotionValues(type, amount);
      found = true;
    }
  });
  if (!found) {
    //set to default skill
    setPotionValues("hp", 50);
    setPotionValues("mp", 100);
  }
}

function setPotionValues(type, amount) {
  if (type === "hp") {
    if (character.max_hp < amount) return;
    healthPotion = amount;
  } else if (type === "mp") {
    if (character.max_mp < amount) return;
    manaPoition = amount;
  }
}

var mycharacter = [];

function resetVars() {
  mycharacter = [];
  mycharacter.spsCurrActionFn = [];
  mycharacter.spsCurrStatus = [];
  mycharacter.spsCurrStatus['fightGoo'] = '';
  mycharacter.spsCurrStatus['goToTown'] = '';
  mycharacter.spsCurrStatus['goToGoo'] = '';
  mycharacter.spsCurrStatus['checkRecoverHPMP'] = '';
  mycharacter.spsCurrStatus['errorState'] = '';
}


function getDifference(a, b) {
  return Math.abs(a - b);
}

function isBelowPercent(current, max, percentage) {
  return current / max < percentage;
}

function isAbovePercent(current, max, percentage) {
  return current / max > percentage;
}

function actionText(text, color) {
  parent.d_text(text, character, { color: color });
}

function roundBy(a, b) {
  return Math.round(a / b) * b;
}

function roundDownBy(a, b) {
  return Math.floor(a / b) * b;
}

function roundUpBy(a, b) {
  return Math.ceil(a / b) * b;
}

function partyHandler() {
  if (parent.isPartyLeader) {
    game_log('I am party leader, creating party');
    createParty();
  } else {
    if (character.party && character.party !== "codedev") {
      leaveParty(); game_log('Invalid party, leaving party!');
    }
  }
}

function createParty() {
  let party = [Characters.Warrior, Characters.Mage, Characters.Ranger, Characters.Merchant];
  game_log('creating party');
  for (let index in party) {
    if (party[index] === "codedev") continue;
    if (!parent.party[party[index]]) send_party_invite(party[index]);
  }
}

function on_party_invite(name) {
  if (!character.party && "codedev" === name) { accept_party_invite(name); game_log('acceped party invite ' + name); }
}

function on_party_request(name) {
  if (!character.party && "codedev" === name) {
    accept_party_request(name); game_log('acceped party request ' + name);
  }
}

function leaveParty() {
  parent.socket.emit("party", { event: "leave" });
}

function getPotionsInInventory() {
  return Object.values(character.items).filter(item =>
    item &&
    parent.G.items[item.name].type === "pot"
  );
}

function getPartyMembers() {
  return Object.values(parent.entities).filter(char =>
    is_character(char) && !char.rip &&
    char.party && char.party === character.party);
}

function getPartyMembersIncludingSelf() {
  let partyMembers = getPartyMembers();
  partyMembers.push(character);

  return partyMembers;
}

function getMonstersNearby(distance) {
  if (!distance) distance = character.range;
  return Object.values(parent.entities).filter(monster =>
    is_monster(monster) && parent.distance(monster, character) <= distance);
}
/*
function bank_store(num, pack, pack_slot) {
  // bank_store(0) - Stores the first item in inventory in the first/best spot in bank
  // parent.socket.emit("bank",{operation:"swap",pack:pack,str:num,inv:num});
  // Above call can be used manually to pull items, swap items and so on - str is from 0 to 41, it's the storage slot #
  // parent.socket.emit("bank",{operation:"swap",pack:pack,str:num,inv:-1}); <- this call would pull an item to the first inventory slot available
  // pack is one of ["items0","items1","items2","items3","items4","items5","items6","items7"]
  if (!character.bank) return game_log("Not inside the bank");
  if (!character.items[num]) return game_log("No item in that spot");
  if (!pack_slot) pack_slot = -1; // the server interprets -1 as first slot available
  if (!pack) {
    var cp = undefined, cs = undefined;
    bank_packs.forEach(function (cpack) {
      if (!character.bank[cpack]) return;
      for (var i = 0; i < 42; i++) {
        if (pack) return;
        if (can_stack(character.bank[cpack][i], character.items[num])) // the item we want to store and this bank item can stack - best case scenario
        {
          pack = cpack;
        }
        if (!character.bank[cpack][i] && !cp) {
          cp = cpack;
        }
      }
    });
    if (!pack && !cp) return game_log("Bank is full!");
    if (!pack) pack = cp;
  }
  parent.socket.emit("bank", { operation: "swap", pack: pack, str: -1, inv: num });
}*/


function attackMonster(monster) {
  if (!parent.attackActive || character.rip || is_moving(character)) return;

  let target = getTargetMonster(monster);
  if (!target) {
    set_message("No Monsters");
    return;
  }

  let hostileMonster = get_nearest_monster({ target: 'codedev' });
  if ((isBelowPercent(character.mp, character.max_mp, manaThreshold) || isBelowPercent(character.hp, character.max_hp, healthThreshold)) && target && hostileMonster !== target) // low on hp and mp so if we have a target and it is NOT hostile clear the target so we can rest
  {
    target = null;
    set_message("Resting");
  }

  if (!in_attack_range(target)) {
    if (parent.walkingActive) {
      walkHalfwayToTarget(target);
    }
  }
  else if (can_attack(target)) {
    set_message("Attacking");
    attackingMonster(target);
  }
}

function getTargetMonster(monster) {
  let target = get_targeted_monster();
  if (!target) { // we need a new monster
    target = get_nearest_monster(monster);
    if (target) change_target(target);
  }
  return target;
}

function attackingMonster(monster) {

  useCombatSkills(monster);

  attack(monster);
}


let lastUse_Courage = new Date(0);
let lastUse_Luck = new Date(0);
let lastUse_ThrowStuff = new Date(0);
let movingToChar = false;
let atParty = 0;  //  are we at the character party (to get their stuff and supply them)
let movingToBank = false;
let justRespawned = false;
let oldLocation = {};
let isPartyLeader = false;
let potions = {
  coodev: { name: "codedev", inventory: { hpot0: { q: -1 }, hpot1: { q: -1 }, mpot0: { q: -1 }, mpot1: { q: -1 } } }
  //  D4ddy002: { name: "D4ddy002", inventory: { hpot0: { q: -1 }, hpot1: { q: -1 }, mpot0: { q: -1 }, mpot1: { q: -1 } } },
  //  D4ddy003: { name: "D4ddy003", inventory: { hpot0: { q: -1 }, hpot1: { q: -1 }, mpot0: { q: -1 }, mpot1: { q: -1 } } }
};

resetVars();

mycharacter.spsCurrActionFn.push('goToTown');


game_log("merchant starting");

setInterval(function doMerchantStuff() {


  if (character.rip) {
    set_message('Char RIP');
    oldLocation = { x: character.real_x, y: character.real_y, map: character.map };
    setTimeout(respawn(), 15000);
    justRespawned = true;
    return 1;
  }
  if (justRespawned) {
    game_log('RespawnMoveOldLoc');
    smart_move(oldLocation);
    justRespawned = false;
    oldLocation = {};
  }

  if (is_moving(character)) return;

  partyHandler();
  checkHealthAndManaPotionsInInventory();
  restoreHealthOrMana();


  if (mycharacter.spsCurrActionFn[0]) {
    console.log('ev:' + mycharacter.spsCurrActionFn[0] + " " + mycharacter.spsCurrStatus);
    eval(mycharacter.spsCurrActionFn[0] + '()');
  }
  else {
    set_message("noActionFN");
  }



}, 1000 / 4); //loop every 5 seconds




function goToPotionsSellGarabge() {
  if (!is_moving(character)) {

    if (character.real_x !== 56 && character.real_y !== -122) {
      game_log("go to potions");
      smart_move({ to: "potions" });
    }
    else {
      game_log("sell garbage");
      sellGarbage();
      mycharacter.spsCurrActionFn.shift();
    }

  }


}

function goWithdrawMoney() {
  if (needMoney() && !is_moving(character)) {
    game_log("go to bank (withdraw money)");
    set_message("BankWithdraw");
    smart_move({ to: "bank" }, function () { withdrawMoney(); mycharacter.spsCurrActionFn.shift(); });
  } else if (!needMoney()) {
    set_message("DoNotNeedMoney");
    mycharacter.spsCurrActionFn.shift();
  }
}

function doBuyPotions() {
  if (needPotions() && !is_moving(character)) {
    if (character.real_x !== 56 && character.real_y !== -122) {
      game_log("go to potions 2");
      smart_move({ to: "potions" });
    }
    else {
      game_log("buy potions");
      buyPotions();
      mycharacter.spsCurrActionFn.shift();
    }
    return;
  }
  else if (!needPotions()) {
    mycharacter.spsCurrActionFn.shift();
  }
}

function doDepositItems() {
  if (!is_moving(character)) {
    game_log("go to bank 2");
    smart_move({ to: "bank" }, function () { depositGold(); depositItems(); mycharacter.spsCurrActionFn.shift(); ignoreMoveCM = 0; });
  }
}

function needMoney() {
  return character.gold < 300000;
}

function withdrawMoney() {
  bank_withdraw(getDifference(character.gold, 300000));
}

function needPotions() {
  return (quantity("hpot0") < 600
    || quantity("hpot1") < 600
    || quantity("mpot0") < 600
    || quantity("mpot1") < 600);
}

function buyPotions() {
  let quantitySmallHP = quantity("hpot0");
  let quantityBigHP = quantity("hpot1");
  let quantitySmallMP = quantity("mpot0");
  let quantityBigMP = quantity("mpot1");

  if (quantitySmallHP - 600 < 0) {
    game_log('buy hpot0');
    buy("hpot0", getDifference(quantitySmallHP, 600));
  }
  if (quantityBigHP - 600 < 0) {
    game_log('buy hpot0');
    buy("hpot1", getDifference(quantityBigHP, 600));
  }
  if (quantitySmallMP - 600 < 0) {
    game_log('buy hpot0');
    buy("mpot0", getDifference(quantitySmallMP, 600));
  }
  if (quantityBigMP - 600 < 0) {
    game_log('buy hpot0');
    buy("mpot1", getDifference(quantityBigMP, 600));
  }
}

function deliverPotions() {
  Object.values(potions).forEach(function (member) {
    if (get_player(member.name)) {
      game_log('deliver potions (send_item):' + member.name);
      if (member.inventory.hpot0.q != -1 && member.inventory.hpot0.q - 200 < 0 && getItemSlot("hpot0") != -1) send_item(member.name, getItemSlot("hpot0"), getDifference(member.inventory.hpot0.q, 200));
      if (member.inventory.hpot1.q != -1 && member.inventory.hpot1.q - 200 < 0 && getItemSlot("hpot1") != -1) send_item(member.name, getItemSlot("hpot1"), getDifference(member.inventory.hpot1.q, 200));
      if (member.inventory.mpot0.q != -1 && member.inventory.mpot0.q - 200 < 0 && getItemSlot("mpot0") != -1) send_item(member.name, getItemSlot("mpot0"), getDifference(member.inventory.mpot0.q, 200));
      if (member.inventory.mpot1.q != -1 && member.inventory.mpot1.q - 200 < 0 && getItemSlot("mpot1") != -1) send_item(member.name, getItemSlot("mpot1"), getDifference(member.inventory.mpot1.q, 200));
    }
  });
}

function getItemSlot(name) {
  for (var i = 0; i < character.items.length; i++) {
    if (character.items[i] && character.items[i].name == name) return i;
  }
  return -1;
}

function askForPotions() {
  send_cm([Characters.Warrior, Characters.Mage, Characters.Ranger], "askPotions");
}

function on_cm(name, data) {
  var ignoreMoveCM = 0;
  if (mycharacter.spsCurrActionFn[0]) ignoreMoveCM = 1; // we dont want to move and will ignore the VM's that trigger movement (every 60 seconds if we are currently busy with functions)
  game_log('CM:' + name + ' ' + JSON.stringify(data));
  if (name === Characters.Warrior || name === Characters.Mage || name === Characters.Ranger || name === Characters.Merchant) {
    game_log('distance:' + parent.distance({ x: data.x - 1, y: data.y - 1, map: data.map }, character));
    if (!is_moving(character) && !get_player(name) && "x" in data && ignoreMoveCM == 0) {
      game_log('MoveTo ' + name);
      atParty = 0;
      smart_move({ x: data.x - 5, y: data.y - 5, map: data.map }, function () { askForPotions(); useLuck(); atParty = 1; }); // moving to x,y (-1) so that we are not standing on the same square and taking damage
    }
    if ("potions" in data && !is_moving(character)) {
      potions[name] = data.potions;
      deliverPotions();
      // at this point they gave us everything and we can return to town  (TODO: will need to adjust this for multiple characters)
      if (atParty == 1) {
        mycharacter.spsCurrActionFn.push('goToTown');
        mycharacter.spsCurrActionFn.push('goToPotionsSellGarabge');  // if we are at the party time to go to town
        mycharacter.spsCurrActionFn.push('goWithdrawMoney');
        mycharacter.spsCurrActionFn.push('doBuyPotions');
        mycharacter.spsCurrActionFn.push('doDepositItems');
      }
    }
  }
}

function sellGarbage() {
  for (var i = 5; i < 42; i++) {
    if (character.items[i]
      && (character.items[i].name === "hpbelt" || character.items[i].name === "hpamulet" || character.items[i].name === "ringsj")) {
      sell(i);
    }
  }
}

function openMerchStand() {
  if (!isMerchStandActive()) {
    parent.open_merchant(0);
  }
}

function closeMerchStand() {
  if (isMerchStandActive()) {
    parent.close_merchant(0);
  }
}

function toggleMerchStand() {
  if (isMerchStandActive()) {
    parent.close_merchant(0);
  } else {
    parent.open_merchant(0);
  }
}

function isMerchStandActive() {
  return character.stand !== false;
}

function moveToChar() {
  movingToChar = true;
  movingToBank = false;
}

function moveToBank() {
  movingToBank = true;
  movingToChar = false;
}

function stoppedMoving() {
  movingToChar = false;
  movingToBank = false;
}

function isMovingToChar() {
  return movingToChar;
}

function isMovingToBank() {
  return movingToBank;
}

function isInsideBank() {
  //!character.bank
  return character.map === "bank";
}

function depositGold() {
  if (character.gold > 300000) {
    bank_deposit(character.gold - 300000);
  }
}

function depositItems() {
  if (character.esize === 42) return; //empty inventory
  for (item in character.items) {
    if (item == 0) continue;
    if (!character.items[item]) continue;
    if (parent.G.items[character.items[item].name].type === ItemTypes.Potion) continue;
    bank_store(item);
  }
}

/**
 * When you sense danger, you know what to do...
 */
function useCourage() {
  use_skill(Merchantkills.Courage.name);
  lastUse_Courage = new Date();
}

/**
 * Buff a target to increase their luck. 2% chance for you to receive a duplicate of their looted items!
 */
function useLuck() {
  let partyMembers = getPartyMembers();

  partyMembers = Object.values(partyMembers).filter(char =>
    parent.distance(char, character) <= Merchantkills.Luck.range
  );
  partyMembers.forEach(function (member) {
    actionText(parent.G.skills[Merchantkills.Luck.name].name, colorGreen);
    use_skill(Merchantkills.Luck.name, member.name);
    game_log("Used " + parent.G.skills[Merchantkills.Luck.name].name + " on " + member.name, colorGreen);
    lastUse_Luck = new Date();
  });
}

/**
 * Terrified? Just throw whatever you can find at your opponent!
 */
function useThrowStuff(target) {
  use_skill(Merchantkills.ThrowStuff.name, target);
  lastUse_ThrowStuff = new Date();
}

function canUseCourage() {
  return (mssince(lastUse_Courage) > Merchantkills.Courage.cd && character.level >= Merchantkills.Courage.level);
}

function canUseLuck() {
  return (mssince(lastUse_Luck) > Merchantkills.Luck.cd && character.level >= Merchantkills.Luck.level);
}

function canUseThrowStuff() {
  return (mssince(lastUse_ThrowStuff) > Merchantkills.ThrowStuff.cd && character.level >= Merchantkills.ThrowStuff.level);
}

add_bottom_button(99, "Sell Items", function () {
  let i = prompt("Ab Slot#", 5);
  for (i; i < 42; i++) {
    sell(i);
  }
});
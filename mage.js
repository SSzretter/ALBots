console.log(character.name+" mage starting");
var c = require('./CODE/ALBots/constants');
c.mycharacter.spsParentScope=this;


function on_party_invite(name) {
  if (!character.party && "codedev" === name) { accept_party_invite(name); console.log(character.name + ' acceped party invite ' + name); }
}


function on_party_request(name) {
  if (!character.party && "codedev" === name) {
    accept_party_request(name); console.log(character.name + ' acceped party request ' + name);
  }
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
  if (!character.bank) return console.log("Not inside the bank");
  if (!character.items[num]) return console.log("No item in that spot");
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
    if (!pack && !cp) return console.log("Bank is full!");
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
  if ((c.isBelowPercent(character.mp, character.max_mp, c.manaThreshold) || c.isBelowPercent(character.hp, character.max_hp, c.healthThreshold)) && target && hostileMonster !== target) // low on hp and mp so if we have a target and it is NOT hostile clear the target so we can rest
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


function walkHalfwayToTarget(target) {
  console.log(character.name + ' walk halfway to target');
  move(
    character.x + (target.x - character.x) / 2,
    character.y + (target.y - character.y) / 2
  );
}

// MAGE :

let lastUse_Blink = new Date(0);
let lastUse_ManaBurst = new Date(0);
let lastUse_CManaBurst = new Date(0);
let lastUse_Energize = new Date(0);

function init() {

  parent.attackActive = true;
  parent.walkingActive = false;  // we do not want mage to walk toward target

}

function useCombatSkills(target) {
  if (canUseManaBurst(target)) {
    useManaBurst(target);
    c.useManaPotion();
  }

  if (canUseEnergize()) {
    useEnergize();
  }
}

/**
 * Teleport to a nearby location.
 */
function useBlink(target) {
  //for blink: use_skill("blink",[x,y])
  use_skill(c.MageSkills.Blink.name, target);
  lastUse_Blink = new Date();
}

/**
 * Converts your entire mana pool to damage. Deals 0.5 magical damage for each MP.
 */
function useManaBurst(target) {
  console.log(character.name + " Casting " + parent.G.skills[c.MageSkills.ManaBurst.name].name + " for " + calcManaBurstDmg() + " dmg", colorGreen);
  c.actionText(parent.G.skills[c.MageSkills.ManaBurst.name].name, colorGreen);
  use_skill(c.MageSkills.ManaBurst.name, target);
  lastUse_ManaBurst = new Date();
}

/**
 * A skill for experienced mages. Allows you to control your most powerful ability.
 */
function useControlledManaBurst(target) {
  use_skill(c.MageSkills.ControlledManaBurst.name, target);
  lastUse_CManaBurst = new Date();
}

/**
 * Transfers mana to a target. As a side effect the target gains high attack speed for a short duration.
 */
function useEnergize() {
  let partyMembers = c.getPartyMembers();

  partyMembers = Object.values(partyMembers).filter(char =>
    parent.distance(char, character) <= c.MageSkills.Energize.range &&
    c.isBelowPercent(char.mp, char.max_mp, 0.7)
  );
  partyMembers.sort((a, b) => a.mp / a.max_mp - b.mp / b.max_mp);
  if (partyMembers.length) {
    c.actionText(parent.G.skills[c.MageSkills.Energize.name].name, colorGreen);
    use_skill(c.MageSkills.Energize.name, partyMembers[0]);
    console.log(character.name + " Used " + parent.G.skills[c.MageSkills.Energize.name].name + " on " + partyMembers[0].name, colorGreen);
    lastUse_Energize = new Date();
  }
}

/**
 * Reveals invisible entities nearby and prevents them from going invisible again for 12 seconds.
 */
function useLight(target) {
  use_skill(c.MageSkills.Light.name, target);
  lastUse_Light = new Date();
}

/**
 * Pull someone to your location using the magical paths that surround our world.
 */
function useMagiport(target) {
  use_skill(c.MageSkills.Magiport.name, target);
  lastUse_Magiport = new Date();
}

function calcManaBurstDmg() {
  return 0.5 * character.mp;
}

function canUseManaBurst(target) {
  return (mssince(lastUse_ManaBurst) > c.MageSkills.ManaBurst.cd && target.hp >= calcManaBurstDmg() && character.mp > 2000);
}

function canUseEnergize() {
  return (mssince(lastUse_Energize) > c.MageSkills.Energize.cd && character.level >= c.MageSkills.Energize.level);
}

// FARMING: 

let attackActive = false;
let walkingActive = false;

let isPartyLeader = true;  // TEMPORARILY TRUE NORMALLY WARRIOR IS PARTY LEADER

let monsterType = ""; //should be set ingame

let goldThreshold = 75000;  // 300000;
let goldTransferAmount = 5000;
let potionThreshold = 800;  //200;  // 50 each (4 potions * 50 = 200 before we call for the merchant)

let justRespawned = false;
let oldLocation = {};

smart_move({ x:-167,y:1867, map: "main" }); // go to snakes

setInterval(function () {

  if (character.rip) {
    oldLocation = { x: character.real_x, y: character.real_y, map: character.map };
    setTimeout(respawn, 15000);
    justRespawned = true;
    return 1;
  }
  if (justRespawned) {
    smart_move(oldLocation);
    justRespawned = false;
    oldLocation = {};
  }
  //initialize character class specific resources
  init();

  c.partyHandler();

  c.checkHealthAndManaPotionsInInventory();
  c.restoreHealthOrMana();
  loot();




  let monster = {
    // max_att: max attack
    // min_xp: min XP
    // target: Only return monsters that target this "name" or player object
    // no_target: Only pick monsters that don't have any target
    // path_check: Checks if the character can move to the target
    // type: Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)` 
    min_xp: 100,
    max_att: 120,
    type: monsterType,
    no_target: true
  };
  attackMonster(monster);

}, 1000 / 4); // Loops every 1/4 seconds.

/*----------------------
 |  Merchant Functions
 *----------------------*/

setInterval(function callMerchant() {
  if (hasGoldOrItems() && !is_moving(c.Characters.Merchant)) {
    send_cm(c.Characters.Merchant, {
      x: character.real_x,
      y: character.real_y,
      map: character.map,
      potions: { name: character.name, inventory: { hpot0: { q: quantity("hpot0") }, hpot1: { q: quantity("hpot1") }, mpot0: { q: quantity("mpot0") }, mpot1: { q: quantity("mpot1") } } }
    });
  };

}, 60000); //loop every 2 seconds

function on_cm(name, data) {
  console.log(character.name + ' CM:' + name + ':' + data);
  if (name === c.Characters.Warrior || name === c.Characters.Mage || name === c.Characters.Ranger || name === c.Characters.Merchant) {
    if (name === c.Characters.Merchant && data === "askPotions") {
      sendGoldToMerchant();
      sendItemsToMerchant();
      send_cm(c.Characters.Merchant, {
        potions: { name: character.name, inventory: { hpot0: { q: quantity("hpot0") }, hpot1: { q: quantity("hpot1") }, mpot0: { q: quantity("mpot0") }, mpot1: { q: quantity("mpot1") } } }
      }
      );
    }
  }
}

function hasGoldOrItems() {
  return ((character.gold > goldThreshold) || (getNumberOfPotions < potionThreshold));
}

function sendGoldToMerchant() {
  if (character.gold > goldThreshold) {
    send_gold(c.Characters.Merchant,
      goldTransferAmount < c.getDifference(character.gold, goldThreshold) ? c.getDifference(character.gold, goldThreshold) : goldTransferAmount);
  }
}

function sendItemsToMerchant() {
  if (character.esize === 42) return; //empty inventory
  for (var index in character.items) {
    if (character.items[index] && parent.G.items[character.items[index].name].type !== c.ItemTypes.Potion) {
      if (character.items[index].q) {
        send_item(c.Characters.Merchant, index, character.items[index].q);
      } else {
        send_item(c.Characters.Merchant, index);
      }
    }
  }
}

function getNumberOfPotions() {
  let numberOfPotions = 0;
  numberOfPotions =  quantity("hpot0") + quantity("hpot1")+ quantity("mpot0") + quantity("mpot1");
  /*
  if (character.esize === 42) return numberOfPotions; //empty inventory (esize=empty inventory slots)
  for (var index in character.items) {
    if (character.items[index] && parent.G.items[character.items[index].name].type === ItemTypes.Potion) {
      numberOfPotions++;
    }
  }
  */
  return numberOfPotions;
}
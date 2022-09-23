console.log(character.name + " merchant starting");
var c = require('./CODE/ALBots/constants');
c.mycharacter.spsParentScope = this;



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

c.mycharacter.spsCurrActionFn.push('c.goToTown');


console.log(character.name + " merchant starting");

setInterval(function doMerchantStuff() {


  if (character.rip) {
    set_message('Char RIP');
    oldLocation = { x: character.real_x, y: character.real_y, map: character.map };
    setTimeout(respawn(), 15000);
    justRespawned = true;
    return 1;
  }
  if (justRespawned) {
    console.log(character.name + ' RespawnMoveOldLoc');
    smart_move(oldLocation);
    justRespawned = false;
    oldLocation = {};
  }

  if (is_moving(character)) return;

  c.partyHandler();
  c.checkHealthAndManaPotionsInInventory();
  c.restoreHealthOrMana();


  if (c.mycharacter.spsCurrActionFn[0]) {
    console.log('ev:' + c.mycharacter.spsCurrActionFn[0] + " " + c.mycharacter.spsCurrStatus);
    eval(c.mycharacter.spsCurrActionFn[0] + '()');
  }
  else {
    set_message("noActionFN");
  }



}, 1000 / 4); //loop every 5 seconds




function goToPotionsSellGarabge() {
  if (!is_moving(character)) {

    if (character.real_x !== 56 && character.real_y !== -122) {
      console.log(character.name + " go to potions");
      smart_move({ to: "potions",map:"main" });
    }
    else {
      console.log(character.name + " sell garbage");
      sellGarbage();
      c.mycharacter.spsCurrActionFn.shift();
    }

  }


}

function goWithdrawMoney() {
  if (needMoney() && !is_moving(character)) {
    console.log(character.name + " go to bank (withdraw money)");
    set_message("BankWithdraw");
    smart_move({ to: "bank" }, function () { withdrawMoney(); c.mycharacter.spsCurrActionFn.shift(); });
  } else if (!needMoney()) {
    set_message("DoNotNeedMoney");
    c.mycharacter.spsCurrActionFn.shift();
  }
}

function doBuyPotions() {
  if (needPotions() && !is_moving(character)) {
    if (character.real_x !== 56 && character.real_y !== -122) {
      console.log(character.name + " go to potions 2");
      smart_move({ to: "potions" });
    }
    else {
      console.log(character.name + " buy potions");
      buyPotions();
      c.mycharacter.spsCurrActionFn.shift();
    }
    return;
  }
  else if (!needPotions()) {
    c.mycharacter.spsCurrActionFn.shift();
  }
}

function doDepositItems() {
  if (!is_moving(character)) {
    console.log(character.name + " go to bank 2");
    smart_move({ to: "bank" }, function () { depositGold(); depositItems(); c.mycharacter.spsCurrActionFn.shift(); ignoreMoveCM = 0; });
  }
}

function needMoney() {
  return character.gold < 300000;
}

function withdrawMoney() {
  bank_withdraw(c.getDifference(character.gold, 300000));
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
    console.log(character.name + ' buy hpot0');
    buy("hpot0", c.getDifference(quantitySmallHP, 600));
  }
  if (quantityBigHP - 600 < 0) {
    console.log(character.name + ' buy hpot0');
    buy("hpot1", c.getDifference(quantityBigHP, 600));
  }
  if (quantitySmallMP - 600 < 0) {
    console.log(character.name + ' buy hpot0');
    buy("mpot0", c.getDifference(quantitySmallMP, 600));
  }
  if (quantityBigMP - 600 < 0) {
    console.log(character.name + ' buy hpot0');
    buy("mpot1", c.getDifference(quantityBigMP, 600));
  }
}

function deliverPotions() {
  Object.values(potions).forEach(function (member) {
    if (get_player(member.name)) {
      console.log(character.name + ' deliver potions (send_item):' + member.name);
      if (member.inventory.hpot0.q != -1 && member.inventory.hpot0.q - 200 < 0 && getItemSlot("hpot0") != -1) send_item(member.name, getItemSlot("hpot0"), c.getDifference(member.inventory.hpot0.q, 200));
      if (member.inventory.hpot1.q != -1 && member.inventory.hpot1.q - 200 < 0 && getItemSlot("hpot1") != -1) send_item(member.name, getItemSlot("hpot1"), c.getDifference(member.inventory.hpot1.q, 200));
      if (member.inventory.mpot0.q != -1 && member.inventory.mpot0.q - 200 < 0 && getItemSlot("mpot0") != -1) send_item(member.name, getItemSlot("mpot0"), c.getDifference(member.inventory.mpot0.q, 200));
      if (member.inventory.mpot1.q != -1 && member.inventory.mpot1.q - 200 < 0 && getItemSlot("mpot1") != -1) send_item(member.name, getItemSlot("mpot1"), c.getDifference(member.inventory.mpot1.q, 200));
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
  send_cm([c.Characters.Warrior, c.Characters.Mage, c.Characters.Ranger], "askPotions");
}

function on_cm(name, data) {
  var ignoreMoveCM = 0;
  if (c.mycharacter.spsCurrActionFn[0]) ignoreMoveCM = 1; // we dont want to move and will ignore the VM's that trigger movement (every 60 seconds if we are currently busy with functions)
  console.log(character.name + ' CM:' + name + ' ' + JSON.stringify(data));
  if (name === c.Characters.Warrior || name === c.Characters.Mage || name === c.Characters.Ranger || name === c.Characters.Merchant) {
    console.log(character.name + ' distance:' + parent.distance({ x: data.x - 1, y: data.y - 1, map: data.map }, character));
    if (!is_moving(character) && !get_player(name) && "x" in data && ignoreMoveCM == 0) {
      console.log(character.name + ' MoveTo ' + name);
      atParty = 0;
      smart_move({ x: data.x - 5, y: data.y - 5, map: data.map }, function () { askForPotions(); useLuck(); atParty = 1; }); // moving to x,y (-1) so that we are not standing on the same square and taking damage
    }
    if ("potions" in data && !is_moving(character)) {
      potions[name] = data.potions;
      deliverPotions();
      // at this point they gave us everything and we can return to town  (TODO: will need to adjust this for multiple c.Characters)
      if (atParty == 1) {
        c.mycharacter.spsCurrActionFn.push('c.goToTown');
        c.mycharacter.spsCurrActionFn.push('goToPotionsSellGarabge');  // if we are at the party time to go to town
        c.mycharacter.spsCurrActionFn.push('goWithdrawMoney');
        c.mycharacter.spsCurrActionFn.push('doBuyPotions');
        c.mycharacter.spsCurrActionFn.push('doDepositItems');
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
    if (parent.G.items[character.items[item].name].type === c.ItemTypes.Potion) continue;
    bank_store(item);
  }
}

/**
 * When you sense danger, you know what to do...
 */
function useCourage() {
  use_skill(c.Merchantkills.Courage.name);
  lastUse_Courage = new Date();
}

/**
 * Buff a target to increase their luck. 2% chance for you to receive a duplicate of their looted items!
 */
function useLuck() {
  let partyMembers = c.getPartyMembers();

  partyMembers = Object.values(partyMembers).filter(char =>
    parent.distance(char, character) <= c.Merchantkills.Luck.range
  );
  partyMembers.forEach(function (member) {
    c.actionText(parent.G.skills[c.Merchantkills.Luck.name].name, c.colorGreen);
    use_skill(c.Merchantkills.Luck.name, member.name);
    console.log(character.name + " Used " + parent.G.skills[c.Merchantkills.Luck.name].name + " on " + member.name, c.colorGreen);
    lastUse_Luck = new Date();
  });
}

/**
 * Terrified? Just throw whatever you can find at your opponent!
 */
function useThrowStuff(target) {
  use_skill(c.Merchantkills.ThrowStuff.name, target);
  lastUse_ThrowStuff = new Date();
}

function canUseCourage() {
  return (mssince(lastUse_Courage) > c.Merchantkills.Courage.cd && character.level >= c.Merchantkills.Courage.level);
}

function canUseLuck() {
  return (mssince(lastUse_Luck) > c.Merchantkills.Luck.cd && character.level >= c.Merchantkills.Luck.level);
}

function canUseThrowStuff() {
  return (mssince(lastUse_ThrowStuff) > c.Merchantkills.ThrowStuff.cd && character.level >= c.Merchantkills.ThrowStuff.level);
}

add_bottom_button(99, "Sell Items", function () {
  let i = prompt("Ab Slot#", 5);
  for (i; i < 42; i++) {
    sell(i);
  }
});
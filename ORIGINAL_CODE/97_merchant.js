let spsMerchantLoaded = 1;
if (typeof spsMasterLoaded === 'undefined' || !spsMasterLoaded) load_code(1); //load the master code

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
  else
  {
    set_message("noActionFN");
  }

  

  function goToPotionsSellGarabge() {
    if (!is_moving(character))
    {
    
      if (character.real_x !== 56 && character.real_y !== -122) {
        game_log("go to potions");
        smart_move({ to: "potions" });
      }
      else
      {
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
      smart_move({ to: "bank" }, function () { withdrawMoney(); mycharacter.spsCurrActionFn.shift();  });
    } else if (!needMoney())
    {
      set_message("DoNotNeedMoney");
      mycharacter.spsCurrActionFn.shift();
    }
  }

  function doBuyPotions() {
    if (needPotions() && !is_moving(character)) {
      if (character.real_x !== 56 && character.real_y !== -122) {
        game_log("go to potions 2");
        smart_move({ to: "potions"});
      }
      else
      {
        game_log("buy potions");
        buyPotions(); 
        mycharacter.spsCurrActionFn.shift();
      }
      return;
    }
    else if (!needPotions())
    {
      mycharacter.spsCurrActionFn.shift();
    }
  }

  function doDepositItems() {
    if (!is_moving(character)) {
      game_log("go to bank 2");
      smart_move({ to: "bank" }, function () { depositGold(); depositItems(); mycharacter.spsCurrActionFn.shift(); ignoreMoveCM=0; });
    }
  }

}, 1000 / 4); //loop every 5 seconds

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
      game_log('deliver potions (send_item):'+member.name);
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
  var ignoreMoveCM=0;
  if (mycharacter.spsCurrActionFn[0])  ignoreMoveCM=1; // we dont want to move and will ignore the VM's that trigger movement (every 60 seconds if we are currently busy with functions)
  game_log('CM:'+name+' '+JSON.stringify(data));
  if (name === Characters.Warrior || name === Characters.Mage || name === Characters.Ranger || name === Characters.Merchant) {
    game_log('distance:' + parent.distance({ x: data.x - 1, y: data.y - 1, map: data.map }, character));
    if (!is_moving(character) && !get_player(name) && "x" in data && ignoreMoveCM==0) {
      game_log('MoveTo ' + name);
      atParty=0;
      smart_move({ x: data.x-5, y: data.y-5, map: data.map }, function () { askForPotions(); useLuck(); atParty=1;}); // moving to x,y (-1) so that we are not standing on the same square and taking damage
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
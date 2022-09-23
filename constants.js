const colorGreen = "#1ED97C";
const colorWhite = "#EFF6FF";
const colorShading = "#909CC0";
const colorNavy = "#1C222B";
module.exports.colorGreen = colorGreen;
module.exports.colorWhite = colorWhite;
module.exports.colorShading = colorShading;
module.exports.colorNavy = colorNavy;


var mycharacter = [];
resetVars();
module.exports.mycharacter = mycharacter;

function resetVars() {
    mycharacter = [];
    mycharacter.spsCurrActionFn = [];
    mycharacter.spsCurrStatus = [];
    mycharacter.spsCurrStatus['fightGoo'] = '';
    mycharacter.spsCurrStatus['goToTown'] = '';
    mycharacter.spsCurrStatus['goToGoo'] = '';
    mycharacter.spsCurrStatus['checkRecoverHPMP'] = '';
    mycharacter.spsCurrStatus['errorState'] = '';
    mycharacter.spsParentScope=null;
    mycharacter.lastPotion = new Date(0);
}
module.exports.resetVars = resetVars;

let healthPotion = 50;
let manaPoition = 100;
let healthThreshold = 0.5;
let manaThreshold = 0.3;
module.exports.healthPotion = healthPotion;
module.exports.manaPoition = manaPoition;
module.exports.healthThreshold = healthThreshold;
module.exports.manaThreshold = manaThreshold;


function restoreHealthOrMana() {
    if (mycharacter.spsParentScope.safeties && mycharacter.spsParentScope.mssince(mycharacter.lastPotion) < 600) return;
    var used = false;
    if (new Date() < mycharacter.spsParentScope.parent.next_potion) return;
    used = useHealthPotion(mycharacter.spsParentScope.character);
    if (!used) used = useManaPotion(mycharacter.spsParentScope.character);
    if (used) mycharacter.lastPotion = new Date();
}
module.exports.restoreHealthOrMana = restoreHealthOrMana;

function useHealthPotion() {
    if (
        (getDifference(mycharacter.spsParentScope.character.max_hp, mycharacter.spsParentScope.character.hp) >= healthPotion && isAbovePercent(mycharacter.spsParentScope.character.mp, mycharacter.spsParentScope.character.max_mp, manaThreshold)) // we have enough mana and could heal so go ahead and heal
        || isBelowPercent(mycharacter.spsParentScope.character.hp, mycharacter.spsParentScope.character.max_hp, healthThreshold)  //  OR (override) we are getting low on health so heal!
    ) {
        mycharacter.spsParentScope.use_skill("use_hp", mycharacter.spsParentScope.character);
        return true;
    }
    return false;
}
module.exports.useHealthPotion = useHealthPotion;

function useManaPotion() {
    if (getDifference(mycharacter.spsParentScope.character.max_mp, mycharacter.spsParentScope.character.mp) >= manaPoition) {
        mycharacter.spsParentScope.use_skill("use_mp", mycharacter.spsParentScope.character);
        return true;
    }
    return false;
}
module.exports.useManaPotion = useManaPotion;


function setPotionValues(type, amount) {
    if (type === "hp") {
        if (mycharacter.spsParentScope.character.max_hp < amount) return;
        healthPotion = amount;
    } else if (type === "mp") {
        if (mycharacter.spsParentScope.character.max_mp < amount) return;
        manaPoition = amount;
    }
}
module.exports.setPotionValues = setPotionValues;


function getPotionsInInventory() {
    return Object.values(mycharacter.spsParentScope.character.items).filter(item =>
        item &&
        mycharacter.spsParentScope.parent.G.items[item.name].type === "pot"
    );
}
module.exports.getPotionsInInventory = getPotionsInInventory;

function checkHealthAndManaPotionsInInventory() {
    let found = false;
    let potions = getPotionsInInventory();
    Object.values(potions).map(potion => {
        let itemStats = mycharacter.spsParentScope.parent.G.items[potion.name].gives;
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
module.exports.checkHealthAndManaPotionsInInventory = checkHealthAndManaPotionsInInventory;

function partyHandler() {
    if (mycharacter.spsParentScope.parent.isPartyLeader) {
        console.log(mycharacter.spsParentScope.character.name + ' I am party leader, creating party');
        createParty();
    } else {
        if (mycharacter.spsParentScope.character.party && mycharacter.spsParentScope.character.party !== "codedev") {
            leaveParty(); console.log(mycharacter.spsParentScope.character.name + ' Invalid party, leaving party!');
        }
    }
}
module.exports.partyHandler = partyHandler;

function createParty() {
    let party = [Characters.Warrior, Characters.Mage, Characters.Ranger, Characters.Merchant];
    console.log(mycharacter.spsParentScope.character.name + ' creating party');
    for (let index in party) {
        if (party[index] === "codedev") continue;
        if (!mycharacter.spsParentScope.parent.party[party[index]]) send_party_invite(party[index]);
    }
}
module.exports.createParty = createParty;

function leaveParty() {
    mycharacter.spsParentScope.parent.socket.emit("party", { event: "leave" });
}
module.exports.leaveParty = leaveParty;


function getPartyMembers() {
    return Object.values(mycharacter.spsParentScope.parent.entities).filter(char =>
        mycharacter.spsParentScope.is_character(char) && !char.rip &&
        char.party && char.party === mycharacter.spsParentScope.character.party);
}
module.exports.getPartyMembers = getPartyMembers;




function actionText(text, color) {
    mycharacter.spsParentScope.parent.d_text(text, mycharacter.spsParentScope.character, { color: color });
}
module.exports.actionText = actionText;

function goToTown() {
    mycharacter.spsParentScope.use_skill("use_town");
    mycharacter.spsCurrActionFn.shift();
}
module.exports.goToTown = goToTown;

function getDifference(a, b) {
    return Math.abs(a - b);
}
module.exports.getDifference = getDifference;

function isBelowPercent(current, max, percentage) {
    return current / max < percentage;
}
module.exports.isBelowPercent = isBelowPercent;

function isAbovePercent(current, max, percentage) {
    return current / max > percentage;
}
module.exports.isAbovePercent = isAbovePercent;

function roundBy(a, b) {
    return Math.round(a / b) * b;
}
module.exports.roundBy = roundBy;

function roundDownBy(a, b) {
    return Math.floor(a / b) * b;
}
module.exports.roundDownBy = roundDownBy;

function roundUpBy(a, b) {
    return Math.ceil(a / b) * b;
}
module.exports.roundUpBy = roundUpBy;

var Characters;
(function (Characters) {
    Characters["Warrior"] = "codedevW";
    Characters["Mage"] = "codedev";
    Characters["Ranger"] = "codedevR";
    Characters["Merchant"] = "codedevB";
})(Characters || (Characters = {}));
module.exports.Characters = Characters;

var CharacterTypes;
(function (CharacterTypes) {
    CharacterTypes["Mage"] = "mage";
    CharacterTypes["Merchant"] = "merchant";
    CharacterTypes["Priest"] = "priest";
    CharacterTypes["Ranger"] = "ranger";
    CharacterTypes["Rogue"] = "rogue";
    CharacterTypes["Warrior"] = "warrior";
})(CharacterTypes || (CharacterTypes = {}));
module.exports.CharacterTypes = CharacterTypes;

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
module.exports.ItemTypes = ItemTypes;

var JewelryTypes;
(function (JewelryTypes) {
    JewelryTypes["Amulet"] = "amulet";
    JewelryTypes["Earring"] = "earring";
    JewelryTypes["Orb"] = "orb";
    JewelryTypes["Ring"] = "ring";
})(JewelryTypes || (JewelryTypes = {}));
module.exports.JewelryTypes = JewelryTypes;

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
module.exports.ArmorTypes = ArmorTypes;

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
module.exports.WeaponTypes = WeaponTypes;

var DamageTypes;
(function (DamageTypes) {
    DamageTypes["Heal"] = "heal";
    DamageTypes["Magical"] = "magical";
    DamageTypes["Physical"] = "physical";
})(DamageTypes || (DamageTypes = {}));
module.exports.DamageTypes = DamageTypes;

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
module.exports.MageSkills = MageSkills;

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
module.exports.Merchantkills = Merchantkills;

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
module.exports.PriestSkills = PriestSkills;

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
module.exports.RangerSkills = RangerSkills;

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
module.exports.RogueSkills = RogueSkills;

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
module.exports.WarriorSkills = WarriorSkills;
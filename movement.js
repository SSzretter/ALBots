var c = require('./constants');

function fastTravelTown() {
    console.log("fastTravelTown");
    use_skill("use_town");
}

function travelTo(destination, destinationInTown) {
    game_log(character.name + ' trav:' + destination);
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
    console.log(c.mycharacter.spsCurrStatus);
    if (c.mycharacter.spsCurrStatus['goToTown'] === '') // blank = go to town
    {
        console.log('gt:' + c.mycharacter.spsCurrStatus['goToTown']);
        c.mycharacter.spsCurrStatus['goToTown'] = 'goingToTown';
        console.log("goingToTown");
        (async () => {
            result = await globalThis.town()
            if (result['success'] == true) {
                c.mycharacter.spsCurrStatus['goToTown'] = 'atTown';
            }
            else
                errorState(result);
        })();
    }
    else if (c.mycharacter.spsCurrStatus['goToTown'] == 'atTown') {
        console.log('at:' + c.mycharacter.spsCurrStatus['goToTown']);
        c.mycharacter.spsCurrActionFn.shift();
        console.log(c.mycharacter.spsCurrActionFn);
        c.mycharacter.spsCurrStatus['goToTown'] = '';
    }
    else if (c.mycharacter.spsCurrStatus['goToTown'] == 'goingToTown') {
        console.log('gtt:' + c.mycharacter.spsCurrStatus['goToTown']);
    }

}


function walkHalfwayToTarget(target) {
    game_log(character.name + ' walk halfway to target');
    move(
        character.x + (target.x - character.x) / 2,
        character.y + (target.y - character.y) / 2
    );
}


function walkToTargetWithinAttackRange(target) {
    //TODO: walk towards target to hit it (useful for ranged chars)
    //character.range
    game_log(character.name + ' walk to target within range');
    move(
        character.x + (target.x - character.x) / 2,
        character.y + (target.y - character.y) / 2
    );
}

module.exports.fastTravelTown = fastTravelTown;
module.exports.travelTo = travelTo;
module.exports.goToTown = goToTown;
module.exports.walkHalfwayToTarget = walkHalfwayToTarget;
module.exports.walkToTargetWithinAttackRange = walkToTargetWithinAttackRange;

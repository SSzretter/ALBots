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
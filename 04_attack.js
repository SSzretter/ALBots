function attackMonster(monster) {
  if (!parent.attackActive || character.rip || is_moving(character)) return;

  let target = getTargetMonster(monster);
  if (!target) {
    set_message("No Monsters");
    return;
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
    if(isAbovePercent(character.mp, character.max_mp, manaThreshold)) // only target a monster if we have enough mp, otherwise wait and recover mp
      target = get_nearest_monster(monster);
    if (target) change_target(target);
  }
  return target;
}

function attackingMonster(monster) {
  
  useCombatSkills(monster);
  
  attack(monster);
}
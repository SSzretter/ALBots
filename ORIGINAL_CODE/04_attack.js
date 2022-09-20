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
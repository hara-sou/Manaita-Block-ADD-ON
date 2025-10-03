import { world, EquipmentSlot } from "@minecraft/server";

world.afterEvents.entityHurt.subscribe(ev => {
  const entity = ev.damageSource.damagingEntity;
  if (!(ev.hurtEntity.typeId === "minecraft:player")) return;

  const player = ev.hurtEntity;
  const equippable = player.getComponent("minecraft:equippable");
  const chest = equippable.getEquipment(EquipmentSlot.Chest);

  if (chest && chest.typeId === "hraddons:manaita_chest_knockback") {
    player.clearVelocity();
  }
});






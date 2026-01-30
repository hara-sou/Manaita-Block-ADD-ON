import { world, ItemStack, Player } from "@minecraft/server";

world.afterEvents.itemUse.subscribe((event) => {
    const { source, itemStack, block } = event;

    // デバッグログ（ここで block は使える）
    console.warn("useOn:", block?.typeId);

    // プレイヤー以外は無視
    if (!(source instanceof Player)) return;

    // ブロックがない場合は無視
    if (!block) return;

    // 特定のアイテムのみ反応
    if (itemStack?.typeId !== "minecraft:stick") return;

    const blockId = block.typeId;

    // ブロックを2個追加
    const blockItem = new ItemStack(blockId, 2);

    const inventory = source.getComponent("inventory");
    inventory.container.addItem(blockItem);
});

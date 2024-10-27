import { ItemStack, world, } from "@minecraft/server";

//種類確認
world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    const blockMultipliers = {
        "manaita:block_wood": 2,
        "manaita:block_stone": 4,
        "manaita:block_iron": 8,
        "manaita:block_gold": 16,
        "manaita:block_diamond": 32,
        "manaita:block_netherite": 64
    };

    // 増やさないアイテムのリスト
    const excludedItems = [
        "minecraft:bedrock", 
        "minecraft:end_portal_frame",     
        "minecraft:command_block",
        "minecraft:chain_command_block",
        "minecraft:repeating_command_block",
        "minecraft:barrier",
        "minecraft:fire",
        "minecraft:soul_fire"       
    // 他に追加したいアイテムがあればここに追加
];

//本体
initEvent.blockComponentRegistry.registerCustomComponent("manaita:block", {
    onEntityFallOn: (event) => {
        const { entity, block } = event;
        const multiplier = blockMultipliers[block?.typeId];
        if (multiplier && entity.hasComponent("minecraft:item")) {
            const itemStack = entity.getComponent("minecraft:item").itemStack;
            if (excludedItems.includes(itemStack.typeId)) {
                return;  
            }
            const doubledItem = new ItemStack(itemStack.typeId, itemStack.amount * multiplier);
            entity.dimension.spawnItem(doubledItem, entity.location);
        }
    }
});
});
/*
バージョンアップデートメモ
　バージョン1.2.0βアップデート
　　・
 */
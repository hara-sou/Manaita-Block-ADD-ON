import { ItemStack, world, } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    const blockMultipliers = {
        "manaita:block_wood": 2,
        "manaita:block_stone": 4,
        "manaita:block_iron": 8,
        "manaita:block_gold": 16,
        "manaita:block_diamond": 32,
        "manaita:block_netherite": 64
    };

    initEvent.blockComponentRegistry.registerCustomComponent("manaita:block", {
        onEntityFallOn: (event) => {
            const { entity, block } = event;
            const multiplier = blockMultipliers[block?.typeId];

            if (multiplier && entity.hasComponent("minecraft:item")) {
                const itemStack = entity.getComponent("minecraft:item").itemStack;
                const doubledItem = new ItemStack(itemStack.typeId, itemStack.amount * multiplier);
                entity.dimension.spawnItem(doubledItem, entity.location);
            }
        }
    });
});

/*
バージョンアップデートメモ
 */
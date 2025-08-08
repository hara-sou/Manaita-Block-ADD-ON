// scripts/blocks.js
import { ItemStack, system } from "@minecraft/server";
import { incBlk } from "./incBlk";
import { noIncItems } from "./noIncItems";

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    if (!blockComponentRegistry) {
        console.warn("[hraddons] blockComponentRegistry is undefined. Custom components not registered.");
        return;
    }

    blockComponentRegistry.registerCustomComponent("hraddons:manaita_blocks", {
        onEntityFallOn: ({ entity, block }) => {
            if (
                !entity ||
                !block ||
                !incBlk[block.typeId] ||
                !entity.hasComponent("minecraft:item")
            ) return;

            const { itemStack } = entity.getComponent("minecraft:item");
            if (!itemStack || noIncItems.includes(itemStack.typeId)) return;

            entity.dimension.spawnItem(
                new ItemStack(itemStack.typeId, itemStack.amount * incBlk[block.typeId]),
                entity.location
            );
        }
    });
});

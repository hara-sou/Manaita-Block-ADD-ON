import { ItemStack, system } from "@minecraft/server";
import { incBlk, noIncItems } from "./const";

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

            const totalAmount = itemStack.amount * incBlk[block.typeId];
            const maxStackSize = itemStack.getMaxStackSize?.() ?? 64;
            const spawnLocation = {
                x: block.location.x + 0.5,
                y: block.location.y + 0.5,
                z: block.location.z + 0.5
            };

            let remaining = totalAmount;
            while (remaining > 0) {
                const spawnAmount = Math.min(remaining, maxStackSize);

                for (let i = 0; i < spawnAmount; i++) {
                    const cloned = itemStack.clone();
                    cloned.amount = 1;
                    entity.dimension.spawnItem(cloned, spawnLocation);
                }

                remaining -= spawnAmount;
            }
        }
    });
});

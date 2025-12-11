export const incBlk = {
    "hraddons:manaita_block_wooden": 2,
    "hraddons:manaita_block_stone": 4,
    "hraddons:manaita_block_iron": 8,
    "hraddons:manaita_block_golden": 16,
    "hraddons:manaita_block_diamond": 32,
    "hraddons:manaita_block_emerald": 64,
    "hraddons:manaita_block_netherite": 128
    // incBlk = Increased number of blocks の短略化
    // ブロックによって増えるアイテムの数
};

export const noIncItems = [
    "minecraft:bedrock",
    "minecraft:end_portal_frame",
    "minecraft:command_block",
    "minecraft:chain_command_block",
    "minecraft:repeating_command_block",
    "minecraft:barrier",
    "minecraft:fire",
    "minecraft:soul_fire"
    // noIncItems = Items that cannot be increased の短略化
    // 増やせないアイテムを管理する
    // リスト内のアイテムを検知すると止まる
];
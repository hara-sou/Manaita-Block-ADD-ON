import {world} from "@minecraft/server";
import {ActionFormData} from "@minecraft/server-ui";

function show_main_form(player){
    const form = new ActionFormData();
    form.title("まな板ブロックアドオン 取扱説明書");
    form.button("まな板ブロック", "textures/blocks/wooden/manaita_block_wooden_side");
    form.button("まな板ツール", "textures/items/equipment/manaita_axe");
    form.button("まな板防具", "textures/items/armor/manaita_helmet");
    form.button("追加アイテム", "textures/items/items/manaita_material");
    form.button("アドオン情報");
    form.show(player).then((response) => {
        switch(response.selection){
            case 0:
                show_block_form(player);
                break;
            case 1:
                show_tool_form(player);
                break;
            case 2:
                show_armor_form(player);
                break;
            case 3:
                show_item_form(player);
                break;
            case 4:
                show_a_form(player);
                break;
        }
    }).catch(error =>
        player.sendMessage("An error occurred: " + error.message)
    );
}

function show_block_form(player){
    const form = new ActionFormData();
    form.title("まな板ブロックについて");
    form.body(
        "ブロックの上にアイテムをドロップすることでアイテムを増やします\n増やせる数はブロックの素材によって変わります\n\n木材: 2\n石: 4\n鉄: 8\n金: 16\nダイヤモンド: 32\nエメラルド: 64\nネザライト: 128"
    );
    form.button("戻る");
    form.show(player).then((response) => {
        if(response.selection === 0){
            show_main_form(player);
        }
    });
}

function show_tool_form(player){
    const form = new ActionFormData();
    form.title("まな板ツールについて");
    form.body(`
まな板の剣
　攻撃力: 255
　エンチャント: 可能
　メインハンドに装備している間,
　攻撃力上昇のエフェクトが付与されます
　適正ツールが剣のブロックを
　即座に破壊します

まな板の斧
　攻撃力: 255
　エンチャント: 可能
　適正ツールが斧のブロックを
　即座に破壊します
　※樹皮や錆止めを剥がしたり、
　酸化段階を戻すことは出来ません

まな板のツルハシ
　攻撃力: 255
　エンチャント: 可能
　適正ツールがツルハシのブロックを
　即座に破壊します

まな板のシャベル
　攻撃力: 255
　エンチャント: 可能
　適正ツールがシャベルのブロックを
　即座に破壊します
　※ブロックを土の道にすることは
　　出来ません

まな板のクワ
　攻撃力: 255
　エンチャント: 可能
　適正ツールがクワのブロックを
　即座に破壊します
　※ブロックを耕すことは出来ません

まな板のパクセル
　攻撃力: 255
　エンチャント: 可能(ツルハシ)
　サバイバルで破壊可能なブロックを
　即座に破壊します
　メインハンドに装備している間、
　常時攻撃力上昇が付与されます
        `);
    form.button("戻る");
        form.show(player).then((response) => {
        if(response.selection === 0){
            show_main_form(player);
        }
    });
}

function show_armor_form(player){
    const form =new ActionFormData();
    form.title("まな板防具について");
    form.body(`
まな板のヘルメット
　装備している間、水中呼吸・暗視が
　付与されます
　※暗視を10秒付与している関係上、
　装備を外しても少しの間暗視が継続します

まな板のチェストプレート
　装備している間、耐性・火炎耐性が
　付与されます
　クラフトでノックバック無効化と
　組み合わせることでノックバックを
　無効化するチェストプレートに
　変化させることができます

まな板のレギンス
　装備している間、跳躍力・透明化が
　付与されます

まな板のブーツ
　装備している間、移動速度上昇が付与され
　常時満腹度が回復します
        `);
    form.button("戻る");
    form.show(player).then((response) => {
        if(response.selection === 0){
            show_main_form(player);
        }
    });
}

function show_item_form(player){
    const form =new ActionFormData();
    form.title("追加アイテムについて");
    form.body(`
ノックバック無効化
　まな板のチェストプレートを
　ノックバック無効化にするために必要です

マナ
　このアドオンで追加されたアイテムを
　クラフトするために使います

まな板のXPカード
　オフハンドに装備している間、
　常時経験値が付与されます
        `);
    form.button("戻る");
    form.show(player).then((response) => {
        if(response.selection === 0){
            show_main_form(player);
        }
    });
}

function show_a_form(player){
    const form = new ActionFormData();
    form.title("アドオン情報");
    form.body(`
アドオンバージョン:v3.5.3
リリース日:2026/01/30
制作:はらそう
GitHub:
 https://github.com/hara-sou/Manaita-Block-ADD-ON
Discord:
 https://discord.gg/tEaYFt8gHK
        `);
    form.button("戻る");
    form.show(player).then((response) => {
        if(response.selection === 0){
            show_main_form(player);
        }
    });
}

world.afterEvents.itemUse.subscribe(ev => {
    if(ev.itemStack.typeId == "hraddons:manaita_operating_instructions"){
        let player = ev.source;
        show_main_form(player);
    }
});
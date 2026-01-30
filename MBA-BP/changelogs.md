## v3.5.3 - v2026.01.30

* アイテムの増加式を変更
  前:totalAmount = itemStack.amount \* incBlk\[block.typeId];
  後:totalAmount = 2 \*\* incBlk\[block.typeId];
* 式変更によりconfigの数値を変更
  前:2,4,8,16...
  後:1,2,3,4...
  元のまな板MODがn^2式に増えていくのでそれに合ったような計算で増えるように変更
* まな板のXPカードで付与される経験値の値を変更
* まな板ブロックアドオン 取り扱い説明書を追加

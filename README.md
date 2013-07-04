typing
======

Typing.js
javascriptで簡単にタイピングゲームのようなものを実現するライブラリ
ie9, ie10, chrome, firefoxでの動作を確認しました


Typing.register(string)
stringに問題文を指定する
使用できる文字はひらがな,一部記号

Typing.answer(char)
1文字回答する正解していた場合はtrue,間違っていた場合はfalseを返す

Typing.getQuestion()
変換された文字列を返す

Typing.getOriginalQuestion()
registerで設定された文字列を返す

Typing.getAbsoluteAnswered()
今まで何文字正解したかを返す(打キー数ではなく文字数, 「きゃ」なら2文字)

Typing.isFinish()
設定した問題を回答し終えている場合はtrueを返す

Typing.getFault()
answerで間違えていた回数を返す

使い方
var temp = new Typing();
temp.register("もんだい");
temp.answer("m");

詳細はsample.html参照

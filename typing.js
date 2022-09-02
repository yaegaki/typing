;(function (window) {
  var _Typing = window.Typing
    ? window.Typing
    : (window.Typing = function () {
        this.original = '' //問題文
        this.question = [] //問題文を変換したもの
        this.remainedQuestion = '' //残りの問題文
        this.length = 0 //問題文の文字数(this.question.length)
        this.answered = 0 //回答した文字数
        this.answeredString = '' //回答した文字
        this.absoluteAnswered = 0 //回答した絶対的文字数(っきゃ で3文字)
        this.currentIndex = 0 //現在回答している文字の何アルファベット目か
        this.currentArrayIndex = 0 //現在回答している文字のなん配列目か
        this.select = [] //複数ある回答のうち、どれを選択しているか
        this.fault = 0
        this.stringNum = [] //文字を構成する数のリスト
      })
  var _convertList = {
    あ: ['a'],
    い: ['i'],
    う: ['u', 'wu'],
    え: ['e'],
    お: ['o'],
    か: ['ka', 'ca'],
    き: ['ki'],
    く: ['ku'],
    け: ['ke'],
    こ: ['ko', 'co'],
    さ: ['sa'],
    し: ['shi', 'si', 'ci'],
    す: ['su'],
    せ: ['se', 'ce'],
    そ: ['so'],
    た: ['ta'],
    ち: ['chi', 'ti'],
    つ: ['tsu', 'tu'],
    て: ['te'],
    と: ['to'],
    な: ['na'],
    に: ['ni'],
    ぬ: ['nu'],
    ね: ['ne'],
    の: ['no'],
    は: ['ha'],
    ひ: ['hi'],
    ふ: ['fu', 'hu'],
    へ: ['he'],
    ほ: ['ho'],
    ま: ['ma'],
    み: ['mi'],
    む: ['mu'],
    め: ['me'],
    も: ['mo'],
    や: ['ya'],
    ゆ: ['yu'],
    よ: ['yo'],
    ら: ['ra'],
    り: ['ri'],
    る: ['ru'],
    れ: ['re'],
    ろ: ['ro'],
    わ: ['wa'],
    を: ['wo'],
    ん: ['nn', 'xn'],
    が: ['ga'],
    ぎ: ['gi'],
    ぐ: ['gu'],
    げ: ['ge'],
    ご: ['go'],
    ざ: ['za'],
    じ: ['zi', 'ji'],
    ず: ['zu'],
    ぜ: ['ze'],
    ぞ: ['zo'],
    だ: ['da'],
    ぢ: ['di'],
    づ: ['du'],
    で: ['de'],
    ど: ['do'],
    ば: ['ba'],
    び: ['bi'],
    ぶ: ['bu'],
    べ: ['be'],
    ぼ: ['bo'],
    ぱ: ['pa'],
    ぴ: ['pi'],
    ぷ: ['pu'],
    ぺ: ['pe'],
    ぽ: ['po'],
    ぁ: ['la', 'xa'],
    ぃ: ['li', 'xi'],
    ぅ: ['lu', 'xu'],
    ぇ: ['le', 'xe'],
    ぉ: ['lo', 'xo'],
    ゃ: ['lya', 'xya'],
    ゅ: ['lyu', 'xyu'],
    ょ: ['lyo', 'xyo'],
    ゎ: ['lwa', 'xwu'],
    っ: ['ltu', 'xtu'],
    ゐ: ['i', 'wyi'],
    ゑ: ['e', 'wye'],
    ヴ: ['vu'],
  }

  var _specificConvertList = {
    ゃ: ['ya', 'ha', 'a'],
    ゅ: ['yu', 'hu', 'u'],
    ょ: ['yo', 'ho', 'o'],
    ぁ: ['', 'ha', 'a'],
    ぃ: ['yi', 'hi', 'i'],
    ぅ: ['', 'hu', 'u'],
    ぇ: ['ye', 'he', 'e'],
    ぉ: ['', '', 'ho'],
  }

  function convert(char) {
    var result = _convertList[char]
    if (result) result = result.slice(0)
    return result
  }

  function specificConvert(char) {
    var result = _specificConvertList[char]
    if (result) result = result.slice(0)
    return result
  }

  /*
     きゃきゅきょなどの変換
     */
  function specificStringConvert(string) {
    var result = []
    switch (string[0]) {
      case 'き':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        result.push('k' + specificConvert(string[1])[0])
        break
      case 'し':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        result.push('s' + specificConvert(string[1])[0])
        if (string[1] != 'ぃ') result.push('s' + specificConvert(string[1])[1])
        break
      case 'ち':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        result.push('c' + specificConvert(string[1])[0])
        result.push('t' + specificConvert(string[1])[0])
        if (string[1] != 'ぃ') result.push('c' + specificConvert(string[1])[1])
        break
      case 'て':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        result.push('t' + specificConvert(string[1])[1])
        break
      case 'に':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        result.push('n' + specificConvert(string[1])[0])
        break
      case 'ひ':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        result.push('h' + specificConvert(string[1])[0])
        break
      case 'み':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        result.push('m' + specificConvert(string[1])[0])
        break
      case 'り':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        result.push('r' + specificConvert(string[1])[0])
        break
      case 'う':
        if (string[1] == 'ぃ' || string[1] == 'ぇ' || string[1] == 'ぉ')
          result.push('w' + specificConvert(string[1])[2])
        break
      case 'ふ':
        if (string[1] == 'ぁ' || string[1] == 'ぃ' || string[1] == 'ぇ')
          result.push('f' + specificConvert(string[1])[2])
        else if (string[1] == 'ぉ') result.push('fo')
        break
      case 'ぎ':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        result.push('g' + specificConvert(string[1])[0])
        break
      case 'じ':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        if (string[1] == 'ゃ' || string[1] == 'ゅ' || string[1] == 'ょ')
          result.push('j' + specificConvert(string[1])[2])
        result.push('z' + specificConvert(string[1])[0])
        result.push('j' + specificConvert(string[1])[0])
        break
      case 'ぢ':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        result.push('d' + specificConvert(string[1])[0])
        break
      case 'び':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        result.push('b' + specificConvert(string[1])[0])
        break
      case 'で':
        if (string[1] == 'ぁ' || string[1] == 'ぅ' || string[1] == 'ぉ') break
        result.push('d' + specificConvert(string[1])[1])
        break
      case 'ヴ':
        switch (string[1]) {
          case 'ぁ':
            result.push('va')
            break
          case 'ぃ':
            result.push('vi')
            result.push('vyi')
            break
          case 'ぅ':
            result.push('vu')
            break
          case 'ぇ':
            result.push('ve')
            result.push('vye')
            break
          case 'ぉ':
            result.push('vo')
            break
          case 'ゃ':
            result.push('vya')
            break
          case 'ゅ':
            result.push('vyu')
            break
          case 'ょ':
            result.push('vyo')
            break
        }
    }

    var str1 = convert(string[0])
    str1 = str1 ? str1 : []
    var str2 = convert(string[1])
    for (var i = 0; i < str1.length; i++) {
      for (var j = 0; j < str2.length; j++) {
        result.push([str1[i], str2[j]])
      }
    }

    return result
  }

  function checkContractedSounds(char) {
    switch (char) {
      case 'ぁ':
      case 'ぃ':
      case 'ぅ':
      case 'ぇ':
      case 'ぉ':
      case 'ゃ':
      case 'ゅ':
      case 'ょ':
        return true
      default:
        return false
    }
  }

  function toRoman(input) {
    input = input.replace(
      /[Ａ-Ｚａ-ｚ０-９！”＃＄％＆’（）＝～｜｛｝‘＊＋＿？＜＞、。￥；：」ー「＠＾－　]/g,
      function (s) {
        switch (s) {
          case '”':
            return '"'
          case '’':
            return "'"
          case '‘':
            return "'"
          case '、':
            return ','
          case '。':
            return '.'
          case '￥':
            return '\\'
          case '「':
            return '['
          case '」':
            return ']'
          case 'ー':
            return '-'
          case '　':
            return ' '
          default:
            return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
        }
      }
    )
    var result = []
    for (var i = 0; i < input.length; i++) {
      var temp
      while (input[i] == 'っ') {
        var next = convert(input[i + 1])
        if (
          next &&
          !input[i + 1].match(/[あ-お]/) &&
          !input[i + 1].match(/[な-の]/) &&
          !checkContractedSounds(next) &&
          input[i + 1] != 'ゎ'
        ) {
          temp = []
          if (checkContractedSounds(input[i + 2])) {
            next = specificStringConvert(input[i + 1] + input[i + 2])
            i++
          }
          for (var j = 0; j < next.length; j++) {
            if (typeof next[j] == typeof []) {
              var foo = []
              for (var k = 0; k < next[j].length; k++) {
                foo.push(k == 0 ? next[j][k][0] + next[j][k] : next[j][k])
              }
              temp.push(foo)
            } else {
              temp.push(next[j][0] + next[j])
            }
            var foo = convert('っ')
            var foo2 = []
            for (var k = 0; k < foo.length; k++) {
              if (typeof next[j] == typeof []) {
                foo2 = []
                foo2.push(foo[k])
                for (var l = 0; l < next[j].length; l++) {
                  foo2.push(next[j][l])
                }

                temp.push(foo2)
              } else {
                temp.push([foo[k], next[j]])
              }
            }
          }
          i++
          result.push(temp)
        } else {
          result.push(convert(input[i]))
        }
        i++
        if (i >= input.length) return result
      }
      var temp = convert(input[i])
      if (temp && checkContractedSounds(input[i + 1])) {
        temp = specificStringConvert(input[i] + input[i + 1])
        i++
      }
      result.push(temp ? temp : [input[i]])
    }
    return result
  }

  function calcStringNum(list) {
    var result = []
    var max = 0
    for (var i = 0; i < list.length; i++) {
      max = 0
      for (var j = 0; j < list[i].length; j++) {
        if (typeof list[i][j] == typeof []) {
          if (max < list[i][j].length) max = list[i][j].length
        } else {
          if (max < 1) max = 1
        }
      }
      result.push(max)
    }
    return result
  }

  function register(string) {
    this.original = string
    this.question = toRoman(string)
    this.answeredString = ''
    this.length = this.question.length
    this.select = []
    this.currentIndex = 0
    this.answered = 0
    this.currentArrayIndex = 0
    this.fault = 0
    this.stringNum = calcStringNum(this.question)
    this.absoluteAnswered = 0
    for (var i = 0; i < this.length; i++) {
      this.select.push(0)
    }
    this.remainedQuestion = this.getQuestion()
  }

  function deleteElement(array, deleteList) {
    var count = 0
    for (var i = 0; i < deleteList.length; i++) {
      array.splice(deleteList[i] - i, 1)
    }
  }

  /*
     配列のx番目までのlengthの合計
     */
  function arrayInnerLength(array, x) {
    var sum = 0
    for (var i = 0; i < x; i++) {
      sum += array[i].length
    }
    return sum
  }

  function answer(char, base) {
    if (!base) base = 0
    var temp = this.question[base]
    var correct = false
    var currentSelect = 0
    var deleteList = []
    if (temp[0] == 'nn' && this.currentIndex == 1 && this.question[1]) {
      this.currentIndex = 0
      if (char == 'n') {
        this.question.splice(0, 1)
        this.absoluteAnswered++
        this.answered++
        return true
      } else if (this.answer(char, 1)) {
        this.question.splice(0, 1)
        this.absoluteAnswered++
        this.answered++
        return true
      } else {
        this.currentIndex = 1
        this.fault++
        return false
      }
    }
    for (var i = 0; i < temp.length; i++) {
      if (typeof temp[i] == typeof []) {
        var currentArray = temp[i][this.currentArrayIndex]
        if (currentArray[this.currentIndex - arrayInnerLength(temp[i], this.currentArrayIndex)] == char) {
          if (!correct) {
            correct = true
            this.select[this.answered] = i
            currentSelect = i
            this.answeredString += char
          }

          if (this.currentIndex + 1 == arrayInnerLength(temp[i], temp[i].length)) {
            this.currentIndex = 0
            this.currentArrayIndex = 0
            this.absoluteAnswered += this.stringNum[this.answered]
            this.answered++
            this.question.splice(0, 1)
            return true
          }
        } else {
          deleteList.push(i)
        }
      } else {
        if (temp[i][this.currentIndex] == char) {
          if (!correct) {
            correct = true
            this.select[this.answered] = i
            currentSelect = i
            this.answeredString += char
          }

          if (this.currentIndex + 1 == temp[i].length) {
            this.currentIndex = 0
            this.currentArrayIndex = 0
            this.absoluteAnswered += this.stringNum[this.answered]
            this.answered++
            this.question.splice(0, 1)
            return true
          }
        } else {
          deleteList.push(i)
        }
      }
    }

    if (correct) {
      this.currentIndex++
      if (typeof temp[currentSelect] == typeof []) {
        if (this.currentIndex == arrayInnerLength(temp[currentSelect], this.currentArrayIndex + 1)) {
          this.currentArrayIndex++
          this.absoluteAnswered++
          this.stringNum[this.answered]--
        }
        if (this.currentIndex == arrayInnerLength(temp[currentSelect], temp[currentSelect].length)) {
          this.currentIndex = 0
          this.currentArrayIndex = 0
          this.answered++
          this.question.splice(0, 1)
        } else {
          deleteElement(temp, deleteList)
        }
      } else {
        if (this.currentIndex == temp[currentSelect].length) {
          this.currentIndex = 0
          this.currentArrayIndex = 0
          this.answered++
          this.question.splice(0, 1)
        } else {
          deleteElement(temp, deleteList)
        }
      }
      return true
    } else {
      this.fault++
      return false
    }
  }

  function isFinish() {
    if (this.answered == this.length) return true
    else return false
  }

  function getFault() {
    return this.fault
  }

  function getQuestion() {
    var result = ''
    for (var i = 0; i < this.length; i++) {
      if (!this.question[i]) continue
      if (typeof this.question[i] == typeof []) {
        for (var j = 0; j < this.question[i][0].length; j++) {
          result += this.question[i][0][j]
        }
      } else {
        result += this.question[i][0]
      }
    }
    return result
  }

  function getRemainedQuestion() {
    var result = this.getQuestion()
    return result.substr(this.currentIndex, result.length)
  }

  function getRemainedOriginalQuestion() {}

  function getAnsweredString() {
    return this.answeredString
  }

  function getOriginalQuestion() {
    return this.original
  }

  function getAbsoluteAnswered() {
    return this.absoluteAnswered
  }

  _Typing.prototype.register = register
  _Typing.prototype.answer = answer
  _Typing.prototype.isFinish = isFinish
  _Typing.prototype.getQuestion = getQuestion
  _Typing.prototype.getRemainedQuestion = getRemainedQuestion
  _Typing.prototype.getAnsweredString = getAnsweredString
  _Typing.prototype.getOriginalQuestion = getOriginalQuestion
  _Typing.prototype.getAbsoluteAnswered = getAbsoluteAnswered
  _Typing.prototype.getFault = getFault
})(window)

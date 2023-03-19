export namespace StringUtil {

  const EMOJI_REGEXP = new RegExp([
    '\ud83c[\udf00-\udfff]',
    '\ud83d[\udc00-\ude4f]',
    '\ud83d[\ude80-\udeff]',
    '\ud7c9[\ude00-\udeff]',
    '[\u2600-\u27BF]'
  ].join('|'));

  export function toHalfWidth(str: String): string {
    return str.replace(/[！-～]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0));
  }

  export function isEmote(str: string): boolean {
    if (!str) return false;
    str = this.cr(str).replace(/[\s\r\n]/g, '');
    return Array.from(str).length <= 3 && !/[「」]/.test(str) && (EMOJI_REGEXP.test(str) || /[$＄\\￥！？❕❢‽‼/!/?♥♪♬♩♫☺🤮❤️☠️]/.test(str)); 
  }

  export function cr(str: string): string {
    if (str == null || str == '') return '';
    let ret = '';
    let flg = '';
    [...str].forEach(c => {
      if (flg) {
        switch (c) {
          case 'n':
          case 'ｎ':
            ret += "\n";
            break;
          case '\\':
          case '￥':
            if (c == flg) {
              ret += c;
            } else {
              ret += (flg + c);
            }
            break;
          default:
            ret += (flg + c);
        }
        flg = '';
      } else if (c == '\\' || c == '￥') {
        flg = c;
      } else {
        ret += c;
      }
    });
    return ret + flg;
  }

  export function validUrl(url: string): boolean {
    if (!url) return false;
    try {
      new URL(url.trim());
    } catch (e) {
      return false;
    }
    return /^https?\:\/\//.test(url.trim());
  }

  export function sameOrigin(url: string): boolean {
    if (!url) return false;
    try {
      return (new URL(url)).origin === window.location.origin;
    } catch (e) {
      return false;
    }
  }

  export function escapeHtml(str) {
    if(typeof str !== 'string') {
      str = str.toString();
    }
    return str.replace(/[&'`"<>]/g, function(match){
      return {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
      }[match]
    });
  }

  export function rubyToHtml(str) {
    if(typeof str !== 'string') {
      str = str.toString();
    }
    return str.replace(/[\|｜]([^\|｜\s]+?)《(.+?)》/g, '<ruby>$1<rp>(</rp><rt>$2</rt><rp>)</rp></ruby>');
  }
  
  export function rubyToText(str) {
    if(typeof str !== 'string') {
      str = str.toString();
    }
    return str.replace(/[\|｜]([^\|｜\s]+?)《(.+?)》/g, '$1($2)');
  }

  export function aliasNameToClassName(aliasName: string) {
    switch(aliasName) {
      case 'character':
        return 'キャラクター';
      case 'cut-in':
        return 'カットイン';
      case 'dice-roll-table':
        return 'ダイスボット表';
      case 'terrain':
        return '地形';
      case 'table-mask':
        return 'マップマスク';
      case 'text-note':
        return '共有メモ';
      case 'card':
        return 'カード';
      case 'dice-symbol':
        return 'ダイスシンボル';
      case 'card-stack':
        return '山札';
      case 'game-table':
        return 'テーブル';
      case 'chat-tab':
        return 'チャットタブ';
      case 'range':
        return '射程・範囲';
      default:
       return aliasName;
    }
  }

  export function textShadowColor(textColor: string, lightColor='#ffffff', darkColor='#333333'): string {
    //let str = textColor && /^\#[0-9a-f]{6}$/i.test(textColor) ? '#' + (textColor.substring(1, 7).match(/.{2}/g).reduce((a, c) => { let d = (255 - parseInt(c, 16)).toString(16).toLowerCase(); return a + ('0' + d).substring(d.length - 1); }, '')) : '#ffffff';
    //console.log(str)
    //return str;
    return textColor && /^\#[0-9a-f]{6}$/i.test(textColor) ? (textColor.substring(1, 7).match(/.{2}/g).reduce((a, c) => { return a + parseInt(c, 16); }, 0) > 255 * 2 ? darkColor : lightColor) : lightColor;
  }
}

<template>
	<view>
		<view class="iac-input-wrap">
			<view class="iac-input-mask" @click="onInputMaskTap">
				<input class="iac-input" :id="id" :placeholder="placeholder" :value="value" @input="onInput" autocomplete="off" />
			</view>
		</view>
		<view class="str-auto-complete-container" v-if="isShow">
			<view class="str-auto-complete-mask" @tap="onMaskTap"></view>
			<view v-for="(item, index) in showList" :key="index" class="str-auto-complete-item" @tap="selectThisItem(item)"
			 v-html="item.showString"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			id: {
				type: String
			},
			value: {
				event: 'input'
			},
			placeholder: {
				type: String
			},
			param:{
				type: Object
			},
			//静态数据
			stringList: {
				type: Array
			},
			// 执行自动补全时的防抖时间（毫秒）
			debounce: {
				type: Number,
				default: undefined
			},
			// 触发自动补全的最小输入长度
			min: {
				type: Number,
				default: 0
			},

			highlightColor: {
				type: String,
				default: 'lightcoral'
			},
			//动态数据，需要返回Promise包装的数据
			loadData: Function
		},
		data() {
			return {
				extraParam: this.param,
				srcDataList: this.stringList || [],
				showList: [],

				inputMaskZindex: 99999,
				needShow: false,

				debounceTask: undefined,

				//当前时刻的输入值
				curInputValue: '',

				//英文字到其它字符的映射
				diacritics: {
					'\u24B6': 'A',
					Ａ: 'A',
					À: 'A',
					Á: 'A',
					Â: 'A',
					Ầ: 'A',
					Ấ: 'A',
					Ẫ: 'A',
					Ẩ: 'A',
					Ã: 'A',
					Ā: 'A',
					Ă: 'A',
					Ằ: 'A',
					Ắ: 'A',
					Ẵ: 'A',
					Ẳ: 'A',
					Ȧ: 'A',
					Ǡ: 'A',
					Ä: 'A',
					Ǟ: 'A',
					Ả: 'A',
					Å: 'A',
					Ǻ: 'A',
					Ǎ: 'A',
					Ȁ: 'A',
					Ȃ: 'A',
					Ạ: 'A',
					Ậ: 'A',
					Ặ: 'A',
					Ḁ: 'A',
					Ą: 'A',
					Ⱥ: 'A',
					Ɐ: 'A',
					Ꜳ: 'AA',
					Æ: 'AE',
					Ǽ: 'AE',
					Ǣ: 'AE',
					Ꜵ: 'AO',
					Ꜷ: 'AU',
					Ꜹ: 'AV',
					Ꜻ: 'AV',
					Ꜽ: 'AY',
					'\u24B7': 'B',
					Ｂ: 'B',
					Ḃ: 'B',
					Ḅ: 'B',
					Ḇ: 'B',
					Ƀ: 'B',
					Ƃ: 'B',
					Ɓ: 'B',
					'\u24B8': 'C',
					Ｃ: 'C',
					Ć: 'C',
					Ĉ: 'C',
					Ċ: 'C',
					Č: 'C',
					Ç: 'C',
					Ḉ: 'C',
					Ƈ: 'C',
					Ȼ: 'C',
					Ꜿ: 'C',
					'\u24B9': 'D',
					Ｄ: 'D',
					Ḋ: 'D',
					Ď: 'D',
					Ḍ: 'D',
					Ḑ: 'D',
					Ḓ: 'D',
					Ḏ: 'D',
					Đ: 'D',
					Ƌ: 'D',
					Ɗ: 'D',
					Ɖ: 'D',
					Ꝺ: 'D',
					Ǳ: 'DZ',
					Ǆ: 'DZ',
					ǲ: 'Dz',
					ǅ: 'Dz',
					'\u24BA': 'E',
					Ｅ: 'E',
					È: 'E',
					É: 'E',
					Ê: 'E',
					Ề: 'E',
					Ế: 'E',
					Ễ: 'E',
					Ể: 'E',
					Ẽ: 'E',
					Ē: 'E',
					Ḕ: 'E',
					Ḗ: 'E',
					Ĕ: 'E',
					Ė: 'E',
					Ë: 'E',
					Ẻ: 'E',
					Ě: 'E',
					Ȅ: 'E',
					Ȇ: 'E',
					Ẹ: 'E',
					Ệ: 'E',
					Ȩ: 'E',
					Ḝ: 'E',
					Ę: 'E',
					Ḙ: 'E',
					Ḛ: 'E',
					Ɛ: 'E',
					Ǝ: 'E',
					'\u24BB': 'F',
					Ｆ: 'F',
					Ḟ: 'F',
					Ƒ: 'F',
					Ꝼ: 'F',
					'\u24BC': 'G',
					Ｇ: 'G',
					Ǵ: 'G',
					Ĝ: 'G',
					Ḡ: 'G',
					Ğ: 'G',
					Ġ: 'G',
					Ǧ: 'G',
					Ģ: 'G',
					Ǥ: 'G',
					Ɠ: 'G',
					Ꞡ: 'G',
					Ᵹ: 'G',
					Ꝿ: 'G',
					'\u24BD': 'H',
					Ｈ: 'H',
					Ĥ: 'H',
					Ḣ: 'H',
					Ḧ: 'H',
					Ȟ: 'H',
					Ḥ: 'H',
					Ḩ: 'H',
					Ḫ: 'H',
					Ħ: 'H',
					Ⱨ: 'H',
					Ⱶ: 'H',
					Ɥ: 'H',
					'\u24BE': 'I',
					Ｉ: 'I',
					Ì: 'I',
					Í: 'I',
					Î: 'I',
					Ĩ: 'I',
					Ī: 'I',
					Ĭ: 'I',
					İ: 'I',
					Ï: 'I',
					Ḯ: 'I',
					Ỉ: 'I',
					Ǐ: 'I',
					Ȉ: 'I',
					Ȋ: 'I',
					Ị: 'I',
					Į: 'I',
					Ḭ: 'I',
					Ɨ: 'I',
					'\u24BF': 'J',
					Ｊ: 'J',
					Ĵ: 'J',
					Ɉ: 'J',
					'\u24C0': 'K',
					Ｋ: 'K',
					Ḱ: 'K',
					Ǩ: 'K',
					Ḳ: 'K',
					Ķ: 'K',
					Ḵ: 'K',
					Ƙ: 'K',
					Ⱪ: 'K',
					Ꝁ: 'K',
					Ꝃ: 'K',
					Ꝅ: 'K',
					Ꞣ: 'K',
					'\u24C1': 'L',
					Ｌ: 'L',
					Ŀ: 'L',
					Ĺ: 'L',
					Ľ: 'L',
					Ḷ: 'L',
					Ḹ: 'L',
					Ļ: 'L',
					Ḽ: 'L',
					Ḻ: 'L',
					Ł: 'L',
					Ƚ: 'L',
					Ɫ: 'L',
					Ⱡ: 'L',
					Ꝉ: 'L',
					Ꝇ: 'L',
					Ꞁ: 'L',
					Ǉ: 'LJ',
					ǈ: 'Lj',
					'\u24C2': 'M',
					Ｍ: 'M',
					Ḿ: 'M',
					Ṁ: 'M',
					Ṃ: 'M',
					Ɱ: 'M',
					Ɯ: 'M',
					'\u24C3': 'N',
					Ｎ: 'N',
					Ǹ: 'N',
					Ń: 'N',
					Ñ: 'N',
					Ṅ: 'N',
					Ň: 'N',
					Ṇ: 'N',
					Ņ: 'N',
					Ṋ: 'N',
					Ṉ: 'N',
					Ƞ: 'N',
					Ɲ: 'N',
					Ꞑ: 'N',
					Ꞥ: 'N',
					Ǌ: 'NJ',
					ǋ: 'Nj',
					'\u24C4': 'O',
					Ｏ: 'O',
					Ò: 'O',
					Ó: 'O',
					Ô: 'O',
					Ồ: 'O',
					Ố: 'O',
					Ỗ: 'O',
					Ổ: 'O',
					Õ: 'O',
					Ṍ: 'O',
					Ȭ: 'O',
					Ṏ: 'O',
					Ō: 'O',
					Ṑ: 'O',
					Ṓ: 'O',
					Ŏ: 'O',
					Ȯ: 'O',
					Ȱ: 'O',
					Ö: 'O',
					Ȫ: 'O',
					Ỏ: 'O',
					Ő: 'O',
					Ǒ: 'O',
					Ȍ: 'O',
					Ȏ: 'O',
					Ơ: 'O',
					Ờ: 'O',
					Ớ: 'O',
					Ỡ: 'O',
					Ở: 'O',
					Ợ: 'O',
					Ọ: 'O',
					Ộ: 'O',
					Ǫ: 'O',
					Ǭ: 'O',
					Ø: 'O',
					Ǿ: 'O',
					Ɔ: 'O',
					Ɵ: 'O',
					Ꝋ: 'O',
					Ꝍ: 'O',
					Ƣ: 'OI',
					Ꝏ: 'OO',
					Ȣ: 'OU',
					'\u24C5': 'P',
					Ｐ: 'P',
					Ṕ: 'P',
					Ṗ: 'P',
					Ƥ: 'P',
					Ᵽ: 'P',
					Ꝑ: 'P',
					Ꝓ: 'P',
					Ꝕ: 'P',
					'\u24C6': 'Q',
					Ｑ: 'Q',
					Ꝗ: 'Q',
					Ꝙ: 'Q',
					Ɋ: 'Q',
					'\u24C7': 'R',
					Ｒ: 'R',
					Ŕ: 'R',
					Ṙ: 'R',
					Ř: 'R',
					Ȑ: 'R',
					Ȓ: 'R',
					Ṛ: 'R',
					Ṝ: 'R',
					Ŗ: 'R',
					Ṟ: 'R',
					Ɍ: 'R',
					Ɽ: 'R',
					Ꝛ: 'R',
					Ꞧ: 'R',
					Ꞃ: 'R',
					'\u24C8': 'S',
					Ｓ: 'S',
					ẞ: 'S',
					Ś: 'S',
					Ṥ: 'S',
					Ŝ: 'S',
					Ṡ: 'S',
					Š: 'S',
					Ṧ: 'S',
					Ṣ: 'S',
					Ṩ: 'S',
					Ș: 'S',
					Ş: 'S',
					Ȿ: 'S',
					Ꞩ: 'S',
					Ꞅ: 'S',
					'\u24C9': 'T',
					Ｔ: 'T',
					Ṫ: 'T',
					Ť: 'T',
					Ṭ: 'T',
					Ț: 'T',
					Ţ: 'T',
					Ṱ: 'T',
					Ṯ: 'T',
					Ŧ: 'T',
					Ƭ: 'T',
					Ʈ: 'T',
					Ⱦ: 'T',
					Ꞇ: 'T',
					Ꜩ: 'TZ',
					'\u24CA': 'U',
					Ｕ: 'U',
					Ù: 'U',
					Ú: 'U',
					Û: 'U',
					Ũ: 'U',
					Ṹ: 'U',
					Ū: 'U',
					Ṻ: 'U',
					Ŭ: 'U',
					Ü: 'U',
					Ǜ: 'U',
					Ǘ: 'U',
					Ǖ: 'U',
					Ǚ: 'U',
					Ủ: 'U',
					Ů: 'U',
					Ű: 'U',
					Ǔ: 'U',
					Ȕ: 'U',
					Ȗ: 'U',
					Ư: 'U',
					Ừ: 'U',
					Ứ: 'U',
					Ữ: 'U',
					Ử: 'U',
					Ự: 'U',
					Ụ: 'U',
					Ṳ: 'U',
					Ų: 'U',
					Ṷ: 'U',
					Ṵ: 'U',
					Ʉ: 'U',
					'\u24CB': 'V',
					Ｖ: 'V',
					Ṽ: 'V',
					Ṿ: 'V',
					Ʋ: 'V',
					Ꝟ: 'V',
					Ʌ: 'V',
					Ꝡ: 'VY',
					'\u24CC': 'W',
					Ｗ: 'W',
					Ẁ: 'W',
					Ẃ: 'W',
					Ŵ: 'W',
					Ẇ: 'W',
					Ẅ: 'W',
					Ẉ: 'W',
					Ⱳ: 'W',
					'\u24CD': 'X',
					Ｘ: 'X',
					Ẋ: 'X',
					Ẍ: 'X',
					'\u24CE': 'Y',
					Ｙ: 'Y',
					Ỳ: 'Y',
					Ý: 'Y',
					Ŷ: 'Y',
					Ỹ: 'Y',
					Ȳ: 'Y',
					Ẏ: 'Y',
					Ÿ: 'Y',
					Ỷ: 'Y',
					Ỵ: 'Y',
					Ƴ: 'Y',
					Ɏ: 'Y',
					Ỿ: 'Y',
					'\u24CF': 'Z',
					Ｚ: 'Z',
					Ź: 'Z',
					Ẑ: 'Z',
					Ż: 'Z',
					Ž: 'Z',
					Ẓ: 'Z',
					Ẕ: 'Z',
					Ƶ: 'Z',
					Ȥ: 'Z',
					Ɀ: 'Z',
					Ⱬ: 'Z',
					Ꝣ: 'Z',
					'\u24D0': 'a',
					ａ: 'a',
					ẚ: 'a',
					à: 'a',
					á: 'a',
					â: 'a',
					ầ: 'a',
					ấ: 'a',
					ẫ: 'a',
					ẩ: 'a',
					ã: 'a',
					ā: 'a',
					ă: 'a',
					ằ: 'a',
					ắ: 'a',
					ẵ: 'a',
					ẳ: 'a',
					ȧ: 'a',
					ǡ: 'a',
					ä: 'a',
					ǟ: 'a',
					ả: 'a',
					å: 'a',
					ǻ: 'a',
					ǎ: 'a',
					ȁ: 'a',
					ȃ: 'a',
					ạ: 'a',
					ậ: 'a',
					ặ: 'a',
					ḁ: 'a',
					ą: 'a',
					ⱥ: 'a',
					ɐ: 'a',
					ꜳ: 'aa',
					æ: 'ae',
					ǽ: 'ae',
					ǣ: 'ae',
					ꜵ: 'ao',
					ꜷ: 'au',
					ꜹ: 'av',
					ꜻ: 'av',
					ꜽ: 'ay',
					'\u24D1': 'b',
					ｂ: 'b',
					ḃ: 'b',
					ḅ: 'b',
					ḇ: 'b',
					ƀ: 'b',
					ƃ: 'b',
					ɓ: 'b',
					'\u24D2': 'c',
					ｃ: 'c',
					ć: 'c',
					ĉ: 'c',
					ċ: 'c',
					č: 'c',
					ç: 'c',
					ḉ: 'c',
					ƈ: 'c',
					ȼ: 'c',
					ꜿ: 'c',
					ↄ: 'c',
					'\u24D3': 'd',
					ｄ: 'd',
					ḋ: 'd',
					ď: 'd',
					ḍ: 'd',
					ḑ: 'd',
					ḓ: 'd',
					ḏ: 'd',
					đ: 'd',
					ƌ: 'd',
					ɖ: 'd',
					ɗ: 'd',
					ꝺ: 'd',
					ǳ: 'dz',
					ǆ: 'dz',
					'\u24D4': 'e',
					ｅ: 'e',
					è: 'e',
					é: 'e',
					ê: 'e',
					ề: 'e',
					ế: 'e',
					ễ: 'e',
					ể: 'e',
					ẽ: 'e',
					ē: 'e',
					ḕ: 'e',
					ḗ: 'e',
					ĕ: 'e',
					ė: 'e',
					ë: 'e',
					ẻ: 'e',
					ě: 'e',
					ȅ: 'e',
					ȇ: 'e',
					ẹ: 'e',
					ệ: 'e',
					ȩ: 'e',
					ḝ: 'e',
					ę: 'e',
					ḙ: 'e',
					ḛ: 'e',
					ɇ: 'e',
					ɛ: 'e',
					ǝ: 'e',
					'\u24D5': 'f',
					ｆ: 'f',
					ḟ: 'f',
					ƒ: 'f',
					ꝼ: 'f',
					'\u24D6': 'g',
					ｇ: 'g',
					ǵ: 'g',
					ĝ: 'g',
					ḡ: 'g',
					ğ: 'g',
					ġ: 'g',
					ǧ: 'g',
					ģ: 'g',
					ǥ: 'g',
					ɠ: 'g',
					ꞡ: 'g',
					ᵹ: 'g',
					ꝿ: 'g',
					'\u24D7': 'h',
					ｈ: 'h',
					ĥ: 'h',
					ḣ: 'h',
					ḧ: 'h',
					ȟ: 'h',
					ḥ: 'h',
					ḩ: 'h',
					ḫ: 'h',
					ẖ: 'h',
					ħ: 'h',
					ⱨ: 'h',
					ⱶ: 'h',
					ɥ: 'h',
					ƕ: 'hv',
					'\u24D8': 'i',
					ｉ: 'i',
					ì: 'i',
					í: 'i',
					î: 'i',
					ĩ: 'i',
					ī: 'i',
					ĭ: 'i',
					ï: 'i',
					ḯ: 'i',
					ỉ: 'i',
					ǐ: 'i',
					ȉ: 'i',
					ȋ: 'i',
					ị: 'i',
					į: 'i',
					ḭ: 'i',
					ɨ: 'i',
					ı: 'i',
					'\u24D9': 'j',
					ｊ: 'j',
					ĵ: 'j',
					ǰ: 'j',
					ɉ: 'j',
					'\u24DA': 'k',
					ｋ: 'k',
					ḱ: 'k',
					ǩ: 'k',
					ḳ: 'k',
					ķ: 'k',
					ḵ: 'k',
					ƙ: 'k',
					ⱪ: 'k',
					ꝁ: 'k',
					ꝃ: 'k',
					ꝅ: 'k',
					ꞣ: 'k',
					'\u24DB': 'l',
					ｌ: 'l',
					ŀ: 'l',
					ĺ: 'l',
					ľ: 'l',
					ḷ: 'l',
					ḹ: 'l',
					ļ: 'l',
					ḽ: 'l',
					ḻ: 'l',
					ſ: 'l',
					ł: 'l',
					ƚ: 'l',
					ɫ: 'l',
					ⱡ: 'l',
					ꝉ: 'l',
					ꞁ: 'l',
					ꝇ: 'l',
					ǉ: 'lj',
					'\u24DC': 'm',
					ｍ: 'm',
					ḿ: 'm',
					ṁ: 'm',
					ṃ: 'm',
					ɱ: 'm',
					ɯ: 'm',
					'\u24DD': 'n',
					ｎ: 'n',
					ǹ: 'n',
					ń: 'n',
					ñ: 'n',
					ṅ: 'n',
					ň: 'n',
					ṇ: 'n',
					ņ: 'n',
					ṋ: 'n',
					ṉ: 'n',
					ƞ: 'n',
					ɲ: 'n',
					ŉ: 'n',
					ꞑ: 'n',
					ꞥ: 'n',
					ǌ: 'nj',
					'\u24DE': 'o',
					ｏ: 'o',
					ò: 'o',
					ó: 'o',
					ô: 'o',
					ồ: 'o',
					ố: 'o',
					ỗ: 'o',
					ổ: 'o',
					õ: 'o',
					ṍ: 'o',
					ȭ: 'o',
					ṏ: 'o',
					ō: 'o',
					ṑ: 'o',
					ṓ: 'o',
					ŏ: 'o',
					ȯ: 'o',
					ȱ: 'o',
					ö: 'o',
					ȫ: 'o',
					ỏ: 'o',
					ő: 'o',
					ǒ: 'o',
					ȍ: 'o',
					ȏ: 'o',
					ơ: 'o',
					ờ: 'o',
					ớ: 'o',
					ỡ: 'o',
					ở: 'o',
					ợ: 'o',
					ọ: 'o',
					ộ: 'o',
					ǫ: 'o',
					ǭ: 'o',
					ø: 'o',
					ǿ: 'o',
					ɔ: 'o',
					ꝋ: 'o',
					ꝍ: 'o',
					ɵ: 'o',
					ƣ: 'oi',
					ȣ: 'ou',
					ꝏ: 'oo',
					'\u24DF': 'p',
					ｐ: 'p',
					ṕ: 'p',
					ṗ: 'p',
					ƥ: 'p',
					ᵽ: 'p',
					ꝑ: 'p',
					ꝓ: 'p',
					ꝕ: 'p',
					'\u24E0': 'q',
					ｑ: 'q',
					ɋ: 'q',
					ꝗ: 'q',
					ꝙ: 'q',
					'\u24E1': 'r',
					ｒ: 'r',
					ŕ: 'r',
					ṙ: 'r',
					ř: 'r',
					ȑ: 'r',
					ȓ: 'r',
					ṛ: 'r',
					ṝ: 'r',
					ŗ: 'r',
					ṟ: 'r',
					ɍ: 'r',
					ɽ: 'r',
					ꝛ: 'r',
					ꞧ: 'r',
					ꞃ: 'r',
					'\u24E2': 's',
					ｓ: 's',
					ß: 's',
					ś: 's',
					ṥ: 's',
					ŝ: 's',
					ṡ: 's',
					š: 's',
					ṧ: 's',
					ṣ: 's',
					ṩ: 's',
					ș: 's',
					ş: 's',
					ȿ: 's',
					ꞩ: 's',
					ꞅ: 's',
					ẛ: 's',
					'\u24E3': 't',
					ｔ: 't',
					ṫ: 't',
					ẗ: 't',
					ť: 't',
					ṭ: 't',
					ț: 't',
					ţ: 't',
					ṱ: 't',
					ṯ: 't',
					ŧ: 't',
					ƭ: 't',
					ʈ: 't',
					ⱦ: 't',
					ꞇ: 't',
					ꜩ: 'tz',
					'\u24E4': 'u',
					ｕ: 'u',
					ù: 'u',
					ú: 'u',
					û: 'u',
					ũ: 'u',
					ṹ: 'u',
					ū: 'u',
					ṻ: 'u',
					ŭ: 'u',
					ü: 'u',
					ǜ: 'u',
					ǘ: 'u',
					ǖ: 'u',
					ǚ: 'u',
					ủ: 'u',
					ů: 'u',
					ű: 'u',
					ǔ: 'u',
					ȕ: 'u',
					ȗ: 'u',
					ư: 'u',
					ừ: 'u',
					ứ: 'u',
					ữ: 'u',
					ử: 'u',
					ự: 'u',
					ụ: 'u',
					ṳ: 'u',
					ų: 'u',
					ṷ: 'u',
					ṵ: 'u',
					ʉ: 'u',
					'\u24E5': 'v',
					ｖ: 'v',
					ṽ: 'v',
					ṿ: 'v',
					ʋ: 'v',
					ꝟ: 'v',
					ʌ: 'v',
					ꝡ: 'vy',
					'\u24E6': 'w',
					ｗ: 'w',
					ẁ: 'w',
					ẃ: 'w',
					ŵ: 'w',
					ẇ: 'w',
					ẅ: 'w',
					ẘ: 'w',
					ẉ: 'w',
					ⱳ: 'w',
					'\u24E7': 'x',
					ｘ: 'x',
					ẋ: 'x',
					ẍ: 'x',
					'\u24E8': 'y',
					ｙ: 'y',
					ỳ: 'y',
					ý: 'y',
					ŷ: 'y',
					ỹ: 'y',
					ȳ: 'y',
					ẏ: 'y',
					ÿ: 'y',
					ỷ: 'y',
					ẙ: 'y',
					ỵ: 'y',
					ƴ: 'y',
					ɏ: 'y',
					ỿ: 'y',
					'\u24E9': 'z',
					ｚ: 'z',
					ź: 'z',
					ẑ: 'z',
					ż: 'z',
					ž: 'z',
					ẓ: 'z',
					ẕ: 'z',
					ƶ: 'z',
					ȥ: 'z',
					ɀ: 'z',
					ⱬ: 'z',
					ꝣ: 'z',
					Ά: '\u0391',
					Έ: '\u0395',
					Ή: '\u0397',
					Ί: '\u0399',
					Ϊ: '\u0399',
					Ό: '\u039F',
					Ύ: '\u03A5',
					Ϋ: '\u03A5',
					Ώ: '\u03A9',
					ά: '\u03B1',
					έ: '\u03B5',
					ή: '\u03B7',
					ί: '\u03B9',
					ϊ: '\u03B9',
					ΐ: '\u03B9',
					ό: '\u03BF',
					ύ: '\u03C5',
					ϋ: '\u03C5',
					ΰ: '\u03C5',
					ω: '\u03C9',
					ς: '\u03C3'
				}
			};
		},
		computed: {
			isShow() {
				return this.needShow && this.showList.length > 0;
			}
		},
		created() {
			if (this.srcDataList) {
				this.srcDataList.sort();
				this.showList = this.srcDataList;
			}
			if (this.loadData) {
				this.defultLoadData = this.loadData;
			}
			
			(function() {
				function ucfirst(l1) {
					if (l1.length > 0) {
						var first = l1.substr(0, 1).toUpperCase(); 
						var first_full = l1.toUpperCase(); 
						var spare = '';
						var result = new Array(first + spare, first_full + spare);
						return result;
					}
				}
			})();
		},
		methods: {
			defultLoadData(value) {
				return Promise.resolve(this.srcDataList);
			},
			onInput(event) {
				let value = event.target.value;
				this.$emit('input', value);
				this.doInput(value);
			},
			doInput(value) {
				this.curInputValue = value;
				if (this.debounce) {
					if (this.debounceTask !== undefined) clearTimeout(this.debounceTask);
					this.debounceTask = setTimeout(() => {
						return this.getData(value);
					}, this.debounce);
				} else {
					return this.getData(value);
				}
			},
			onInputMaskTap() {
				this.inputMaskZindex = 0;
				this.doInput(this.curInputValue);
			},
			onMaskTap() {
				this.needShow = false;
				this.inputMaskZindex = 9990;
			},

			getData(value) {
				if (value.length < this.min) {
                    this.needShow = false
					this.$emit('input', value);
					return;
				}
				this.defultLoadData(value).then(data => {
					this.srcDataList = data || [];
					this.filterList(value);
					// this.$emit('input', value);
					if ( /* value.length > 0 && */ value == this.curInputValue) {
						this.needShow = true;
					} else {
						this.needShow = false;
					}
				});

			
			},
			isString(str) {
				return typeof str == 'string' && str.constructor == String;
			},

			filterList(stringExp) {
				let tempArray = [];
				for (let i = 0; i < this.srcDataList.length; i++) {
					let it = this.srcDataList[i];
					let temp = it.text || (this.isString(it) ? it : temp);


					var matches = this.matcher({
						term: stringExp
					}, {
						text: temp
					});
					if (matches !== null) {
						tempArray.push({
							orginalString: temp,

							showString: matches.text,
							data: it
						});
					}

				}
				this.showList = tempArray;
			},
			filterString(stringExp, b) {
				let tempByteArray = b.split('');
				let itemShow = [];
				let sArray = stringExp.split('');
				let fontStart = '<span style=color:' + this.highlightColor + '>';
				let fontEnd = '</span>';
				let sameCharNumber = 0;
				for (let j = 0; j < tempByteArray.length; j++) {
					if (tempByteArray[j] === sArray[sameCharNumber]) {
						let sameNumberNow = sameCharNumber;
						itemShow.push(fontStart);
						for (let k = 0; k < sArray.length - sameNumberNow; k++) {
							if (tempByteArray[j + k] === sArray[k + sameNumberNow]) {
								itemShow.push(tempByteArray[j + k]);
								sameCharNumber++;
							} else if (tempByteArray[j + k] !== sArray[k + sameNumberNow]) {
								itemShow.push(fontEnd);
								itemShow.push(tempByteArray[j + k]);
								j += k;
								break;
							}
							if (k + sameNumberNow === sArray.length - 1) {
								j += k;
								itemShow.push(fontEnd);
							}
						}
					} else {
						itemShow.push(tempByteArray[j]);
					}
				}
				if (sameCharNumber > 0) {
					return {
						orginalString: b,
						number: sameCharNumber,
						showString: itemShow.join('')
					};
				}
			},
			selectThisItem(item) {
				console.log('selectThisItem...........')
				console.log('extraParam==>',this.extraParam)
				//this.value = item.orginalString;
				this.needShow = false;
				this.$emit('input', item.orginalString);
				this.$emit('selectItem', {'selectItem':item.data,'param':this.extraParam});
			},

			stripDiacritics(text) {
				let that = this;
				// Used 'uni range + named function' from http://jsperf.com/diacritics/18
				let match = function(a) {
					return that.diacritics[a] || a;
				};
				return text.replace(/[^\u0000-\u007E]/g, match);
			},

			/**
			 * @param {Object} params 匹配条件{term:要找的字符串}
			 * @param {Object} data 目标对象{text:当前一级的目标字符串,children:下级对象}
			 */
			matcher(params, data) {
				let that = this;
				// Always return the object if there is nothing to compare
				if (!params || !params.term || params.term.trim() === '') {
					return data;
				}

				// Do a recursive check for options with children
				if (data && data.children && data.children.length > 0) {
					// Clone the data object if there are children
					// This is required as we modify the object to remove any non-matches
					var match = that.deepCopy(data);

					// Check each child of the option
					for (var c = data.children.length - 1; c >= 0; c--) {
						var child = data.children[c];

						var matches = that.matcher(params, child);

						// If there wasn't a match, remove the object in the array
						if (matches == null) {
							match.children.splice(c, 1);
						}
					}

					// If any children matched, return the new object
					if (match.children.length > 0) {
						return match;
					}

					// If there were no matching children, check just the plain object
					return that.matcher(params, match);
				}

				/**支持简拼  begin**/
				var original = '';
				var original1 = '';
				if (that.stripDiacritics(data.text).toPinYin != undefined) {
					var result = that.stripDiacritics(data.text).toPinYin();
					var fmtTerm = that.stripDiacritics(params.term).toUpperCase();
					//兼容空格匹配
					fmtTerm = fmtTerm.replace(/ /g, '-');
					while (fmtTerm.indexOf('--') > 0) {
						fmtTerm = fmtTerm.replace('--', '-');
					}
					original = result[0].indexOf(fmtTerm);
					original1 = result[1].indexOf(fmtTerm);
					if (original == -1 && original1 == -1) {
						original = that
							.stripDiacritics(data.text)
							.toUpperCase()
							.indexOf(fmtTerm);
					}
				}

				// Check if the text contains the term
				if (original > -1 || original1 > -1) {
					//如果匹配则original为0
					return data;
				}
				/**支持简拼 end**/

				var original = that.stripDiacritics(data.text).toUpperCase();
				var term = that.stripDiacritics(params.term).toUpperCase();

				// Check if the text contains the term
				if (original.indexOf(term) > -1) {
					return data;
				}

				// If it doesn't contain the term, don't return anything
				return null;
			},

			deepCopy(obj) {
				var result = Array.isArray(obj) ? [] : {};
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						if (typeof obj[key] === 'object') {
							result[key] = this.deepCopy(obj[key]); //递归复制
						} else {
							result[key] = obj[key];
						}
					}
				}
				return result;
			}
		},
		watch: {
			stringList(val) {
				this.srcDataList = val;
			},
			param(val){
				this.extraParam = val;
			}
		}
	};
</script>

<style lang="scss">
	.iac-input-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		// width: 200px;
		min-height: 28px;
	}

	.iac-input-mask {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 9990;
		// background-color: red;
	}

	.iac-input {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1;
        border: 1px solid $uni-border-1;
        	border-radius: 4px;
	}

	.str-auto-complete-mask {
		width: 100%;
		height: 100%;
		// background: rgba(0, 0, 0, 0.8);
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: 9999;
	}

	.str-auto-complete-container {
        min-width: 100%;
	      height: auto;
	      border: 1px solid #f3f3f4;
	      position: absolute;
	      z-index: 9997;
	      background: #fff;
	      // 开启处置方向的滚动条
	      overflow-y:auto;
	      // 最少显示1条记录的空间
	      min-height: 53rpx;
	      // 最多显示10条记录的空间
	      max-height: 530rpx;
	
	      .str-auto-complete-item {
	        position: relative;
	        padding: 10upx;
	        z-index: 9999;
	        // 更改以下每条记录的字体大小
	        font-size: 28rpx;
	      }
	    }

</style>
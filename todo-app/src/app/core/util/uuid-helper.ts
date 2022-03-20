export class UUIDGenerator {
	static generateUUID() {
		if (window && window.crypto && window.crypto.getRandomValues) {
			try {
				return UUIDGenerator.generateUUIDWithWebCrypto();
			} catch {
				return UUIDGenerator.generateUUIDWithMathRandom();
			}
		} else {
			return UUIDGenerator.generateUUIDWithMathRandom();
		}
	}

	private static generateUUIDWithWebCrypto() {
		const buffer = new Uint8Array(8);
		window.crypto.getRandomValues(buffer);
		return (
			UUIDGenerator.pad4(buffer[0]) +
			UUIDGenerator.pad4(buffer[1]) +
			'-' +
			UUIDGenerator.pad4(buffer[2]) +
			'-' +
			UUIDGenerator.pad4(buffer[3]) +
			'-' +
			UUIDGenerator.pad4(buffer[4]) +
			'-' +
			UUIDGenerator.pad4(buffer[5]) +
			UUIDGenerator.pad4(buffer[6]) +
			UUIDGenerator.pad4(buffer[7])
		);
	}

	private static generateUUIDWithMathRandom() {
		return (
			UUIDGenerator.random4() +
			UUIDGenerator.random4() +
			'-' +
			UUIDGenerator.random4() +
			'-' +
			UUIDGenerator.random4() +
			'-' +
			UUIDGenerator.random4() +
			'-' +
			UUIDGenerator.random4() +
			UUIDGenerator.random4() +
			UUIDGenerator.random4()
		);
	}

	private static pad4(num: number) {
		let ret = num.toString(16);
		while (ret.length < 4) {
			ret = '0' + ret;
		}
		return ret;
	}

	private static random4() {
		return Math.floor((Math.random() + 1) * 0x10000)
			.toString(16)
			.substring(1);
	}
}

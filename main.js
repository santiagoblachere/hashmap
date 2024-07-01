console.log("hola");
/* if (index < 0 || index >= buckets.length) {
	throw new Error("Trying to access index out of bound");
} */

class Hashmap {
	constructor(key) {
		this.key = key;
		this.hashMap = Array.apply(null, Array(16)).map(function () {});
	}
	hash(key) {
		let hashCode = 0;
		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		}
		return hashCode % this.hashMap.length;
	}
	set(key, value) {
		let hashCode = this.hash(key);
		let bucket = [key, value];
		this.hashMap[hashCode] = bucket;
	}
	get(key) {
		let index = this.hash(key);
		if (!this.hashMap[index]) return null;
		return this.hashMap[index];
	}
	has(key) {
		let index = this.hash(key);
		return this.hashMap[index] ? true : false;
	}
	remove(key) {
		let index = this.hash(key);
		if (this.hashMap[index]) {
			this.hashMap[index] = "";
			return true;
		} else {
			return false;
		}
	}
	length() {
		return this.hashMap.length;
	}
	clear() {
		this.hashMap = Array.apply(null, Array(16)).map(function () {});
	}
	keys() {
		let keysArray = [];
		this.hashMap.forEach((bucket) => {
			if (bucket != null) {
				keysArray.push(bucket[0]);
			}
		});
		return keysArray;
	}
	values() {
		let valuesArray = [];
		this.hashMap.forEach((bucket) => {
			if (bucket != null) {
				valuesArray.push(bucket[1]);
			}
		});
		return valuesArray;
	}
	entries() {
		let entriesArray = [];
		this.hashMap.forEach((bucket) => {
			if (bucket != null) {
				entriesArray.push(bucket);
			}
		});
		return entriesArray;
	}
}

const hashMap = new Hashmap();
console.log(hashMap.hash("coscu"));
hashMap.set("coscu", "coscu te amo");
console.log(hashMap.get("coscu"));
console.log(hashMap.remove("coscu"));
console.log(hashMap.remove("coscu"));
console.log(hashMap.length());
hashMap.set("coscu", "te amo");
hashMap.clear();
console.log(hashMap.get("coscu"));
hashMap.set("coscu", "te amo");
hashMap.set("coscuTTT", "te amo");
console.log(hashMap.keys());
hashMap.set("coscuJHJH", "te amo");
console.log(hashMap.keys());
hashMap.set("coscuGFG", "te amo");
console.log(hashMap.keys());
console.log(hashMap.values());
hashMap.set("coscu", "teODIO");
console.log(hashMap.entries());

/* if (index < 0 || index >= buckets.length) {
	throw new Error("Trying to access index out of bound");
} */

class Hashmap {
	constructor(key) {
		this.key = key;
		this.hashMap = Array(16).fill(null);
		this.loadfactor = 0.75;
		this.size = 0;
		this.capacity = 16;
	}
	growHashMap() {
		let oldArray = this.hashMap;
		this.capacity *= 2;
		this.hashMap = Array(this.capacity).fill(null);
		oldArray.forEach((bucket) => {
			if (bucket !== null) {
				let key = bucket[0];
				let value = bucket[1];
				this.set(key, value);
			}
			return;
		});
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
		let currentCapacity = this.size / this.hashMap.length;
		if (currentCapacity >= this.loadfactor) {
			this.growHashMap();
		}

		let hashCode = this.hash(key);
		while (
			this.hashMap[hashCode] !== null &&
			this.hashMap[hashCode][0] !== key
		) {
			hashCode = (hashCode + 1) % this.hashMap.length;
		}
		if (this.hashMap[hashCode] === null) {
			this.size++;
		}
		this.hashMap[hashCode] = [key, value];
	}
	get(key) {
		let index = this.hash(key);
		console.log(index);
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
		this.hashMap = Array.apply(null, Array(this.capacity)).map(function () {});
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
hashMap.set("apple", "red");
hashMap.set("banana", "yellow");
hashMap.set("carrot", "orange");
hashMap.set("dog", "brown");
hashMap.set("elephant", "gray");
hashMap.set("frog", "green");
hashMap.set("grape", "purple");
hashMap.set("hat", "black");
hashMap.set("ice cream", "white");
hashMap.set("jacket", "blue");
hashMap.set("kite", "pink");
hashMap.set("lion", "golden");
hashMap.set("moon", "silver");
hashMap.clear();

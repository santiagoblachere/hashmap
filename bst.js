class Node {
	constructor(data, left, right) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}
class Tree {
	constructor(array) {
		this.array = array;
		this.rootZero = null;
	}

	buildTree(array = this.array, start = 0, end = array.length - 1) {
		if (start > end) {
			return null;
		}
		let middle = Math.floor((start + end) / 2);
		let node = new Node(array[middle]);
		if (this.rootZero === null) this.rootZero = node;
		node.left = this.buildTree(array, start, middle - 1);
		node.right = this.buildTree(array, middle + 1, end);

		return node;
	}
	insert(value) {
		let currentNode = this.rootZero;
		console.log(value, currentNode.data);
		while (currentNode.left) {
			console.log(value, currentNode.data);
			if (currentNode.right === null) currentNode.right = new Node(value);
			currentNode = currentNode.right;
		}
		currentNode.left = new Node(value);
	}
}
const tree = new Tree([0, 1, 2, 3, 4, 5]);
console.log(tree.buildTree());
tree.insert(6);
tree.insert(3);
console.log(tree.buildTree());

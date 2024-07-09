class Node {
	constructor(data, left = null, right = null) {
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
		const newNode = new Node(value);
		if (this.rootZero === null) {
			this.rootZero = newNode;
			return;
		}
		let currentNode = this.rootZero;
		while (true) {
			if (value < currentNode.data) {
				if (currentNode.left === null) {
					currentNode.left = newNode;
					break;
				} else {
					currentNode = currentNode.left;
				}
			} else {
				if (currentNode.right === null) {
					currentNode.right = newNode;
					break;
				} else {
					currentNode = currentNode.right;
				}
			}
		}
	}
	find(value) {
		let currentNode = this.rootZero;
		while (currentNode !== null) {
			if (value > currentNode.data) {
				currentNode = currentNode.right;
			} else if (value < currentNode.data) {
				currentNode = currentNode.left;
			} else {
				return currentNode;
			}
		}
	}
	levelOrder() {
		if (this.rootZero == null) return [];
		const nodes = [];
		const queue = [];
		let start = 0;
		let end = 0;
		queue.push(this.rootZero);
		end++;
		while (start < end) {
			let currentNode = queue[start];
			nodes.push(currentNode.data);
			start++;
			if (currentNode.left !== null) {
				queue.push(currentNode.left);
				end++;
			}

			if (currentNode.right !== null) {
				queue.push(currentNode.right);
				end++;
			}
		}
		return nodes;
	}
	inOrder() {
		let currentNode = this.rootZero;
		if (currentNode == null) return;
		function leftTravel(node) {
			if (node.left == null) return node;
			if (node.left !== null) {
				return leftTravel(node.left);
			}
		}
		function rightTravel(node) {
			if (node.right == null) return node;
			if (node.right !== null) return rightTravel(node.right);
		}
		while (currentNode !== null) {
			if (currentNode.left !== null) leftTravel(currentNode);
			else {
				if (currentNode.right !== null) rightTravel(currentNode);
			}
		}
	}
	deleteItem(value) {
		let currentNode = this.rootZero;
		let previousNode = null;

		while (currentNode !== null) {
			if (value < currentNode.data) {
				previousNode = currentNode;
				currentNode = currentNode.left;
			} else if (value > currentNode.data) {
				previousNode = currentNode;
				currentNode = currentNode.right;
			} else {
				if (currentNode.left === null && currentNode.right === null) {
					if (currentNode === this.rootZero) {
						this.rootZero = null;
					} else if (currentNode === previousNode.left) {
						previousNode.left = null;
					} else {
						previousNode.right = null;
					}
				} else if (currentNode.left === null || currentNode.right === null) {
					let childNode =
						currentNode.left !== null ? currentNode.left : currentNode.right;

					if (currentNode === this.rootZero) {
						this.rootZero = childNode;
					} else if (currentNode === previousNode.left) {
						previousNode.left = childNode;
					} else {
						previousNode.right = childNode;
					}
				} else {
					let successorParent = currentNode;
					let successor = currentNode.right;
					while (successor.left !== null) {
						successorParent = successor;
						successor = successor.left;
					}
					currentNode.data = successor.data;
					if (successorParent.left === successor) {
						successorParent.left = successor.right;
					} else {
						successorParent.right = successor.right;
					}
				}

				return;
			}
		}
	}
}
const tree = new Tree([0, 2, 3, 4, 5]);
tree.buildTree();
tree.insert(6);
tree.insert(1);
tree.insert(7);

console.log(tree);
console.log(tree.find(44));
console.log(tree.levelOrder());
console.log(tree.inOrder());

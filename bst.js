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
	inOrder(node = this.rootZero, callback = null) {
		let result = [];
		function traverse(node) {
			if (node) {
				traverse(node.left);
				if (callback) {
					callback(node.data);
				} else {
					result.push(node.data);
				}
				traverse(node.right);
			}
		}
		traverse(node);
		return callback ? null : result;
	}
	preOrder(node = this.rootZero, callback = null) {
		let result = [];
		function traverse(node) {
			if (node) {
				if (callback) {
					callback(node.data);
				} else {
					result.push(node.data);
				}
				traverse(node.left);
				traverse(node.right);
			}
		}

		traverse(node);
		return callback ? null : result;
	}
	postOrder(node = this.rootZero, callback = null) {
		let result = [];
		function traverse(node) {
			if (node) {
				if (node.left !== null) traverse(node.left);
				if (node.right !== null) traverse(node.right);

				if (callback) {
					callback(node);
				} else {
					result.push(node.data);
				}
			}
		}
		traverse(node);
		return callback ? null : result;
	}
	height(node = this.rootZero) {
		if (node !== this.rootZero) {
			node = this.find(node);
		}
		let height = 0;
		let leftCounter = 0;
		let rightCounter = 0;
		function traverseHeight(node) {
			if (node) {
				if (node.left !== null) {
					++leftCounter;
					traverseHeight(node.left);
				}
				if (node.right !== null) {
					++rightCounter;
					traverseHeight(node.right);
				}
			}
			if (leftCounter > rightCounter) {
				height = leftCounter;
			} else if (rightCounter > leftCounter) {
				height = rightCounter;
			} else {
				height = leftCounter || rightCounter;
			}
		}
		traverseHeight(node);
		return height;
	}
	depth(node) {
		node = this.find(node);
		if (node === undefined) return;
		let currentNode = this.rootZero;
		let nodeDepth = 0;
		let found = false;
		while (found === false) {
			console.log(currentNode.data, node.data, nodeDepth);
			if (node.data < currentNode.data) {
				currentNode = currentNode.left;
			}
			if (node.data > currentNode.data) {
				currentNode = currentNode.right;
			} else {
				if (nodeDepth == 0 && currentNode !== this.rootZero) nodeDepth++;
				found = true;
				return nodeDepth;
			}
			++nodeDepth;
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
console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
// console.log(tree.height(4));
console.log(tree.depth(3));

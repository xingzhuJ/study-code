class LinkedListNode {
	constructor(value, next = null) {
		this.value = value;
		this.next = next;
	}
}

var MyLinkedList = function () {
	// 原始节点
	this.head = null;
	// 最后节点
	this.tail = null;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
	let currentNode = this.head;
	let ind = 0;
	while (currentNode) {
		if (ind === index) {
			return currentNode.value;
		}
		currentNode = currentNode.next;
		ind++;
	}
	return -1;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
	const node = new LinkedListNode(val);
	node.next = this.head;
	this.head = node;
	if (!this.tail) {
		// 添加没有尾部节点时，为当前节点，只会进入一次
		this.tail = node;
	}
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
	const node = new LinkedListNode(val);
	if (!this.head) {
		this.head = node;
		this.tail = node;
		return this;
	}
	console.log(this.tail, '213');
	if (this.tail) {
		this.tail.next = node;
	}
	this.tail = node;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
	const node = new LinkedListNode(val);
	// 插入节点的时候先去头部节点
	let currentNode = this.head;
	// 为了指定插入创建的变量
	let ind = 0;
	// 等于0的话，就没必要去循环了，直接在头部插入就好了
	if (index === 0) {
		this.addAtHead(val);
		return;
	}
	// 循环
	while (currentNode) {
		// 从1开始的其实。
		++ind;
		// 如果当前循环ind === index（插入的）
		if (ind === index) {
			if (!currentNode.next) {
				this.tail = node;
			}
			// 将插入的节点的next 设置为 当前节点的next
			node.next = currentNode.next;
			// 修改当前节点的next为node。
			currentNode.next = node;
			break;
		}
		currentNode = currentNode.next;
		// 说明最后一个
		if (!currentNode) {
			this.addAtTail(val);
			break;
		}
	}
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
	let currentNode = this.head;
	let ind = 0;
	// 如果删除头部，直接更改头部的引用
	if (index === 0) {
		this.head = currentNode.next;
		return;
	}

	while (currentNode) {
		++ind;
		if (ind === index) {
			if (currentNode.next === this.tail) {
				this.tail = currentNode.next?.next;
			}
			currentNode.next = currentNode.next?.next;
			break;
		}
		currentNode = currentNode.next;
	}

	if (!currentNode?.next) {
		this.tail = currentNode;
	}
};

MyLinkedList.prototype.toArray = function () {
	const nodes = [];
	let currentNode = this.head;
	while (currentNode) {
		nodes.push(currentNode);
		currentNode = currentNode.next;
	}
	return nodes;
};

// 本章注意问题⚠️：addAtIndex/ deleteAtIndex边界值， 最后链表的插入/删除 && 最开始的插入/删除

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

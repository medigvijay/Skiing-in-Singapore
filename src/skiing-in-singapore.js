// Sample Grid of size 4x4

var arr = [[2,1,2,1],[2,7,3,8],[4,1,3,3],[5,8,9,3]];
//4,4
//2,1,2,1
//2,7,3,8
//4,1,3,3
//5,8,9,3

// dimensions
var WIDTH = arr.length;
var HEIGHT = arr[0].length;
//list of trees
var TreeList = [];

// Tree constructos
function Tree(val, row, col) {
	this.value = val;
	this.row = row;
	this.col = col;
	this.eChild = null;
	this.wChild = null;
	this.nChild = null;
	this.sChild = null;
	this.hasChild = false;
	this.root = null;
	this.endPoints = [];
}

/**
* method: getRoot
* returns the height of the node
*/
Tree.prototype.getRoot = function() {
	var curr = this;
	while(curr.root) {
		curr = curr.root;
	}
	return curr;
}

/**
* methos: addChildren
* Add a children to the node
* recursively call addChildren for each child
* @param i(row number of current element)
* @param j(column of current element)
*/
Tree.prototype.addChildren = function(i, j) {
	if((j + 1) < WIDTH && (this.value > arr[i][j + 1])) {
		this.eChild = new Tree(arr[i][j+1], i, j+1);
		this.eChild.root = this;
		this.eChild.addChildren(i, j+1);
	} else {
		this.eChild = null;
	}

	if((j - 1) >= 0 && (this.value > arr[i][j - 1])) {
		this.wChild = new Tree(arr[i][j-1], i, j-1);
		this.wChild.root = this;
		this.wChild.addChildren(i, j-1);

	} else {
		this.wChild = null;
	}

	if((i - 1) >= 0 && (this.value) > arr[i - 1][j]) {
		this.nChild = new Tree(arr[i - 1][j], i-1, j);
		this.nChild.root = this;
		this.nChild.addChildren(i-1, j);

	} else {
		this.nChild = null;
	}

	if((i + 1) < HEIGHT && (this.value > arr[i + 1][j])) {
		this.sChild = new Tree(arr[i+1][j], i+1, j);
		this.sChild.root = this;
		this.sChild.addChildren(i+1, j);

	} else {
		this.sChild = null;
	}


	if(this.eChild || this.wChild || this.nChild || this.sChild) {
		this.hasChild = true;
	}

	if(!this.hasChild) {
		this.getRoot().endPoints.push(this);
	}
};


/**
* method: getHeight
* return the height of the node
* @param: node
*/
Tree.prototype.getHeight = function (node) {
	if(node == null) {
		return 0;
	} else {
		var eDepth = node.getHeight(node.eChild);
		var wDepth = node.getHeight(node.wChild);
		var nDepth = node.getHeight(node.nChild);
		var sDepth = node.getHeight(node.sChild);

		//console.log(eDepth, wDepth, nDepth, sDepth);
		var min = [node.value];
		if(node.eChild && node.eChild.value < node.value) {
			min.push(node.eChild.value);
		}

		if(node.wChild && node.wChild.value < node.value) {
			min.push(node.wChild.value);
		}
		if(node.nChild && node.nChild.value < node.value) {
			min.push(node.nChild.value);
		}
		if(node.sChild && node.sChild.value < node.value) {
			min.push(node.sChild.value);
		}
		if(node && !node.hasChild) {
			node.getRoot().endPoint = Math.min.apply(null, min);
		}
		return Math.max(eDepth, wDepth, nDepth, sDepth) + 1;
	}
};


/**
* function: popu;ate
* Create tree for each element in the grid
*/
function populate() {
	for(var i = 0; i < WIDTH; i++) {
		for(var j = 0; j < HEIGHT; j++) {
			var tree = new Tree(arr[i][j], i, j);
			tree.addChildren(i, j);
			TreeList.push(tree);
		}
	}
}


/**
* function: updateHeight
* update the height of all the trees in the TreeList
*/
function updateHeight() {
	for(var i = 0; i < TreeList.length; i++) {
		var height = TreeList[i].getHeight(TreeList[i]);
		TreeList[i].height = height;
	}
}


/**
* function: getHeighest
* Compare all the trees and return the heighest tree
*/
function getHighest() {
	var heighest = TreeList[0];
	for(var i = 0; i < TreeList.length; i++) {
		var curr = TreeList[i];
		var height = curr.getHeight(curr);

		if(height > heighest.height) {
			heighest = curr;
		} else if(height === heighest.height) {
			if((curr.value - curr.endPoint) > (height.value - heighest.endPoint)) {
				heighest = curr;
			}
		}
	}
	return heighest;
}


populate();

updateHeight();

getHighest();
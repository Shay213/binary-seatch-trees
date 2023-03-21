class BinarySearchTree{
    constructor(array){
        this.array = array.sort((a,b) => a-b).filter((el, i, arr) => arr.indexOf(el) === i);
        this.root = this.buildTree();
    }

    buildTree = (start = 0, end = this.array.length-1) => {
        if(start > end) return null;
        const mid = parseInt((start + end) / 2);
        const node = new Node(this.array[mid]);
        node.left = this.buildTree(start, mid-1);
        node.right = this.buildTree(mid+1, end);
        return node;
    };


    search = (root, value) => {
        if(root === null || root.data === value) return root;
        return value < root.data ? this.search(root.left, value) : this.search(root.right, value);
    };

    insert = (root, value) => {
        if(root === null) return new Node(value);

        value < root.data ? root.left = this.insert(root.left, value) : root.right = this.insert(root.right, value);

        return root;
    };
}

class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const bst = new BinarySearchTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(bst.root);

console.log(bst.insert(bst.root, 2));
prettyPrint(bst.root);
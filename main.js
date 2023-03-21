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

    minValue = root => {
        let minV = root.data;
        while(root.left != null){
            minV = root.left.data;
            root = root.left;
        }
        return minV;
    };

    delete = (root, value) => {
        if(root === null) return root;
        else if(value < root.data) root.left = this.delete(root.left, value);
        else if(value > root.data) root.right = this.delete(root.right, value);
        else{
            //node with only one child
            if(root.left === null) return root.right;
            else if(root.right === null) return root.left;
            
            // node with two children: Get the inOrder successor (smallest in the right subtree)
            root.data = this.minValue(root.right);
            
            // delete the inOrder successor
            root.right = this.delete(root.right, root.data);
        }

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

console.log(bst.delete(bst.root, 67));
prettyPrint(bst.root);

bst.levelOrder(bst.root, el => console.log(el));
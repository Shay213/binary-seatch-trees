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

    levelOrder = (root, callback) => {
        if(root === null) return;
        let queue = [];
        let values = [];
        queue.push(root);
        
        while(!!queue.length){
            const [firstEl] = queue.splice(0,1);
            callback ? callback(firstEl) : values.push(firstEl);
            if(firstEl.left) queue.push(firstEl.left);
            if(firstEl.right) queue.push(firstEl.right);
        }
        if(!callback) return values;
    };

    preOrder = (root, callback, result = []) => {
        if(root === null) return;

        callback ? callback(root) : result.push(root);
        this.preOrder(root.left, callback, result);
        this.preOrder(root.right, callback, result);
        if(!callback) return result;
    };

    inOrder = (root, callback, result = []) => {
        if(root === null) return;

        this.inOrder(root.left, callback, result);
        callback ? callback(root) : result.push(root);
        this.inOrder(root.right, callback, result);
        if(!callback) return result;
    };

    postOrder = (root, callback, result = []) => {
        if(root === null) return;

        this.postOrder(root.left, callback, result);
        this.postOrder(root.right, callback, result);
        callback ? callback(root) : result.push(root);
        if(!callback) return result;
    };

    height = root => {
        if(root === null) return -1;
        
        let right = this.height(root.right);
        let left = this.height(root.left);
        
        right < left ? left++ : right++;

        return left > right ? left:right;
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

console.log(bst.height(bst.root));
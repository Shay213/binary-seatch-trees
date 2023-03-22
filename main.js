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


    search = (value, node=this.root) => {
        if(node === null || node.data === value) return node;
        return value < node.data ? this.search(value, node.left) : this.search(value, node.right);
    };

    insert = (value, node=this.root) => {
        if(node === null) return new Node(value);

        value < node.data ? node.left = this.insert(value, node.left) : node.right = this.insert(value, node.right);

        return node;
    };

    minValue = root => {
        let minV = root.data;
        while(root.left != null){
            minV = root.left.data;
            root = root.left;
        }
        return minV;
    };

    delete = (value, node=this.root) => {
        if(node === null) return node;
        else if(value < node.data) node.left = this.delete(value, node.left);
        else if(value > node.data) node.right = this.delete(value, node.right);
        else{
            if(node.left === null) return node.right;
            else if(node.right === null) return node.left;
            
            node.data = this.minValue(node.right);
            node.right = this.delete(node.data, node.right);
        }

        return node;
    };

    levelOrder = (callback, node=this.root) => {
        if(node === null) return;
        let queue = [];
        let values = [];
        queue.push(node);
        
        while(!!queue.length){
            const [firstEl] = queue.splice(0,1);
            callback ? callback(firstEl) : values.push(firstEl);
            if(firstEl.left) queue.push(firstEl.left);
            if(firstEl.right) queue.push(firstEl.right);
        }
        if(!callback) return values;
    };

    preOrder = (node=this.root, callback) => {
        if(node === null) return [];

        if(callback){
            callback(node);
            this.preOrder(node.left, callback);
            this.preOrder(node.right, callback);
        }else{
            return[
                node,
                ...this.preOrder(node.left),
                ...this.preOrder(node.right),
            ];
        }
    };

    inOrder = (node=this.root, callback) => {
        if(node === null) return [];

        if(callback){
            this.inOrder(node.left, callback);
            callback(node);
            this.inOrder(node.right, callback);
        }else{
            return[
                ...this.inOrder(node.left),
                node,
                ...this.inOrder(node.right),
            ];
        }
    };

    postOrder = (node=this.root, callback) => {
        if(node === null) return [];

        if(callback){
            this.postOrder(node.left, callback);
            this.postOrder(node.right, callback);
            callback(node);
        }else{
            return[
                ...this.postOrder(node.left),
                ...this.postOrder(node.right),
                node,
            ];
        }
    };

    height = (node=this.root, callback) => {
        if(node === null) return -1;
        
        let right = this.height(node.right);
        let left = this.height(node.left);

        if(callback) callback(left, right);

        return Math.max(left, right) + 1;
    };

    depth = (node, currNode=this.root) => {
        if(currNode === null || currNode.data === node.data) return 0;
    
        let sum = node.data < currNode.data ? this.depth(node, currNode.left) : this.depth(node, currNode.right);

        return ++sum;
    };

    isBalanced = (node=this.root) => {
        if(node === null) return true;

        let balanced = true;
        this.height(node, (left, right) => {
            if(left === false || right === false || Math.abs(left-right) >= 2){
                balanced = false;
                return;
            }
        });
        return balanced;
    };

    reBalance = () => {
        let arr = [];
        this.inOrder(this.root, node => arr.push(node.data));
        this.array = arr.filter((el, i, arr) => arr.indexOf(el) === i);
        this.root = this.buildTree();
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
bst.insert(6);
bst.insert(5);
prettyPrint(bst.root);

bst.reBalance();


prettyPrint(bst.root);
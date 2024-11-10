class Node {
  value;
  parent;
  left; right;

  constructor(left, right, value) {
    this.left = left;
    this.right = right;
    this.value = value;
  }

  isLeaf() {
    return (this.left == null && this.right == null);
  }
}

class Tree {

  root;

  constructor(node) {
    if (typeof node === "string")
      node = this.parser(node.replaceAll(" ", ""));
    this.root = node;
  }

  #parseChild(s) {    if (s == "}") return [null, null];
    let open = 0;
    let close = 0;
    let end = 0;
    let c = 0;

    for(let i = s.indexOf("{"); i != s.length; i++) {
      c = s.charAt(i);
      if (c == "{")
        open++;
      if (c == "}")
        close++;
      if (open == close) {
        end = i+1;
        break;
      }
    }

    let l = this.parser(s.substring(0, end));
    let r = this.parser(s.substring(end, s.length-1));
    return [l, r];
  }

  parser(s) {
    if (s == "{}") return null;
    let n = new Node();
    n.parent = null;
    let v = parseInt(s);
    n.value = v;
    [n.left, n.right] = this.#parseChild(s.substring(s.indexOf("{")+1,));
    if (n.left != null) n.left.parent = n;
    if (n.right != null) n.right.parent = n;
    return n;
  }



  displayOnHTML() {
    let display = document.getElementsByClassName("display");

    let currenLevel = document.createElement("div");

    let currentNode = document.createElement("div");

  }
}

/*
 *    0
 *  1   1
 * 3 3   2
 *
 * 0 {1 { 3{} 3{} } 1 { {} 2{} }}
 */


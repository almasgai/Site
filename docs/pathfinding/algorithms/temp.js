function Node(x, y) {
  this.x = x;
  this.y = y;
}

Node.prototype.square_x = function () {
  return this.x * this.x;
};
Node.prototype.square_y = function () {
  return this.y * this.y;
};

Node.prototype.sum_of_square = function () {
  return this.square_y() + this.square_x();
};

Node.prototype.say_hello = function () {
  console.log(this.x, this.y);
};

let node = new Node(3, 4);
console.log(node.sum_of_square());
console.log(node["sum_of_square"]());
console.log(node["x"]);
console.log(node.x);

node.say_hello();

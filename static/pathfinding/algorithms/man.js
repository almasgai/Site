function Node(to, from) {
  this.to = to;
  this.from = from;
  this.manhatten_distance = this.get_to() + this.get_from();
  this._manhatten_distance = function () {
    return this.get_to() + this.get_from();
  };
  this.__manhatten_distance = function () {
    return this.to + this.from;
  };
}

Node.prototype.get_to = function () {
  return this.to;
};

Node.prototype.get_from = function () {
  return this.from;
};

Node.prototype.set_to = function (new_value) {
  this.to = new_value;
};

Node.prototype.set_from = function (new_value) {
  this.from = new_value;
};

let node = new Node(5, 5);

console.log(node["manhatten_distance"]);
node.set_to(100);
console.log(node["manhatten_distance"]);
console.log(node["_manhatten_distance"]());
node.set_to(-9);
console.log(node["__manhatten_distance"]());

let s = new Set();
s.add(node);
if (!s.has(node)) console.log("not in ");
else console.log("in");

if (!s.has("goose")) console.log("no goose here");

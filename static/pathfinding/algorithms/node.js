export default function Node(i, j, color) {
  this.x = i; // row in grid
  this.y = j; // column in grid
  this.color = color; // color of square
  this.previous_node = undefined; // state the previous node that points to this node
  this.cost = Node.prototype.lookup[color]; // costs (not including distance)
  this.able_to_visit = color == "gray" ? false : true; // is it possible to visit this node
  this.end = this.is_end();
  this.start = this.is_start();
  this.from_start = this.to_start() + this.cost;
  this.from_end = this.to_goal() + this.cost;
  this.distance = this.get_distance(); // weight + incoming node distance. Initially set to Infinity
  this.manhatten_distance = this.to_goal() + this.get_distance(); // Functions because these values may be updated
}

Node.prototype.lookup = {
  red: 0,
  green: 0,
  white: 1,
  black: 10,
  gray: Infinity,
};

// Retrieves cost if cost is updated
Node.prototype.get_cost = function () {
  return this.cost;
};

Node.prototype.get_distance = function () {
  if (this.is_start()) {
    return 0;
  }
  if (this.previous_node == undefined) {
    return this.cost;
  }
  return this.cost + this.previous_node.distance;
};

Node.prototype.to_goal = function () {
  return Math.abs(this.x - end_row) + Math.abs(this.y - end_col);
};

Node.prototype.to_start = function () {
  return Math.abs(this.x - start_row) + Math.abs(this.y - start_col);
};

Node.prototype.update_distance = function (new_distance) {
  this.distance = new_distance;
};

Node.prototype.set_previous = function (previous_node) {
  this.previous_node = previous_node;
};

Node.prototype.is_end = function () {
  return this.x == end_row && this.y == end_col;
};

Node.prototype.is_start = function () {
  return this.x == start_row && this.y == start_col;
};

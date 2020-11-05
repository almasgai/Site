export function Node(i, j, color) {
  /*
   * How to find actual path using Dijkstra?
   * Follow the backward previous_node pointer from end node
   * until you get to the start node.
   * Probably have to do this for all algorithms if you
   * want final path.
   */
  this.x = i; // row in grid
  this.y = j; // column in grid
  this.color = color; // color of square
  this.distance = Infinity; // weight + incoming node distance
  this.previous_node = {}; // state the previous node that points to this node
  this.cost = Node.prototype.lookup[color]; // costs (not including distance)
  this.able_to_visit = color == "gray" ? false : true; // is it possible to visit this node
}

Node.prototype.lookup = {
  white: 1,
  black: 10,
  gray: Infinity
};

Node.prototype.to_goal = function () {
  return Math.abs(this.x - end_row) + Math.abs(this.y - end_col); // TODO: How will this be updated when end node changese.to_goal(){
};

Node.prototype.to_start = function () {
  return Math.abs(this.x - start_row) + Math.abs(this.y - start_col); // TODO: How will this be updated when end node changese.to_goal(){
};

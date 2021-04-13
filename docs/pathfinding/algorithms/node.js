export default function Node(row, col, color) {
  this.id = `${row} ${col}`;
  this.row = row;
  this.col = col;
  this.color = color; // color of square
  this.cost = Node.prototype.lookup[color];
  this.is_wall = color == "gray" ? true : false;
  this.from_start =
    Math.abs(this.row - start_row) + Math.abs(this.col - start_col);
  this.from_end = Math.ceil(
    Math.abs(this.row - end_row) + Math.abs(this.col - end_col)
  );
  this.a_star_heuristic = Infinity; // this.g() + this.h();
  this.is_start = this.row == start_row && this.col == start_col;
  this.is_end = this.row == end_row && this.col == end_col;
  this.distance_so_far = this.is_start ? 0 : Infinity;
}

Node.prototype.lookup = {
  red: 0,
  green: 0,
  white: 1,
  black: 10,
  gray: Infinity,
};

Node.prototype.get_neighbors = function () {
  let up = [this.row - 1, this.col];
  let right = [this.row, this.col + 1];
  let down = [this.row + 1, this.col];
  let left = [this.row, this.col - 1];

  let valid_neighbors = [];

  for (let neighbor of [up, down, left, right /*ul, ur, dl, dr*/]) {
    let row = neighbor[0];
    let col = neighbor[1];
    if (
      row < 0 ||
      col < 0 ||
      row >= grid.length ||
      col >= grid[0].length ||
      document.getElementById(`${row} ${col}`).style.background == "gray"
    ) {
      continue;
    }
    valid_neighbors.push(neighbor);
  }
  return valid_neighbors;
};

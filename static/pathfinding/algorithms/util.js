import Node from "./node.js";

export function get_node(i, j, visited) {
  // If indexes are out of range or node has already been visited, return
  if (
    i < 0 ||
    j < 0 ||
    i >= grid.length ||
    j >= grid[0].length ||
    visited.has([i, j].toString()) ||
    document.getElementById(`${i} ${j}`).style.backgroundColor == "gray"
  ) {
    return undefined;
  }
  return [i, j];
}

export function get_node_no_set(i, j) {
  // If indexes are out of range or node has already been visited, return
  if (
    i < 0 ||
    j < 0 ||
    i >= grid.length ||
    j >= grid[0].length ||
    document.getElementById(`${i} ${j}`).style.backgroundColor == "gray"
  ) {
    return undefined;
  }
  return [i, j];
}

export function all_neighbors_visited(i, j) {
  function _all_neighbors_visited(row, col) {
    return document.getElementById(`${row} ${col}`).style.backgroundColor ==
      "white"
      ? false
      : true;
  }

  // Check to see if there exists an unvisited neighbor:
  // up, down, left, and right
  return (
    _all_neighbors_visited(i - 1, j) &&
    _all_neighbors_visited(i + 1, j) &&
    _all_neighbors_visited(i, j - 1) &&
    _all_neighbors_visited(i, j + 1)
  );
}

export function pause(speed) {
  return new Promise((resolve) => setTimeout(resolve, speed));
}

export function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export function get_map() {
  let distances = [];
  for (let row = 0; row < rows; row++) {
    let temp = [];
    for (let col = 0; col < columns; col++) {
      let color = document.getElementById(`${row} ${col}`).style
        .backgroundColor;
      temp.push(new Node(row, col, color));
    }
    distances.push(temp);
  }
  return distances;
}

export function set_color(id, color) {
  document.getElementById(id).style.backgroundColor = color;
}

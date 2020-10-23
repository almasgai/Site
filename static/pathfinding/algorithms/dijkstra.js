import { pause } from "../eventlisteners";
import { get_node } from ".util.js";

async function Dijsktra() {
  // Create costs hash map -> already done through 2D array grid
  // Create parent array /  map
  // Create graph where graph is a hash map from point
  // A to B with weight W: graph['a']['b'] = w

  let queue = [[start_row, start_col]];

  while (queue.length) {
    let node = queue.shift();
    let row = node[0];
    let col = node[1];

    let up = get_node(row - 1, col, visited);
    let right = get_node(row, col + 1, visited);
    let down = get_node(row + 1, col, visited);
    let left = get_node(row, col - 1, visited);

    for (let node of [up, down, left, right]) {
      if (node) {
        let row = parseInt(node[0]);
        let col = parseInt(node[1]);

        if (grid[row][col] == 3) return;

        document.getElementById(`${row} ${col}`).style.backgroundColor =
          "lightgreen";

        await pause(25);
      }
    }
    for (let node of [up, right, down, left]) {
    }
  }
}

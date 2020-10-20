import { pause } from "../eventlisteners.js";
import { get_node } from "./util.js";

async function BFS() {
  if (start_row == end_row && start_col == end_col) return;

  let visited = new Set();
  visited.add([start_row, start_col].toString());
  let queue = [[start_row, start_col]];

  while (queue.length) {
    let node = queue.shift();
    let row = node[0];
    let col = node[1];

    let up = get_node(row - 1, col, visited);
    let right = get_node(row, col + 1, visited);
    let down = get_node(row + 1, col, visited);
    let left = get_node(row, col - 1, visited);

    for (let node of [up, right, down, left]) {
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
      if (node) {
        visited.add(node.toString());

        let row = parseInt(node[0]);
        let col = parseInt(node[1]);

        if (grid[row][col] == 3) {
          // Draw path from start to finish
          // draw_path()
          return;
        } else {
          document.getElementById(`${row} ${col}`).style.backgroundColor =
            "lightblue";

          await pause(5);

          queue.push(node);
        }
      }
    }
  }
}

export default BFS;

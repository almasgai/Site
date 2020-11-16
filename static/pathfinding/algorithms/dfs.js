import { get_node, pause } from "./util.js";

async function DFS() {
  let visited = new Set();
  visited.add([start_row, start_col].toString());

  let traversal = [];

  async function _DFS(i, j) {
    if (
      i < 0 ||
      j < 0 ||
      i >= grid.length ||
      j >= grid[0].length ||
      grid[i][j] == 1 ||
      visited.has([i, j].toString()) ||
      document.getElementById(`${i} ${j}`).style.backgroundColor == "lightblue"
    ) {
      return;
    }

    if (
      grid[i][j] == 3 ||
      document.getElementById(`${i} ${j}`).style.backgroundColor == "green"
    ) {
      traversal.push([i, j]);
      return true;
    }

    visited.add([i, j].toString());
    await pause(time);
    document.getElementById(`${i} ${j}`).style.backgroundColor = "lightgreen";
    await pause(time);
    document.getElementById(`${i} ${j}`).style.backgroundColor = "lightblue";

    traversal.push([i, j]);

    let neighbors = [
      get_node(i - 1, j, visited),
      get_node(i + 1, j, visited),
      get_node(i, j - 1, visited),
      get_node(i, j + 1, visited)
    ];

    for (let neighbor of neighbors) {
      if (!neighbor) continue;
      let row = neighbor[0];
      let col = neighbor[1];
      if (
        document.getElementById(`${row} ${col}`).style.backgroundColor ==
        "green"
      ) {
        traversal.push([row, col]);
        return true;
      }
    }

    // If at any point get_neighbor returns true, the end node has been found
    // and the algorithm can be stopped.
    if (
      (await _DFS(i, j + 1, visited)) ||
      (await _DFS(i - 1, j, visited)) ||
      (await _DFS(i + 1, j, visited)) ||
      (await _DFS(i, j - 1, visited))
    ) {
      return true;
    }
  }
  if (
    (await _DFS(start_row, start_col + 1, visited)) ||
    (await _DFS(start_row - 1, start_col, visited)) ||
    (await _DFS(start_row + 1, start_col, visited)) ||
    (await _DFS(start_row, start_col - 1, visited))
  ) {
    // Color in traversal path up but not including destination node
    await pause(time);
    for (let k = 0; k < traversal.length - 1; k++) {
      let row = traversal[k][0];
      let col = traversal[k][1];
      document.getElementById(`${row} ${col}`).style.backgroundColor = "yellow";
      await pause(time);
    }
  }
}

export default DFS;

import { get_node, pause } from "./util.js";

async function DFS() {
  let visited = new Set();
  visited.add([start_row, start_col].toString());

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
      // TODO: Draw path froms tart to finish
      // draw_path()
      return true;
    }

    visited.add([i, j].toString());
    await pause(time);
    document.getElementById(`${i} ${j}`).style.backgroundColor = "lightgreen";
    await pause(time);
    document.getElementById(`${i} ${j}`).style.backgroundColor = "lightblue";

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
    return;
  }
}

export default DFS;

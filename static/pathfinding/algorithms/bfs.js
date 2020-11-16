import { get_node, pause } from "./util.js";

async function BFS() {
  let visited = new Set();
  visited.add([start_row, start_col].toString());
  let queue = [[start_row, start_col]];

  // Key: current node
  // Value: previous node
  let parent = {};
  parent[[start_row, start_col]] = undefined;

  let done = false;

  while (!done && queue.length) {
    let node = queue.shift();
    let row = node[0];
    let col = node[1];

    let up = get_node(row - 1, col, visited);
    let right = get_node(row, col + 1, visited);
    let down = get_node(row + 1, col, visited);
    let left = get_node(row, col - 1, visited);

    for (let neighbor of [up, right, down, left]) {
      if (!neighbor || visited.has(neighbor.toString())) {
        continue;
      }

      visited.add(neighbor.toString());

      let row = parseInt(neighbor[0]);
      let col = parseInt(neighbor[1]);

      if (!(start_row == row && start_col == col)) {
        document.getElementById(`${row} ${col}`).style.backgroundColor =
          "lightgreen";

        await pause(time);

        document.getElementById(`${row} ${col}`).style.backgroundColor =
          "lightblue";
      }

      queue.push(neighbor);
      if (!parent[neighbor]) {
        parent[neighbor] = node;
      }

      let up = get_node(row - 1, col, visited);
      let right = get_node(row, col + 1, visited);
      let down = get_node(row + 1, col, visited);
      let left = get_node(row, col - 1, visited);

      for (let non of [up, right, down, left]) {
        if (non) {
          let row = non[0];
          let col = non[1];
          if (
            document.getElementById(`${row} ${col}`).style.backgroundColor ==
            "green"
          ) {
            parent[[row, col]] = neighbor;
            done = true;
            break;
          }
        }
      }
    }
  }

  let key = [end_row, end_col];
  let traversal = [];
  let pointer = parent[key];

  // Reverse lookup parent to get from the destination to source node
  while (pointer) {
    traversal.push(pointer);
    pointer = parent[pointer];
  }

  console.log(parent);
  console.log(traversal);

  // Print out the traversal path
  for (let i = traversal.length - 2; i >= 0; i--) {
    let row = traversal[i][0];
    let col = traversal[i][1];
    document.getElementById(`${row} ${col}`).style.backgroundColor = "yellow";
    await pause(time);
  }
}

export default BFS;

import { get_node_no_set, pause, all_neighbors_visited } from "./util.js";
import * as pq from "./priority_queue.js";
import Node from "./node.js";

async function Dijkstra() {
  // Priority queue of nodes to be visited
  let priority_queue = [];
  let distances = [];

  // Hold distances from start to each node
  for (let row = 0; row < rows; row++) {
    let temp = [];
    for (let col = 0; col < columns; col++) {
      let color = document.getElementById(`${row} ${col}`).style
        .backgroundColor;
      temp.push(new Node(row, col, color));
    }
    distances.push(temp);
  }

  // Distances to all nodes in graph
  let visited = new Set();
  visited.add([start_row, start_col].toString());

  let done = false;

  // Additional cost to get to this node
  distances[start_row][start_col].cost = 0;
  // Cumulative cost to get to this node
  distances[start_row][start_col].distance = 0;

  // Add distance node to priority queue
  pq.add_node(priority_queue, distances[start_row][start_col], "distance");
  distances[start_row][start_col].previous_node = undefined;

  while (!done && priority_queue.length) {
    let node = pq.pop_min(priority_queue, "distance");
    let row = node.x;
    let col = node.y;

    // Get the total distance of node
    let prev_cost = node.distance;

    // Get neighbors of node. Note there is not set passed because nodes
    // need to be re-visited to find better paths.
    let up = get_node_no_set(row - 1, col);
    let right = get_node_no_set(row, col + 1);
    let down = get_node_no_set(row + 1, col);
    let left = get_node_no_set(row, col - 1);

    for (let neighbor of [up, right, down, left]) {
      if (!neighbor || visited.has([neighbor[0], neighbor[1]].toString())) {
        continue;
      }

      // Get neighbors row, column, and color to look them up in the
      // distances array
      let row = neighbor[0];
      let col = neighbor[1];

      if (
        document.getElementById(`${row} ${col}`).style.backgroundColor ==
        "green"
      ) {
        distances[row][col].set_previous(distances[node.x][node.y]);
        done = true;
        break;
      }

      // Get cost of visited node (default is infinity)
      let cost = distances[row][col].cost;

      // Update distance if a shorter path is found
      if (prev_cost + cost < distances[row][col].distance) {
        distances[row][col].distance = prev_cost + cost;
        distances[row][col].set_previous(distances[node.x][node.y]);
      }

      document.getElementById(`${row} ${col}`).style.backgroundColor =
        "lightgreen";

      await pause(time);

      document.getElementById(`${row} ${col}`).style.backgroundColor =
        "lightblue";

      if (!visited.has([row, col].toString())) {
        pq.add_node(
          priority_queue,
          distances[neighbor[0]][neighbor[1]],
          "distance"
        );
        visited.add([row, col].toString());
      }
    }
  }

  let traversal = [];
  let pointer = distances[end_row][end_col];

  while (pointer) {
    console.log(pointer);
    traversal.push([pointer.x, pointer.y]);
    pointer = pointer.previous_node;
  }

  for (let i = traversal.length - 2; i >= 1; i--) {
    let row = traversal[i][0];
    let col = traversal[i][1];
    document.getElementById(`${row} ${col}`).style.backgroundColor = "yellow";
    await pause(time);
  }
}

export default Dijkstra;

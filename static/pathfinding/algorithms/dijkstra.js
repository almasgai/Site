import { get_node_no_set, pause, all_neighbors_visited } from "./util.js";
import * as pq from "./priority_queue.js";
import { Node } from "./node.js";

async function Dijsktra() {
  // Priority queue of nodes to be visited
  let priority_queue = [];

  let distances = [];
  // Distances to all nodes in graph
  let visited = new Set();
  visited.add([start_row, start_col].toString());

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

  // Additional cost to get to this node
  distances[start_row][start_col].cost = 0;
  // Cumulative cost to get to this node
  distances[start_row][start_col].distance = 0;

  // Add distance node to priority queue
  priority_queue.push(distances[start_row][start_col]);

  while (priority_queue.length > 0) {
    let node = pq.pop_min(priority_queue);
    let row = node.x;
    let col = node.y;

    // Get the total distance of node
    let prev = node.distance;

    // Get neighbors of node. Note there is not set passed because nodes
    // need to be re-visited to find better paths.
    let up = get_node_no_set(row - 1, col);
    let right = get_node_no_set(row, col + 1);
    let down = get_node_no_set(row + 1, col);
    let left = get_node_no_set(row, col - 1);

    for (let neighbor of [up, right, down, left]) {
      if (!neighbor || visited.has([neighbor[0], neighbor[1]].toString()))
        continue;

      // Get neighbors row, column, and color to look them up in the
      // distances array
      let row = neighbor[0];
      let col = neighbor[1];

      if (
        document.getElementById(`${row} ${col}`).style.backgroundColor ==
        "green"
      )
        return;

      if (
        document.getElementById(`${row} ${col}`).style.backgroundColor ==
        "lightblue"
      )
        continue;
      // If all the nodes neighbors have been visited, add it to the visited
      // set and color the node blue

      // Perhaps change this?
      if (all_neighbors_visited(row, col)) {
        document.getElementById(`${row} ${col}`).style.backgroundColor =
          "lightblue";
        visited.add([row, col].toString());
        continue;
      }

      document.getElementById(`${row} ${col}`).style.backgroundColor =
        "lightgreen";

      await pause(50);

      document.getElementById(`${row} ${col}`).style.backgroundColor =
        "lightblue";

      // Get cost of visited node (default is infinity)
      let cost = distances[row][col].cost;

      // Update distance if a shorter path is found
      if (prev + cost < distances[row][col].distance) {
        distances[row][col].distance = prev + cost;
      }

      let neighbors = [
        document.getElementById(`${row - 1} ${col}`).style.backgroundColor,
        document.getElementById(`${row + 1} ${col}`).style.backgroundColor,
        document.getElementById(`${row} ${col - 1}`).style.backgroundColor,
        document.getElementById(`${row} ${col + 1}`).style.backgroundColor
      ];

      for (let neighbor of neighbors) {
        if (neighbor == "green") return;
      }

      pq.add_node(priority_queue, distances[row][col]);
    }
  }
}

export default Dijsktra;

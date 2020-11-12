import { get_node_no_set, pause, all_neighbors_visited } from "./util.js";
import * as pq from "./priority_queue.js";
import Node from "./node.js";

async function Dijsktra() {
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

  while (priority_queue.length > 0) {
    if (done) break;
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
        distances[row][col].set_previous(node);
        done = true;
        break;
      }

      // If all the nodes neighbors have been visited, add it to the visited
      // set and color the node blue
      if (all_neighbors_visited(row, col)) {
        document.getElementById(`${row} ${col}`).style.backgroundColor =
          "lightblue";
        visited.add([row, col].toString());
        continue;
      }

      document.getElementById(`${row} ${col}`).style.backgroundColor =
        "lightgreen";

      await pause(1);

      document.getElementById(`${row} ${col}`).style.backgroundColor =
        "lightblue";

      // Get cost of visited node (default is infinity)
      let cost = distances[row][col].cost;

      // Update distance if a shorter path is found
      if (prev_cost + cost < distances[row][col].distance) {
        distances[row][col].distance = prev_cost + cost;
        distances[row][col].set_previous(node);
      }

      let neighbors = [
        document.getElementById(`${row - 1} ${col}`).style.backgroundColor,
        document.getElementById(`${row + 1} ${col}`).style.backgroundColor,
        document.getElementById(`${row} ${col - 1}`).style.backgroundColor,
        document.getElementById(`${row} ${col + 1}`).style.backgroundColor
      ];

      /*
      for (let neighbor of neighbors) {
        if (neighbor == "green") break;
      }
      */
    }

    /*
     * So here was the issue: I updated the nodes and added them to the queue...
     * one by one. This cause one node to be updated and added to the queue
     * while the other nodes were waiting to be updated. Instead, I needed to
     * update all the nodes first before adding them all the the queue. That way
     * it was fair among the nodes.
     */
    for (let neighbor of [up, right, down, left]) {
      if (neighbor) {
        if (visited.has([neighbor[0], neighbor[1]].toString())) continue;
        neighbor.previous_node = node;
        pq.add_node(
          priority_queue,
          distances[neighbor[0]][neighbor[1]],
          "distance"
        );
      }
    }
  }

  /*
  let traversal = [];
  let pointer = distances[end_row][end_col];

  while (pointer) {
    traversal.push([pointer.x, pointer.y]);
    pointer = pointer.previous_node;
  }

  for (let i = traversal.length - 2; i >= 1; i--) {
    let row = traversal[i][0];
    let col = traversal[i][1];
    document.getElementById(`${row} ${col}`).style.backgroundColor = "yellow";
    await pause(30);
  }
  */
}

export default Dijsktra;

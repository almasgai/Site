import { get_node_no_set, pause, all_neighbors_visited } from "./util.js";
import * as pq from "./priority_queue.js";
import Node from "./node.js";

async function AStar() {
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

  let priority_queue = [];
  let start = distances[start_row][start_col];
  let start_id = `${start.x} ${start.y}`;
  pq.add_node(priority_queue, start, "manhatten_distance");

  let came_from = Object();
  let cost_so_far = Object();
  came_from[start_id] = undefined;
  cost_so_far[start_id] = 0;
  let done = false;

  // Queue is not empty. Or break after end node has be dequeued
  while (priority_queue.length) {
    // Get the next viable node. Using this node, get it's neighbors
    let node = pq.pop_min(priority_queue, "manhatten_distance");
    if (node.is_end()) {
      done = true;
      break;
    }

    let row = node.x;
    let col = node.y;

    let neighbors = [
      get_node_no_set(row - 1, col),
      get_node_no_set(row, col + 1),
      get_node_no_set(row + 1, col),
      get_node_no_set(row, col - 1),
    ];

    for (let next of neighbors) {
      if (next === undefined) continue;
      let next_id = `${next[0]} ${next[1]}`;
      next = distances[next[0]][next[1]];

      /*
      if (!next.is_start() || !next.is_end()) {
        document.getElementById(next_id).style.backgroundColor = "lightgreen";
        await pause(time);
        document.getElementById(next_id).style.backgroundColor = "lightblue";
      }
      */

      let new_cost = node.distance + next.cost;
      if (!(next_id in cost_so_far) || new_cost < cost_so_far[next_id]) {
        cost_so_far[next_id] = new_cost;
        pq.add_node(priority_queue, next, "manhatten_distance");
        came_from[next_id] = node;
      }
    }
  }

  if (!done) {
    // Unable to reach end goal. Just stop the algorithm from running.
    return;
  }

  let pointer = distances[end_row][end_col];
  let traversal = [];

  console.log("pointer", pointer);

  while (!pointer.is_start()) {
    let id = `${pointer.x} ${pointer.y}`;
    pointer = came_from[id];
    console.log(pointer);
    traversal.push([pointer.x, pointer.y]);
  }

  traversal = traversal.reverse();
  for (let i = 1; i < traversal.length; i++) {
    let row = traversal[i][0];
    let col = traversal[i][1];
    document.getElementById(`${row} ${col}`).style.backgroundColor = "yellow";
    await pause(time);
  }
}

export default AStar;

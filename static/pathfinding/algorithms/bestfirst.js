import {
  get_node_no_set,
  pause,
  all_neighbors_visited,
  get_map,
  set_color,
} from "./util.js";
import * as pq from "./priority_queue.js";

async function BestFirst() {
  let priority_queue = [];
  let done = false;

  let distances = get_map();
  let start_node = distances[start_row][start_col];
  pq.add_node(priority_queue, start_node, "from_end");

  let came_from = new Object();
  came_from[start_node.id] = undefined;

  let closed_set = new Set();

  // Queue is not empty. Or break after end node has be dequeued
  while (priority_queue.length) {
    // Get the next viable node. Using this node, get it's neighbors
    let node = pq.pop_min(priority_queue, "from_end");

    console.log(`Curr node: ${node["from_end"]}`);
    for (let n of priority_queue) {
      console.log(`Distance to end: ${n.from_end} ID: ${n.id}`);
    }
    console.log("\n\n\n\n");

    // First check to see if one of the neighbors neighbors is the end node
    for (let square of node.get_neighbors()) {
      let i = square[0];
      let j = square[1];
      let neighbor = distances[i][j];

      if (neighbor.is_end) {
        came_from[neighbor.id] = node.id;
        done = true;
        break;
      }

      if (neighbor.id in closed_set) {
        continue;
      }

      // if (!(id in came_from) && !neighbor.is_wall) {
      if (!neighbor.is_start && !neighbor.is_wall) {
        if (neighbor.is_end) {
          done = true;
          came_from[neighbor.id] = node.id;
          break;
        }

        if (!(neighbor.id in came_from) && !(neighbor.id in closed_set)) {
          set_color(neighbor.id, "lightgreen");
          await pause(time);
          set_color(neighbor.id, "lightblue");
          pq.add_node(priority_queue, neighbor, "from_end");
          came_from[neighbor.id] = node.id;
        }
      }
    }

    if (all_neighbors_visited(node.row, node.col)) {
      closed_set.add(node.id);
    }

    if (done) {
      break;
    }
  }

  if (!done) {
    return;
  }

  let key = distances[end_row][end_col].id;
  let pointer = came_from[key];
  let traversal = [];
  console.log(pointer);

  while (pointer) {
    console.log(pointer);
    traversal.push(pointer.split(" "));
    pointer = came_from[pointer];
  }

  traversal = traversal.reverse();
  for (let i = 1; i < traversal.length; i++) {
    let row = traversal[i][0];
    let col = traversal[i][1];
    set_color(`${row} ${col}`, "yellow");
    await pause(time);
  }
}

export default BestFirst;

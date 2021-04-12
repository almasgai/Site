import {
  get_node_no_set,
  pause,
  all_neighbors_visited,
  get_map,
  set_color,
  no_traversal,
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

    if (node.is_end) {
      done = true;
      break;
    }

    if (closed_set.has(node.id)) {
      continue;
    }

    for (let neighbor of node.get_neighbors()) {
      let n = distances[neighbor[0]][neighbor[1]];
      if (!(n.id in came_from) && !n.is_wall) {
        pq.add_node(priority_queue, n, "from_end");
        came_from[n.id] = node.id;

        if (!n.is_end) {
          set_color(n.id, "lightgreen");
          await pause(time);
          set_color(n.id, "lightblue");
        }
      }
    }

    if (all_neighbors_visited(node.row, node.col)) {
      closed_set.add(node.id);
    }
  }

  if (!done) {
    no_traversal();
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

import {
  get_node_no_set,
  pause,
  all_neighbors_visited,
  get_map,
  set_color,
  no_traversal,
} from "./util.js";
import * as pq from "./priority_queue.js";
import Node from "./node.js";

async function Dijkstra() {
  /* Dijkstra:
   * Start off with an intial node in the priority queue. While the queue
   * is not empty, pop off the min values and see if the popped off value
   * is the goal. If it is, you are done. If not, search the neighboring
   * nodes of the popped off node. If they are not in came_from or if the
   * cost of reaching that node plus the popped off nodes distance so far
   * if less than neighbors distance so far, update both distance so far
   * and came_from as well as pushing the neighbor onto the priority queue
   * with it's new value.
   */
  let done = false;
  let map = get_map();
  let start = map[start_row][start_col];
  let goal = map[end_row][end_col];
  let came_from = new Object();
  let distance_so_far = new Object();
  came_from[start.id] = undefined;
  distance_so_far[start.id] = 0;
  let priority_queue = [];
  pq.add_node(priority_queue, start, "distance_so_far");

  let closed_set = new Set();

  while (priority_queue.length) {
    let current_node = pq.pop_min(priority_queue, "distance_so_far");

    if (current_node.is_end) {
      done = true;
      break;
    }

    if (closed_set.has(current_node.id)) {
      continue;
    }

    for (let neighbor of current_node.get_neighbors()) {
      let n = map[neighbor[0]][neighbor[1]];
      let new_distance = n.cost + distance_so_far[current_node.id];

      if (!(n.id in came_from)) {
        set_color(n.id, "lightgreen");
        await pause(time);
        set_color(n.id, "lightblue");
      }

      if (new_distance < n.distance_so_far) {
        distance_so_far[n.id] = new_distance;
        came_from[n.id] = current_node.id;
        n.distance_so_far = new_distance;
        pq.add_node(priority_queue, n, "distance_so_far");
      }
    }

    if (all_neighbors_visited(current_node.row, current_node.col)) {
      closed_set.add(current_node.id);
    }
  }

  if (!done) {
    no_traversal();
    return;
  }

  let pointer = came_from[goal.id];
  let traversal = [];

  while (pointer != start.id) {
    traversal.push(pointer);
    pointer = came_from[pointer];
  }

  traversal.reverse();

  for (let i = 0; i < traversal.length; i++) {
    set_color(traversal[i], "yellow");
    await pause(time);
  }
}

export default Dijkstra;

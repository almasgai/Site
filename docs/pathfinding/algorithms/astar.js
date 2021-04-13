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

async function AStar() {
  let done = false;
  let map = get_map();
  let start = map[start_row][start_col];
  let goal = map[end_row][end_col];
  let came_from = new Object();
  let distance_so_far = new Object();
  came_from[start.id] = undefined;
  distance_so_far[start.id] = 0;
  start.a_star_heuristic = 0;
  let priority_queue = [];
  pq.add_node(priority_queue, start, "a_star_heuristic");

  let closed_set = new Set();

  while (priority_queue.length) {
    let current_node = pq.pop_min(priority_queue, "a_star_heuristic");

    if (current_node.is_end) {
      done = true;
      break;
    }

    if (closed_set.has(current_node.id)) {
      // continue;
    }

    for (let neighbor of current_node.get_neighbors()) {
      let n = map[neighbor[0]][neighbor[1]];
      let new_distance = n.cost + distance_so_far[current_node.id];

      if (!(n.id in came_from)) {
        set_color(n.id, "lightgreen");
        await pause(time);
        set_color(n.id, "lightblue");
      }

      if (!(n.id in distance_so_far) || new_distance < n.distance_so_far) {
        distance_so_far[n.id] = new_distance;
        came_from[n.id] = current_node.id;
        n.a_star_heuristic = new_distance + n.from_end;
        pq.add_node(priority_queue, n, "a_star_heuristic");
      }
    }

    if (all_neighbors_visited(current_node.row, current_node.col)) {
      closed_set.add(current_node.id);
    }
  }

  console.log("Done algo");

  if (!done) {
    no_traversal();
    return;
  }

  let pointer = came_from[goal.id];
  let traversal = [];
  let i = 0;

  while (i < 10 && pointer) {
    console.log(pointer);
    traversal.push(pointer);
    pointer = came_from[pointer];
    i++;
  }

  traversal.reverse();

  for (let i = 0; i < traversal.length; i++) {
    set_color(traversal[i], "yellow");
    await pause(time);
  }
}

export default AStar;

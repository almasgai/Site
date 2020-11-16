import { get_node, pause } from "./util.js";

async function Bidirectional() {
  if (start_row == end_row && start_col == end_col) return;

  let start_visited = new Set();
  let end_visited = new Set();

  start_visited.add([start_row, start_col].toString());
  end_visited.add([end_row, end_col].toString());

  let start_queue = [[start_row, start_col]];
  let end_queue = [[end_row, end_col]];

  let start_traversal = {};
  let end_traversal = {};

  start_traversal[[start_row, start_col]] = undefined;
  end_traversal[[end_row, end_col]] = undefined;

  while (start_queue.length && end_queue.length) {
    let start_node = start_queue.shift();
    let end_node = end_queue.shift();

    if (start_node) {
      let row = start_node[0];
      let col = start_node[1];

      let up = get_node(row - 1, col, start_visited);
      let right = get_node(row, col + 1, start_visited);
      let down = get_node(row + 1, col, start_visited);
      let left = get_node(row, col - 1, start_visited);

      for (let node of [up, right, down, left]) {
        if (node) {
          let row = parseInt(node[0]);
          let col = parseInt(node[1]);

          // If two paths cross
          if (end_visited.has(node.toString())) {
            return;
          }

          if (start_visited.has(node.toString())) continue;
          start_visited.add(node.toString());

          start_traversal[node] = start_node;

          document.getElementById(`${row} ${col}`).style.backgroundColor =
            "lightgreen";

          await pause(time);
        }
      }

      for (let node of [up, right, down, left]) {
        if (node) {
          let row = parseInt(node[0]);
          let col = parseInt(node[1]);

          document.getElementById(`${row} ${col}`).style.backgroundColor =
            "lightblue";

          // Now check to see if current node connects to destinations node
          let up = get_node(row - 1, col, start_visited);
          let right = get_node(row, col + 1, start_visited);
          let down = get_node(row + 1, col, start_visited);
          let left = get_node(row, col - 1, start_visited);

          for (let check_neighbor of [up, right, down, left]) {
            if (check_neighbor && end_visited.has(check_neighbor.toString())) {
              // First traverse to destination node from check_neighbor,
              // storing each node in array right. Next do the same with,
              // node, storing each value in array left.
              let left = [node];
              let right = [check_neighbor];
              let key = check_neighbor;
              let pointer = end_traversal[check_neighbor];

              // Traverse from check_neighbor to destination
              while (pointer) {
                right.push(pointer);
                pointer = end_traversal[pointer];
              }

              pointer = start_traversal[node];
              while (pointer) {
                left.push(pointer);
                pointer = start_traversal[pointer];
              }

              let traverse = left.reverse().concat(right);
              for (let i = 1; i < traverse.length - 1; i++) {
                let row = traverse[i][0];
                let col = traverse[i][1];
                document.getElementById(`${row} ${col}`).style.backgroundColor =
                  "yellow";
                await pause(time);
              }
              return;
            }
          }

          start_queue.push(node);
        }
      }

      if (end_node) {
        let row = end_node[0];
        let col = end_node[1];

        let up = get_node(row - 1, col, end_visited);
        let right = get_node(row, col + 1, end_visited);
        let down = get_node(row + 1, col, end_visited);
        let left = get_node(row, col - 1, end_visited);

        for (let node of [up, right, down, left]) {
          if (node) {
            let row = parseInt(node[0]);
            let col = parseInt(node[1]);

            // If two paths cross
            if (start_visited.has(node.toString())) return;
            if (end_visited.has(node.toString())) continue;
            end_visited.add(node.toString());

            end_traversal[node] = end_node;

            document.getElementById(`${row} ${col}`).style.backgroundColor =
              "lightgreen";

            await pause(time);
            document.getElementById(`${row} ${col}`).style.backgroundColor =
              "lightblue";
          }
        }

        for (let node of [up, right, down, left]) {
          if (node) {
            let row = parseInt(node[0]);
            let col = parseInt(node[1]);

            document.getElementById(`${row} ${col}`).style.backgroundColor =
              "lightblue";

            // Now check to see if current node connects to destinations node
            let up = get_node(row - 1, col, end_visited);
            let right = get_node(row, col + 1, end_visited);
            let down = get_node(row + 1, col, end_visited);
            let left = get_node(row, col - 1, end_visited);

            for (let check_neighbor of [up, right, down, left]) {
              if (
                check_neighbor &&
                start_visited.has(check_neighbor.toString())
              ) {
                // First traverse to destination node from check_neighbor,
                // storing each node in array right. Next do the same with,
                // node, storing each value in array left.

                let left = [];
                let right = [];
                let pointer = check_neighbor;

                // Get all values from `node` to source
                while (pointer) {
                  left.push(pointer);
                  pointer = start_traversal[pointer];
                }

                pointer = node;
                while (pointer) {
                  right.push(pointer);
                  pointer = end_traversal[pointer];
                }

                let traverse = left.reverse().concat(right);

                for (let i = 1; i < traverse.length - 1; i++) {
                  let row = traverse[i][0];
                  let col = traverse[i][1];
                  document.getElementById(
                    `${row} ${col}`
                  ).style.backgroundColor = "yellow";
                  await pause(time);
                }

                return;
              }
            }

            end_queue.push(node);
          }
        }
      }
    }
  }
}

export default Bidirectional;

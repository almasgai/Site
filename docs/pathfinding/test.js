let a = [28, 374, 21, 179, 162, 352, 334, 324, 53, 50]; // Should become [21, 50, 28, 53, 162, 352, 334, 324, 179, 374]

let queue = [];
for (let value of a) add_node(queue, value);

console.log(`Length ${queue.length}\n${queue}`);

while (queue.length) {
  console.log(pop_min(queue));
}

function add_node(priority_queue, node) {
  percolate_up(priority_queue, node);
}

function percolate_up(queue, node) {
  // Add node to PQ
  queue.push(node);
  if (queue.length == 1) return;

  // Get the node's index as well as its parents
  let parent = Math.floor((queue.length - 1) / 2);
  let current = queue.length - 1;

  // Percolate the node up the heap while it is less than its parent
  // and while there is a parent node to compare it to.
  while (parent >= 0 && queue[current] < queue[parent]) {
    let temp = queue[parent];
    queue[parent] = queue[current];
    queue[current] = temp;

    current = parent;
    parent = Math.floor((parent - 1) / 2);
  }
}

function get_min_child(queue, index) {
  // Since arrays are zero-indexed, to get left child it 2k + 1.
  // To get right, 2k + 2
  if (
    index * 2 + 2 >= queue.length ||
    queue[index * 2 + 1] < queue[index * 2 + 2]
  ) {
    return index * 2 + 1;
  } else {
    return index * 2 + 2;
  }
}

function percolate_down(queue) {
  let i = 0;

  while (i * 2 + 1 < queue.length) {
    let min_child = get_min_child(queue, i);

    if (queue[i] <= queue[min_child]) {
      return;
    }

    let temp = queue[i];
    queue[i] = queue[min_child];
    queue[min_child] = temp;

    i = min_child;
  }
}

// Store the minimum value as a variable to be returned
// Take the largest variable, replace the minimum node,
// and percolate down until the node is in the right spot.
// Once done return minimum node.
function pop_min(queue) {
  if (queue.length == 0) {
    console.log("Queue is empty");
    return;
  }

  let min_node = queue[0];
  queue[0] = queue[queue.length - 1];
  queue.pop();
  percolate_down(queue);
  return min_node;
}

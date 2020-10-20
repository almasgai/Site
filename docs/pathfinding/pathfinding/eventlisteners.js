// Give permission user to draw on grid
export function toggle_square(event) {
  event.preventDefault();
  if (
    event.target.style.backgroundColor == "lightblue" ||
    event.target.style.backgroundColor == "lightgreen"
  )
    return;
  square_color =
    event.target.style.backgroundColor == "white" ? "gray" : "white";
  node = event.target.style.backgroundColor;
  draw = !draw;
}

// Change color of square as long as square isn't src/dest
export function color(event) {
  event.preventDefault();
  let square = event.target;
  if (
    move ||
    !draw ||
    square === current_square ||
    square.style.backgroundColor == "red" ||
    square.style.backgroundColor == "green"
  ) {
    return;
  }

  if (square.style.backgroundColor == "lightblue") {
    draw = false;
    move = false;
    return;
  }

  // Visually block/unblock square
  square.style.backgroundColor = square_color;

  // Set square to current_square to prevent
  current_square = square;
  update_grid(current_square, square_color);
}

export function color_click(event) {
  event.preventDefault();
  let square = event.target;
  if (
    square.style.backgroundColor == "red" ||
    square.style.backgroundColor == "green" ||
    square.style.backgroundColor == "lightblue"
  )
    return;

  square.style.backgroundColor =
    square.style.backgroundColor == "white" ? "gray" : "white";

  update_grid(square, square.style.backgroundColor);
}

// Allow user to move src/dst on screen
export function toggle_move(event) {
  event.preventDefault();
  if (event.target != start && event.target != end) return;
  move = !move;
  draw = false;
}

export function _clear_grid(event) {
  if (event.code == "KeyC") {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (grid[i][j] != 2 && grid[i][j] != 3) {
          grid[i][j] = 0;
          let square = document.getElementById(`${i} ${j}`);
          square.style.backgroundColor = "white";
        }
      }
    }
  }
  draw = false;
}

/*
 * Select start. This should initiate an event listener. When dragging across
 * another square element, update start node.
 */

export function move_node(event) {
  event.preventDefault();
  if (
    draw ||
    !move ||
    event.target == end ||
    event.target == start ||
    event.target.style.backgroundColor == "gray" ||
    event.target.style.backgroundColor == "lightblue"
  )
    return;

  let square = event.target;

  if (node == "red") {
    start.style.backgroundColor = "white";
    square.style.backgroundColor = node;
    let old_start = start.id.split(" ");
    let i = parseInt(old_start[0]);
    let j = parseInt(old_start[1]);

    grid[i][j] = 0;

    let new_start = square.id.split(" ");
    i = parseInt(new_start[0]);
    j = parseInt(new_start[1]);
    start_row = i;
    start_col = j;
    grid[i][j] = 2;

    start = document.getElementById(`${i} ${j}`);
  } else {
    end.style.backgroundColor = "white";
    square.style.backgroundColor = node;
    let old_end = end.id.split(" ");
    let i = parseInt(old_end[0]);
    let j = parseInt(old_end[1]);
    grid[i][j] = 0;

    let new_end = square.id.split(" ");
    i = parseInt(new_end[0]);
    j = parseInt(new_end[1]);
    end_row = i;
    end_col = j;
    grid[i][j] = 3;

    end = document.getElementById(`${i} ${j}`);
  }
}

function update_grid(square, square_color) {
  if (square_color == "lightblue" || square_color == "lightgreen") return;
  // Now do the same logically with the array
  // Explored square
  let index = square.id.split(" ");
  let i = parseInt(index[0]);
  let j = parseInt(index[1]);

  if (square_color == "white") grid[i][j] = 0;

  if (square_color == "gray") grid[i][j] = 1;

  // Source square; where the algorithm starts
  if (square_color == "red") grid[i][j] = 2;

  // Destination square; where the algorithm (hopefully) ends
  if (square_color == "green") grid[i][j] = 3;
}

export function offscreen(event) {
  draw = false;
  move = false;
}

export function pause(speed) {
  return new Promise((resolve) => setTimeout(resolve, speed));
}

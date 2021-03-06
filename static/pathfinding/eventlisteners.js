import Complexities from "./complexities.js";

// Give permission user to draw on grid
export function toggle_square(event) {
  event.preventDefault();
  let color = event.target.style.backgroundColor;
  if (color == "white" || color == "lightblue") {
    square_color = "gray";
  } else {
    square_color = "white";
  }

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
    square.style.backgroundColor == "green" ||
    square.style.backgroundColor == "black"
  ) {
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
    square.style.backgroundColor == "black"
  )
    return;

  if (square.style.backgroundColor == "gray") {
    square.style.backgroundColor = "white";
  } else {
    square.style.backgroundColor = "gray";
  }

  update_grid(square, square.style.backgroundColor);
}

// Allow user to move src/dst on screen
export function toggle_move(event) {
  event.preventDefault();
  if (
    event.target == start ||
    event.target == end ||
    event.target.style.backgroundColor == "black"
  ) {
    move = !move;
    draw = false;
  }
}

export function _clear_grid(event) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] != 2 && grid[i][j] != 3) {
        grid[i][j] = 0;
        let square = document.getElementById(`${i} ${j}`);
        square.style.backgroundColor = "white";
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
    event.target.style.backgroundColor == "gray"
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
  } else if (node == "green") {
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
  if (
    // square_color == "lightblue" ||
    square_color == "lightgreen" ||
    square_color == "black"
  )
    return;
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

  if (square_color == "black") grid[i][j] = 5;
}

export function offscreen(event) {
  draw = false;
  move = false;
}

export function allow_drop(event) {
  event.preventDefault();
}

export function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  let node = event.target.id.split(" ");

  let i = node[0];
  let j = node[1];
  document.getElementById(`${i} ${j}`).style.backgroundColor = "black";
  grid[i][j] = 5;
}

export function drag(event) {
  event.preventDefault();
  event.stopPropagation();
  event.dataTransfer.setData("text", event.target.id);
}

export function show_weights(event) {
  for (let option of document.getElementsByTagName("option")) {
    if (option.selected) {
      if (
        option.value == "BestFirst" ||
        option.value == "Dijkstra" ||
        option.value == "AStar"
      ) {
        document.getElementById("fontawesome_icon").style.display = "inline";
      } else {
        document.getElementById("fontawesome_icon").style.display = "none";
      }
    }
  }
}

export function get_complexities(event) {
  let algo = event.target.value;
  let complexities = Complexities[algo];

  document.getElementById("time").innerHTML = complexities[0];
  document.getElementById("space").innerHTML = complexities[1];
  document.getElementById("optimal").innerHTML = complexities[2];
}

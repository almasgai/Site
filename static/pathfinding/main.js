import * as event from "./eventlisteners.js";
import initialize_variables from "./variables.js";
import BFS from "./algorithms/bfs.js";
import DFS from "./algorithms/dfs.js";
import Bidirectional from "./algorithms/bidirectional.js";
import Dijkstra from "./algorithms/dijkstra.js";
import AStar from "./algorithms/astar.js";
import BestFirst from "./algorithms/bestfirst.js";

/*
 * If left >= -5 and top >= -5, white. Otherwise gray.
 * If right < window.width + square.width and bottom < window.height + square height
 */

// Set global variables
initialize_variables();

function set_square(row, col) {
  // If square is start or end node, just return
  if (
    `${row} ${col}` == `${start_row} ${start_col}` ||
    `${row} ${col}` == `${end_row} ${end_col}`
  )
    return;

  // Get square's bounding client rectangle. This is necessary to see if an item is in the browsers view (white) or not (gray)
  let square = document.getElementById(`${row} ${col}`).getBoundingClientRect();

  if (
    square.left >= -15 &&
    square.top >= -15 &&
    square.right <= window.innerWidth + 35 &&
    square.bottom <= window.innerHeight + 35
  ) {
    document.getElementById(`${row} ${col}`).style.backgroundColor = "white";
    grid[row][col] = 0;
  } else {
    // document.getElementById(`${row} ${col}`).style.backgroundColor = "black";
    document.getElementById(`${row} ${col}`).style.backgroundColor = "gray";
    // document.getElementById(`${row} ${col}`).style.border = "1px solid black";
    document.getElementById(`${row} ${col}`).style.pointerEvents = "none";
    grid[row][col] = 1;
  }
}

function clear_grid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      set_square(i, j);
    }
  }
}

function clear_traversal(event) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let color = document.getElementById(`${i} ${j}`).style.backgroundColor;
      if (color == "lightblue" || color == "lightgreen" || color == "yellow") {
        document.getElementById(`${i} ${j}`).style.backgroundColor = "white";
      }
    }
  }
}

// Create HTML grid with start and finish
(function create_grid() {
  for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    row.setAttribute("style", "margin: -5px;");

    for (let j = 0; j < columns; j++) {
      let square = document.createElement("div");
      square.setAttribute("class", "square");
      square.setAttribute("id", `${i} ${j}`);
      if (i == 0 || i == rows - 1 || j == 0 || j == columns - 1) {
        square.setAttribute(
          "style",
          "background-color: gray; height: 30px; width: 30px; border: 1px solid gray; display: inline-block;"
        );
      } else {
        square.setAttribute(
          "style",
          "background-color: white; height: 30px; width: 30px; border: 1px solid gray; display: inline-block;"
        );
      }

      // Give square the ability to colored in (blocked)
      square.addEventListener("mousedown", event.toggle_square);
      square.addEventListener("mousemove", event.color);
      square.addEventListener("mouseup", event.toggle_square);
      square.addEventListener("click", event.color_click);

      // Allow start/end nodes to be moved to a regular square
      square.addEventListener("mouseup", event.toggle_move);
      square.addEventListener("mousemove", event.move_node);
      square.addEventListener("mousedown", event.toggle_move);

      square.addEventListener("drop", event.drop);
      square.addEventListener("dragover", event.allow_drop);

      square.addEventListener("dblclick", event.offscreen);

      /*
      square.ondrop = event.drop;
      square.ondragover = event.allow_drop;
      */

      row.append(square);
    }

    document.getElementById("grid").appendChild(row);
  }

  // Start and finish nodes
  start = document.getElementById(`${start_row} ${start_col}`);
  end = document.getElementById(`${end_row} ${end_col}`);

  window.width = document.getElementById("0 0").width;
  window.height = document.getElementById("0 0").height;

  grid[start_row][start_col] = 2;
  grid[end_row][end_col] = 3;

  start.style.backgroundColor = "red";
  end.style.backgroundColor = "green";

  // Set boundaries in grid. Grid needs to be set up before setting
  // boundaries using getBoundingClientRect()
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      set_square(i, j);
    }
  }
})();

document.addEventListener("keydown", event.clear_grid);

// Stop drawing or moving start/end nodes if mouse goes off screen
document.addEventListener("mouseleave", event.offscreen);
document.addEventListener("mouseup", event.offscreen);
document.getElementById("menu").addEventListener("mouseenter", event.offscreen);
document
  .getElementById("fontawesome_icon")
  .addEventListener("mouseenter", event.offscreen);

// Move start node
start.addEventListener("mousedown", event.toggle_move);
start.addEventListener("mousemove", event.move_node);
start.addEventListener("mouseup", event.toggle_move);

// Move end node
end.addEventListener("mousedown", event.toggle_move);
end.addEventListener("mousemove", event.move_node);
end.addEventListener("mouseup", event.toggle_move);

async function main() {
  function lookup(name) {
    switch (name) {
      case "BFS":
        return BFS;
      case "DFS":
        return DFS;
      case "Bidirectional":
        return Bidirectional;
      case "Dijkstra":
        return Dijkstra;
      case "AStar":
        return AStar;
      case "BestFirst":
        return BestFirst;
      default:
        return BFS;
    }
  }

  clear_traversal();
  let algo = lookup(document.getElementById("algos_list").value);

  document.body.style.pointerEvents = "none";
  await algo();
  document.body.style.pointerEvents = "auto";
}

document
  .getElementById("fontawesome_icon")
  .addEventListener("drag", function drag(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.setData("text", event.target.id);
  });

document
  .getElementById("fontawesome_icon")
  .addEventListener("mouseleave", event.offscreen);

document
  .getElementById("algos_list")
  .addEventListener("change", event.show_weights);

document
  .getElementById("toggle_menu")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let toggle_menu = document.getElementById("toggle_menu");
    toggle_menu.innerText = toggle_menu.innerText == "Hide" ? "Show" : "Hide";

    let body = document.getElementById("menu_body");
    body.style.display =
      body.style.display == "none" || undefined ? "block" : "none";
  });

document
  .getElementById("complexities")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let display = document.getElementById("complexity_container").style.display;

    document.getElementById("complexity_container").style.display =
      display == "none" || !display ? "block" : "none";

    document.getElementById("complexities_text").innerText =
      document.getElementById("complexity_container").style.display == "none"
        ? "Big O ⬇"
        : "Big O ⬆";
  });

document
  .getElementById("algos_list")
  .addEventListener("change", event.get_complexities);

window.main = main;
window.clear_grid = clear_grid;
window.clear_traversal = clear_traversal;

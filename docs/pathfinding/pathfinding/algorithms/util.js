export function get_node(i, j, visited) {
  // If indexes are out of range or node has already been visited, return
  if (
    i < 0 ||
    j < 0 ||
    i >= grid.length ||
    j >= grid[0].length ||
    grid[i][j] == 1 ||
    visited.has([i, j].toString()) ||
    document.getElementById(`${i} ${j}`).style.backgroundColor == "cyan"
  ) {
    return null;
  }
  return [i, j];
}

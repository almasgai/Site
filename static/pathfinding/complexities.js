const Complexities = {
  // Key: algorithm
  // Value: Complexities
  //    [0]: Time
  //    [1]: Space
  //    [2]: Is algorithm optimal?
  BFS: ["|V| + |E|", "|V|", "Yes"], // b^d and b^d+1
  DFS: ["|V| + |E|", "|V|", "No"],
  Bidirectional: [`b${"d/2".sup()}`, `b${"d/2".sup()}`, "Yes"],
  Dijkstra: [`|V|${"2".sup()}`, "|V| + |E|", "Yes"],
  AStar: [`b${"d".sup()}`, `b${"d".sup()}`, "Yes"],
  BestFirst: [`b${"m".sup()}`, `b${"m".sup()}`, "No"]
};

export default Complexities;

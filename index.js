import Graph from "./graph.js";
import { solve as bfsSolver } from "./bfs.js";

const canvas = document.getElementById("canvas");
let graph1 = new Graph("map", 50, 25, bfsSolver);
canvas.appendChild(graph1);

document.getElementById("btn").onclick = () => graph1.findTarget();
document.getElementById("clear").onclick = () => window.location.reload();

import Graph from "./graph.js";
import { solve as bfsSolver } from "./bfs.js";

const canvas = document.getElementById("canvas");
let mainGraph = new Graph("map", 50, 20, bfsSolver);
canvas!.appendChild(mainGraph);

const btn = document.getElementById("btn");
if (btn) btn.onclick = () => mainGraph.findTarget();

const resetBtn = document.getElementById("reset");
if (resetBtn) resetBtn.onclick = () => window.location.reload();

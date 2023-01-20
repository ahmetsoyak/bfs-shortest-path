import Graph from "./graph";
import Node from "./node";

interface pathObjInterface {
    [key: string]: { node: Node; cost: number };
}

var queue = new Array();
var pathObj = new Object() as pathObjInterface;
var visitedNodes = new Array();

async function solve(parent: Graph, start: Node, end: Node): Promise<void> {
    pathObj[start.index] = { node: start, cost: 0 };
    queue = [start.index];
    while (queue.length) {
        let nodePos = queue.shift();
        if (visitedNodes.includes(nodePos)) continue;
        if (nodePos === end.index) break;
        visitedNodes.push(nodePos);
        let node = parent.map[nodePos];
        let annotation = document.createElement("div");
        annotation.classList.add("searched-node");
        node.appendChild(annotation);
        await timeout(10);
        [node.top, node.right, node.bottom, node.left].forEach((_n) => visitNeighbour(node, _n));
    }
    preparePath(start, end);
}

function timeout(ms: Number): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, ms as number));
}

function preparePath(start: Node, end: Node) {
    const path: string[] = [];
    let currentNode = end;
    while (!path.includes(start.index)) {
        currentNode.style.backgroundColor = "yellow";
        if (currentNode.firstChild) currentNode.removeChild(currentNode.firstChild);
        path.push(currentNode.index);
        currentNode = pathObj[currentNode.index]?.node;
    }
}

function visitNeighbour(parentNode: Node, currentNode: Node | null) {
    if (!currentNode) return;
    if (currentNode.isWall()) return;
    let key = currentNode.index;
    if (visitedNodes.includes(key)) return;
    queue.push(key);
    if (pathObj.hasOwnProperty(key)) {
        if (pathObj[parentNode.index].cost + 1 < pathObj[key].cost) {
            pathObj[key] = {
                node: parentNode,
                cost: pathObj[parentNode.index].cost + 1,
            };
        }
    } else {
        pathObj[key] = {
            node: parentNode,
            cost: pathObj[parentNode.index].cost + 1,
        };
    }
}

export { solve };

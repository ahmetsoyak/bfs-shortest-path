import Node from "./node.js";

interface edgesInterface {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

interface mapInterface {
    [key: string]: Node;
}

class Graph extends HTMLDivElement {
    static DEFAULT_COLOR = "white";
    static SOURCE_COLOR = "purple";
    static TARGET_COLOR = "green";
    static WALL_COLOR = "red";

    id: string;
    map: mapInterface;
    alogrithm: any;
    isMouseDown: boolean;
    limit: { x: number; y: number };

    constructor(id: string, x: number, y: number, alogrithm: any) {
        super();
        this.id = id;
        this.limit = { x, y };
        this.map = new Object() as mapInterface;
        this.isMouseDown = false;
        this.alogrithm = alogrithm;
        this.init();

        this.addEventListener("mousedown", (event) => {
            this.isMouseDown = true;
        });
        this.addEventListener("mouseup", () => (this.isMouseDown = false));
    }
    init() {
        for (let y = 0; y < this.limit.y; y++) {
            let row = this.addRow();
            for (let x = 0; x < this.limit.x; x++) {
                let node = new Node(this, x, y);
                row.appendChild(node);
                let key = `x${x}y${y}`;
                this.map[key] = node;
            }
        }

        this.childNodes.forEach((row) => (row.childNodes as NodeListOf<Node>).forEach((node: Node) => this.findNeighbours(node)));
    }
    addRow() {
        let row = document.createElement("div");
        row.classList.add("row");
        this.appendChild(row);
        return row;
    }
    findTarget() {
        this.alogrithm(this, this.getSource(), this.getTarget());
    }
    findNeighbours(node: Node) {
        let edges: edgesInterface = new Object();

        // Find neighbours positions
        if (node.y + 1 < this.limit.y) edges.top = `x${node.x}y${node.y + 1}`;
        if (node.x + 1 < this.limit.x) edges.right = `x${node.x + 1}y${node.y}`;
        if (node.y - 1 >= 0) edges.bottom = `x${node.x}y${node.y - 1}`;
        if (node.x - 1 >= 0) edges.left = `x${node.x - 1}y${node.y}`;

        let key: keyof typeof edges;
        for (key in edges) {
            let dummy = edges[key];
            if (dummy && this.map.hasOwnProperty(dummy)) {
                node[key] = this.map[dummy];
            }
            // "top" | "right" | "bottom" | "left"
        }
    }
    getSource() {
        return Object.values(this.map).find((node: Node) => node.isSource());
    }
    getTarget() {
        return Object.values(this.map).find((node: Node) => node.isTarget());
    }
}

customElements.define("graph-map", Graph, { extends: "div" });

export default Graph;

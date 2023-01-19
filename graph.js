import Node from "./node.js";

class Graph extends HTMLDivElement {
    static DEFAULT_COLOR = "white";
    static SOURCE_COLOR = "purple";
    static TARGET_COLOR = "green";
    static WALL_COLOR = "red";

    constructor(id, x, y, alogrithm) {
        super();
        this.id = id;
        this.limit = { x, y };
        this.map = new Object();
        this.alogrithm = alogrithm;
        this.init();
        console.log(this);

        this.isMouseDown = false;
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

        this.childNodes.forEach((row) => row.childNodes.forEach((node) => this.findNeighbours(node)));
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
    findNeighbours(node) {
        let neigbourPositions = new Object();

        // Find neighbours positions
        if (node.y + 1 < this.limit.y) neigbourPositions.top = `x${node.x}y${node.y + 1}`;
        if (node.x + 1 < this.limit.x) neigbourPositions.right = `x${node.x + 1}y${node.y}`;
        if (node.y - 1 >= 0) neigbourPositions.bottom = `x${node.x}y${node.y - 1}`;
        if (node.x - 1 >= 0) neigbourPositions.left = `x${node.x - 1}y${node.y}`;

        for (const key in neigbourPositions) {
            node[key] = this.map[neigbourPositions[key]];
        }
    }
    getSource() {
        return Object.values(this.map).find((node) => node.isSource());
    }
    getTarget() {
        return Object.values(this.map).find((node) => node.isTarget());
    }
}

customElements.define("graph-map", Graph, { extends: "div" });

export default Graph;

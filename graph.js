import Node from "./node.js";

class Graph extends HTMLDivElement {
    constructor(id, x, y) {
        super();
        this.id = id;
        this.limit = { x, y };
        this.map = new Object();
        this.init();

        this.isMouseDown = false;
        this.addEventListener("mousedown", (event) => {
            this.isMouseDown = true;
        });
        this.addEventListener("mouseup", () => (this.isMouseDown = false));
    }

    init() {
        for (let y = 0; y < this.limit.y; y++) {
            let row = document.createElement("div");
            row.classList.add("row");
            this.appendChild(row);
            for (let x = 0; x < this.limit.x; x++) {
                let node = new Node(this, x, y);
                row.appendChild(node);
                let key = `x${x}y${y}`;
                this.map[key] = node;
            }
        }

        this.childNodes.forEach((row) => row.childNodes.forEach((node) => this.findNeighbours(node)));
    }

    find() {
        map.childNodes.forEach(
            (node) =>
                (node.onclick = (event) => {
                    event.stopPropagation();
                })
        );
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
}

customElements.define("graph-map", Graph, { extends: "div" });

export default Graph;

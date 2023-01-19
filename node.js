import Graph from "./graph.js";

class Node extends HTMLSpanElement {
    top = null;
    right = null;
    bottom = null;
    left = null;

    constructor(parent, x, y) {
        super();
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.index = this.stringfyNodePosition();

        this.classList.add("square");
        this.onclick = this.select;
        this.onmouseover = () => {
            if (parent.isMouseDown) this.selectObstacle(this);
        };
    }

    stringfyNodePosition() {
        return `x${this.x}y${this.y}`;
    }

    select(event) {
        if (event.shiftKey) {
            this.selectSource(this.element);
        } else if (event.metaKey || event.ctrlKey) {
            this.selectTarget(this.element);
        } else {
            this.selectObstacle(this.element);
        }
    }
    resetNodesByColor(color) {
        if (!color) return;
        Object.values(this.parent.map).forEach((node) => {
            if (node.style.backgroundColor === color) node.style.backgroundColor = Graph.DEFAULT_COLOR;
        });
    }
    selectSource() {
        this.resetNodesByColor(Graph.SOURCE_COLOR);
        this.style.backgroundColor = Graph.SOURCE_COLOR;
    }
    selectTarget() {
        this.resetNodesByColor(Graph.TARGET_COLOR);
        this.style.backgroundColor = Graph.TARGET_COLOR;
    }
    selectObstacle() {
        this.style.backgroundColor = Graph.WALL_COLOR;
    }
    isSource() {
        return this.style.backgroundColor === Graph.SOURCE_COLOR;
    }
    isTarget() {
        return this.style.backgroundColor === Graph.TARGET_COLOR;
    }
    isWall() {
        return this.style.backgroundColor === Graph.WALL_COLOR;
    }
}

customElements.define("graph-node", Node, { extends: "span" });

export default Node;

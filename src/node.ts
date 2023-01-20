import Graph from "./graph.js";

class Node extends HTMLSpanElement {
    x: number;
    y: number;
    parent: Graph;
    index: string;

    top: Node | null = null;
    right: Node | null = null;
    bottom: Node | null = null;
    left: Node | null = null;

    constructor(parent: Graph, x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.index = this.stringfyNodePosition();

        this.classList.add("square");
        this.onclick = this.select;
        this.onmouseover = () => {
            if (parent.isMouseDown) this.selectObstacle();
        };
    }

    stringfyNodePosition() {
        return `x${this.x}y${this.y}`;
    }

    select(event: KeyboardEvent | MouseEvent) {
        if (event.shiftKey) {
            this.selectSource();
        } else if (event.metaKey || event.ctrlKey) {
            this.selectTarget();
        } else {
            this.selectObstacle();
        }
    }
    resetNodesByColor(color: string): void {
        if (!color) return;
        Object.values(this.parent.map).forEach((node: Node) => {
            if (node.style.backgroundColor === color) node.style.backgroundColor = Graph.DEFAULT_COLOR;
        });
    }
    selectSource(): void {
        this.resetNodesByColor(Graph.SOURCE_COLOR);
        this.style.backgroundColor = Graph.SOURCE_COLOR;
    }
    selectTarget(): void {
        this.resetNodesByColor(Graph.TARGET_COLOR);
        this.style.backgroundColor = Graph.TARGET_COLOR;
    }
    selectObstacle(): void {
        this.style.backgroundColor = Graph.WALL_COLOR;
    }
    isSource(): boolean {
        return this.style.backgroundColor === Graph.SOURCE_COLOR;
    }
    isTarget(): boolean {
        return this.style.backgroundColor === Graph.TARGET_COLOR;
    }
    isWall(): boolean {
        return this.style.backgroundColor === Graph.WALL_COLOR;
    }
}

window.customElements.define("graph-node", Node, { extends: "span" });

export default Node;

class Node extends HTMLSpanElement {
    top = null;
    right = null;
    bottom = null;
    left = null;

    constructor(parent, x, y) {
        super();
        this.x = x;
        this.y = y;

        this.classList.add("square");
        this.onclick = this.select;
        this.onmouseover = () => {
            if (parent.isMouseDown) this.selectObstacle(this);
        };
    }

    select(event) {
        if (event.metaKey || event.ctrlKey) {
            this.selectTarget(this.element);
        } else {
            this.selectObstacle(this.element);
        }
    }

    resetTargets() {
        this.parentElement.childNodes.forEach((node) => {
            if (node.style.backgroundColor == "green") node.style.backgroundColor = "#fff";
        });
    }

    selectTarget() {
        this.resetTargets();
        this.style.backgroundColor = "green";
    }

    selectObstacle() {
        this.style.backgroundColor = "red";
    }
}

customElements.define("graph-node", Node, { extends: "span" });

export default Node;

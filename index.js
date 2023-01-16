const map = document.getElementById("map");
var target = null;
var isMouseDown = false;

function createSquare(x, y) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("x", x);
    square.setAttribute("y", y);
    square.onclick = (event) => selectSquare(event);
    square.onmouseover = () => {
        if (isMouseDown) selectObstacle(square);
    };
    map.appendChild(square);

    return square;
}

function selectSquare(event) {
    let element = event.target;
    if (event.metaKey || event.ctrlKey) {
        selectTarget(element);
    } else {
        selectObstacle(element);
    }
}
function resetTargets() {
    map.childNodes.forEach((node) => {
        if (node.style.backgroundColor == "green") node.style.backgroundColor = "#e0e0e0";
    });
}

function selectTarget(element) {
    target = element;
    resetTargets();
    target.style.backgroundColor = "green";
}

function selectObstacle(element) {
    element.style.backgroundColor = "red";
}

function find() {
    map.childNodes.forEach(
        (node) =>
            (node.onclick = (event) => {
                event.stopPropagation();
            })
    );
}

function init() {
    map.addEventListener("mousedown", (event) => {
        isMouseDown = true;
        selectObstacle(event.target);
    });
    map.addEventListener("mouseup", () => (isMouseDown = false));
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            createSquare(i, j);
        }
    }
}

init();

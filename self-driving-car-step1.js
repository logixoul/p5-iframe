let startPos, startDir;
let splineX, splineY;

// изчислява стойността на сплайн функцията
function calcSpline(s, x) {
    const a = 2 * s.valueAt0 - 2 * s.valueAt1 + s.derAt0 + s.derAt1;
    const b = -3 * s.valueAt0 + 3 * s.valueAt1 - 2 * s.derAt0 - s.derAt1;
    const c = s.derAt0;
    const d = s.valueAt0;
    return a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    startPos = createVector(0, 0);
    startDir = createVector(0, 0);
    background(100);
}

function mousePressed() {
    const destPos = createVector(mouseX, mouseY);
    const offset = p5.Vector.sub(destPos, startPos);
    const destDir = p5.Vector.mult(offset, 1.0);
    splineX = {
        valueAt0: startPos.x,
        valueAt1: destPos.x,
        derAt0: startDir.x,
        derAt1: destDir.x
    };
    splineY = {
        valueAt0: startPos.y,
        valueAt1: destPos.y,
        derAt0: startDir.y,
        derAt1: destDir.y
    };
    startPos = destPos;
    startDir = destDir;

    noFill();
    stroke("white");
    beginShape();
    for (let coef = 0; coef < 1; coef += .01) {
        const pos = createVector(
            calcSpline(splineX, coef),
            calcSpline(splineY, coef));
        vertex(pos.x, pos.y);
    }
    endShape();
}

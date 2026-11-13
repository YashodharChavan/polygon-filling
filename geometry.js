function square(x) {
    return x * x;
}

function cartesianDistance(x1, y1, x2, y2) {
    return (square(x2 - x1) + square(y2 - y1)) ** 0.5;
}

function getCenterOffset(parentDimension, childDimension) {
    return (parentDimension - childDimension) / 2;
}

function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function toDegrees(radians) {
    return (radians * 180) / Math.PI;
}

function getXOnCircle(originX, radius, theta) {
    return originX + radius * Math.cos(toRadians(theta));
}

function getYOnCircle(originY, radius, theta) {
    return originY + radius * Math.sin(toRadians(theta));
}

function getDiffTerm(points, currIdx) {
    const n = points.length;
    const nextIdx = (currIdx + 1) % n;

    const current = points[currIdx]
    const next = points[nextIdx]

    return current.x * next.y - next.x * current.y
}

function getSignedArea(points) {
    let area = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        const currIdx = i;

        area += getDiffTerm(points, currIdx);
    }

    return area * 0.5;
}

function getCentroidCoordinates(points) {
    const signedArea = getSignedArea(points);
    const n = points.length;

    let X = 0;
    let Y = 0;

    for (let currIdx = 0; currIdx < n; currIdx++) {
        const nextIdx = (currIdx + 1) % n;

        const current = points[currIdx];
        const next = points[nextIdx];

        X += (current.x + next.x) * getDiffTerm(points, currIdx)
        Y += (current.y + next.y) * getDiffTerm(points, currIdx)
    }

    return {
        x: X / (6 * signedArea),
        y: Y / (6 * signedArea),
    }
}

module.exports = {
    cartesianDistance,
    getCenterOffset,
    getXOnCircle,
    getYOnCircle,
    toRadians,
    toDegrees,
    getCentroidCoordinates
};  
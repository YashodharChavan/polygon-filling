const r = require("raylib");
const g = require("./geometry")

function setup() {
    const world = {
        windowWidth: 500,
        windowHeight: 400,
        points: [
            { x: 100, y: 40 },
            { x: 145, y: 85 },
            { x: 210, y: 25 },
            { x: 225, y: 100 },
            { x: 300, y: 65 },
            { x: 270, y: 140 },
            { x: 370, y: 150 },
            { x: 290, y: 195 },
            { x: 350, y: 260 },
            { x: 265, y: 245 },
            { x: 250, y: 340 },
            { x: 205, y: 275 },
            { x: 145, y: 350 },
            { x: 155, y: 260 },
            { x: 65, y: 300 },
            { x: 110, y: 225 },
            { x: 25, y: 180 },
            { x: 115, y: 165 },
            { x: 45, y: 95 },
            { x: 135, y: 125 },
            { x: 100, y: 40 }
        ]
    };

    world.centroid = g.getCentroidCoordinates(world.points);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.windowWidth, world.windowHeight, "TITLE");
    r.SetTargetFPS(60);

    return world;
}

function isRunning() {
    return !r.WindowShouldClose();
}


function plotPoints(points) {
    const n = points.length;

    for (let currIdx = 0; currIdx < n; currIdx++) {
        const nextIdx = (currIdx + 1) % n;

        const startPoint = {
            x: points[currIdx].x,
            y: points[currIdx].y,
        }

        const endPoint = {
            x: points[nextIdx].x,
            y: points[nextIdx].y,
        }

        r.DrawLineEx(startPoint, endPoint, 5, r.RED);
        r.DrawCircleV(startPoint, 5, r.RED)
    }
}

function plotCentroidCoordinate(centroid) {
    r.DrawCircleV(centroid, 5, r.GREEN);
}

function fillConvexPolygon(points, centroid) {
    const n = points.length;

    for (let currIdx = 0; currIdx < n; currIdx++) {
        const nextIdx = (currIdx + 1) % n;

        const startPoint = {
            x: points[currIdx].x,
            y: points[currIdx].y,
        }

        const endPoint = {
            x: points[nextIdx].x,
            y: points[nextIdx].y,
        }

        r.DrawTriangle(startPoint, centroid, endPoint, r.WHITE);
    }
}

function draw(world) {
    r.BeginDrawing();

    plotPoints(world.points)
    plotCentroidCoordinate(world.centroid)
    fillConvexPolygon(world.points, world.centroid)

    r.EndDrawing();
}

function update(world) { }

function tearDown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    isRunning,
    draw,
    update,
    tearDown,
};
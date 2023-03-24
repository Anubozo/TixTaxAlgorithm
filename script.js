console.log("working!");

let w = 400;
function setup() {
    createCanvas(w, w);
    frameRate(60);
}

let radius =  20;
let position = [w/2, 80];
let velocity = [1, 0];
let acceleration = [0, 0];

let r = Math.sqrt((position[0] - w/2)**2 + (position[1] - w/2)**2);
const G = 1;
const Emass = 10;
const Smass = 100;
let force = [0, 0];
let forceV;

function draw() {
    background(220);
    fill(255,255,0);
    ellipse(w/2, w/2, 10, 10);
    fill(100, 255, 0);
    ellipse(position[0],position[1],radius,radius);
    
    position[0] += velocity[0];
    position[1] += velocity[1];

    velocity[0] += acceleration[0];
    velocity[1] += acceleration[1];

    r = Math.sqrt((position[0] - w/2)**2 + (position[1] - w/2)**2);
    force = Emass * Smass * G / r**2;
    forceV = [force * (w/2 - position[0]) / r, force * (w/2 - position[1]) / r]
    acceleration = [forceV[0] / Emass, forceV[1] / Emass];

    console.log("Position: " + position);
    console.log("Velocity: " + velocity);
    console.log("Acceleration: " + acceleration);
    console.log("Force: " + force);
}
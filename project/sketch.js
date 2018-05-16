var ball;
var bArr;

function setup() {
    // put setup code here
    createCanvas(1000, 600);
    bArr = [];

}

function draw() {
    // put drawing code here 
    background(255, 107, 81);
    textSize(16);
    fill(0);
    noStroke();
    text("Click To Make Balls", 10, 550);
    text("Hover Over Ball To Change Color And Size", 10, 570);
    text("Hover Over Ball And Press Key To Remove", 10, 590);
    for (var i = 0; i < bArr.length; i++) {
        bArr[i].display();
        bArr[i].moveIt();
        for (var j = 0; j < bArr.length; j++) {
            bArr[i].lineO(bArr[j]);
        }
        bArr[i].overIt(mouseX, mouseY);
        var rad = dist(bArr[i].x, bArr[i].y, mouseX, mouseY);
        if ((keyIsPressed && rad < bArr[i].diam / 2)) {
            bArr.splice(i, 1);
        }
    }
}

function Ball() {
    this.x = mouseX;
    this.y = mouseY;
    this.diam = 20;
    this.xVelo = random(-1, 2);
    this.yVelo = random(-1, 2);
    this.r;
    this.g;
    this.b;
    this.display = function() {
        noStroke();
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.diam);
    }

    this.moveIt = function() {
        if (this.x > width || this.x < 0) {
            this.xVelo = this.xVelo * (-1);
        }
        if (this.y > height || this.y < 0) {
            this.yVelo = this.yVelo * (-1);
        }
        this.x += this.xVelo;
        this.y += this.yVelo;
    }

    this.collide = function(other) {
        var rad = dist(this.x, this.y, other.x, other.y);
        if (rad < this.diam / 2 + other.diam / 2) {
            return true;
        } else {
            return false;
        }
    }

    this.rvs = function() {
        this.xVelo = -this.xVelo;
        this.yVelo = -this.yVelo;
    }
    this.lineO = function(other) {
        var distO = dist(this.x, this.y, other.x, other.y);
        var trans = map(distO, 0, 200, 255, 0);
        stroke(255, trans);
        line(this.x, this.y, other.x, other.y);
    }
    this.overIt = function(otherX, otherY) {
        var rad = dist(this.x, this.y, otherX, otherY);
        if (rad < this.diam / 2) {
            this.r = 234;
            this.g = 10;
            this.b = 255;
            this.diam++;
        } else {
            this.r = 81;
            this.g = 255;
            this.b = 214;
            if (this.diam !=20) {
                this.diam--;
            }
        }
    }
}

function mouseClicked() {

    for (var i = 0; i < 5; i++) {
        bArr.push(new Ball());
    }

}
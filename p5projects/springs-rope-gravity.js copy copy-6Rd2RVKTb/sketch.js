var myParticles = [];
var mySprings = [];
var nPoints = 18; 
var ground; 


// The index in the particle array, of the one the user has clicked.
var whichParticleIsGrabbed = -1;

//-------------------------
function setup() {
  createCanvas(800, 500);
  ground = height - 50; 
  createParticles(); 
  createSpringMeshConnectingParticles(); 
}

//-------------------------
function createParticles(){

  for (var i=0; i<nPoints; i++) {
    var rx = 50 + i*40; //map(i, 0,nPoints, 50,600);
    var ry = 100;
    var aParticle = new Particle(); 
    aParticle.set(rx,ry);
    aParticle.bPeriodicBoundaries = false;
    aParticle.bHardBoundaries = true; 
    myParticles.push(aParticle);
  }
  myParticles[0].bFixed = true;

}

//-------------------------
function createSpringMeshConnectingParticles(){
  // Stitch the particles together into a mesh, 
  // by connecting them to their neighbors with springs.
  
  // The spring constant. 
  var K = 0.1; 
  
  // stitch the particles together into a blob.
  for (var i=0; i<(nPoints-1); i++) {
    var p = myParticles[i];
    var q = myParticles[i+1];
    var aSpring = new Spring(); 
    aSpring.set (p, q, K);
    mySprings.push(aSpring);
  }
}

function mousePressed() {
  // If the mouse is pressed, 
  // find the closest particle, and store its index.
  whichParticleIsGrabbed = -1;
  var maxDist = 9999;
  for (var i=0; i<myParticles.length; i++) {
    var dx = mouseX - myParticles[i].px;
    var dy = mouseY - myParticles[i].py;
    var dh = sqrt(dx*dx + dy*dy);
    if (dh < maxDist) {
      maxDist = dh;
      whichParticleIsGrabbed = i;
    }
  }
}
 
 
function draw() {
  background (0);
  stroke(255); 
  line(0, ground, width, ground); 
  
  // interparticle separation
  for (var i=0; i<myParticles.length; i++) {
    for (var j=0; j<myParticles.length; j++) {
      if (abs(i-j) > 1.1){
        var ix = myParticles[i].px;
        var iy = myParticles[i].py;
        var ir = myParticles[i].radius;
        var jx = myParticles[j].px;
        var jy = myParticles[j].py;
        var jr = myParticles[j].radius;
        var dx = ix - jx; 
        var dy = iy - jy;
        var dh = dist(ix, iy, jx, jy);
        if (dh < (ir + jr)){
          var sepForce = 2.0 * (1.0 - dh/(ir+jr));
          var fx = (dx / dh) * sepForce;
          var fy = (dy / dh) * sepForce;
          myParticles[j].addForce(-fx, -fy);
          myParticles[i].addForce( fx,  fy);
        }
      }
    }
  }
  
  
  for (var i=0; i<myParticles.length; i++) {
    myParticles[i].update(); // update all locations
  }
 
  if (mouseIsPressed && (whichParticleIsGrabbed > -1)) {
    // If the user is grabbing a particle, peg it to the mouse.
    myParticles[whichParticleIsGrabbed].px = mouseX;
    myParticles[whichParticleIsGrabbed].py = mouseY;
  }
  
  var gravityForceX = 0;
  var gravityForceY = 0.1;
  for (var i=0; i<myParticles.length; i++) {
    myParticles[i].addForce(gravityForceX, gravityForceY);
  }
 
  for (var i=0; i<mySprings.length; i++) {
    mySprings[i].update(); // draw all springs
  }

  for (var i=0; i<mySprings.length; i++) {
    mySprings[i].render(); // draw all springs
  }

  for (var i=0; i<myParticles.length; i++) {
    myParticles[i].render(); // draw all particles
  }
  
  
  noFill();
  stroke(0); 
  rect(0,0,width-1, height-1); 
  fill(255); 
  noStroke(); 
  text("Grab a point", 5,20); 
}
 

//==========================================================
var Particle = function Particle() {
  this.px = 0;
  this.py = 0;
  this.vx = 0;
  this.vy = 0;
  this.mass = 1.0;
  this.damping = 0.99;
  this.collisionLoss = 0.98;
  this.radius = 20; 
  
  this.bFixed = false;
  this.bLimitVelocities = true;
  this.bPeriodicBoundaries = false;
  this.bHardBoundaries = false;
  
  
  // Initializer for the Particle
  this.set = function(x, y) {
    this.px = x;
    this.py = y;
    this.vx = 0;
    this.vy = 0;
    this.mass = 1.0;
  };

  // Add a force in. One step of Euler integration.
  this.addForce = function(fx, fy) {
    var ax = fx / this.mass;
    var ay = fy / this.mass;
    this.vx += ax;
    this.vy += ay;
  };

  // Update the position. Another step of Euler integration.
  this.update = function() {
    if (this.bFixed == false){
      this.vx *= this.damping;
      this.vy *= this.damping;
  
      this.limitVelocities();
      this.handleBoundaries();
      this.px += this.vx;
      this.py += this.vy;
    }
  };

  this.limitVelocities = function() {
    if (this.bLimitVelocities) {
      var speed = sqrt(this.vx * this.vx + this.vy * this.vy);
      var maxSpeed = 5;
      if (speed > maxSpeed) {
        this.vx *= maxSpeed / speed;
        this.vy *= maxSpeed / speed;
      }
    }
  };

  this.handleBoundaries = function() {
    if (this.bPeriodicBoundaries) {
      if ((this.px + this.radius) > width) this.px -= width;
      if ((this.px - this.radius) < 0) this.px += width;
      if ((this.py + this.radius) > ground) this.py -= height;
      if ((this.py - this.radius) < 0) this.py += height;
      
    } else if (this.bHardBoundaries) {
      if ((this.px + this.radius) >= width){
        this.vx = abs(this.vx)*-1;
        this.vx *= this.collisionLoss;
        this.vy *= this.collisionLoss;
      }
      if ((this.px - this.radius) <= 0){
        this.vx = abs(this.vx);
        this.vx *= this.collisionLoss;
        this.vy *= this.collisionLoss;
      }
      if ((this.py + this.radius) >= ground){
        this.vy = abs(this.vy)*-1;
        this.vx *= this.collisionLoss;
        this.vy *= this.collisionLoss;
      }
      if ((this.py - this.radius) <= 0){
        this.vy = abs(this.vy);
        this.vx *= this.collisionLoss;
        this.vy *= this.collisionLoss;
      }
    }
  };

  this.render = function() {
    fill(255);
    circle(this.px, this.py, 5);
    noFill(); 
    stroke(255); 
    circle(this.px, this.py, this.radius*2);
  };
}


//==========================================================
var Spring = function Spring() {
  var p;
  var q;
  var restLength;
  var springConstant;

  this.set = function(p1, p2, k) {
    p = p1;
    q = p2;
    var dx = p.px - q.px;
    var dy = p.py - q.py;
    restLength = sqrt(dx * dx + dy * dy);
    springConstant = k;
  };

  this.update = function() {
    var dx = p.px - q.px;
    var dy = p.py - q.py;
    var dh = sqrt(dx * dx + dy * dy);

    if (dh > 1) {
      var distention = dh - restLength;
      var restorativeForce = springConstant * distention; // F = -kx
      var fx = (dx / dh) * restorativeForce;
      var fy = (dy / dh) * restorativeForce;
      p.addForce(-fx, -fy);
      q.addForce( fx,  fy);
    }
  };

  this.render = function() {
    stroke(255);
    line(p.px, p.py, q.px, q.py);
  };
}
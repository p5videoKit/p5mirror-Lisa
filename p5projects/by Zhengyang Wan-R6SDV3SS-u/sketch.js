let step = 0;
let number = 10;
let index = 0;
let speed = 5;
let r1= 5;
let array = [];


function setup() {
  createCanvas(800, 800);
  for(let i = 0; i<number; i++)
  { array[i] = [];
    array[i][0] = (i+1)/4;
    array[i][1] = color(random(255), random(255), random(255));
    array[i][2] = random(0.05,10);
    array[i][3] = array[i][2]*random(0.01,0.05);
  }
}

function hanabi(r2,color,dense,length) {
  let cita = 0;
  while(cita<360)
  {
    ranlen = noise(cita, index)*r1*r2;
    r_revision = ranlen+r1;
    r_revision_end = r_revision+ranlen*length;
    
    stroke(color);
    strokeWeight(1);
    line(r_revision*sin(radians(cita))+400,r_revision*cos(radians(cita))+400,r_revision_end*sin(radians(cita))+400,r_revision_end*cos(radians(cita))+400);
    cita = cita+dense;
  }
  index = index+1;
}

function draw(){
  background(220);
  for(let i = 0;i<number;i++)
    {
      hanabi(array[i][0],array[i][1],array[i][2],array[i][3]);
    }
  step = step + 1;
  index = 0;
  speed = speed * 0.96;
  r1 = r1+ speed;
}
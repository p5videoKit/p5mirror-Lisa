 function updatePos(){
    hearts[1].pos=createVector(204,230)
   hearts[2].pos=createVector(295,250)
   hearts[3].pos=createVector(361,313)
   hearts[4].pos=createVector(490,228)
   hearts[5].pos=createVector(396,231)
   hearts[6].pos=createVector(333,303) 
  }



function updateLPos(){
//   let p=[0.3,0.4,0,0.5,0.2,0.1,0.2,0.4,0.2,0.3,0.2,0.1,0.2,0.4,]
//   let a=[]
//  for (let i=0;i<p.lenth;i++){
//    a.push(random[0,1,2,3,4,5])
//  }
//   for (let i=0;i<p.length;i++){
//     drawLeaves(getaValue(p[i],0,2),getaValue(p[i],1,2),2,0.1)
//   }
 // getaValue(0.2)
  drawLeaves(0,0,0.4,1)
  drawLeaves(0,0.2,-0.4,-1)
  drawLeaves(2,0.5,-0.4,-1)
  drawLeaves(2,0.1,0.4,1)
  drawLeaves(4,0.7,-0.4,-1)
  drawLeaves(6,0,0.4,1)
  drawLeaves(14,0.3,0.4,1)
  drawLeaves(10,0.3,0.4,1)
  drawLeaves(10,0.1,-0.4,-1)
  drawLeaves(12,0.3,-0.4,-1)
  drawLeaves(12,0.32,0.4,1)
}

function getaValue(){

}

function drawLeaves(index,p,a,k){
  //let group=[[],[]]
  // for (let i=0;i<linkfeather.length;i++){
  //   if (i!=3&&i!=4){
   let groupX=(feathers[index].pos.x-feathers[index+1].pos.x)*p+feathers[index+1].pos.x-10*k
   let groupY=(feathers[index].pos.y-feathers[index+1].pos.y)*p+feathers[index+1].pos.y
  // }
  //}
  push()
  fill("#1da600")
  translate(groupX,groupY)
  //console.log(group[0])
  //console.log("work")
  scale(2)
  beginShape()
  vertex(0,-8)
  rotate(a)
  noStroke()
  bezierVertex(0,-8,-6,0,0,8)
  bezierVertex(0,8,6,0,0,-8)
  vertex(0,-8)
  endShape(CLOSE)
  pop()
}
  
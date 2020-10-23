let objectDetector;
let img;
let canvas;
let result = [{label:"",confidence:"",x:0,y:0}];
function preload() {
   objectDetector = ml5.objectDetector('cocossd', {}, modelLoaded);
}
function modelLoaded() {
  console.log('Model Loaded!');
}

function setup() {
  canvas = createCanvas(1000, 1000);
  input = createFileInput(handleFile);
  input.position(20, 20);
  canvas.position(20,100);
}

function handleFile(file) {
  if (file.type === 'image') {
    img = createImg(file.data, '');
    objectDetector.detect(img, gotResult); 
    console.log(img)
    img.hide();
    canvas.size(img.width,img.height)
    } else {
    img = null;
  }
}

function gotResult(error,results){
  if(error){
    console.error(error);
  }else{
    console.log(results);
    result = results;    
  }
}

function draw(){
  clear();
  if(img){
    image(img, 0, 0);
  }
  textSize(30);
  stroke(color('#0f0'));
  for (var i = 0; i < result.length; i++) {
    rect(result[i].x,result[i].y,result[i].width,result[i].height)
    noFill()
      stroke(color('#f00'));
    text(result[i].label,result[i].x+20,result[i].y+20);
  }
  
 
}



let classifier;
let img;
let canvas;
let result = [{label:"",confidence:""}];
function preload() {
  classifier = ml5.imageClassifier('MobileNet');
}

function setup() {
  canvas = createCanvas(1000, 800);
  input = createFileInput(handleFile);
  input.position(20, 20);
  canvas.position(20,100);
}

function handleFile(file) {
  print(file);
  clear();
  if (file.type === 'image') {
    img = createImg(file.data, '');
    classifier.classify(img, gotResult);
    img.position(20,50);
    img.size(400,400)
    canvas.position(20,150);
  } else {
    img = null;
  }

}
function draw(){
  clear();
  textSize(32);
  text("LABEL : "+result[0].label,400,40);
  text("CONFIDENCE : "+result[0].confidence,400,80);
}


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
   result = results;
  }
}
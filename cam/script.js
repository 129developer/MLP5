let classifier;
let img;
let canvas;
let result = [{label:"",confidence:""}];
function preload() {
  classifier = ml5.imageClassifier('MobileNet');
}

function setup() {
  canvas = createCanvas(1000, 800);
  canvas.position(20,100);
  img = createCapture(VIDEO);
  img.hide();
  classifier.classify(img, gotResult);
}


function draw(){
  clear();
  image(img, 20, 100, img.height ,img.width);
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
	classifier.classify(img, gotResult);
  }
}

function handleFile(file) {
  print(file);
  clear();
  if (file.type === 'image') {
    img = createVideo(VIDEO);
    classifier.classify(img, gotResult);
    img.position(20,50);
    img.size(400,400)
    canvas.position(20,150);
  } else {
    img = null;
  }

}

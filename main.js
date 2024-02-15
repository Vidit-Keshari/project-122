x = 0;
y = 0;

apple = "";
draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
speak_data = "";

to_number = "";

function preload() {
  apple = loadImage("apple.png")
}

recognition.onresult = function recogfunc(event) {

  console.log(event);
  content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;

  to_number = Number(content);
  if(Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started Drawing Apple";
    draw_apple = "set";
    console.log(content);
    draw();
  } else {
    document.getElementById("status").innerHTML = "Text recognised is not a number";
    console.error(content);
  }

}


function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();
  recogfunc();
}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  
  canvas = createCanvas(950, 525);
  canvas.position(210, 100);
}

function draw() {
  if (draw_apple == "set") {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number;
    draw_apple = "";
    speak();
    for(var i = 1; 1<= to_number; i++) {
      x = Math.floor(Math.random() * 300);
      y = Math.floor(Math.random() * 70);
      image(apple, x, y, 50, 50);
    }
  }
}

function speak() {
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);

  speak_data = "";
}
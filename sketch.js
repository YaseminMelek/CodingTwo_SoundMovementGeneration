
var foods = [];
let keyboard_array = [];
let generated_array = [];
let organism;
let texts;

var sound_move;
var sound_scan;
var sound_call;
var seeking = false;
var hue_change = 210;

let step_r = 0;
let step_l = 0;
let step_u = 0;
let step_d = 0;
let light;
let countdown = 30;
let key_interaction = true;
let move_index = 0;

function setup() {
  createCanvas(1200, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  // initialization of all classes
  for(let i = 0; i < 1000; i++) {
    foods.push(new Food(random(0, width), random(0, height), random(0,10), int(random(170, 250))));
  }
  texts = new Texts();
  organism = new Organism(width/2, height/2, 100);
  light = new Light(organism.position.x, organism.position.y - 100, 20, organism.position.x, organism.position.y);
  sound_move = new SoundGenerate();
  sound_scan = new SoundGenerate('sine', 0.9, 0.2, 0.8, 1000, 300);
  sound_call = new SoundGenerate('triangle', 0.2, 0.2, 0.6, 1000, 100);
}

function draw() {
  userStartAudio();
  background(250, 100, 10, 30);
  organism.run(step_r, step_l, step_d, step_u);
  light.run();
  // ends the game after every particle is collected
  if(foods.length == 0) {
    texts.end = true;
  }
  // ends the countdown and starts the generation
  if((frameCount % 25 == 0) && (organism.generate == false)){
    countdown--;
  }
  // disables key interaction and generates  sequence
  if((countdown == 0) && (organism.generate == false)){
    organism.generate = true;
    key_interaction = false;
    generate_sequence(keyboard_array);
  }
  if(organism.generate == false) {
    key_interaction = true;
  }
  // checks distance between particles, and light source
  for(let i = 0; i < foods.length; i++) {
    foods[i].run();
    if(light.active == true) {
      foods[i].check_distance(light.position);
    }
    if(seeking == true) {
      foods[i].move(organism);
    }
  }
  texts.run(countdown);
}

//all keyboard interactions
function keyPressed() {
  if ((keyCode === LEFT_ARROW) && key_interaction == true){
    step_l = 10;
    keyboard_array.push('l');
  }
   else if ((keyCode === RIGHT_ARROW) && key_interaction == true){
    step_r = 10;
    keyboard_array.push('r');
  }
  else if ((keyCode === UP_ARROW) && key_interaction == true){
    step_u = 10;
    keyboard_array.push('u');
  }
  else if ((keyCode === DOWN_ARROW) &&  key_interaction == true) {
    step_d = 10;
    keyboard_array.push('d');
  }
  //S
  else if ((keyCode === 83) && key_interaction == true){
    light.origin.x = organism.position.x;
    light.origin.y = organism.position.y;
    light.active = true;
    keyboard_array.push('s');
  }
  //C
  else if ((keyCode === 67) && key_interaction == true){
    seeking = true;
    keyboard_array.push('c');
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW){
    step_u = 0;
  }else if (keyCode === DOWN_ARROW){
    step_d = 0;
  }else if (keyCode === LEFT_ARROW){
    step_l = 0;
  }else if (keyCode === RIGHT_ARROW){
    step_r = 0;
  }
}
// uses weighted randomness for generating the sequence 
function generate_sequence(keyboard_array) {
  let w_r = 0;
  let w_l = 0;
  let w_u = 0;
  let w_d = 0;
  let w_s = 0;
  let w_c = 0;

  //all inputs are counted and put into their according weight variables
  for(let i = 0; i < keyboard_array.length; i++) {
      if(keyboard_array[i] == 'r') w_r++;
      else if (keyboard_array[i] == 'l') w_l++;
      else if (keyboard_array[i] == 'u') w_u++;
      else if (keyboard_array[i] == 'd') w_d++;
      else if (keyboard_array[i] == 's') w_s++;
      else if (keyboard_array[i] == 'c') w_c++;
  }
  //probabilities are calculated. The probabilities are between 0 and 1
  const prob_r = w_r / keyboard_array.length;
  const prob_l = prob_r + w_l / keyboard_array.length;
  const prob_u = prob_l + w_u / keyboard_array.length;
  const prob_d = prob_u + w_d / keyboard_array.length;
  const prob_s = prob_d + w_s / keyboard_array.length;
  const prob_c = prob_s + w_c / keyboard_array.length;

  //looking at the related probabilities, a random action is generated and pushed into the generated_array
  for(let i = 0; i < 50; i++) {
      const r = random();
      if(r <= prob_r) {
        generated_array.push('r');
      }else if((r > prob_r) && (r <= prob_l)) {
        generated_array.push('l');
      }else if((r > prob_l) && (r <= prob_u)) {
        generated_array.push('u');
      }else if((r > prob_u) && (r <= prob_d)) {
        generated_array.push('d');
      }
      else if((r > prob_d) && (r <= prob_s))  {
        generated_array.push('s');
      }
      else if((r > prob_s) && (r <= prob_c))  {
        generated_array.push('c');
    }
  }
  generate_movement();
  console.log(generated_array);  
}

// uses set timeout to weight between each action, otherwise they all happen simultaneously or have a very short waiting period 
//the generated area is looped through and related functions are called for the action
function generate_movement() {
  setTimeout(() => {
      if(generated_array[move_index] == 'r') {
          organism.move(30, 0, 0, 0);
      }else if(generated_array[move_index] == 'l') {
          organism.move(0, 30, 0, 0);
      }else if(generated_array[move_index] == 'u') {
          organism.move(0, 0, 0, 30);
      }else if(generated_array[move_index] == 'd') {
          organism.move(0, 0, 30, 0);
      }else if(generated_array[move_index] == 's') {
        light.origin.x = organism.position.x;
        light.origin.y = organism.position.y;
        light.active = true;
      }
      else if(generated_array[move_index] == 'c') {
        seeking = true;
      }
      move_index++;
      if(move_index < generated_array.length) {
          generate_movement();
      }
      //the end of the generated sequence. Original settings are restored
      else if(move_index >= generated_array.length){
          organism.position.x = width/2;
          organism.position.y = height/2;
          move_index = 0;
          organism.generate = false;
          countdown = 30;
          while(generated_array.length > 0) {
            generated_array.pop();
          }                
      }
  }, 400);
}
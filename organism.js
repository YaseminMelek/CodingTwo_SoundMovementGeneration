class Organism {
    constructor(x,y, r) {
        this.r = r;
        this.position = createVector(x, y);
        this.steps = 100;
        this.theta = 0.5;
        this.generate = false;
        this.body_r = this.r * 4;
        this.amp = 1;
    }
    run(step_r, step_l, step_d, step_u) {
        this.move(step_r, step_l, step_d, step_u);
        this.display();
    }

    // moves the organism based on the input and generates the sound
    move(step_r, step_l, step_d, step_u) {
        if(step_r > 0) {
            this.position.x += step_r;
            sound_move.play_sound_1();
        }else if(step_l > 0) {
            this.position.x -= step_l;
            sound_move.play_sound_2();
        }else if(step_u > 0) {
            this.position.y -= step_u;
            sound_move.play_sound_3();
        }else if(step_d > 0) {
            this.position.y += step_d;
            sound_move.play_sound_3();
        }
        this.check_bounds();
    }

    check_bounds() {
        if(this.position.x < 0) this.position.x = width;
        else if(this.position.x > width) this.position.x = 0;
        else if(this.position.y < 0) this.position.y = height;
        else if(this.position.y > height) this.position.y = 0; 
    }


    //the outer ellipse changes r with a sine wave
    display() {
        //main body
        let change = this.amp * sin(this.theta);
        let new_r = this.body_r * change;
        stroke(220, 10, 100, 10);
        strokeWeight(5);
        fill(hue_change, 100, 100,20);
        ellipse(this.position.x, this.position.y, new_r, new_r);
        //eye border
        ellipse(this.position.x, this.position.y, this.r + 50, this.r + 50);
        //eye
        fill(20, 100, 70, 90);
        ellipse(this.position.x, this.position.y, this.r, this.r);
        this.theta += 0.5;
    }
    
}

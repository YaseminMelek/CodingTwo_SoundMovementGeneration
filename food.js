class Food {
    constructor(x,y,r, hue) {
        this.r = r;
        this.velocity = createVector(random(-1,1), random(-1,1));
        this.acceleration = createVector(0, 0);
        this.max_speed = 1;
        this.max_force = 0.05;
        this.position = createVector(x,y);
        this.bright_value = 10;
        this.sound_play = false;
        this.hue_value = hue;
    }

    run() {
        this.display();
        this.check_bounds();
    }
    // based on Dan Shiffman's work on vectors, particle systems and autonomous agents
    move(target) {
        if(this.bright_value > 50) {
            let seek_val = this.seek(target.position);
            this.acceleration.add(seek_val);
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.max_speed);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
            if(this.sound_play == false) {
                sound_call.osc.amp(0.8, 0.2);
                sound_call.osc.start();
                this.time_start = frameCount;
                this.sound_play = true;
            } 
            this.check_collision(target);       
        }
        // the oscillator needs to be stopped after a certain time
        if((frameCount - this.time_start == 50) && this.sound_play == true){
            sound_call.osc.amp(0, 0.5);
            this.sound_play = false;
            seeking = false;
        } 
    }
 
    check_bounds() {
        if(this.position.x < 0) this.position.x = width;
        else if(this.position.x > width) this.position.x = 0;
        else if(this.position.y < 0) this.position.y = height;
        else if(this.position.y > height) this.position.y = 0; 
    }
    // I used p5.collide library to check for collisions between the organism and the particles
    check_collision(target) {
        if(collideCircleCircle(target.position.x, target.position.y, target.r, this.position.x, this.position.y, this.r)) {
            for(let i = foods.length; i > -1; i--) {
                if(foods[i] == this) {
                    foods.splice(i, 1);
                    hue_change = this.hue_value;
                }
            }
        }
    }
    display() {
        strokeWeight(1);
        stroke(this.hue_value, 50, this.bright_value, 100);
        fill(this.hue_value, 100, this.bright_value, 100);
        ellipse(this.position.x, this.position.y, this.r, this.r);
        if(this.bright_value > 0) {
            this.bright_value -= 0.5
        }
    }
    seek(target) {
        let desired = p5.Vector.sub(target, this.position); 
        desired.normalize();
        desired.mult(this.max_speed);
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.max_force); 
        return steer;
    }
    // brightness value is adjusted by checking the distance with the scanning mechanic
    check_distance(light_pos) {
        const dist = p5.Vector.sub(light_pos, this.position);
        if(Math.abs(dist.mag()) < 300) {
            this.bright_value = map(dist.mag(), 0, 500, 100, 0);

        }
    }

}
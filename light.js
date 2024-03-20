class Light {
    constructor(x,y, r, origin_x, origin_y) {
        this.position = createVector(x,y);
        this.r = r;
        this.active = false;
        this.origin = createVector(origin_x, origin_y);
        this.time_start = 0;
        this.sound_play = false;
        this.bezier_rot = 0;
    }

    run() {
        if(this.active == true) {
            // the origin point is to coordinate the light with the organism, origin points are center points of the organism
            this.position.x = this.origin.x;
            this.position.y = this.origin.y;
            if(this.sound_play == false) {
                sound_scan.osc.start();
                this.time_start = frameCount;
                this.sound_play = true;
            }
            this.display();
        }
        // oscillator need to be stopped after a while
        if((frameCount - this.time_start == 20) && this.sound_play == true){
            sound_scan.osc.stop();
            this.sound_play = false;
        } 
    }

    // creates bezier curves and rotates them for the scanning
    display() {
        for(let i = 0; i < 30; i++) {
            stroke(220, 10, 100, 10);
            fill(220, 100, 100,20);
            strokeWeight(10);
            push();
                translate(this.position.x, this.position.y);
                rotate(this.bezier_rot);
                let x1 = 0;
                let y1 = - random(-50,50);
                let x2 = random(-50,50);
                let y2 = random(-50,50);
                let x3 = random(-50,50);
                let y3 = random(-50,50);
                let x4 = 0;
                let y4 = random(200);
                bezier(0, 0, x2, y2, x3, y3, x4, y4);
                for(let i = 0; i <= this.steps; i++) {
                    let t = i/this.steps;
                    let x = bezierPoint(x1, x2, x3, x4, t);
                    let y = bezierPoint(y1, y2, y3, y4, t);
                    ellipse(x, y,10);
                }
                this.bezier_rot += 1;

            pop();
        }
        if(this.bezier_rot > 360) {
            this.active = false;
            this.bezier_rot = 1;
        }
    }
}
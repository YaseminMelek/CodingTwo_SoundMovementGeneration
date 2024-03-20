class Texts {
    constructor() {
        this.end = false;
    }
    run(countdown) {
        if(this.end == true) {
            this.end_text();
        }
        else {
            if(frameCount < 500) {
                this.instructions();
            }
            // countdown is passed on from sketch.js with modulo and frameCount 
            this.time_left(countdown);
        }
    }

    instructions() {
        textFont('Courier New');
        textSize(40);
        let text1 = "Move with arrow keys";
        let text2 = "Scan with S";
        let text3 = "Collect with C";
        noStroke();
        fill(0, 10, 100, 50);
        text(text1, 100, height - 200);
        text(text2, 100, height - 150);
        text(text3, 100, height - 100);
    }

    time_left(countdown) {
        textFont('Courier New');
        textSize(20);
        noStroke();
        fill(0, 10, 100, 50);
        let text1 = "Countdown";
        let text2 = countdown;
        text(text1, width - 150, 100);
        stroke(0, 10, 100, 50);
        noFill();
        ellipse(width-100, 150, 60, 60);
        textSize(30);
        text(text2, width - 117, 157);
    }

    end_text() {
        textSize(100);
        noStroke();
        fill(0, 10, 100, 50);
        let text1 = "The End";
        text(text1, width/2, height/2);
    }

}
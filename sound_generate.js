class SoundGenerate {
    //sounds are generated with p5.monosynth, p5.Oscillator and p5.delay. I got help from the p5.sound examples: https://p5js.org/reference/#/libraries/p5.sound
    constructor(osc_type, osc_amp, delay_time, delay_feedback, delay_freq, osc_freq){
        this.monoSynth = new p5.MonoSynth();
        this.osc = new p5.Oscillator(osc_type);
        this.osc.amp(osc_amp);
        this.osc.freq(osc_freq);
        this.delay = new p5.Delay();
        this.delay.process(this.osc, delay_time, delay_feedback, delay_freq);
    }
    play_sound_1() {
        let note = 'G3';
        let v = 1;
        let time = 0.1;
        let dur = 0.5;
        this.monoSynth.play(note, v, time += 0.5, dur);
    }
    play_sound_2() {
        let note = 'Bb3'; //this
        let v = 1;
        let time = 0;
        let dur = 0.5;
        this.monoSynth.play(note, v, time += 0.5, dur);
    }
    play_sound_3() {
        let note = 'G3';
        let v = 1;
        let time = 0;
        let dur = 0.5;
        this.monoSynth.play(note, v, time += 0.5, dur);
    }
    play_sound_4() {
        let note = 'Bb3';
        let v = 1;
        let time = 0.5;
        let dur = 0.5;
        this.monoSynth.play(note, v, time += 0.5, dur);
    }


}
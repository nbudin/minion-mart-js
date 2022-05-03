import { useRef, useState } from "react";
import JZZ from "jzz";
import Synth from "jzz-synth-tiny";

const STORIES = [
  "a rogue with a heart of gold",
  "a young seeker of fame and fortune",
  "a 5-foot tall carpenter ant",
  "the captain of the USS Enterprise",
  "a Tyrannosaurus Rex",
];

const SKILLS = [
  "juggling",
  "cooking",
  "knife throwing",
  "card tricks",
  "stenography",
  "steganography",
];

const FLAWS = [
  "can only form sentences with up to 4 words",
  "are constantly sneezing",
  "have a fear of mathematics",
];

Synth(JZZ);

class Timer {
  startTime: number | undefined;
  callback: ((ticks: number) => void) | undefined;
  handle: number | undefined;

  start(cb: (ticks: number) => void) {
    this.startTime = new Date().getTime();
    this.callback = cb;
    this.handle = window.setInterval(() => this.tick(), 100);
    this.tick();
  }

  tick() {
    if (this.startTime == null || this.callback == null) {
      return;
    }

    const now = new Date().getTime();
    this.callback(now - this.startTime);
  }

  stop() {
    if (this.handle != null) {
      window.clearInterval(this.handle);
      this.handle = undefined;
    }

    this.callback = undefined;
    this.startTime = undefined;
  }
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

const NOTE_NAMES = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];
const OCTAVES = [4, 5, 6, 7];

function randomNote(): string {
  return `${randomItem(NOTE_NAMES)}${randomItem(OCTAVES)}`;
}

function Spinion() {
  const [story, setStory] = useState("<story>");
  const [skill, setSkill] = useState("<skill>");
  const [flaw, setFlaw] = useState("<flaw>");
  const timerRef = useRef(new Timer());
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    const storyGoal = randomItem(STORIES);
    const skillGoal = randomItem(SKILLS);
    const flawGoal = randomItem(FLAWS);

    const notes = Array.from({ length: 20 }, () => randomNote());
    notes.reduce((synth, note) => {
      return synth.noteOn(0, note, 127).wait(100).noteOff(0, note);
    }, JZZ.synth.Tiny());

    const tick = (ticks: number) => {
      if (ticks < 2000) {
        setStory(randomItem(STORIES));
        setSkill(randomItem(SKILLS));
        setFlaw(randomItem(FLAWS));
      } else {
        setStory(storyGoal);
        setSkill(skillGoal);
        setFlaw(flawGoal);
        setRolling(false);
        timerRef.current.stop();
      }
    };

    timerRef.current.start(tick);
    setRolling(true);
  };

  return (
    <div>
      <div style={{ fontSize: "120%", marginBottom: "1em" }}>
        They are {story}
        <br />
        who can do {skill}
        <br />
        but watch out, they {flaw}
      </div>
      <button type="button" onClick={roll} disabled={rolling}>
        Roll the dice!
      </button>
    </div>
  );
}

function App() {
  return (
    <Spinion />
    // <Canvas>
    //   <BreakroomScene />
    // </Canvas>
  );
}

export default App;

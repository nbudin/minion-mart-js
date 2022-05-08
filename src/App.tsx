import { useRef, useState } from "react";
import JZZ from "jzz";
import Synth from "jzz-synth-tiny";

const STORIES = [
  "a rogue with a heart of gold",
  "a young seeker of fame and fortune",
  "a 5-foot tall carpenter ant",
  "the captain of a starship",
  "a Tyrannosaurus Rex",
  "a Venetian snail farmer",
  "a gladiator",
  "trying to be employee of the month",
  "a disgraced mafia Don",
  "a precious cinnamon roll",
  "guardian of the nuclear pants",
  "a man-child",
  "an indie song writer",
  "a rubber dinosaur",
  "a heroic plumber",
  "a billionaire genius philanthropist",
  "an airship pirate",
  "an escaped criminal",
  "a birthday clown",
  "a ghost",
  "a clueless wanderer",
  "an undercover IRS agent",
  "a doctor with a fake degree",
  "a lawyer who sold their heart of gold",
  "an explosive expert",
  "a shopaholic teenager",
  "a plucky teenage investigator",
  "a cephalopod",
  "an old fisherman",
  "a bettle man",
  "a perpetual mom",
  "a kindly space wizard",
  "a trapeze artist",
  "a disaster journalist",
  "a 13th century queen",
  "a vampire who's over it",
  "a ventriloquist",
  "a sentient banana",
  "an accountant",
  "a middle school math teacher",
  "a call center worker",
  "a foest nymph",
];

const SKILLS = [
  "juggles",
  "cooks",
  "throws knives",
  "does card tricks",
  "does stenography",
  "picks locks",
  "sneaks",
  "handles animals",
  "steals",
  "does astrology",
  "bluffs",
  "encourages",
  "disarms traps",
  "flirts",
  "does intimidation",
  "does impersonation",
  "does diplomacy",
  "levitates",
  "makes poison",
  "bakes",
  "evades punches",
  "haggles",
  "wins bets",
  "does cartwheels",
  "cares for kids",
  "makes baloon animals",
  "lucks out",
  "plays pretend",
  "is very literal",
  "plays the violin",
  "has super strength",
  "is fashionable",
  "does gymnastics",
  "does archery",
  "whittles",
  "shrinks",
  "climbs walls",
  "is great at sternly worded letters",
  "has impeccable comedic timing",
  "does accents",
  "is very enthusiastic",
  "can do the worm",
  "understands 'the lingo'",
  "solves crimes",
  "speaks eloquently",
  "sews costumes",
  "uses mirrors",
];

const FLAWS = [
  "can only form sentences with up to 4 words",
  "are constantly sneezing",
  "have a fear of mathematics",
  "steal",
  "flirt",
  "have delusions of grandeur",
  "are forgetful",
  "are greedy",
  "are stubborn",
  "are paranoid",
  "are spoiled",
  "are egotistical",
  "are obsessed with the nearest shiny object",
  "are hoity toity",
  "won't touch people",
  "only speak in song lyrics",
  "spit",
  "whine all the time",
  "are allergic to irony",
  "are afraid of heights",
  "are illiterate",
  "speaks in metaphors",
  "forgot to shower",
  "are afraid of children",
  "play pretend",
  "the 1%",
  "are a pathological liar",
  "have sensitive ears",
  "like to throw stuff",
  "are hangry",
  "prank",
  "won't get it",
  "are that uncle",
  "constantly burp",
  "are bad at being surprised",
  "cry during dramatic movies",
  "cannot stay still",
  "are afraid of the dark",
  "get drunk and make it weird",
  "laugh in inappropriate moments",
  "speak in memes",
  "LOVE bread",
  "have explosive flatulence",
  "are obsessed with being weird",
  "they base their entire personality on it",
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
        who {skill}
        <br />
        but watch out, they {flaw}
      </div>
      <button type="button" onClick={roll} disabled={rolling}>
        Bring Forth The Minion!
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

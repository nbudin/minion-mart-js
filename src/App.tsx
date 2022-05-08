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
];

const SKILLS = [
  "juggle",
  "cook",
  "throw knives",
  "do card tricks",
  "do stenography",
  "pick locks",
  "sneak",
  "handle animals",
  "steal",
  "do astrology",
  "bluff",
  "encourage",
  "disarm traps",
  "flirt",
  "do intimidation",
  "do impersonation",
  "do diplomacy",
  "levitate",
  "make poison",
  "bake",
  "evade punches",
  "haggle",
  "win bets",
  "do cartwheels",
  "care for kids",
  "make baloon animals",
  "luck out",
  "play pretend",
  "be literal",
  "play the violin",
  "have super strength",
  "are fashionable",
  "do gymnastics",
  "do archery",
  "whittle",
  "shrinks",
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

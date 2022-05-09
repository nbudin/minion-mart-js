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
  "a being who hopes to be employee of the month",
  "a disgraced mafia Don",
  "a precious cinnamon roll",
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
  "a beetle man",
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
  "an HOA president",
  "a surfer dude",
  "a house cat",
  "a super powered armadillo",
  "a monk",
  "grocery store royalty",
  "a dragon",
  "a rock monster",
  "a hipster",
  "a train conductor",
  "a werecow",
  "a wererabbit",
  "a fairy that made a mistake",
  "a mediocre genie",
  "a zombie wrangler",
  "a kiwi",
  "an AI",
  "a bookworm",
  "a beekeeper",
  "a little pig",
  "a sentient cactus",
  "a body builder",
  "an animatronic racoon",
  "a corporate shill",
  "a disheveled dryad",
  "a smart-mouthed panda",
  "a retired police officer",
  "an ex-LARPer",
  "a man eater",
  "an aging kung fu master",
  "a mime",
  "a candy shop capitalist",
  "a bubblegum baron",
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
  "uses mirrors creatively",
  "has a beautiful singing voice",
  "invents contraptions",
  "gives great mani/pedis",
  "is speedy",
  "is learning humility",
  "commits arson",
  "is good at getting their way",
  "knows how to forage",
  "has catlike reflexes",
  "knows woodworking",
  "knows where the good food is",
  "has an excellent sense of smell",
  "knows first aid",
  "is good at hand to hand combat",
  "a harpsichord",
  "can hear the sound track",
  "summons sheep",
  "is very memorable",
  "is very organized",
  "rides clouds",
  "is great at crafting",
  "kills with kindness",
  "tells great stories",
  "can do augury",
  "can learn anything",
  "has a great memory",
  "sees the future - kinda",
  "makes gourmet food",
  "knows kung fu",
  "has infectious laughter",
  "improvises weaponry",
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
  "are the 1%",
  "are a pathological liar",
  "have sensitive ears",
  "like to throw stuff",
  "are hangry",
  "prank",
  "won't get it",
  "are that uncle",
  "constantly burp",
  "hate surprises",
  "cry during dramatic moments",
  "cannot stay still",
  "are afraid of the dark",
  "get drunk and make it weird",
  "laugh at inappropriate moments",
  "speak in memes",
  "LOVE bread",
  "have explosive flatulence",
  "are obsessed with being weird",
  "base their entire personality on it",
  "wear nuclear pants",
  "are looking for love",
  "bruise easily",
  "cannot control their body",
  "have a very annoying voice",
  "can't speak to the opposite sex",
  "sneeze explosions",
  "are obsessed with books",
  "hate clothes",
  "are a hipster",
  "always leave a pizza as their calling card",
  "steal snacks",
  "have crippling insecurity",
  "pronounce it 'GIF'",
  "are night blind",
  "constantly say 'mood'",
  "are soooo bored",
  "split the party",
  "summon sheep",
  "are tone deaf",
  "steal keys",
  "squeal",
  "drink your milkshake",
  "have the hiccups",
  "leave the door open",
  "draw on every surface",
  "make everything a competition",
  "are always negative",
  "insist on the director's cut",
  "are full of bees",
  "are addicted to juice boxes",
  "are only happy when it rains",
  "hate to be looked at",
  "bite",
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

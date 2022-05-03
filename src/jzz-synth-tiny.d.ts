declare module "jzz" {
  class TinySynth {
    noteOn(channel: number, key: string | number, velocity: number): TinySynth;
    wait(duration: number): TinySynth;
    noteOff(channel: number, key: string | number): TinySynth;
  }

  declare const JZZ: {
    synth: {
      Tiny: () => TinySynth;
    };
  };

  export = JZZ;
}

declare module "jzz-synth-tiny" {
  declare function Tiny(jzz: any): void;

  export = Tiny;
}

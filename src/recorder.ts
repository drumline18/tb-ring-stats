class Recorder {

  private rolls: timedRollObject[];
  private nbRolls: number;
  private callback: ((result: Array<Array<string|number>>) => void) | null;
  private counter: number;

  constructor() {
    this.rolls = [];
    this.nbRolls = 0;
    this.callback = null;
    this.counter = 0;
  }

  public start(nbRolls?: number, callback?: (result: Array<Array<string | number>>) => void) {
    this.nbRolls = nbRolls || 150;
    this.callback = callback ? callback : null;
    window.socket3.on("START_ROLL", (round: rollObject) => { this.addRoll(round) })
  }
  public stop() {
    // @ts-ignore
    window.socket3._callbacks.$START_ROLL.pop(); // cheap trick, be wary
  }
  private addRoll({ round, luckyNum, hash }: rollObject) {
    this.rolls = this.rolls.concat({ round, luckyNum, hash, time: Date.now() });
    this.counter++;
    if (this.counter >= this.nbRolls) { this.save(); }
  }
  private save() {
    const obj = this.rolls.map(r => [r.round, r.luckyNum, r.hash, r.time]);
    this.rolls = [];
    this.stop();
    if (this.callback) {
      this.callback(obj);
    }
  }
}
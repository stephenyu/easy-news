import { AudioTarget } from "extract/models/AudioTarget";

import { AudioTargetBBC } from "extract/audioTargets/AudioTargetBBC";
import { AudioRecord } from "shared/AudioRecord";

class Runner {
  private audioTargets: Array<AudioTarget>;

  constructor() {
    this.audioTargets = [];
  }

  registerAudioTarget(audioTarget: AudioTarget) {
    this.audioTargets.push(audioTarget);
    return this;
  }

  async startAudioParsing(): Promise<Array<AudioRecord>> {
    return Promise.all(
      this.audioTargets.map(async target => {
        const url = await target.getUrl();
        const { id, name } = target;

        return { id, name, url };
      })
    );
  }
}

const runner = new Runner();

runner.registerAudioTarget(new AudioTargetBBC());

console.log("Hello?");
(async () => {
  const results = await runner.startAudioParsing();
  console.log("Hello?");
  console.log(results);
})();

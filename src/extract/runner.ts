import * as path from "path";

import { AudioTarget } from "./models/AudioTarget";
import { AudioRecordFileWriter } from "./models/AudioRecordFileWriter";
import { AudioTargetBBC } from "./audioTargets/AudioTargetBBC";
import { AudioTargetWSJ } from "./audioTargets/AudioTargetWSJ";
import { AudioTargetCBC } from "./audioTargets/AudioTargetCBC";
import { AudioRecord } from "types/types";

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

runner.registerAudioTarget(new AudioTargetBBC())
  .registerAudioTarget(new AudioTargetCBC());

(async () => {
  const results = await runner.startAudioParsing();

  const destination = path.join(
    process.cwd(),
    "src",
    "web",
    "artifacts",
    "news_sources.json"
  );

  await AudioRecordFileWriter.writeFile(destination, results);
})();

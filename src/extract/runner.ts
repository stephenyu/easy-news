import * as path from "path";

import { AudioTarget } from "extract/models/AudioTarget";
import { AudioRecordFileWriter } from "extract/models/AudioRecordFileWriter";
import { AudioTargetBBC } from "extract/audioTargets/AudioTargetBBC";
import { AudioTargetWSJ } from "extract/audioTargets/AudioTargetWSJ";
import { AudioTargetCBC } from "extract/audioTargets/AudioTargetCBC";
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

runner
  .registerAudioTarget(new AudioTargetBBC())
  .registerAudioTarget(new AudioTargetCBC())
  .registerAudioTarget(new AudioTargetWSJ());

(async () => {
  const results = await runner.startAudioParsing();

  const destination = path.join(
    process.cwd(),
    "src",
    "renderer",
    "pages",
    "indexPage.json"
  );

  await AudioRecordFileWriter.writeFile(destination, results);
})();

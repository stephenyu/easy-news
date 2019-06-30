import * as fs from "fs";

import { AudioRecord } from "shared/AudioRecord";

export class AudioRecordFileWriter {
  static async writeFile(
    destination: string,
    audioRecords: Array<AudioRecord>
  ) {
    return fs.writeFile(destination, JSON.stringify(audioRecords), err => {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });
  }
}

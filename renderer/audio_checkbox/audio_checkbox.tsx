import uuidv1 from "uuid/v1";

import { AudioRecord } from "audio_playlist/audio_playlist";

export interface AudioCheckboxProps {
  audioRecord: AudioRecord;
  onSelect: (audioRecord: AudioRecord) => void;
  onUnselect: (audioRecord: AudioRecord) => void;
}

export const AudioCheckbox = ({
  audioRecord,
  onSelect,
  onUnselect
}: AudioCheckboxProps) => {
  const htmlId = uuidv1();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;

    if (isSelected) {
      onSelect(audioRecord);
    } else {
      onUnselect(audioRecord);
    }
  };
  return (
    <div>
      <input type="checkbox" id={htmlId} onChange={onChange} />
      <label htmlFor={htmlId}>{audioRecord.name}</label>
    </div>
  );
};

export abstract class AudioTarget {
  abstract async getUrl(): Promise<string>;

  abstract get id(): string;

  abstract get name(): string;
}

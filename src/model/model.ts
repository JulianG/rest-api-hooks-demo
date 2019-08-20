export type GameStatus = "not-started" | "started" | "finished";
export type Game = {
  readonly id: number;
  readonly title: string;
  readonly year: number;
  readonly genre: string;
  readonly url: string;
  status: GameStatus;
};
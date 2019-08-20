export type GameStatus = "not-started" | "started" | "finished";
export type Game = {
  readonly id: number;
  readonly title: string;
  readonly year: number;
  readonly genre: string;
  readonly url: string;
  status: GameStatus;
};

export type Action = SetAllGamesAction | SetGameAction;
type SetAllGamesAction = { type: "set-all"; games: ReadonlyArray<Game> };
type SetGameAction = { type: "set-game"; game: Game };

export function gamesReducer(games: ReadonlyArray<Game>, action: Action) {
  switch (action.type) {
    case "set-all":
      return action.games;
    case "set-game":
      const index = games.findIndex(g => g.id === action.game.id);
      const newGames = games.slice();
      if (index >= 0) {
        newGames[index] = action.game;
      }
      return newGames;
  }
}
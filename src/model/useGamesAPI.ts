import React from "react";
import { GameAPI } from "../api/games.api";
import { Game, gamesReducer, GameStatus } from "./model";

export function useGamesAPI(api: GameAPI) {
  const initialGames: ReadonlyArray<Game> = [];

  const [games, dispatch] = React.useReducer(gamesReducer, initialGames);

  const getGame = (id: number) =>
    void api.getGame(id).then(game => dispatch({ type: "set-game", game }));

  const setGameStatus = (id: number, status: GameStatus) =>
    void api.patchGameStatus(id, status).finally(() => getGame(id));

  React.useEffect(
    () =>
      void api
        .getAllGames()
        .then(games => dispatch({ type: "set-all", games })),
    [api]
  );

  return { games, setGameStatus };
}

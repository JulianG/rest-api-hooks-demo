import React from "react";
import { GameAPI } from "../api/games.api";
import { Game, gamesReducer, GameStatus } from "./model";

export function useGamesAPI(api: GameAPI) {
  const initialGames: ReadonlyArray<Game> = [];

  const [games, dispatch] = React.useReducer(gamesReducer, initialGames);

  const setGameStatus = async (id: number, status: GameStatus) => {
    await api.patchGameStatus(id, status);
    const patchedGame = await api.getGame(id);
    dispatch({ type: "set-game", game: patchedGame });
  };

  React.useEffect(
    () =>
      void api
        .getAllGames()
        .then(games => dispatch({ type: "set-all", games })),
    [api]
  );

  return { games, setGameStatus };
}

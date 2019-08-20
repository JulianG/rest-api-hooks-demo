import { Game, GameStatus } from '../model/model';

export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type JSONFetch = (
  url: string,
  method?: HTTPMethod,
  data?: any
) => Promise<unknown>;

export type GameAPI = {
  getAllGames: () => Promise<ReadonlyArray<Game>>;
  getGame: (id: number) => Promise<Game>;
  patchGameStatus: (id: number, status: GameStatus) => Promise<Game>;
};

export function makeGameAPI(jsonFetch: JSONFetch, endpoint: string): GameAPI {
  const getAllGames = async () => {
    const response = await jsonFetch(endpoint + "games/");
    return response as ReadonlyArray<Game>;
  };

  const getGame = async (id: number) => {
    const response = await jsonFetch(endpoint + "games/" + id);
    return response as Game;
  };

  const patchGameStatus = async (id: number, status: GameStatus) => {
    const game = await jsonFetch(endpoint + "games/" + id, "PATCH", {
      status
    });
    return game as Game;
  };

  return { getAllGames, getGame, patchGameStatus };
}

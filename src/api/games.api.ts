import { Game, GameStatus } from '../model/model';

export type GameAPI = {
  getAllGames: () => Promise<ReadonlyArray<Game>>;
  getGame: (id: number) => Promise<Game>;
  patchGameStatus: (id: number, status: GameStatus) => Promise<Game>;
};

export function makeGameAPI(endpoint: string): GameAPI {
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

////
export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function jsonFetch(
  url: string,
  method: HTTPMethod = "GET",
  data?: any
): Promise<unknown> {
  return fetch(url, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data)
  }).then(response => response.json());
};

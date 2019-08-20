import React from "react";
import { useGamesAPI } from "./model/useGamesAPI";
import { makeGameAPI } from "./api/games.api";
import { GameStatus } from "./model/model";

const gameApi = makeGameAPI("http://localhost:3001/");

const App: React.FC = () => {
  const { games, setGameStatus } = useGamesAPI(gameApi);

  return (
    <>
      <h1>Some Commodore 64 Games</h1>
      {games.map(game => (
        <div key={game.id} className="game">
          <h3>
            {game.title} ({game.year})
          </h3>
          <p>
            Genre: <strong>{game.genre}</strong>
          </p>
          <p>
            Wikipedia:{" "}
            <strong>
              <a href={game.url}>{game.url}</a>
            </strong>
          </p>
            <Status
              status={game.status}
              markAsFinished={() => setGameStatus(game.id, "finished")}
            />
        </div>
      ))}
    </>
  );
};

function getStatusText(status: GameStatus): string {
  return {
    "not-started": "Not started",
    started: "Started",
    finished: "Finished"
  }[status];
}

const Status: React.FC<{ status: GameStatus; markAsFinished: Function }> = ({
  status,
  markAsFinished
}) => {
  if (status !== "finished") {
    return (
      <p>
        Status: <strong>{getStatusText(status)}</strong> &nbsp;{" "}
        <button onClick={() => markAsFinished()}>Mark as Finished</button>
      </p>
    );
  } else {
    return (
      <p>
        Status: <strong>{getStatusText(status)}</strong>
      </p>
    );
  }
};

export default App;

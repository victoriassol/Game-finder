import "./Card.css";

export default function Card({games, game, manageExpand}) {
  return (
    <>
    <div
      className="my-4 m-auto w-min sm:w-72 m:w-1/4 drop-shadow-lg rounded-md bg-gray-600 text-white"
      onClick={()=> {manageExpand(game.id)}}
    >
      <div className="h-40 rounded-md">
        <img
          className="w-full h-40 rounded-md object-cover shadow-lg"
          src={game.background_image}
          alt=""
        />
      </div>
      <div className="p-2 px-4">
        <div className="flex justify-between py-2">
          <h2 className="font-title font-bold text-xl">{game.name}</h2>
          <p className="font-title font-bold text-xl text-green-500 pl-5">
            #{games.results.indexOf(game) + 1}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-title text-l">Release date:</p>
          <p className="font-title font-normal text-l">{game.released}</p>
        </div>
        <div className="flex justify-between space-x-20">
          <p className="font-title text-l">Genre:</p>
          <p className="font-title font-normal text-l">
            {game.genres.map((genre) => genre.name + ' ')}
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

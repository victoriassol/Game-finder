import "./CardExpanded.css";
import { useGetGameByIdQuery, useGetScreenshotsQuery } from "features/apiSlice";

export default function CardExpanded({ cardExpanded, setCardExpanded }) {
  const { data, isError, isLoading } = useGetGameByIdQuery(cardExpanded);
  const { data: screenshots } = useGetScreenshotsQuery(cardExpanded);
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Sorry! Try again later</p>;
  } else {
    content = (
      <>
        <div className="h-80 rounded-md">
          <span
            className="absolute top-2 right-5 text-3xl"
            onClick={() => {
              setCardExpanded();
            }}>
            &times;
          </span>
          <img
            className="rounded-md object-cover h-full w-full"
            src={data?.background_image}
            alt=""
          />
        </div>
        <div className="flex">
          <div className="relative py-2 w-3/5 p-2 px-4 sm:-top-40">
            <h2 className="font-title font-bold text-2xl sm:text-4xl">
              {data?.name}
            </h2>
            <p className="max-h-52 overflow-y-scroll">
              {data?.description_raw}
            </p>
            <div className="flex m-auto">
              <div className="p-5">
                <h3 className="text-l text-white/75">Platforms</h3>
                <p className="pb-3 underline">
                  {data?.platforms.map(
                    (platforms) => platforms.platform.name + " "
                  )}
                </p>
                <h3 className="font-title text-l text-white/75">
                  Release date
                </h3>
                <p className="pb-3 underline">{data?.released}</p>
                <h3 className="text-l text-white/75">Publisher</h3>
                <p className="pb-3 underline">
                  {data?.publishers?.map((publisher) => publisher.name + " ")}
                </p>
                <h3 className="text-l text-white/75">Website</h3>
                <p className="pb-3 underline">{data?.website}</p>
              </div>
              <div className="p-5">
                <h3 className="font-title text-l text-white/75">Genre</h3>
                <p className="pb-3 underline">
                  {data?.genres?.map((genre) => genre.name + " ")}
                </p>
                <h3 className="text-l text-white/75">Developer</h3>
                <p className="pb-3 underline">
                  {data?.developers.map((developer) => developer.name + " ")}
                </p>
                <h3 className="text-l text-white/75">Age rating</h3>
                <p className="pb-3 underline">{data?.esrb_rating.name}</p>
              </div>
            </div>
          </div>
          <div className="relative sm:-top-20 flex flex-wrap w-2/5 pb-10">
            {screenshots?.results.slice(0, 4).map((screenshot, index) => (
              <img
                key={index}
                src={screenshot.image}
                className="w-1/2 p-2 object-cover"
                alt=""
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex fixed absolute overflow-hidden inset-0 h-full md:p-10 bg-black/70 z-20">
      <div className="min-w-[80%] max-h-min xl:min-w-[60%] my-20 lg:my-10 mx-auto max-w-4xl drop-shadow-lg rounded-md bg-gray-600 text-white">
        {content}
      </div>
    </div>
  );
}

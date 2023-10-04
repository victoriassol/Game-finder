/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./CardExpanded.css";
import { useGetGameByIdQuery, useGetScreenshotsQuery } from "features/apiSlice";
import PC from "img/PC.svg";
import PS from "img/playstation.svg";
import SW from "img/switch.svg";
import XB from "img/xbox.svg";

export default function CardExpanded({ cardExpanded, setCardExpanded }) {
  const { data, isError, isLoading } = useGetGameByIdQuery(cardExpanded);
  const { data: screenshots } = useGetScreenshotsQuery(cardExpanded);

  useEffect(() => {
    const escHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setCardExpanded();
      }
    };

    document.addEventListener("keydown", escHandler);
  }, []);

  let uniquePlatforms = [];
  let platformSrc = [];

  data?.platforms.forEach((platform) => {
    const platformName = platform.platform.name.toLowerCase().split(" ")[0];

    if (!uniquePlatforms.includes(platformName)) {
      if (platformName === "pc") {
        const platPC = { name: "PC", src: PC };
        platformSrc.push(platPC);
      } else if (platformName === "playstation") {
        const platPS = { name: "PlayStation", src: PS };
        platformSrc.push(platPS);
      } else if (platformName === "xbox") {
        const platXB = { name: "Xbox", src: XB };
        platformSrc.push(platXB);
      } else if (platformName === "nintendo") {
        const platSW = { name: "Switch", src: SW };
        platformSrc.push(platSW);
      }

      uniquePlatforms.push(platformName);
    }
  });

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Sorry! Try again later</p>;
  } else {
    content = (
      <>
        <div className="sm:h-80 rounded-md overflow-hidden">
          <span
            className="absolute top-2 right-5 text-3xl z-10"
            onClick={() => {
              setCardExpanded();
            }}>
            &times;
          </span>
          <div className="container rounded-md max-w-full">
            <div className="gradient absolute sm:h-80"></div>
            <img
              className="img object-cover h-full w-full rounded-md "
              src={data?.background_image}
              alt=""
            />
          </div>
        </div>
        <div className="md:flex">
          <div className="relative py-2 md:w-3/5 p-2 px-4 md:-top-40">
            <div className="flex">
              {platformSrc.map((pl) => (
                <img key={pl.name} src={pl.src} alt={pl.name} className="p-2" />
              ))}
            </div>
            <h2 className="font-title font-bold text-2xl sm:text-4xl">
              {data?.name}
            </h2>
            <p className="max-h-60 md:max-h-40 overflow-y-scroll">
              {data?.description_raw}
            </p>
            <button className="wish inline-flex mt-5 sm:m-5 m-1 px-2 rounded-md font-semibold bg-lightGreen leading-10">
              Add to wishlist
            </button>
            <button className="inline-flex px-10 m-1 rounded-md font-semibold bg-transparent border-4 border-lightGreen text-lightGreen leading-8">
              Purchase
            </button>
            <div className="sm:flex">
              <div className="m-5 mb-0 sm:mb-auto w-max">
                <h3 className="font-title text-l text-white/75">
                  Release date
                </h3>
                <p className="pb-3 underline">{data?.released || "Unknown"}</p>
                <h3 className="text-l text-white/75">Publisher</h3>
                <p className="pb-3 underline">
                  {data?.publishers?.map((publisher) => publisher.name + " ") ||
                    "Unknown"}
                </p>
                <h3 className="text-l text-white/75">Website</h3>
                <p className="pb-3 underline">{data?.website || "Unknown"}</p>
              </div>
              <div className="m-5 mt-0 sm:mt-auto w-max">
                <h3 className="font-title text-l text-white/75">Genre</h3>
                <p className="pb-3 underline">
                  {data?.genres?.map((genre) => genre.name + " ") || "Unknown"}
                </p>
                <h3 className="text-l text-white/75">Developer</h3>
                <p className="pb-3 underline">
                  {data?.developers?.map(
                    (developer) => developer?.name + " " || "Unknown"
                  )}
                </p>
                <h3 className="text-l text-white/75">Age rating</h3>
                <p className="pb-3 underline">
                  {data?.esrb_rating?.name || "Unknown"}
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex flex-wrap md:w-2/5 pb-20 max-h-[500px]">
            {screenshots?.results?.slice(0, 4).map((screenshot, index) => (
              <img
                key={index}
                src={screenshot.image}
                className="sm:w-1/2 p-2 object-cover"
                alt=""
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex fixed absolute md:overflow-hidden inset-0 h-full md:p-10 bg-black/70 z-20">
      <div className=" overflow-scroll lg:overflow-hidden max-h-full xl:min-w-[60%] lg:my-10 mx-auto max-w-4xl drop-shadow-lg rounded-md bg-gray-600 text-white">
        {content}
      </div>
    </div>
  );
}

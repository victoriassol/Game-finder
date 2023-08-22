import { useSelector } from "react-redux/es/hooks/useSelector";
import "./CardExpanded.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGame, fetchScreenshots } from "features/card/cardSlice";

export default function CardExpanded({
  manageExpand,
  cardExpanded,
  fetchFullGame,
}) {
    const dispatch = useDispatch()

    const { contents, screenshots } = useSelector((state) => state.game);
    const isLoadingGame = useSelector((state) => state.game.isLoading.game);
    const isLoadingScreenshots = useSelector((state) => state.game.isLoading.screenshots);

    // useEffect(()=>{
    //    dispatch(fetchGame(cardExpanded));
    //    dispatch(fetchScreenshots(cardExpanded));
    // }, [dispatch, cardExpanded, contents])

    if(isLoadingGame || isLoadingScreenshots){
        return (<p className="text-white">LOADING...</p>)
    }
    return (
      <div className="flex fixed absolute inset-0 p-3 md:p-10 bg-black/70 z-20">
        {/* {(isLoadingGame || isLoadingScreenshots || Object.keys(contents).length < 1) ? (<p className="text-white">LOADING...</p>) : ( */}
            <div className="min-w-[80%] h-min xl:min-w-[60%] my-20 mx-auto lg:my-40 max-w-4xl drop-shadow-lg rounded-md bg-gray-600 text-white">
          <div className="h-80 rounded-md">
            <span className="absolute top-2 right-5 text-3xl">&times;</span>
            <img
              className="rounded-md object-cover h-full w-full"
              src={contents?.background_image}
              alt=""
            />
          </div>
          <div className="flex">
            <div className="relative py-2 w-3/5 p-2 px-4 sm:-top-40">
              <h2 className="font-title font-bold text-2xl sm:text-4xl">
                {contents?.name}
              </h2>
              <p className="max-h-52 overflow-y-scroll">
                {contents?.description_raw}
              </p>
              <div className="flex m-auto">
                <div className="p-5">
                  <h3 className="text-l text-white/75">Platforms</h3>
                  <p className="pb-3 underline">
                    {contents?.platforms.map(
                      (platforms) => platforms.platform.name + " "
                    )}
                  </p>
                  <h3 className="font-title text-l text-white/75">
                    Release date
                  </h3>
                  <p className="pb-3 underline">{contents?.released}</p>
                  <h3 className="text-l text-white/75">Publisher</h3>
                  <p className="pb-3 underline">
                    {contents?.publishers?.map(
                      (publisher) => publisher.name + " "
                    )}
                  </p>
                  <h3 className="text-l text-white/75">Website</h3>
                  <p className="pb-3 underline">{contents?.website}</p>
                </div>
                <div className="p-5">
                  <h3 className="font-title text-l text-white/75">Genre</h3>
                  <p className="pb-3 underline">
                    {contents?.genres?.map((genre) => genre.name + " ")}
                  </p>
                  <h3 className="text-l text-white/75">Developer</h3>
                  <p className="pb-3 underline">
                    {contents?.developers.map(
                      (developer) => developer.name + " "
                    )}
                  </p>
                  <h3 className="text-l text-white/75">Age rating</h3>
                  <p className="pb-3 underline">{contents?.esrb_rating.name}</p>
                </div>
              </div>
            </div>
            <div className="relative sm:-top-20 flex flex-wrap w-2/5">
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
        </div>
        {/* )} */}
      </div>
    );
  //     <div className="flex fixed absolute inset-0 p-3 md:p-10 bg-black/70 z-20">
  //         {(isLoadingGame || isLoadingScreenshots) ? (<p>Loading...</p>) :
  //       (<div
  //         className="min-w-[80%] h-min xl:min-w-[60%] my-20 mx-auto lg:my-40 max-w-4xl drop-shadow-lg rounded-md bg-gray-600 text-white"

  //       >
  //         <div className="h-80 rounded-md">
  //           <span className="absolute top-2 right-5 text-3xl">&times;</span>
  //           <img
  //             className="rounded-md object-cover h-full w-full"
  //             src={contents?.background_image}
  //             alt=""
  //           />
  //         </div>
  //         <div className="flex">
  //           <div className="relative py-2 w-3/5 p-2 px-4 sm:-top-40">
  //             <h2 className="font-title font-bold text-2xl sm:text-4xl">
  //               {contents?.name}
  //             </h2>
  //             <p className="max-h-52 overflow-y-scroll">
  //               {contents?.description_raw}
  //             </p>
  //             <div className="flex m-auto">
  //               <div className="p-5">
  //                 <h3 className="text-l text-white/75">Platforms</h3>
  //                 <p className="pb-3 underline">
  //                   {contents?.platforms.map(
  //                     (platforms) => platforms.platform.name + " "
  //                   )}
  //                 </p>
  //                 <h3 className="font-title text-l text-white/75">
  //                   Release date
  //                 </h3>
  //                 <p className="pb-3 underline">{contents?.released}</p>
  //                 <h3 className="text-l text-white/75">Publisher</h3>
  //                 <p className="pb-3 underline">
  //                   {contents?.publishers?.map(
  //                     (publisher) => publisher.name + " "
  //                   )}
  //                 </p>
  //                 <h3 className="text-l text-white/75">Website</h3>
  //                 <p className="pb-3 underline">{contents?.website}</p>
  //               </div>
  //               <div className="p-5">
  //                 <h3 className="font-title text-l text-white/75">Genre</h3>
  //                 <p className="pb-3 underline">
  //                   {contents?.genres?.map((genre) => genre.name + " ")}
  //                 </p>
  //                 <h3 className="text-l text-white/75">Developer</h3>
  //                 <p className="pb-3 underline">
  //                   {contents?.developers.map(
  //                     (developer) => developer.name + " "
  //                   )}
  //                 </p>
  //                 <h3 className="text-l text-white/75">Age rating</h3>
  //                 <p className="pb-3 underline">{contents?.esrb_rating.name}</p>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="relative sm:-top-20 flex flex-wrap w-2/5">
  //             {screenshots?.results.slice(0, 4).map((screenshot, index) => (
  //               <img
  //                 key={index}
  //                 src={screenshot.image}
  //                 className="w-1/2 p-2 object-cover"
  //                 alt=""
  //               />
  //             ))}
  //           </div>
  //         </div>
  //       </div>)}
  //     </div>
  //   );
}

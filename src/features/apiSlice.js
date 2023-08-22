import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.rawg.io/api/games?key=455a12d11cd1428aa4233ceb7ddb317f&ordering=-rating` }),
  endpoints: builder => ({
    getGames: builder.query({
      query: (page=1) => `&page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    })
  })
})

export const { useGetGamesQuery } = apiSlice
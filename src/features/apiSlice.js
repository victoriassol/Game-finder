import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const currentYear = new Date().getFullYear();
const startDate = `${currentYear}-01-01`;
const endDate = new Date().toISOString().split('T')[0];

function getNewAndPastDate() {
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 7);
  const formatDate = (date) => date.toISOString().split('T')[0];
  const formattedDate = formatDate(currentDate);
  const formattedPastDate = formatDate(pastDate);

  return `${formattedPastDate},${formattedDate}`;
}

const newAndPastDate = getNewAndPastDate();

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.rawg.io/api/games?key=455a12d11cd1428aa4233ceb7ddb317f&ordering=-rating` }),
  endpoints: builder => ({
    getGames: builder.query({
      query: (page=1) => `&page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    }),
    getGameById: builder.query({
      query: (id) => {
        return {
          url: `https://api.rawg.io/api/games/${id}?key=455a12d11cd1428aa4233ceb7ddb317f&ordering=-rating`,
          method: 'GET',
        };
      },
    }),
    getScreenshots: builder.query({
      query: (id) => {
        return {
          url: `https://api.rawg.io/api/games/${id}/screenshots?key=455a12d11cd1428aa4233ceb7ddb317f&ordering=-rating`,
          method: 'GET',
        };
      },
    }),
    searchGames: builder.query({
      query: (query, page=1) => `&search=${query}&page=${page}&ordering=-rating`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    }),
    getGamesThisYear: builder.query({
      query: (page=1) => `&dates=${startDate},${endDate}&page=${page}&ordering=-rating`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    }),
    getGamesThisWeek: builder.query({
      query: (page=1) => `&dates=${newAndPastDate}&page=${page}&ordering=-rating`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    }),
  })
})

export const { useGetGamesQuery, useGetGameByIdQuery, useGetScreenshotsQuery, useSearchGamesQuery, useGetGamesThisYearQuery, useGetGamesThisWeekQuery } = apiSlice
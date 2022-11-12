import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDExMiwibG9naW4iOiJmcmFuY2UiLCJyb2xlIjoiT1BFUkFUT1IiLCJpYXQiOjE2NjgyNDY0MDN9.eLTOwHI1Ln53ZhUDudjbxrbNiBtH2gkMw5Q3D-0HRJA'
const DIALOG_ID = 28

function handleResponse(response) {
  if (!response.ok) {
    throw response
  }
  return response.json()
}

export function sendMessageRequest(text) {
  return fetch('https://hack.invest-open.ru/message/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization: TOKEN
    },
    body: JSON.stringify({
      message: {
        dialogId: DIALOG_ID,
        text,
        messageType: 'TEXT'
      }
    })
  })
    .then(handleResponse)
}

export function chatHistoryRequest(limit = undefined, timestamp) {
  return fetch('https://hack.invest-open.ru/chat/history?' + new URLSearchParams({
    dialogId: DIALOG_ID,
    ...(limit && {limit}),
    ...(timestamp && {timestamp, older: 'FALSE'})
  }), { headers: { authorization: TOKEN } })
    .then(handleResponse)
}

export const messagesWs = createApi({
  reducerPath: 'messagesWs',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: build => ({
    getMessages: build.query({
      query: (channel) => `chat`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket('wss://@hack.invest-open.ru/chat')
        ws.onopen = function (e) {
          ws.send(JSON.stringify({
            'headers': {
              'Authorization': 'Bearer TOKEN'
            }
          }));
        };
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event) => {
            const data = JSON.parse(event.data)
            if (data.channel !== arg) return

            updateCachedData((draft) => {
              draft.push(data)
            })
          }

          ws.addEventListener('message', listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close()
      },
    }),
  })
})

export const { useGetMessagesQuery } = messagesWs
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sha256 } from 'js-sha256';

const URL = 'https://hack.invest-open.ru'

function handleResponse(response) {
  if (!response.ok) {
    throw response
  }
  return response.json()
}

export function authorizationRequest({ login, password }) {
  return fetch(URL + '/auth', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password: sha256(password)
    })
  })
    .then(handleResponse)
}

export function checkAuthorizationTokenRequest(token) {
  return fetch(URL + '/jwt/verify', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jwt: token
    })
  })
    .then(handleResponse)
}

export function sendMessageRequest(text, dialogId) {
  return fetch(URL + '/message/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
      message: {
        dialogId,
        text,
        messageType: 'TEXT'
      }
    })
  })
    .then(handleResponse)
}

export function chatHistoryRequest(dialogId, limit = undefined, timestamp) {
  console.log(dialogId)
  return fetch(URL + '/chat/history?' + new URLSearchParams({
    dialogId,
    ...(limit && {limit}),
    ...(timestamp && {timestamp, older: 'FALSE'})
  }), { headers: { authorization: 'Bearer ' + localStorage.getItem('token') } })
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
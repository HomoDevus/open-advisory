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
  return fetch(URL + '/chat/history?' + new URLSearchParams({
    dialogId,
    ...(limit && { limit }),
    ...(timestamp && { timestamp, older: 'FALSE' })
  }), { headers: { authorization: 'Bearer ' + localStorage.getItem('token') } })
    .then(handleResponse)
}


export const messagesWs = createApi({
  reducerPath: 'messagesWs',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: build => ({
    getMessages: build.query({
      queryFn: () => ({ data: { messages: [] } }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket('wss://@hack.invest-open.ru/chat/v2?' + new URLSearchParams({
          jwtToken: localStorage.getItem('token')
        }));

        try {
          await cacheDataLoaded

          const listener = (event) => {
            const data = JSON.parse(event.data)

            updateCachedData((draft) => {
              draft.messages.push(data.messageData)
            })
          }

          ws.addEventListener('message', listener)
        } catch(e) {
          console.error(e)
        }
        await cacheEntryRemoved
        ws.close()
      },
    }),
  })
})

export const { useGetMessagesQuery } = messagesWs
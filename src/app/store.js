import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/chat/chatSlice';
import { messagesWs } from '../features/chat/chatApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    [messagesWs.reducerPath]: messagesWs.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(messagesWs.middleware)
});

setupListeners(store.dispatch)
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  authorizationRequest,
  chatHistoryRequest,
  checkAuthorizationTokenRequest,
  sendMessageRequest
} from './chatApi';
import { message } from 'antd';

const initialState = {
  messages: [],
  status: 'idle', // sending, idle
  dialogId: 28,
  userId: undefined,
  isAuthorized: false
}

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (text, { getState }) => {
    const state = getState()
    await sendMessageRequest(text, state.chat.dialogId);
  }
)

export const getChatHistory = createAsyncThunk(
  'chat/getChatHistory',
  async (_, { getState }) => {
    const state = getState()
    const response = await chatHistoryRequest(state.chat.dialogId)

    return response.messages
  }
)

export const authorize = createAsyncThunk(
  'chat/authorize',
  async ({ login, password }) => {
    try {
      const response = await authorizationRequest({ login, password })
      localStorage.setItem('token', response.jwtToken)
      return response
    } catch (error) {
      const parsedError = await error.json()
      if (parsedError?.Error) {
        parsedError.Error.map(errorMessage => message.error(errorMessage.ErrorMessageText))
      }
    }
  }
)

export const checkAuthorizationToken = createAsyncThunk(
  'chat/checkAuthorization',
  async () => {
    const token = localStorage.getItem('token')
    if (!token) return;
    return await checkAuthorizationTokenRequest(token)
  }
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'sending'
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.messages = action.payload
      })
      .addCase(authorize.fulfilled, (state, action) => {
        state.userId = action.payload.userId
        state.isAuthorized = true
      })
      .addCase(checkAuthorizationToken.fulfilled, (state, action) => {
        state.userId = action.payload.userId
        state.isAuthorized = true
      })
      .addCase(checkAuthorizationToken.rejected, (state) => {
        state.isAuthorized = false
      })
  }
})

export const selectMessages = (state) => state.chat.messages;
export const selectSendingStatus = state => state.chat.status;
export const selectIsAuthorized = state => state.chat.isAuthorized;

export default chatSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chatHistoryRequest, sendMessageRequest } from './chatApi';

const initialState = {
  messages: [
    {
      'messageId': '2a0da872-f8a8-4316-bb23-02a1161ea84d',
      'text': 'Привет, оператор!',
      'data': null,
      'messageType': 'TEXT',
      'mediaUrl': null,
      'sender': 100500,
      'recipient': 100501,
      'dialogId': 1,
      'timestamp': 1668153997208
    }
  ],
  status: 'idle' // sending, idle
}

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (text) => {
    // const timestamp = new Date().getTime()
    const response = await sendMessageRequest(text);
    // const history = await chatHistoryRequest(1, timestamp)

    // return history.messages[0];
  }
)

export const getChatHistory = createAsyncThunk(
  'chat/getChatHistory',
  async () => {
    const response = await chatHistoryRequest()

    return response.messages
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
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'idle'
        // console.log(action.payload)
        // state.messages.push(action.payload)
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.messages = action.payload
      })
  }
})

export const selectMessages = (state) => state.chat.messages;
export const selectSendingStatus = state => state.chat.status;

export default chatSlice.reducer
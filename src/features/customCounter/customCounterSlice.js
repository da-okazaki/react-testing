import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  value: 0,
  status: 'idle',
};

const sleep = (msec) => {
  const start = new Date();
  while (new Date() - start < msec);
};

export const fetchDummy = createAsyncThunk('fetch/dummy', async (num) => {
  await sleep(2000);
  return num;
});

export const fetchJson = createAsyncThunk('fetch/api', async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users/1');
  const { username } = res.data;
  return username;
});

export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount) => {
  const response = await fetchCount(amount);
  return response.data;
});

export const customCounterSlice = createSlice({
  name: 'customCounter',
  initialState: {
    mode: 0,
    value: 0,
    username: '',
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = customCounterSlice.actions;

export const selectCount = (state) => state.counter.value;

export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default customCounterSlice.reducer;

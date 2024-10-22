import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload;
      const anecdote = state.find((anecdote) => anecdote.id === id);
      const votedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      const newState = state.map((anecdote) => (anecdote.id !== id ? anecdote : votedAnecdote));
      return newState.sort((l, r) => r.votes - l.votes);
    },
    createAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateAnecdote: (state, action) => {
      const updatedAnecdote = action.payload;
      const id = updatedAnecdote.id;
      const newState = state.map((anecdote) => (anecdote.id !== id ? anecdote : updatedAnecdote));
      return newState.sort((l, r) => r.votes - l.votes);
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => {
      const anecdotes = action.payload;
      return anecdotes.sort((l, r) => r.votes - l.votes);
    },
  },
});

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const response = await anecdoteService.update(anecdote.id, votedAnecdote);
    dispatch(updateAnecdote(response));
  };
};

export default anecdoteSlice.reducer;

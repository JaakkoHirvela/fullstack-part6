import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../utils";
import { CLEAR_NOTIFICATION, SET_NOTIFICATION } from "../constants";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (error) => {
      const { error: errorMessage } = error.response.data;
      notificationDispatch({ type: SET_NOTIFICATION, notification: errorMessage });
      setTimeout(() => {
        notificationDispatch({ type: CLEAR_NOTIFICATION });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate(content);
    notificationDispatch({ type: SET_NOTIFICATION, notification: `anecdote '${content}' created` });
    setTimeout(() => {
      notificationDispatch({ type: CLEAR_NOTIFICATION });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

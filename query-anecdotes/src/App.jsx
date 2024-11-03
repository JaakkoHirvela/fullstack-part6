import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, voteAnecdote } from "./requests";
import { useNotificationDispatch } from "./utils";
import { CLEAR_NOTIFICATION, SET_NOTIFICATION } from "./constants";

const App = () => {
  const queryClient = useQueryClient();

  const notificationDispatch = useNotificationDispatch();

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    console.log("vote");
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({ type: SET_NOTIFICATION, notification: `anecdote '${anecdote.content}' voted` });
    setTimeout(() => {
      notificationDispatch({ type: CLEAR_NOTIFICATION });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>Loading...</div>;
  }
  if (result.isError) {
    console.log(result.error.message);
    return <div>anecdote service not available due to problems in server</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

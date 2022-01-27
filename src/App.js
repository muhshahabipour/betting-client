import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import matchesServices from "./services/matches.services";

// Create a client

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Matches />
      </QueryClientProvider>
    </div>
  );
}

function Matches() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data: res } = useQuery("matches", matchesServices.fetchMatches, {
    refetchInterval: 800,
  });

  const mutation = useMutation(matchesServices.rateMatch, {
    onSuccess: () => {
      console.log("refresh");
      // Invalidate and refetch
      queryClient.invalidateQueries("matches");
    },
  });

  const mutation2 = useMutation(matchesServices.createMatch, {
    onSuccess: () => {
      console.log("refresh");
      // Invalidate and refetch
      queryClient.invalidateQueries("matches");
    },
  });

  return (
    <div className="flex bg-slate-100 justify-center items-center p-5 min-h-screen">
      <div className="flex flex-col max-w-lg">
        <div className="flex justify-center pb-5">
          <button
            type="button"
            onClick={() => {
              mutation2.mutate();
            }}
            className="p-4 py-1 pb-1.5 bg-slate-800 text-white rounded shadow"
          >
            Create a Match
          </button>
        </div>
        <dl className="space-y-12">
          {((res && res.data) || []).map((match) => (
            <dd key={match.id} className="bg-white shadow-lg rounded-lg p-4">
              <div className="flex justify-center">
                <span className="text-center">{match.id}</span>
              </div>
              <table className="table-fixed w-full">
                <thead>
                  <tr>
                    <th className="text-center">{match.teams[0].name}</th>
                    <th className="text-center"></th>
                    <th className="text-center">{match.teams[1].name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="px-2">
                        {match.rates["1"] ? match.rates["1"].toFixed(2) : "∞"}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="px-2">
                        {match.rates["x"] ? match.rates["x"].toFixed(2) : "∞"}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="px-2">
                        {match.rates["2"] ? match.rates["2"].toFixed(2) : "∞"}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div
                        className={`px-2 ${
                          match.changes["1"] > 0
                            ? "text-green-500"
                            : match.changes["1"] < 0
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {match.changes["1"]
                          ? (match.changes["1"] * 100).toFixed(4) + "%"
                          : "∞"}
                      </div>
                    </td>
                    <td className="text-center">
                      <div
                        className={`px-2 ${
                          match.changes["x"] > 0
                            ? "text-green-500"
                            : match.changes["x"] < 0
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {match.changes["x"]
                          ? (match.changes["x"] * 100).toFixed(4) + "%"
                          : "∞"}
                      </div>
                    </td>
                    <td className="text-center">
                      <div
                        className={`px-2 ${
                          match.changes["2"] > 0
                            ? "text-green-500"
                            : match.changes["2"] < 0
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {match.changes["2"]
                          ? (match.changes["2"] * 100).toFixed(4) + "%"
                          : "∞"}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="px-2 mt-4">
                        <button
                          className="px-5 pb-1 rounded shadow bg-slate-800 text-white"
                          onClick={() => {
                            mutation.mutate({
                              id: match.id,
                              result: 1,
                            });
                          }}
                        >
                          bet
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="px-2 mt-4">
                        <button
                          className="px-5 pb-1 rounded shadow bg-slate-800 text-white"
                          onClick={() => {
                            mutation.mutate({
                              id: match.id,
                              result: 0,
                            });
                          }}
                        >
                          bet
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="px-2 mt-4">
                        <button
                          className="px-5 pb-1 rounded shadow bg-slate-800 text-white"
                          onClick={() => {
                            mutation.mutate({
                              id: match.id,
                              result: 2,
                            });
                          }}
                        >
                          bet
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </dd>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default App;

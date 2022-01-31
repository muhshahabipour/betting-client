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
    <div className="App bg-slate-100 justify-center items-center p-5 min-h-screen">
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
    <div className="flex">
      <div className="flex flex-col max-w-lg">
        <div className="">
          <div className="bg-blue-600 rounded-lg shadow-lg min-h-[8rem] text-white my-10 p-5 space-y-4">
            <p>
              Sit culpa officia deserunt elit laborum tempor eiusmod sunt
              reprehenderit. Exercitation enim velit tempor tempor id magna
              ullamco enim fugiat dolor deserunt proident. Consequat qui magna
              commodo dolore id velit incididunt veniam reprehenderit consequat.
            </p>

            <div className="">
              <button
                type="button"
                onClick={() => {
                  mutation2.mutate();
                }}
                className="p-4 py-1 pb-1.5 bg-white text-blue-800 rounded shadow"
              >
                Create a Match
              </button>
            </div>
          </div>
        </div>

        <dl className="space-y-12">
          {((res && res.data) || []).map((match) => (
            <dd key={match.id} className="bg-white shadow-lg rounded-lg p-4">
              {/* <div className="flex justify-center">
                <span className="text-center">{match.id}</span>
              </div> */}

              <div className="flex w-full justify-between px-8 space-x-2 mt-8">
                <div className="flex font-bold">{match.teams[0].name}</div>
                <div className="flex font-bold">{match.teams[1].name}</div>
              </div>

              <div className="flex space-x-7 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    mutation.mutate({
                      id: match.id,
                      result: "h",
                    });
                  }}
                  className={`${
                    1 === 1
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 text-blue-700"
                  } text-xs w-full p-1 rounded-lg text-center space-x-3 flex items-center justify-center`}
                >
                  <span className="text-gray-300">H</span>
                  <span className="text-sm font-bold">
                    {match.rates["h"] ? match.rates["h"].toFixed(2) : "∞"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    mutation.mutate({
                      id: match.id,
                      result: "d",
                    });
                  }}
                  className={`${
                    1 === 1
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 text-blue-700"
                  } text-xs w-full p-1 rounded-lg text-center space-x-3 flex items-center justify-center`}
                >
                  <span className="text-gray-300">D</span>
                  <span className="text-sm font-bold">
                    {match.rates["d"] ? match.rates["d"].toFixed(2) : "∞"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    mutation.mutate({
                      id: match.id,
                      result: "a",
                    });
                  }}
                  className={`${
                    1 === 1
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 text-blue-700"
                  } text-xs w-full p-1 rounded-lg text-center space-x-3 flex items-center justify-center`}
                >
                  <span className="text-gray-300">A</span>
                  <span className="text-sm font-bold">
                    {match.rates["a"] ? match.rates["a"].toFixed(2) : "∞"}
                  </span>
                </button>
              </div>
            </dd>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default App;

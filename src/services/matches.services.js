import axios from "axios";

function fetchMatches() {
  debugger;
  return axios.get("/matches");
}

function createMatch(
  params = {
    teams: [
      {
        index: 1,
        name: "team1",
      },
      {
        index: 2,
        name: "team2",
      },
    ],
    rates: {
      1: 1,
      x: 1,
      2: 1,
    },
    changes: {
      1: 0,
      x: 0,
      2: 0,
    },
  }
) {
  return axios.post("/matches", params);
}

function rateMatch({ id: matchId, ...params }) {
  return axios.post(`/matches/${matchId}/rate`, params);
}

const matchesServices = {
  fetchMatches,
  createMatch,
  rateMatch,
};

export default matchesServices;

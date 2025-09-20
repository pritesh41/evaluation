// IssueDashboard.jsx
// Hinglish: Yeh basic plain JSX hai, CSS bilkul nahi hai.

import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// IssueCard bina kisi style ke, React.memo optimization ke saath
const IssueCard = React.memo(function IssueCard({ issue }) {
  return (
    <div>
      <div>
        <strong>{issue.title}</strong>
      </div>
      <div>
        #{issue.number} | Author: {issue.user?.login}
      </div>
      <div>
        Labels: {issue.labels.map((l) => l.name).join(', ') || "None"}
      </div>
      <div>
        State: {issue.state}
      </div>
    </div>
  );
});

function filterReducer(state, action) {
  switch (action.type) {
    case "SET_STATUS":
      return { ...state, status: action.status };
    case "SET_LABEL":
      return { ...state, label: action.label };
    default:
      return state;
  }
}

function IssueDashboard() {
  const { owner, repo } = useParams();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, dispatch] = useReducer(filterReducer, {
    status: "open",
    label: "",
  });

  useEffect(() => {
    async function fetchIssues() {
      setLoading(true);
      setError("");
      try {
        const url = `https:api.github.com/repos/${owner}/${repo}/issues?state=${filter.status}`;
        const res = await axios.get(url);
        setIssues(res.data);
      } catch (err) {
        setError("Issues fetch nahi hui! Repo ya URL check karo. " + err.message);
      }
      setLoading(false);
    }
    fetchIssues();
  }, [owner, repo, filter.status]);

  return (
    <div>
      <h2>
        Issues - {owner}/{repo}
      </h2>
      <div>
        <select
          value={filter.status}
          onChange={(e) => dispatch({ type: "SET_STATUS", status: e.target.value })}
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="all">All</option>
        </select>
        <input
          type="text"
          placeholder="Label"
          value={filter.label}
          onChange={(e) => dispatch({ type: "SET_LABEL", label: e.target.value })}
        />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {issues
        .filter(issue =>
          filter.label === "" ||
          issue.labels.some(label => label.name.toLowerCase().includes(filter.label.toLowerCase()))
        )
        .map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      {!loading && issues.length === 0 && !error && <div>No issues found.</div>}
    </div>
  );
}

export default IssueDashboard;
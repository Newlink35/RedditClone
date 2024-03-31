import axios from "axios";
import { useEffect, useState } from "react";

export default function Sample() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2NhYzk3YjE1ZjNmMTFhNjFkNDE1MSIsImlhdCI6MTcwMzYxNTY4MSwiZXhwIjoxNzM1MTUxNjgxfQ.MCNthoiTtymK7neKjCsDlDHrbqFVovPc6PpLUURKpuk";
  const [apivalue, setApiValue] = useState(null);
  const userName = JSON.parse(sessionStorage.getItem("userName"));

  async function getFilteredresult() {
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/reddit/channel?limit=${1000}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "g4hvu8o4jh5h",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  async function getFilterResultanswer() {
    try {
      const answer = await getFilteredresult();
      console.log(answer); // Corrected function name
      const newArr = answer.filter((details) => {

        return details.owner.name === userName;
      });
      console.log("this is the result", newArr);
    } catch (error) {
      console.error("Error fetching filtered result:", error);
    }
  }

  useEffect(() => {
    getFilterResultanswer();
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

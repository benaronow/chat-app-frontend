import { useState, type ChangeEvent } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<{ reply: string }>();
  const [messageLog, setMessageLog] = useState<
    { role: string; content: string }[]
  >([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/chat", {
        messages: [...messageLog, { role: "user", content: input }],
      });
      setMessageLog((prev) => [
        ...prev,
        { role: "user", content: input },
        { role: "assistant", content: response.data.reply },
      ]);
      setResponse(response.data);
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setInput("");
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <span>{response?.reply}</span>
    </>
  );
}

export default App;

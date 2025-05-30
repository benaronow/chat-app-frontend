import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";

function App() {
  const [input, setInput] = useState("");
  const [messageLog, setMessageLog] = useState<
    { role: string; content: string }[]
  >([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    setMessageLog((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/chat`,
        {
          messages: [...messageLog, { role: "user", content: input }],
        }
      );
      setMessageLog((prev) => [
        ...prev,
        { role: "assistant", content: response.data.reply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="d-flex flex-column w-50 p-3">
      <div className="rounded border" style={{ height: "500px" }}>
        <div
          className="d-flex justify-content-center align-items-center bg-primary-subtle rounded-top p-2"
          style={{ height: "50px" }}
        >
          <h5 className="m-0">Chat with Portal Pete</h5>
        </div>
        <div
          className="rounded-top overflow-scroll p-3 w-100"
          style={{ height: "400px" }}
        >
          {messageLog.map((message, index) => (
            <div key={index} className={`mb-2 ${message.role}`}>
              <strong>
                {`${
                  message.role === "user"
                    ? "User"
                    : message.role === "assistant"
                    ? "Portal Pete"
                    : "Strange unknown entity"
                }: `}
              </strong>
              {message.content}
            </div>
          ))}
        </div>
        <div
          className="rounded-bottom bg-secondary-subtle w-100 d-flex p-2 gap-2"
          style={{ height: "50px" }}
        >
          <input
            className="w-100 form-control"
            value={input}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-primary d-flex align-items-center"
            onClick={handleSubmit}
          >
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

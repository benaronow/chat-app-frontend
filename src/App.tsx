import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";

function App() {
  const [model, setModel] = useState("gpt");
  const [input, setInput] = useState("");
  const [messageLog, setMessageLog] = useState<
    { role: string; content: string }[]
  >([]);

  useEffect(() => {
    const contextMessage = [
      { role: "user", content: "CONTEXT: My name is Ethel" },
    ];
    const sendContextMessage = async () => {
      setMessageLog(contextMessage);
      try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chat`, {
          model,
          messages: contextMessage,
        });
      } catch (error) {
        console.error("Error sending initial message:", error);
        setMessageLog([]);
      }
    };

    if (messageLog.length === 0) sendContextMessage();
  }, [model, messageLog.length]);

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
          model,
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

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
  };

  return (
    <div className="d-flex flex-column flex-md-row p-3 gap-3">
      <div
        className="rounded border w-100"
        style={{ height: "calc(100dvh - 2rem)" }}
      >
        <div
          className="d-flex justify-content-center align-items-center bg-primary-subtle rounded-top p-2"
          style={{ height: "50px" }}
        >
          <h5 className="w-100 me-3 text-nowrap">Chat with Portal Pete</h5>
          <select className="w-100 form-select" onChange={handleModelChange}>
            <option value="gpt" selected>
              GPT via OpenAI
            </option>
            <option value="claude">
              Claude Sonnet 3.5 + Haiku 3.5 via Bedrock
            </option>
          </select>
        </div>
        <div
          className="rounded-top overflow-scroll p-3"
          style={{ height: "calc(100dvh - 2rem - 100px)" }}
        >
          {messageLog
            .filter((m) => !m.content.startsWith("CONTEXT:"))
            .map((message, index) => (
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
      <div
        className="rounded border w-100"
        style={{ height: "calc(100dvh - 2rem)" }}
      >
        <div
          className="d-flex justify-content-center align-items-center bg-secondary-subtle rounded-top p-2"
          style={{ height: "50px" }}
        >
          <h5 className="m-0">Context</h5>
        </div>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "calc(100dvh - 2rem - 50px)" }}
        >
          <span>Coming soon</span>
        </div>
      </div>
    </div>
  );
}

export default App;

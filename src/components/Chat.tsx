import { useEffect, type ChangeEvent, type KeyboardEvent } from "react";
import { useBreakpoint } from "../useBreakpoint";
import { useAppContext, type Model } from "../providers/AppProvider";
import axios from "axios";
import { IoSend } from "react-icons/io5";

export const Chat = () => {
  const { baseCompHeight } = useBreakpoint();
  const {
    model,
    changeModel,
    input,
    changeInput,
    messageLog,
    changeMessageLog,
  } = useAppContext();

  useEffect(() => {
    const contextMessage = [
      { role: "user", content: "CONTEXT: My name is Ethel" },
    ];
    const sendContextMessage = async () => {
      changeMessageLog(contextMessage, "set");
      try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chat`, {
          model,
          messages: contextMessage,
        });
      } catch (error) {
        console.error("Error sending initial message:", error);
        changeMessageLog([], "set");
      }
    };

    if (messageLog.length === 0) sendContextMessage();
  }, [model, messageLog.length, changeMessageLog]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeInput(e.target.value);
  };

  const handleSubmit = async () => {
    changeMessageLog([{ role: "user", content: input }], "add");
    changeInput("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/chat`,
        {
          model,
          messages: [...messageLog, { role: "user", content: input }],
        }
      );
      changeMessageLog(
        [{ role: "assistant", content: response.data.reply }],
        "add"
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    changeModel(e.target.value as Model);
  };

  return (
    <div
      className="rounded border w-100"
      style={{ height: `calc(${baseCompHeight})` }}
    >
      <div
        className="d-flex justify-content-center align-items-center bg-primary-subtle rounded-top p-2"
        style={{ height: "50px" }}
      >
        <span className="fs-4 fw-bold w-100 me-3 text-nowrap">
          Chat with Portal Pete
        </span>
        <select
          className="w-100 form-select"
          onChange={handleModelChange}
          defaultValue="gpt"
        >
          <option value="gpt">GPT 4.1 via OpenAI</option>
          <option value="claude">
            Claude Sonnet 3.5 + Haiku 3.5 via Bedrock
          </option>
          <option value="deepseek">Deepseek R1 via Bedrock</option>
        </select>
      </div>
      <div
        className="rounded-top overflow-scroll p-3"
        style={{ height: `calc(${baseCompHeight} - 100px)` }}
      >
        {messageLog
          .filter((m) => !m.content?.startsWith("CONTEXT:"))
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
  );
};

export default Chat;

import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Model = "gpt" | "claude" | "deepseek" | "q";
type Comp = "accounts" | "spending";
type LogType = "add" | "reset" | "clear" | "setLast" | "context";
export type Context = {
  name?: string;
  investmentValue?: string;
};

interface AppContextProps {
  model: Model;
  changeModel: (model: Model) => void;
  input: string;
  changeInput: (input: string) => void;
  messageLog: { role: string; content: string }[];
  changeMessageLog: (
    type: LogType,
    message?: { role: string; content: string }
  ) => void;
  visibleComp: Comp;
  changeVisibleComp: (comp: Comp) => void;
  chatOpen: boolean;
  changeChatOpen: (open: boolean) => void;
  initialLoaded: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [model, setModel] = useState<Model>("gpt");
  const changeModel = useCallback((newModel: Model) => setModel(newModel), []);

  const [input, setInput] = useState("");
  const changeInput = useCallback((newInput: string) => setInput(newInput), []);

  const [messageLog, setMessageLog] = useState<
    { role: string; content: string }[]
  >([]);
  const changeMessageLog = useCallback(
    (type: LogType, message?: { role: string; content: string }) => {
      if (!message) {
        if (type === "clear") setMessageLog([]);
      } else {
        if (type === "add") setMessageLog((prev) => [...prev, message]);
        if (type === "reset") setMessageLog([message]);
        if (type === "setLast")
          setMessageLog((prev) => [...prev.slice(0, -1), message]);
        if (type === "context") {
          setMessageLog((prev) => [message, ...prev.slice(1)]);
        }
      }
    },
    []
  );

  const [visibleComp, setVisibleComp] = useState<Comp>("accounts");
  const changeVisibleComp = useCallback(
    (newComp: Comp) => setVisibleComp(newComp),
    []
  );

  const [chatOpen, setChatOpen] = useState(false);
  const changeChatOpen = useCallback(
    (newOpen: boolean) => setChatOpen(newOpen),
    []
  );

  const [initialLoaded, setInitialLoaded] = useState(false);

  useEffect(() => {
    const sendInitMessage = async () => {
      const initMessage = {
        role: "user",
        content: "dummy message to test connection, please ignore",
      };

      try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chat`, {
          model,
          messages: initMessage,
          filename:
            visibleComp === "accounts" ? "Accounts.tsx" : "Spending.tsx",
        });
        setInitialLoaded(true);
      } catch (error) {
        console.error("Error sending initial message:", error);
      }
    };

    sendInitMessage();
  }, [changeMessageLog, model, visibleComp]);

  return (
    <AppContext.Provider
      value={{
        model,
        changeModel,
        input,
        changeInput,
        messageLog,
        changeMessageLog,
        visibleComp,
        changeVisibleComp,
        chatOpen,
        changeChatOpen,
        initialLoaded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

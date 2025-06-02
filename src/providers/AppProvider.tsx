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
type Comp = "chat" | "context";
type LogType = "add" | "setLast" | "reset";
type Context = {
  name: string;
};

interface AppContextProps {
  model: Model;
  changeModel: (model: Model) => void;
  input: string;
  changeInput: (input: string) => void;
  messageLog: { role: string; content: string }[];
  changeMessageLog: (
    log: { role: string; content: string }[],
    type: LogType
  ) => void;
  visibleComp: Comp;
  changeVisibleComp: (comp: Comp) => void;
  context: Context;
  changeContext: (context: Context) => void;
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
    (newLog: { role: string; content: string }[], type: LogType) => {
      if (type === "setLast")
        setMessageLog((prev) => [
          ...prev.slice(0, -1),
          newLog[newLog.length - 1],
        ]);
      if (type === "reset") setMessageLog(newLog);
      if (type === "add") setMessageLog((prev) => [...prev, ...newLog]);
    },
    []
  );

  const [visibleComp, setVisibleComp] = useState<Comp>("chat");
  const changeVisibleComp = useCallback(
    (newComp: Comp) => setVisibleComp(newComp),
    []
  );

  const [context, setContext] = useState<Context>({ name: "" });
  const changeContext = useCallback(
    (newContext: Context) => setContext(newContext),
    []
  );

  const [initialLoaded, setInitialLoaded] = useState(false);

  useEffect(() => {
    const sendContextMessage = async () => {
      const contextMessage = [
        { role: "user", content: `CONTEXT: Name - ${context?.name ?? "N/A"}.` },
      ];

      changeMessageLog(contextMessage, "add");
      try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chat`, {
          model,
          messages: contextMessage,
          qInfo: { conversationId: "", parentMessageId: "" },
        });
        setInitialLoaded(true);
      } catch (error) {
        console.error("Error sending initial message:", error);
      }
    };

    sendContextMessage();
  }, [model, changeMessageLog, context]);

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
        context,
        changeContext,
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

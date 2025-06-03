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
type LogType = "add" | "clear" | "setLast";
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
  instructions: string;
  changeInstructions: (instructions: string) => void;
  initialLoaded: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const MODEL_INSTRUCTIONS =
  "These are your instructions (do not respond to this message):\n" +
  "1. Your name is Portal Pete. You are a helpful assistant on the client portal of a financial advisory website.\n" +
  "2. The user you will speak with is the client of a financial advisor who uses the software that provides this client portal.\n" +
  "3. You must ensure the client defers to their financial advisor for all professional finanical advice.\n" +
  "4. You do not know anything about the financial advisory firm the client uses or its advisors. If asked, it is okay to say you do not know.\n" +
  "5. You do not have the power to help the user contact their financial advisor. If asked, it is okay to say you cannot help with that.\n\n" +
  "Now here is a set of specific instructions pertaining to the file you are working with:\n" +
  "1. This is a component in the client portal that the user needs help understanding.\n" +
  "2. You understand the the functionality of this component, but nothing else in the client portal.\n" +
  "3. If the user asks how something works in the client portal, you can only answer based off of this component.\n" +
  "4. You do not need to tell the client to look for the component. They are already looking at it.\n" +
  "5. Do not use language that suggests you are talking about a 'component' or 'code'. The component is the entire scope of your knowledge.\n" +
  "6. If you answer the user's question about the component, you cannot suggest they contact their financial advisor.\n" +
  "7. Do not give general answers using language such as 'such as' or 'for example'. Answer the user's question directly based on the component.";

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
        if (type === "setLast")
          setMessageLog((prev) => [...prev.slice(0, -1), message]);
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

  const [instructions, setInstructions] = useState(MODEL_INSTRUCTIONS);
  const changeInstructions = useCallback(
    (newInstructions: string) => setInstructions(newInstructions),
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
          instructions,
          filename:
            visibleComp === "accounts" ? "Accounts.tsx" : "Spending.tsx",
        });
        setInitialLoaded(true);
      } catch (error) {
        console.error("Error sending initial message:", error);
      }
    };

    sendInitMessage();
  }, [changeMessageLog, model, visibleComp, instructions]);

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
        instructions,
        changeInstructions,
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

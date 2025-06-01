import { createContext, useContext, useState, type ReactNode } from "react";

export type Model = "gpt" | "claude" | "deepseek";
type Comp = "chat" | "context";
type LogType = "add" | "set";

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
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [model, setModel] = useState<Model>("gpt");
  const changeModel = (newModel: Model) => setModel(newModel);

  const [input, setInput] = useState("");
  const changeInput = (newInput: string) => setInput(newInput);

  const [messageLog, setMessageLog] = useState<
    { role: string; content: string }[]
  >([]);
  const changeMessageLog = (
    newLog: { role: string; content: string }[],
    type: LogType
  ) =>
    setMessageLog((prev) => (type === "add" ? [...prev, ...newLog] : newLog));

  const [visibleComp, setVisibleComp] = useState<Comp>("chat");
  const changeVisibleComp = (newComp: Comp) => setVisibleComp(newComp);

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

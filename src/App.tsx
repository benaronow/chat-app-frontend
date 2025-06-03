import { ViewToggle } from "./components/ViewToggle";
import { useAppContext } from "./providers/AppProvider";
import { Spending } from "./components/spending/Spending";
import { Chat } from "./components/Chat";
import { Accounts } from "./components/accounts/Accounts";

function App() {
  const { visibleComp, chatOpen } = useAppContext();

  return (
    <div className="d-flex flex-column" style={{ height: "100dvh" }}>
      <div
        className="d-flex w-100 justify-content-center align-items-center bg-dark text-white"
        style={{ height: "50px", minHeight: "50px" }}
      >
        <span className="fs-2 fw-bold">Portal Pete</span>
      </div>
      <div className="p-3 w-100 h-100 d-flex gap-3">
        {chatOpen && <Chat />}
        <div className="w-100 h-100">
          {visibleComp === "accounts" && <Accounts />}
          {visibleComp === "spending" && <Spending />}
        </div>
      </div>
      <ViewToggle />
    </div>
  );
}

export default App;

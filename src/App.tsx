import { ViewToggle } from "./components/ViewToggle";
import { useAppContext } from "./providers/AppProvider";
import { Spending } from "./components/spending/Spending";
import { Chat } from "./components/Chat";
import { Accounts } from "./components/accounts/Accounts";
import { useBreakpoint } from "./useBreakpoint";

function App() {
  const { visibleComp, chatOpen } = useAppContext();
  const { baseCompHeight } = useBreakpoint();

  return (
    <div className="d-flex flex-column" style={{ height: "100dvh" }}>
      <div
        className="d-flex w-100 justify-content-center align-items-center bg-dark text-white"
        style={{ height: "50px", minHeight: "50px" }}
      >
        <span className="fs-2 fw-bold">Portal Pete</span>
      </div>
      <div
        className="p-3 w-100 d-flex flex-column flex-md-row gap-3 overflow-scroll"
        style={{ height: baseCompHeight }}
      >
        {visibleComp === "accounts" && <Accounts />}
        {visibleComp === "spending" && <Spending />}
        {chatOpen && <Chat />}
      </div>
      <ViewToggle />
    </div>
  );
}

export default App;

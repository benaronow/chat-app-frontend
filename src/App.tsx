import { useMemo } from "react";
import { useBreakpoint } from "./useBreakpoint";
import { Chat } from "./components/Chat";
import { Context } from "./components/Context";
import { ViewToggle } from "./components/ViewToggle";
import { useAppContext } from "./providers/AppProvider";

function App() {
  const { breakpoint } = useBreakpoint();
  const { visibleComp } = useAppContext();

  const showChat = useMemo(
    () =>
      ((breakpoint === "base" || breakpoint === "sm") &&
        visibleComp === "chat") ||
      (breakpoint !== "base" && breakpoint !== "sm"),
    [breakpoint, visibleComp]
  );

  const showContext = useMemo(
    () =>
      ((breakpoint === "base" || breakpoint === "sm") &&
        visibleComp === "context") ||
      (breakpoint !== "base" && breakpoint !== "sm"),
    [breakpoint, visibleComp]
  );

  return (
    <div className="d-flex flex-column">
      <div
        className="d-flex w-100 justify-content-center align-items-center bg-dark text-white"
        style={{ height: "50px" }}
      >
        <span className="fs-2 fw-bold">Portal Pete</span>
      </div>
      <div className="d-flex flex-row p-3 gap-3">
        {showChat && <Chat />}
        {showContext && <Context />}
      </div>
      {(breakpoint === "base" || breakpoint === "sm") && <ViewToggle />}
    </div>
  );
}

export default App;

import { useAppContext } from "../providers/AppProvider";

export const ViewToggle = () => {
  const { visibleComp, changeVisibleComp } = useAppContext();

  return (
    <div
      className="d-flex w-100 justify-content-center align-items-center gap-3 bg-secondary-subtle text-nowrap"
      style={{ height: "50px" }}
    >
      <label className="d-flex align-items-center form-label mb-0">
        <span className="me-1 fs-6 fw-bold">Chat</span>
        <input
          type="radio"
          name="visibleComp"
          value="chat"
          checked={visibleComp === "chat"}
          onChange={() => changeVisibleComp("chat")}
        />
      </label>
      <label className="d-flex align-items-center form-label mb-0">
        <span className="me-1 fs-6 fw-bold">Context</span>
        <input
          type="radio"
          name="visibleComp"
          value="context"
          checked={visibleComp === "context"}
          onChange={() => changeVisibleComp("context")}
        />
      </label>
    </div>
  );
};

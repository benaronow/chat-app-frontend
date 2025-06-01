import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useBreakpoint } from "../useBreakpoint";
import { useAppContext } from "../providers/AppProvider";

export const Context = () => {
  const { baseCompHeight } = useBreakpoint();
  const { context, changeContext } = useAppContext();
  const [nameInput, setNameInput] = useState<string>(context.name ?? "");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const handleSubmitName = () => {
    changeContext({ ...context, name: nameInput });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmitName();
    }
  };

  return (
    <div
      className="rounded border w-100"
      style={{ height: `calc(${baseCompHeight})` }}
    >
      <div
        className="d-flex justify-content-center align-items-center bg-secondary-subtle rounded-top p-2"
        style={{ height: "50px" }}
      >
        <span className="fs-4 fw-bold">Context</span>
      </div>
      <div
        className="d-flex flex-column justify-content-between align-items-center p-3"
        style={{ height: `calc(${baseCompHeight} - 50px)` }}
      >
        <div className="d-flex w-100 align-items-center">
          <span className="me-3">Name:</span>
          <input
            className="form-control"
            value={nameInput}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-primary ms-3"
            onClick={handleSubmitName}
            disabled={nameInput === context.name}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

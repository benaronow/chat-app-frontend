import { useBreakpoint } from "../useBreakpoint";

export const Context = () => {
  const { baseCompHeight } = useBreakpoint();

  return (
    <div
      className="rounded border w-100"
      style={{ height: `calc(${baseCompHeight})` }}
    >
      <div
        className="d-flex justify-content-center align-items-center bg-secondary-subtle rounded-top p-2"
        style={{ height: "50px" }}
      >
        <h5 className="m-0">Context</h5>
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: `calc(${baseCompHeight} - 50px)` }}
      >
        <span>Coming soon</span>
      </div>
    </div>
  );
};

import { useAppContext } from "../providers/AppProvider";

export const Spending = () => {
  const { changeChatOpen } = useAppContext();

  return (
    <div className="rounded w-100 h-100 shadow">
      <div
        className="d-flex justify-content-center align-items-center rounded-top p-2"
        style={{ height: "50px" }}
      >
        <button
          className="border-0 bg-transparent p-0 me-2"
          onClick={() => changeChatOpen(true)}
        >
          <img src="/portal-pete.png" height={30} width={30} />
        </button>
        <span className="fs-4 fw-bold w-100 ms-1 text-nowrap">Spending</span>
      </div>
      <div className="rounded-bottom h-100 w-100 d-flex flex-column p-3"></div>
    </div>
  );
};

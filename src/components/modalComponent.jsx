export default function ModalComponent({ buttonTitle, children }) {
  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {buttonTitle}
      </button>

      <div
        className="modal modal-lg fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">{children}</div>
      </div>
    </>
  );
}

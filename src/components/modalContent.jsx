import { useState } from "react";

export default function ModalContent({ modalTitle, videos }) {
  // Cari video dengan type 'Trailer', jika tidak ada pakai video pertama
  const trailerVideo =
    videos.results.find((video) => video.type === "Trailer") ||
    videos.results[0];

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  // State untuk video yang sedang diputar
  const [currentVideo, setCurrentVideo] = useState(trailerVideo);

  return (
    <div className="modal-content bg-dark text-white">
      <div className="modal-header bg-dark text-white">
        <h5 className="modal-title text-warning" id="exampleModalLabel">
          {modalTitle}
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <div className="modal-body">
        <div className="row">
          <div className="col-md-7">
            <div className="ratio ratio-16x9 mb-3">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.key}?autoplay=1`}
                title={currentVideo.name}
                allowFullScreen
                style={{ width: "100%", height: "100%" }} // memastikan iframe memenuhi kolom
              ></iframe>
            </div>
            <h3 className="text-warning">{currentVideo.name}</h3>
            <p>
              Published at:{" "}
              {new Date(currentVideo.published_at).toLocaleDateString()}
            </p>
          </div>

          {/* Other videos di kolom kanan, bisa di-scroll */}
          <div className="col-md-5">
            <div
              style={{
                maxHeight: "400px", // Set batas tinggi untuk scroll
                overflowY: "auto",
              }}
            >
              {videos.results.map((video) => (
                <div class="bg-dark card">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item bg-dark">
                      <div
                        key={video.id}
                        className="d-flex mb-2"
                        onClick={() => setCurrentVideo(video)} // Ganti video yang diputar saat di-klik
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                          alt={video.name}
                          style={{ width: "100px", marginRight: "10px" }}
                        />
                        <div>
                          <h6 className="text-warning">
                            {truncateText(video.name, 4)}
                          </h6>
                          <p className="small text-white">Type: {video.type}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer bg-dark">
        <button
          type="button"
          className="btn btn-warning"
          data-bs-dismiss="modal"
        >
          Close
        </button>
      </div>
    </div>
  );
}

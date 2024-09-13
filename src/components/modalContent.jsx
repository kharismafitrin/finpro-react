import { useState } from "react";

export default function ModalContent({ modalTitle, videos }) {
  const trailerVideo =
    (videos &&
      Array.isArray(videos.results) &&
      videos.results.find((video) => video.type === "Trailer")) ||
    (videos && Array.isArray(videos.results) && videos.results[0]);

  const [currentVideo, setCurrentVideo] = useState(trailerVideo || {});

  const isValidVideos =
    videos && Array.isArray(videos.results) && videos.results.length > 0;
  if (!isValidVideos) {
    return <div>No videos available</div>;
  }

  if (!trailerVideo || !trailerVideo.key) {
    return <div>No trailer video available</div>;
  }

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

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
                style={{ width: "100%", height: "100%" }}
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
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {videos.results.map((video) => (
                <div key={video.id} className="bg-dark card">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-dark">
                      <div
                        onClick={() => setCurrentVideo(video)}
                        style={{ cursor: "pointer" }}
                        className="d-flex mb-2"
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

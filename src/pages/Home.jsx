import { useEffect, useState } from "react";
import { getImages, deleteImage } from "../services/api";
import UploadForm from "../components/UploadForm";
import { useNavigate } from "react-router-dom";

function Home() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 4;

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;

  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const nextPage = () => {
    if (indexOfLastImage < images.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const navigate = useNavigate();
  const fetchImages = async () => {
    const res = await getImages();

    const sorted = res.data.reverse();

    setImages(sorted);

    if (sorted.length > 0) {
      setSelectedImage(sorted[0]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async () => {
    if (!selectedImage) return;

    await deleteImage(selectedImage._id);

    fetchImages();
  };

  const handleEdit = () => {
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="gallery-container">

      <UploadForm
        refresh={fetchImages}
        selectedImage={selectedImage}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      {/* 
      <div className="preview-box">
        {selectedImage && (
          <>
            <img src={selectedImage.image} alt={selectedImage.caption} />

            <p>{selectedImage.caption}</p>

            <div className="preview-buttons">
              <button onClick={handleEdit}>Edit</button>

              <button onClick={handleDelete}>Delete</button>
            </div>
          </>
        )}
      </div> */}

      {/* this  thambnail has to move like a components  */}

      <div className="thumbnail-grid">
        {currentImages.map((img) => (
          <div
            key={img._id}
            className="image-card"
            onClick={() => navigate(`/image/${img._id}`)}
          >
            <img src={img.image} alt={img.caption} />

            <p>{img.caption}</p>

            <div className="image-card-buttons">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(img);
                  handleEdit();
                }}
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(img);
                  handleDelete();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span>Page {currentPage}</span>

        <button onClick={nextPage} disabled={indexOfLastImage >= images.length}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;

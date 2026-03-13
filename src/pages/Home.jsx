import { useEffect, useState } from "react";
import { getImages, deleteImage } from "../services/api";
import UploadForm from "../components/UploadForm";

function Home() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
      <h1>Image Gallery</h1>

      <UploadForm
        refresh={fetchImages}
        selectedImage={selectedImage}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

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
      </div>

      <div className="thumbnail-grid">
        {images.map((img) => (
          <img
            key={img._id}
            src={img.image}
            alt={img.caption}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

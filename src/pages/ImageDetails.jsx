import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageById, deleteImage } from "../services/api";

function ImageDetails() {

  const { id } = useParams();
  const [image, setImage] = useState(null);

  const fetchImage = async () => {
    const res = await getImageById(id);
    setImage(res.data);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const handleDelete = async () => {
    await deleteImage(id);
    window.history.back();
  };

  if (!image) return <p>Loading...</p>;

  return (
    <div className="image-details">

      <img src={image.image} alt={image.caption} />

      <h2>{image.caption}</h2>

      <button onClick={handleDelete}>Delete</button>

    </div>
  );
}

export default ImageDetails;
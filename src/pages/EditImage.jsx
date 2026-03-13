import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageById } from "../services/api";
import UploadForm from "../components/UploadForm";

function EditImage(){

  const { id } = useParams();

  const [image, setImage] = useState(null);

  const fetchImage = async () => {
    const res = await getImageById(id);
    setImage(res.data);
  };

  useEffect(()=>{
    fetchImage();
  },[]);

  if(!image) return <p>Loading...</p>

  return (
    <div className="gallery-container">

      <h2>Edit Image</h2>

      <UploadForm
        selectedImage={image}
        isEditing={true}
      />

    </div>
  )
}

export default EditImage
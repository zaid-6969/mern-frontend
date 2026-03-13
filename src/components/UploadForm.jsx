import { useEffect, useState } from "react";
import { uploadImage, updateImage } from "../services/api";

function UploadForm({ selectedImage, isEditing, setIsEditing }) {
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (isEditing && selectedImage) {
      setCaption(selectedImage.caption);
    }
  }, [isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("caption", caption);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (isEditing) {
      await updateImage(selectedImage._id, formData);

      setIsEditing(false);
    } else {
      await uploadImage(formData);
    }

    setCaption("");
    setImageFile(null);

    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

      <input
        type="text"
        value={caption}
        placeholder="Caption"
        onChange={(e) => setCaption(e.target.value)}
      />

      <button type="submit">
        {isEditing ? "Update Image" : "Upload Image"}
      </button>
    </form>
  );
}

export default UploadForm;

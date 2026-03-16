import { useEffect, useState } from "react";
import { uploadImage, updateImage } from "../services/api";

function UploadForm({ refresh, selectedImage, isEditing }) {
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (isEditing && selectedImage) {
      setCaption(selectedImage.caption);
      setPreview(selectedImage.image);
    }
  }, [selectedImage]);

  const handleFileChange = (file) => {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      if (!caption && !imageFile) {
        console.log("Please provide at least a new image or caption");
        return;
      }
    } else {
      if (!caption || !imageFile) {
        console.log("Both image and caption must be filled");
        return;
      }
    }

    const formData = new FormData();
    formData.append("caption", caption);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (isEditing) {
      await updateImage(selectedImage._id, formData);
    } else {
      await uploadImage(formData);
    }

    setCaption("");
    setImageFile(null);
    setPreview(null);

    if (refresh) {
      refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-card">
      <label className="upload-dropzone">
        {preview ? (
          <img src={preview} alt="preview" className="preview-img" />
        ) : (
          <div className="upload-placeholder">
            <p>Click to upload image</p>
          </div>
        )}

        <input
          type="file"
          hidden
          onChange={(e) => handleFileChange(e.target.files[0])}
        />
      </label>

      <input
        className="caption-input"
        type="text"
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <button className="upload-btn" type="submit">
        {isEditing ? "Update Image" : "Upload Image"}
      </button>
    </form>
  );
}

export default UploadForm;

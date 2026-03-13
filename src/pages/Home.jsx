import { useEffect, useState } from "react";
import { getImages, deleteImage } from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {

  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  /* Pagination */

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

  const fetchImages = async () => {
    const res = await getImages();
    const sorted = res.data.reverse();
    setImages(sorted);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    await deleteImage(id);
    fetchImages();
  };

  return (
    <div className="gallery-container">

      <div className="table-header">
        <h2>Image List</h2>

        <button
          className="create-btn"
          onClick={() => navigate("/create")}
        >
          Create +
        </button>
      </div>

      <table className="image-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Caption</th>
            <th style={{display:'flex',justifyContent:'center'}}>Actions</th>
          </tr>
        </thead>

        <tbody>

          {currentImages.map((img) => (

            <tr key={img._id}>

              <td>
                <img
                  src={img.image}
                  alt={img.caption}
                  className="table-image"
                />
              </td>

              <td>{img.caption}</td>

              <td className="table-actions">

                <button
                  onClick={() => navigate(`/image/${img._id}`)}
                >
                  Preview
                </button>

                <button
                  onClick={() => navigate(`/edit/${img._id}`)}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(img._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="pagination">

        <button
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>Page {currentPage}</span>

        <button
          onClick={nextPage}
          disabled={indexOfLastImage >= images.length}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Home;
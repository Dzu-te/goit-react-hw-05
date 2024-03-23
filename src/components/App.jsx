import "./App.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { useEffect, useState, useCallback } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { ErrorMessage } from "./ErrorMessage/ErrorMessage.jsx";
import { requestPhotos } from "../services/api";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "./ImageModal/ImageModal";

export default function App() {
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [page, setPage] = useState(1);
  const fetchData = useCallback(
    async (query, page) => {
      try {
        setLoading(true);
        setError("");
        const data = await requestPhotos(query, page);
        if (query !== searchQuery) {
          setPhotos(data.results);
        } else {
          setPhotos((prevState) => [...(prevState || []), ...data.results]);
        }

        setMoreAvailable(data.total_pages !== page);
      } catch (error) {
        setError(error.message);
        setPhotos(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    if (!searchQuery) return;
    fetchData(searchQuery, page);
  }, [searchQuery, page, fetchData]);

  const onSetSearchQuery = (newQuery) => {
    setSearchQuery(newQuery);
    setPhotos(null);
    setPage(1);
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const loadMorePhotos = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <div>
      <h1>Search photo gallery</h1>

      <SearchBar onSetSearchQuery={onSetSearchQuery} />
      {error && <ErrorMessage error={error} />}
      {loading && <Loader />}
      <ImageGallery photos={photos} openModal={openModal} />
      {moreAvailable && photos?.length > 0 && (
        <LoadMoreBtn loadMorePhotos={loadMorePhotos} />
      )}
      {selectedPhoto && (
        <ImageModal
          isOpen={!!selectedPhoto}
          closeModal={closeModal}
          src={selectedPhoto?.src}
          alt={selectedPhoto?.alt}
        />
      )}
    </div>
  );
}

import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ListItem from "../Components/ListItem";
import { motion } from "framer-motion";

function SearchResultsPage() {
  const [params] = useSearchParams();
  const [data, setData] = useState([]); // To store the fetched data
  const [page, setPage] = useState(1); // Current page number
  const [hasMore, setHasMore] = useState(true); // To check if more pages are available
  const [loading, setLoading] = useState(false); // To track the loading state
  const loaderRef = useRef(null); // Ref for the loader element
  const [openMenuId, setOpenMenuId] = useState(null); // State to track which menu is open

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id); // Toggle the menu
  };

  // Fetch data function
  const fetchData = async (checkForInitial) => {
    try {
      setLoading(true);
      const result = await axios.get(
        `http://localhost:3000/search?query=${params.get(
          "searchQuery"
        )}&page=${page}&limit=10`
      ); // Fetch paginated data
      if (checkForInitial) {
        setData(result.data.items);
        setPage(1);
      } else {
        setData((prevData) => [...prevData, ...result.data.items]); // Append new data to the existing data
      }
      setHasMore(page < result.totalPages); // Check if there are more pages
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll effect using IntersectionObserver
  useEffect(() => {
    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1); // Load next page when the user reaches the bottom
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null, // The viewport
      threshold: 0.5, // Trigger when 50% of the target is visible
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current); // Observe the loader element
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current); // Clean up observer
    };
  }, [hasMore, loading]);

  // Fetch data when page changes
  useEffect(() => {
    if (page === 1) return; // Skip initial page load in this effect, handled by next useEffect
    fetchData(); // Fetch data for the next page
  }, [page]);

  // Initial fetch when the component mounts
  useEffect(() => {
    fetchData("initialRequest"); // Fetch the first page of data
  }, [params]);

  console.log(data)

  return (
    <div>
      <motion.ul
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.05 , ease : "easeInOut" } },
        }}
        initial="hidden"
        animate="show"
        className="flex flex-wrap  gap-16"
      >
        {data.map((item) => (
          <ListItem
          key={item._id}
            isOpen={openMenuId === item._id}
            toggleMenu={() => toggleMenu(item._id)}
            id={item._id}
            title={item.title}
            url={item.url}
            userId={item.userId || item}
            thumbnail={item.thumbnail}
            uploadedDate={item.uplaodedAt}
            fullName={item.fullName}
            seriesName={item.seriesName}
          />
        ))}
      </motion.ul>

      {/* Loader element */}
      <div
        ref={loaderRef}
        style={{ height: "50px", backgroundColor: "transparent" }}
      >
        {loading && <p>Loading more...</p>}
      </div>
    </div>
  );
}

export default SearchResultsPage;

export async function loader({ request }) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  // Access query params
  const myParam = params.get("searchQuery");
  const response = await axios.get(
    `http://localhost:3000/search?query=${searchQuery}&limit=10`
  );

  return { myParam };
}

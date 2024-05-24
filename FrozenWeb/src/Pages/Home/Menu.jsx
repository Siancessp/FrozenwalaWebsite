import React, { useEffect, useState } from "react";
import Api from "../Utills/Api";

function Menu({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [error, setError] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      const response = await Api.get(`categories/`);
      setCategories(response.data);
    } catch (error) {
      setError("Error fetching menu. Please try again later.");
      console.error("Error fetching menu:", error);
    }
  };

  const handleClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      // Fetch all items
      try {
        const response = await Api.get(`product-all/`);
        console.log(response);
        onSelectCategory("all", response.data); // Pass 'all' as the category ID and the fetched items to the callback
      } catch (error) {
        setError("Error fetching items. Please try again later.");
        console.error("Error fetching items:", error);
      }
    } else {
      // Fetch items for the selected category
      onSelectCategory(categoryId);
    }
  };

  const handleMouseEnter = (categoryId) => {
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <section className="py-0" style={{ flexDirection: "row", display: "flex" }}>
      <div className="container" style={{ maxWidth: "90px !important" }}>
        <div className="col-lg-7 mx-auto text-center mt-7 mb-5">
          <h5 className="fw-bold fs-3 fs-lg-5 lh-sm">Products</h5>
        </div>
        {error && <p>{error}</p>}
        <button
          key="all"
          className="category-button"
          style={{
            backgroundColor:
              selectedCategory === "all"
                ? "#f1722826"
                : hoveredCategory === "all"
                ? "#e6e6e6"
                : "white",
            color:
              selectedCategory === "all" || hoveredCategory === "all"
                ? "#F17228"
                : "gray",
            borderWidth: 0,
            padding: 10,
            paddingInline: 20,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
          onClick={() => handleClick("all")}
          onMouseEnter={() => handleMouseEnter("all")}
          onMouseLeave={handleMouseLeave}
        >
          <span className="category-name" style={{ fontWeight: "600" }}>
            All
          </span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className="category-button"
            style={{
              backgroundColor:
                selectedCategory === category.id
                  ? "#f1722826"
                  : hoveredCategory === category.id
                  ? "#e6e6e6"
                  : "white",
              color:
                selectedCategory === category.id
                  ? "#F17228"
                  : hoveredCategory === category.id
                  ? "black"
                  : "gray",
              borderWidth: 0,
              padding: 10,
              paddingInline: 20,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
            onClick={() => {
              handleClick(category.id);
              onSelectCategory(category.id); // Call the onSelectCategory callback with selected category ID
            }}
            onMouseEnter={() => handleMouseEnter(category.id)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="category-name" style={{ fontWeight: "600" }}>
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Menu;

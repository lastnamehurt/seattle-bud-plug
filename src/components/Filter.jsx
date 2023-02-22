import React, { useState } from "react";

const Filter = ({ data, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    brand: "",
    category: "",
    type: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSelectedFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleApplyFilter = () => {
    const filteredData = data.filter(
      (product) =>
        product.brand === selectedFilters.brand ||
        product.category === selectedFilters.category ||
        product.type === selectedFilters.type
    );
    onFilterChange(filteredData);
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      brand: "",
      category: "",
      type: "",
    });
    onFilterChange(data);
  };

  return (
    <div style={{ marginRight: "16px" }}>
      <h4>Filter</h4>
      <div>
        <label>
          Brand:
          <select
            name='brand'
            value={selectedFilters.brand}
            onChange={handleFilterChange}
          >
            <option value=''>All Brands</option>
            {Array.isArray(data) &&
              Array.from(new Set(data.map((product) => product.brand))).map(
                (brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                )
              )}
          </select>
        </label>
      </div>
      <div>
        <label>
          Category:
          <select
            name='category'
            value={selectedFilters.category}
            onChange={handleFilterChange}
          >
            <option value=''>All Categories</option>
            {Array.isArray(data) &&
              Array.from(new Set(data.map((product) => product.category))).map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
          </select>
        </label>
      </div>
      <div>
        <label>
          Type:
          <select
            name='type'
            value={selectedFilters.type}
            onChange={handleFilterChange}
          >
            <option value=''>All Types</option>
            {Array.isArray(data) &&
              Array.from(new Set(data.map((product) => product.type))).map(
                (type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
              )}
          </select>
        </label>
      </div>
      <div>
        <button onClick={handleApplyFilter}>Apply Filter</button>
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>
    </div>
  );
};

export default Filter;

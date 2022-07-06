import React from 'react';

const Categories = ({categories, filterItems}) => {
  console.log("categories ", {categories, filterItems})
  console.log("filterItems ", filterItems)
  
  return (
    <div className="btn-container">
      {categories.map((category, index) => {
        return (
          <button
            type="button"
            className="filter-btn"
            key={index}
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;

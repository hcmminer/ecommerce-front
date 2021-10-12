import { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = (c) => () => {
    // return the first index or -1

    // lay ra thu tu trong mang neu khong co tra ve -1
    const currentCategoryIndex = checked.indexOf(c);

    const newCheckedCategoriesId = [...checked]; // mang chua id cac category
    if (currentCategoryIndex === -1) {
      newCheckedCategoriesId.push(c);
    } else {
      // neu thu tu cua ct khac -1 nghia la da ton tai vi vay phai loai bo khoi mang
      newCheckedCategoriesId.splice(currentCategoryIndex, 1); // doi so 1 chinh la xoa bo
    }

    setChecked(newCheckedCategoriesId);
    handleFilters(newCheckedCategoriesId);
  };

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={handleToggle(c._id)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};

export default Checkbox;

import Layout from "./layout";
import { useState, useEffect } from "react";
import Card from "./card";
import { getCategories } from "./apiCore";
import Checkbox from "./checkbox";
import RadioBox from "./radiobox";
import { prices } from "./fixedprices"; // khong dung useState vi hau nhu khong thay doi boi user ma chi thay doi boi admin

const Shop = () => {
  const [categories, setCategories] = useState([]); // hay thay doi boi user nen dung state de quan ly
  const [error, setError] = useState(false);

  // Ob nay la cac tuy chon user tick
  const [myFilters, setMyFilters] = useState({
    filters: {},
  });

  // lay data tu BE va thay doi state FE, luu y day la thao tac lam qua tai BE nen tranh chay nhieu
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  // Khoi tao state mot lan duy nhat o lan dau tien render de tranh qua tai BE
  useEffect(() => {
    init();
  }, []);

  // xu ly du lieu moi khi user thay doi tick
  const handleFilters = async (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters; // thay doi mang khi nguoi dung click

    if (filterBy == "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    // Ham xu ly price
    const handlePrice = await ((value) => {
      const data = prices; // mang cac price cho nguoi dung tick
      let array = [];

      for (let key in data) {
        if (data[key]._id == parseInt(value)) {
          array = data[key].array;
        }
      }
      return array;
    });

    setMyFilters(newFilters);
  };

  return (
    <Layout
      title="Shop page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by Price range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">{JSON.stringify(myFilters)}</div>
      </div>
    </Layout>
  );
};

export default Shop;

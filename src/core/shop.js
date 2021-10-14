import Layout from "./layout";
import { useState, useEffect } from "react";
import Card from "./card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./checkbox";
import RadioBox from "./radiobox";
import { prices } from "./fixedprices"; // khong dung useState vi hau nhu khong thay doi boi user ma chi thay doi boi admin

const Shop = () => {
  const [categories, setCategories] = useState([]); // hay thay doi boi user nen dung state de quan ly
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]); // Ob chua tat cac cac product co trong BE

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

  // ham lay product tu BE co dieu kien skip va limit
  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  // component
  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  // Khoi tao state mot lan duy nhat o lan dau tien render de tranh qua tai BE
  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters); // load tat ca product 1 lan duy nhat khi render component
  }, []);

  //thay doi Ob chua danh muc va gia khi user click vao
  const handleFilters = async (filters, filterBy) => {
    const newFilters = { ...myFilters }; // clone ob state va thay doi thay doi ob clone (khong the thay doi truc tiep state duoc ma phai dung setState)
    newFilters.filters[filterBy] = filters; // thay doi mang khi nguoi dung click

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

    if (filterBy == "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    // lay ra ngay cac product khi ma state myFilters thay doi
    loadFilteredResults(myFilters.filters); // tai sao cai nay chay truoc cai set?
    setMyFilters(newFilters); // muc dich cuoi cung thay doi state ban dau khi user click
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
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;

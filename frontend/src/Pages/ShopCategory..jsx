import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Items/Item";
import GlobalLoader from "../Components/Loader/Loader";
import "./CSS/ShopCategory.css";

const ShopCategory = (props) => {
  const { all_products, loading } = useContext(ShopContext);

  return (
    <div className="shop-category">
      <img className="shopCategory-banner" src={props.banner} alt="Banner" />
      <div className="shopCategory-indexSort">
        <p>
          <span>Showing 1-12 </span> out of 36 Products
        </p>
        <div className="shopCategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopCategory-products">
        {loading ? (
          <GlobalLoader />
        ) : (
          all_products.map((item, i) => {
            if (props.category === item.category) {
              console.log(props.category === item.category);
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else return null;
          })
        )}
      </div>
      <div className="shopCategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;

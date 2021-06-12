import React from "react";
import CardHolder from "../../components/cardHolder/cardHolder.component";
import "./shop.scss";
import data from "../../assets/data";
import { Link } from "react-router-dom";
import CustomHeading from "../../components/customHeading/customHeading.component";

const Shop = (props) => {
  let { url } = props.match;
  let { type } = props.match.params;
  return (
    <div className="shop animate">
      <CustomHeading>{"Shop"}</CustomHeading>
      <h3>See if there is anything to your liking</h3>
      {type ? (
        <div className="section">
          <h2 className={`center`}>{type}</h2>
          <CardHolder data={data[type]} />
        </div>
      ) : (
        Object.keys(data).map((key) => (
          <div key={key} className="section">
            <h2 className={`heading`}>
              <Link
                to={`${url}/${key}`}
                style={{ textDecoration: "none", color: "chocolate" }}
              >
                {key}&#10140;
              </Link>
            </h2>
            <CardHolder data={data[key]} count="4"></CardHolder>
          </div>
        ))
      )}
    </div>
  );
};

export default Shop;

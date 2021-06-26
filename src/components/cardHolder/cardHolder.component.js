import React from "react";
import "./cardHolder.styles.scss";
import CustomCard from "../card/card.component";
import "./cardHolder.styles.scss";

const CardHolder = (props) => {
  let { data, count } = props;
  if (count) {
    data = data.slice(0, count);
  }
  return (
    <>
      <div className="card-holder">
        {data.map((item) => (
          <div className="selecting" key={item.id}>
            <div className="card">
              <CustomCard data={item}></CustomCard>
              <span className="text">
                <div>{item.name}</div>
                <span>${item.price}</span>
              </span>
            </div>
          </div>
        ))}
        <div />
        <div />
      </div>
    </>
  );
};

export default CardHolder;

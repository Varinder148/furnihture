import React from "react";
import CustomButton from "../customButton/customButton.component";
import "./card.style.scss";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.action";

class CustomCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, addItem } = this.props;
    console.log("card");
    return (
      <>
        <div className="type">{data.type}</div>
        <div className={`cus-card`}>
          <Card>
            <img src={data["url"]} alt="image" className="card-img" />
          </Card>
          <div className="card-button">
            <CustomButton type="btnup large reg" onClick={() => addItem(data)}>
              Add to Cart
            </CustomButton>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(CustomCard);

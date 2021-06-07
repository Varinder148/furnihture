import React, { useEffect, useRef } from "react";
import "./categories.style.scss";

import { Timeline, Controls, PlayState, Tween } from "react-gsap";
import { Container, Row, Col, Card, CardTitle } from "react-bootstrap";
import CustomHeading from "../customHeading/customHeading.component";

import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <div className="container-card">
        <div></div>
        <div className="heading">
          Pick <br />
          your <br />
          poison
        </div>
        <div style={{ width: "100%" }}>
          <Container fluid>
            <Row className="align-items-end">
              <Col style={{ padding: 0 }}>
                <Link to="shop/beds" style={{ textDecoration: "none" }}>
                  <Card className="card bed overlay">Beds</Card>
                </Link>
              </Col>

              <Col md="5" style={{ padding: 0 }}>
                <Link to="shop/tables" style={{ textDecoration: "none" }}>
                  <Card className="card-alt">
                    <div className="circle bottom" />
                    Tables
                  </Card>
                </Link>
              </Col>
            </Row>
            <Row style={{ gap: "0" }}>
              <Col md="5" style={{ padding: 0 }}>
                <Link to="shop/chairs" style={{ textDecoration: "none" }}>
                  <Card className="card-alt">
                    <div className="circle top" />
                    Chairs
                  </Card>
                </Link>
              </Col>
              <Col style={{ padding: 0 }}>
                <Link to="shop/cabinets" style={{ textDecoration: "none" }}>
                  <Card className="card cabinet overlay">Cabinets</Card>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
export default Categories;

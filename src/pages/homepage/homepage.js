import React from "react";
import HomepageHeader from "../../components/homepageHeader/homepageHeader.component";
import "./homepage.scss";
import Footer from "../../components/footer/footer.component";
import Categories from "../../components/categories/categories.component";
import CustomHeading from "../../components/customHeading/customHeading.component";

const Homepage = () => {
  return (
    <>
      <div className="homepage-page">
        <HomepageHeader></HomepageHeader>

        <Categories></Categories>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Homepage;

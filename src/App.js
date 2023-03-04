import React, { useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { setPrevPrice } from "./redux/action";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";

//import PwaInstallPopupIOS from 'react-pwa-install-ios';

// const SidebarAndOther = lazy(() => import('./components/SidebarAndOther/SidebarAndOther'));
import {
  Terms,
  Home,
  Contact,
  Privacy,
  Cart,
  Profile,
  Wishlist,
  Shipping,
  Error,
  Blog,
  BlogCategory,
  ForgotPassword,
  ProductCategory,
  ProductCategorySidebar,
  ProductDetails,
} from "./routes";
import Automation from "./routes/Automation";
import About from "./routes/About";
import Forms from "./routes/Forms";
import News from "./routes/News";
import NewsCategory from "./routes/NewsCategory";
import Gallery from "./routes/Gallery";
import BranchMap from "./routes/BranchMap";
import Questions from "./routes/Questions";
import NextBuys from "./routes/Nextbuys";

import appIcon from "./assets/images/favicon.ico";
import logo from "./assets/images/logo.png";

import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";

const loadJs = require("loadjs");

function App(props) {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const [noWeb, setNoWeb] = React.useState(true);

  const handleClick = () => {
    pwaInstall({
      title: "نصب نسخه تحت وب تورا",
      logo: logo,
      features: (
        <ul>
          <li>رادین صنعت رایان</li>
          <li>اپ تحت وب تورا</li>
          <li>از منوی بیشتر برنامه را Add to Screen کنید</li>
          <li>برنامه را از صفحه Home باز کنید</li>
        </ul>
      ),
      description: "اپ تورا نسخه تحت وب.",
    })
      .then(() => alert("جهت اجرای برنامه دستورالعمل خواسته شده را انجام دهید"))
      .catch(() => {} /* alert("کاربر خارج شد" */);
  };

  useEffect(() => {
    loadJs("js/custom.js");
    window.scrollTo(0, 0);
    if (props.cartItems && props.cartItems.length > 0) {
      props.setPrevPrice();
    }
  }, [props.location]);

  return (
    <>
      <div>
        {supported() && !isInstalled() ? (
          noWeb ? (
            <>
              <div
                style={{
                  height: "100vh",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "#efefef",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                    maxWidth: "200px",
                    marginTop: "10%",
                  }}
                >
                  <img src={logo} />
                  <br />
                  <div
                    style={{
                      backgroundColor: "white",
                      marginRight: "-54%",
                      width: 250,
                      height: 300,
                    }}
                  >
                    <p style={{ fontSize: 10, fontWeight: "700", margin: 20 }}>
                      با نصب وب اپلیکیشن تورا، همیشه آخرین نسخه برنامه را بدون
                      نیاز به آپدیت داشته باشید.
                    </p>
                    <div
                      style={{
                        width: "90%",
                        height: 1,
                        backgroundColor: "#dddddd",
                        marginRight: 11,
                      }}
                    ></div>
                    <div>
                      <p
                        style={{ fontSize: 10, fontWeight: "700", margin: 10 }}
                      >
                        ۱- در نوار پایین دکمه "Share" را انتخاب کنید.
                      </p>
                      <p
                        style={{ fontSize: 10, fontWeight: "700", margin: 10 }}
                      >
                        ۲- منوی باز شده را به چپ بکشید و گزینه "Add to home
                        screen" را انتخاب کنید.
                      </p>
                      <p
                        style={{ fontSize: 10, fontWeight: "700", margin: 10 }}
                      >
                        ۳- در مرحله بعد در قسمت بالا روی Add کلیک کنید.
                      </p>
                    </div>

                    <br />

                    <div
                      role="button"
                      onClick={() => setNoWeb(false)}
                      /* onclick={`location.href=${product.catalog};`} */
                      className="e-btn pd-addcart"
                      style={{
                        width: 180,
                        height: 40,
                        fontSize: 18,
                        marginRight: 35,
                        marginTop: 0,
                        marginBottom: 12,
                      }}
                    >
                      متوجه شدم!
                    </div>
                  </div>
                  {/* <button type="button" onClick={handleClick}>
            راهنمای نصب برنامه
          </button> */}
                  {/* <PwaInstallPopupIOS 
            delay={3}
            lang="en"
            appIcon={appIcon}
            >
          </PwaInstallPopupIOS> */}
                </div>
              </div>
            </>
          ) : (
            <Switch>
              <Route exact component={Home} path="/" />
              <Route exact component={Automation} path="/Automation" />
              <Route exact component={Terms} path="/terms" />
              <Route exact component={About} path="/about" />
              <Route exact component={Forms} path="/forms/:formNo" />
              <Route exact component={Privacy} path="/privacy" />
              <Route exact component={Contact} path="/contact" />
              <Route exact component={BranchMap} path="/branch_map" />
              <Route exact component={Cart} path="/cart" />
              <Route exact component={Profile} path="/profile" />
              <Route exact component={Shipping} path="/shipping" />
              <Route exact component={Blog} path="/blog/:id/:page" />
              <Route
                exact
                component={BlogCategory}
                path="/blog_category/:page"
              />
              <Route exact component={News} path="/news/:id" />
              <Route
                exact
                component={NewsCategory}
                path="/news_category/:page"
              />
              <Route exact component={Gallery} path="/gallery" />
              <Route exact component={ForgotPassword} path="/forgotpassword" />
              <Route
                exact
                component={ProductCategory}
                path="/product_category"
              />
              <Route
                exact
                component={ProductCategorySidebar}
                path="/seller/:id"
              />
              <Route exact component={ProductDetails} path="/product/:id" />
              <Route exact component={Wishlist} path="/wishlist" />
              <Route exact component={NextBuys} path="/nextcart" />
              <Route exact component={Questions} path="/questions" />
              <Route component={Error} />
            </Switch>
          )
        ) : (
          <Switch>
            <Route exact component={Home} path="/" />
            <Route exact component={Automation} path="/Automation" />
            <Route exact component={Terms} path="/terms" />
            <Route exact component={About} path="/about" />
            <Route exact component={Forms} path="/forms/:formNo" />
            <Route exact component={Privacy} path="/privacy" />
            <Route exact component={Contact} path="/contact" />
            <Route exact component={BranchMap} path="/branch_map" />
            <Route exact component={Cart} path="/cart" />
            <Route exact component={Profile} path="/profile" />
            <Route exact component={Shipping} path="/shipping" />
            <Route exact component={Blog} path="/blog/:id/:page" />
            <Route exact component={BlogCategory} path="/blog_category/:page" />
            <Route exact component={News} path="/news/:id" />
            <Route exact component={NewsCategory} path="/news_category/:page" />
            <Route exact component={Gallery} path="/gallery" />
            <Route exact component={ForgotPassword} path="/forgotpassword" />
            <Route exact component={ProductCategory} path="/product_category" />
            <Route
              exact
              component={ProductCategorySidebar}
              path="/seller/:id"
            />
            <Route exact component={ProductDetails} path="/product/:id" />
            <Route exact component={Wishlist} path="/wishlist" />
            <Route exact component={NextBuys} path="/nextcart" />
            <Route exact component={Questions} path="/questions" />
            <Route component={Error} />
          </Switch>
        )}
      </div>
    </>
  );
}

const mapState = (state) => {
  return {
    cartItems: state.cartItems,
  };
};
const mapDis = (dispatch) => {
  return {
    setPrevPrice: () => dispatch(setPrevPrice()),
  };
};
export default connect(mapState, mapDis)(withRouter(App));

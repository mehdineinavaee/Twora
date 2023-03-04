import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Pagination from "../components/Pagination";
import moment from "moment-jalaali";

import { Lightbox } from "react-modal-image";

moment.loadPersian([{ usePersianDigits: true }]);
function Gallery({ match, history }) {
  //const { page } = match.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedDesc, setSelectedDesc] = useState("");

  const [showImageModal, setShowImageModal] = useState(false);
  const [mouseOver, setMouseOver] = useState(-1);

  const numbers = `۰۱۲۳۴۵۶۷۸۹`;
  const convert = (num) => {
    let res = "";
    const str = num.toString();
    for (let c of str) {
      res += numbers.charAt(c);
    }
    return res;
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}Gallery.aspx`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);
  //const [paginationPage, setPaginationPage] = useState(JSON.parse(page));
  /* const onChange = (componentPage) => {
    if (page !== JSON.stringify(componentPage)) {
      setLoading(true);
      history.push(`/news_category/${componentPage}`);
      setPaginationPage(componentPage);
    }
  }; */

  return (
    <>
      <Layout loading={loading} title="گالری">
        <div className="e-breadcumb-wrap text-center">
          <h2 className="e-breadcumb-title">گالری</h2>
          <ul className="e-breadcumb-kist">
            <li>
              <NavLink to="/">خانه</NavLink>
            </li>
            <li>
              <NavLink to="/gallery">گالری</NavLink>
            </li>
          </ul>
        </div>
        {!loading && (
          <section className="e-blog-wrap e-blog-category-wrap">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="e-blog-sec">
                    <div className="row">
                      {data.map((each, key) => {
                        //let route = "/news/"+(key);
                        //console.log(route);
                        return (
                          <>
                            <div
                              onMouseEnter={() => setMouseOver(key)}
                              onMouseLeave={() => setMouseOver(-1)}
                              onClick={() => {
                                setSelectedImage(each.fileURL);
                                setSelectedDesc(each.description);
                                setShowImageModal(true);
                              }}
                              key={each.id}
                              className="col-sm-3"
                            >
                              <div className="cmn-blog-box">
                                <div className="cmn-blog-imgwrap">
                                  {/* { mouseOver ?
                          <h6 style={{marginTop: 50}}>{each.description}</h6>
                          :
                                <img
                                  style={!mouseOver ? {maxHeight: "220px", cursor: "pointer"}
                                          : {maxHeight: "220px", cursor: "pointer", filter: "brightness(40%)"}}
                                  src={each.fileURL}
                                  alt={each.description}
                                  className="img-fluid"
                                />
                                } */}

                                  <div
                                    style={{
                                      position: "relative",
                                      //width: "50%"
                                    }}
                                  >
                                    <img
                                      src={each.fileURL}
                                      alt={each.description}
                                      style={{
                                        borderRadius: "5px",
                                        display: "block",
                                        width: "100%",
                                        height: "auto",
                                      }}
                                    />
                                    <div
                                      style={
                                        mouseOver === key
                                          ? {
                                              borderRadius: "5px",
                                              position: "absolute",
                                              top: 0,
                                              bottom: 0,
                                              left: 0,
                                              right: 0,
                                              height: "100%",
                                              width: "100%",
                                              opacity: "1",
                                              transition: ".5s ease",
                                              backgroundColor: "#808080",
                                              cursor: "pointer",
                                            }
                                          : {
                                              position: "absolute",
                                              top: 0,
                                              bottom: 0,
                                              left: 0,
                                              right: 0,
                                              height: "100%",
                                              width: "100%",
                                              opacity: "0",
                                              transition: ".5s ease",
                                              backgroundColor: "#808080",
                                              cursor: "pointer",
                                            }
                                      }
                                    >
                                      <div
                                        style={{
                                          color: "#023020",
                                          fontSize: "16px",
                                          position: "absolute",
                                          top: "50%",
                                          left: "50%",
                                          /* -webkit-transform: "translate(-50%, -50%)",
                                      -ms-transform: "translate(-50%, -50%)", */
                                          transform: "translate(-50%, -50%)",
                                          textAlign: "center",
                                        }}
                                      >
                                        {each.description}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* <ul className="cmn-blog-infolist">
                                <li>{each.title}</li>
                                {/* <li>
                                  <span className="blog-il-icon">
                                    <img
                                      src={require("../assets/images/index1/svg/profile.svg")}
                                      alt="icon"
                                    />
                                  </span>
                                  توسط -{" "}
                                  <span className="cmn-blog-auther">
                                    جعفر عباسی{" "}
                                  </span>
                                </li> *
                                <li>
                                  {/* <span className="blog-il-icon">
                                    <img
                                      src={require("../assets/images/index1/svg/calender_c.svg")}
                                      alt="icon"
                                    />
                                  </span> *
                                  {/* {moment(each.date).format("jMMMM")}{" "}
                                  {convert(moment(each.date).format("jYYYY"))} *
                                </li>
                              </ul> */}
                                {/* <div className="cmn-blog-title" style={{fontSize: 12}}>{each.description}</div> */}
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {/* Pagination */}
              {/* {data && data.length && !loading && (
              <div className="row">
                <div className="col-12">
                  <Pagination
                    lang="english"
                    //onChange={onChange}
                    //currentPage={paginationPage}
                    totalItemsLength={data.length}
                    itemsPerPage={10}
                    showLessPages={true}
                  />
                </div>
              </div>
            )} */}
            </div>
          </section>
        )}
      </Layout>

      {showImageModal ? (
        <Lightbox
          medium={selectedImage}
          large={selectedImage}
          hideDownload
          alt={selectedDesc}
          onClose={() => setShowImageModal(false)}
        />
      ) : (
        false
      )}
    </>
  );
}

export default withRouter(Gallery);

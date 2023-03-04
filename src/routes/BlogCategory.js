import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Pagination from "../components/Pagination";
import moment from "moment-jalaali";

import http from "../components/services/httpService";
import config from "../config.json";

moment.loadPersian([{ usePersianDigits: true }]);
function BlogCategory({ match, history }) {
  const { page } = match.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
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
      .get(
        `${process.env.REACT_APP_BASE_URL}Blog.aspx?type=${page == 1 ? 2 : 1}`
      )
      .then((res) => {
        setData(res.data);
        setFilter(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
    apiBlogCategory();
  }, [page]);

  const [blogCategoryData, setBlogCategoryData] = useState([]);
  async function apiBlogCategory() {
    const apiBlogCategory = await http.get(config.apiBlogCategory);
    setBlogCategoryData(apiBlogCategory.data);
    console.log("apiBlogCategory", apiBlogCategory.data);
  }

  const [paginationPage, setPaginationPage] = useState(JSON.parse(page));
  const onChange = (componentPage) => {
    if (page !== JSON.stringify(componentPage)) {
      setLoading(true);
      history.push(`/blog_category/${componentPage}`);
      setPaginationPage(componentPage);
    }
  };

  // useEffect(() => {
  //   console.log("filter", filter);
  // }, [filter]);

  const filterCategories = (id) => {
    const dataFilter = data.filter((m) => m.categoryid == id);
    setFilter(dataFilter);
    // console.log("data", data);
    // console.log("id", id);
  };

  return (
    <Layout loading={loading} title="وبلاگ">
      <div className="e-breadcumb-wrap text-center">
        {page == 1 ? (
          <h2 className="e-breadcumb-title">مجلات آموزشی</h2>
        ) : (
          <h2 className="e-breadcumb-title">ویدیوهای آموزشی</h2>
        )}
        <ul className="e-breadcumb-kist">
          <li>
            <NavLink to="/">خانه</NavLink>
          </li>
          <li>
            {page == 1 ? (
              <NavLink to="/blog_category/1">مجلات آموزشی</NavLink>
            ) : (
              <NavLink to="/blog_category/2">ویدیوهای آموزشی</NavLink>
            )}
          </li>
        </ul>
      </div>

      {!loading && (
        <section className="e-blog-wrap e-blog-category-wrap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                  >
                    <div className="navbar-nav">
                      <button
                        className="btn btn-info ml-2"
                        onClick={() => setFilter(data)}
                      >
                        همه دسته بندی ها
                      </button>
                      {page == 1
                        ? blogCategoryData.map((item) =>
                            item.type == "Blog" ? (
                              <button
                                key={item.id}
                                className="btn btn-info ml-2"
                                onClick={() => filterCategories(item.id)}
                              >
                                {item.title}
                              </button>
                            ) : (
                              ""
                            )
                          )
                        : blogCategoryData.map((item) =>
                            item.type == "Video" ? (
                              <button
                                key={item.id}
                                className="btn btn-info ml-2"
                                onClick={() => filterCategories(item.id)}
                              >
                                {item.title}
                              </button>
                            ) : (
                              ""
                            )
                          )}
                    </div>
                  </div>
                </nav>
                <br />
                <div className="e-blog-sec">
                  <div className="row">
                    {filter.length > 0 ? (
                      filter.map((each) => {
                        let route = "/blog/" + each.id + "/" + page;
                        return (
                          <div key={each.id} className="col-sm-6">
                            <NavLink to={route}>
                              <div className="cmn-blog-box">
                                <div className="cmn-blog-imgwrap">
                                  <img
                                    src={each.image}
                                    alt="pic"
                                    className="img-fluid"
                                  />
                                </div>
                                <ul className="cmn-blog-infolist">
                                  {/* <li>{each.title}</li> */}
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
                                </li> */}
                                  <li>
                                    {/* <span className="blog-il-icon">
                                    <img
                                      src={require("../assets/images/index1/svg/calender_c.svg")}
                                      alt="icon"
                                    />
                                  </span> */}
                                    {/* {moment(each.date).format("jMMMM")}{" "}
                                  {convert(moment(each.date).format("jYYYY"))} */}
                                  </li>
                                </ul>
                                <div className="cmn-blog-title">
                                  {each.title}
                                </div>
                                <div style={{ color: "gray" }}>
                                  {each.description}
                                </div>
                              </div>
                            </NavLink>
                          </div>
                        );
                      })
                    ) : (
                      <div className="col">
                        <p>اطلاعاتی یافت نشد</p>
                        <br />
                        <br />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination */}
            {filter && filter.length > 0 && !loading && (
              <div className="row">
                <div className="col-12">
                  <Pagination
                    lang="english"
                    onChange={onChange}
                    currentPage={paginationPage}
                    totalItemsLength={filter.length}
                    itemsPerPage={10}
                    showLessPages={true}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}

export default withRouter(BlogCategory);

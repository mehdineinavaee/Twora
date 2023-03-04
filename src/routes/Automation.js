import React from "react";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Automation() {
  const [loading, setLoading] = React.useState(true);
  const [servicedata, setServicedata] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}Service.aspx`)
      .then((res) => {
        setServicedata(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <Layout loading={loading} title="اتوماسیون">
      {/* <!-- Breadcumbs start --> */}
      <div class="e-breadcumb-wrap text-center">
        <h2 className="e-breadcumb-title">اتوماسیون</h2>
        <ul class="e-breadcumb-kist">
          <li>
            <NavLink to="/">خانه </NavLink>
          </li>
          <li>
            <NavLink to="/automation">اتوماسیون</NavLink>
          </li>
        </ul>
      </div>

      {servicedata && (
        <div class="e-privacy-wrap">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="e-privacy-sec">
                  <div class="e-privacy-box mb-30">
                    {servicedata.map((item, index) => (
                      <h4 class="cmn-brdr-ttle  mb-10">
                        <a href={item.link} target="_blank" key={index}>
                          {item.title}
                        </a>
                      </h4>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Automation;

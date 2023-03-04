import React from "react";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import axios from "axios";
function About() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}AboutUs.aspx`)
      .then((res) => {
        setData(res.data[0]);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <Layout loading={loading} title="درباره ما">
      {/* <!-- Breadcumbs start --> */}
      <div class="e-breadcumb-wrap text-center">
        <h2 class="e-breadcumb-title">درباره ما</h2>
        <ul class="e-breadcumb-kist">
          <li>
            <NavLink to="/">خانه </NavLink>
          </li>
          <li>
            <NavLink to="/about">درباره ما</NavLink>
          </li>
        </ul>
      </div>
      {/* <!-- شرایط و ضوابط start --> */}
      {data && (
        <div class="e-privacy-wrap">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="e-privacy-sec">
                  <div class="e-privacy-box mb-30">
                    <h2 class="cmn-brdr-ttle big-ttl mb-10">
                      شرکت رادین صنعت رایان
                    </h2>
                    <p style={{ marginTop: "2em", lineHeight: "30px" }}>
                      {data.description}
                    </p>
                    <br/>
                    <p>
                    <b>بخش مدیریت</b> <br/>
                    رئیس هیات مدیره: دکتر نادر وجدانی فر <br/>
                    مدیرعامل: مهندس قاسم مقصودی نژاد <br/>
                    <br/>
                    <b>بخش علمی فنی </b> <br/>
                    مدیر تحقیق و توسعه: دکتر سید مسعود حسینی <br/>
                    مدیر علمی= فنی محصولات دامی: دکتر داراب عبدالهی <br/>
                    مدیر علمی- فنی بخش دام بزرگ: دکتر حسین خالصی <br/>
                    مدیر علمی - فنی بخش طیور: دکتر محمدهادی کیانی <br/>
                    <br/>
                    <b>بخش بازرگانی </b> <br/>
                    مدیر بازرگانی داخلی: دکتر مهرداد شیرین آبادی <br/>
                    مدیر بازرگانی خارجی: دکتر کامبیز نباتی <br/>
                    <br/>
                    <b>بخش فروش </b> <br/>
                    مدیر فروش محصولات دامی منطقه 1: خانم سارا صادقی <br/>
                    مدیر فروش محصولات دامی منطقه 2: مهندس حمید عزیزالهی <br/>
                    مدیر فروش محصولات دامی منطقه 3: دکتر نیما مرادپور <br/>
                    مدیر فروش محصولات دامی منطقه 4: دکتر میثم کریمی <br/>
                    مدیر فروش محصولات دامی منطقه 5: دکتر رضا رستم نیا <br/>
                    مدیر فروش محصولات طیوری: دکتر شهرام اعتضاد <br/>
                    کارشناس فروش محصولات طیوری: دکتر مهرداد بصیری  <br/>
                    <br/>
                    <b>بخش مالی و حسابداری </b> <br/>
                    مدیر مالی: مهندس اردشیر بنی طهماسب <br/>
                    رئیس بخش حسابداری: آقای فرزاد بهاروند <br/>
                    کارشناس بخش حسابداری: خانم سمیه رحیمی <br/>

                    </p>
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

export default About;

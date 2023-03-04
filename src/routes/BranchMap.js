import { Form, Formik } from "formik";
import React, { useState, useEffect }  from "react";
import Layout from "../components/Layout/Layout";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import axios from "axios";

import Mapir from "mapir-react-component";

import { Modal } from 'react-tiny-modal';

const initialValues = {
  name: "",
  lastname: "",
  email: "",
  message: "",
  website: "",
};
const validationSchema = yup.object({
  email: yup
    .string()
    .typeError("ایمیل وارد نشده .")
    .email("ایمیل وارد شده صحیح نمیباشد .")
    .required("ایمیل وارد نشده ."),
  name: yup.string().typeError("نام وارد نشده .").required("نام وارد نشده ."),
  lastname: yup
    .string()
    .typeError("نام خانوادگی وارد نشده .")
    .required("نام خانوادگی وارد نشده ."),
  message: yup
    .string()
    .typeError("پیام وارد نشده .")
    .required("پیام وارد نشده ."),
  website: yup
    .string()
    .typeError("وب سایت وارد نشده .")
    .required("وب سایت وارد نشده ."),
});
function BranchMap() {
  const [data, setData] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const [showModal, setShowModal] = React.useState(false)

  const [branches, setBranches] = React.useState([]);
  const [selectedBranch, setSelectedBranch] = React.useState(0);


  const customStyles = {
    content : {
      
    },
    overlay: {zIndex: 1000}
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}ContactUs.aspx`)
      .then((res) => {
        setData(res.data[0]);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);
  const numbers = `۰۱۲۳۴۵۶۷۸۹`;
  const convert = (num) => {
    let res = "";
    const str = num.toString();
    for (let c of str) {
      res += numbers.charAt(c);
    }
    return res;
  };


  const getBranch = async () => {


        axios
          .get(
            `https://2raapp.ir/api/branch.aspx`,
          )
          .then(async res => {

            console.log(res);
            setBranches(res.data);

          })
          .catch(err => {
            console.log(err);
          });

      

    };


    useEffect(() => {
      getBranch();
    }, []);

  const Map = Mapir.setToken({
    transformRequest: (url)=> {
        return {
            url: url,
            headers: { 
                'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZiNGVhMmM3ZDRjMjU3MTg4N2UwYjJmOGFkZTIwNDNiYWNjMzNjNzU1MTIzMTIwNzgwZTVkNTRiMjIxOWM4MzY4OWM3MmE0NTk2YTkwYjZlIn0.eyJhdWQiOiIxOTI3NiIsImp0aSI6ImZiNGVhMmM3ZDRjMjU3MTg4N2UwYjJmOGFkZTIwNDNiYWNjMzNjNzU1MTIzMTIwNzgwZTVkNTRiMjIxOWM4MzY4OWM3MmE0NTk2YTkwYjZlIiwiaWF0IjoxNjYxODU0NzU0LCJuYmYiOjE2NjE4NTQ3NTQsImV4cCI6MTY2NDUzNjc1NCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.KEQzXBFLJst6qcty3DabHeWoH8oUppTYKQNocYaS5rgEtXER8eQ0l266E42AA0qzpsaSOtRocsqY-4gFOctUOh7m2gAsBx3ok_dMJWJuyFe1GMRrwO9segh7fxrJCOSwMsUJkC9aBi8fCRJGN5zroQm8Q57WLnN-nQs9rSM6ZJql2VBrhjkC25aY2kTJRUIxPMUsjlgiNhHkgegfp2OWW1FKw3mk3jPwv_z8UlIe93naYM_I3V3812jE1FUgPjArJgPL6fy_Kzgjbx37odpjXUYhphWWI6jcAl_Yl2VIpUV2RXDYUZnlWRUQIKNtUiDxpGwQEGZhGBY2HvqztMavFA', //Mapir access token
                'Mapir-SDK': 'reactjs'
            }
        }
 
    }
});

  // const onSubmit = (e) => {
  //   console.log(e);
  // };
  return (
    <Layout loading={loading} title="نمایش نمایندگان روی نقشه">
      {/* <!-- Breadcumbs start --> */}
      {/* <div className="e-breadcumb-wrap text-center">
        <h2 className="e-breadcumb-title">ارتباط با ما</h2>
        <ul className="e-breadcumb-kist">
          <li>
            <NavLink to="/">خانه</NavLink>
          </li>
          <li>
            <NavLink to="/contact">ارتباط با ما</NavLink>
          </li>
        </ul>
      </div> */}
      {/* <!-- contact box start --> */}

      {/* <div className="e-autho-model modal fade" id="success">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="modal-inner">
                <div className="mt-10 mb-10 d-flex align-items-center">
                  <div>
                    <svg height="23" version="1.1" width="23">
                      <g transform="translate(0 -1028.4)">
                        <path
                          d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                          fill="#27ae60"
                          transform="translate(0 1029.4)"
                        />
                        <path
                          d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                          fill="#2ecc71"
                          transform="translate(0 1028.4)"
                        />
                        <path
                          d="m16 1037.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z"
                          fill="#27ae60"
                        />
                        <path
                          d="m16 1036.4-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 0.125 0.1 8.125-8.1-2.125-2.1z"
                          fill="#ecf0f1"
                        />
                      </g>
                    </svg>
                  </div>
                  <div style={{ marginRight: ".7em" }}>
                    عضویت شما در خبرنامه با موفقیت انجام شد
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <section className="e-contact-wrap mb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5 align-self-center">
              <div className="e-contact-info">
                <div className="lbel-wrap">
                  <h2 className="e-contact-lbel">دفتر مرکزی</h2>
                </div>
                <ul className="cntc-infobox-list">
                  <li style={{ marginTop: "2em" }}>
                    <div className="contact-infobox">
                      <h4 className="cmn-brdr-ttle">تهران</h4>
                      <p className="cntc-infobox-des">{data.address}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7 align-self-center">
              <div className="e-contact-box">
                <h4 className="cmn-brdr-ttle">{data.text}</h4>
                <div style={{ marginTop: "2em" }}>ایمیل :</div>
                <p className="contact-box-des">{data.email}</p>
                <div>تلفن تماس :</div>
                {data.tel && (
                  <p className="contact-box-des">
                    <span
                      onClick={() => {
                        window.open("tel:02122206558");
                      }}
                    >
                      {"۰۲۱-"}
                      {convert(data.tel).slice(4, 12)} ,
                    </span>
                    <span
                      onClick={() => {
                        window.open("tel:02122206559");
                      }}
                    >
                      {" ۰۲۱-"}
                      {convert(data.tel).slice(17, 30)}
                    </span>
                  </p>
                )}
                {/* <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({
                    values,
                    setFieldValue,
                    setFieldTouched,
                    touched,
                    errors,
                  }) => {
                    return (
                      <Form>
                        <div className="row">
                          <div className="col-md-6 ">
                            <div className="e-form-field mb-26">
                              <label>نام کوچک </label>
                              <input
                                onBlur={() => setFieldTouched("name")}
                                value={values.name}
                                onChange={(e) =>
                                  setFieldValue("name", e.target.value)
                                }
                                className="e-field-inner require"
                                type="text"
                                name="first_name"
                                id="first_name"
                              />

                              {errors.name && touched.name && (
                                <div className="mt-2 text-danger">
                                  {errors.name}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6 ">
                            <div className="e-form-field mb-26">
                              <label>نام خانوادگی </label>
                              <input
                                onBlur={() => setFieldTouched("lastname")}
                                value={values.lastname}
                                onChange={(e) =>
                                  setFieldValue("lastname", e.target.value)
                                }
                                className="e-field-inner require"
                                type="text"
                                name="last_name"
                                id="last_name"
                              />
                              {errors.lastname && touched.lastname && (
                                <div className="mt-2 text-danger">
                                  {errors.lastname}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6 ">
                            <div className="e-form-field mb-26">
                              <label>ایمیل </label>
                              <input
                                onBlur={() => setFieldTouched("email")}
                                value={values.email}
                                onChange={(e) =>
                                  setFieldValue("email", e.target.value)
                                }
                                className="e-field-inner require"
                                type="email"
                                name="email"
                                id="email"
                                data-valid="email"
                                data-error="ایمیل باید معتبر باشد."
                              />
                              {errors.email && touched.email && (
                                <div className="mt-2 text-danger">
                                  {errors.email}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6 ">
                            <div className="e-form-field mb-26">
                              <label>وب سایت</label>
                              <input
                                onBlur={() => setFieldTouched("website")}
                                value={values.website}
                                onChange={(e) =>
                                  setFieldValue("website", e.target.value)
                                }
                                className="e-field-inner require"
                                type="text"
                                name="website"
                                id="website"
                              />
                              {errors.website && touched.website && (
                                <div className="mt-2 text-danger">
                                  {errors.website}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="e-form-field mb-26">
                              <label>پیام </label>
                              <textarea
                                onBlur={() => setFieldTouched("message")}
                                value={values.message}
                                onChange={(e) =>
                                  setFieldValue("message", e.target.value)
                                }
                                className="e-field-inner require"
                                name="message"
                                id="message"
                              ></textarea>
                              {errors.message && touched.message && (
                                <div className="mt-2 text-danger">
                                  {errors.message}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="">
                              <button
                                type="submit"
                                className="e-btn submitForm"
                              >
                                در تماس باشید
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik> *
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <div className="e-contact-map">
        <div className="container-fluid">
          <div className="row">
            <div className="contant-innermap"> */}
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.1413566453075!2d51.452672840871294!3d35.79646291681439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xecb461c1d378b689!2zMzXCsDQ3JzQ5LjciTiA1McKwMjcnMTUuNyJF!5e0!3m2!1sen!2s!4v1649317664504!5m2!1sen!2s"
                
                style={{ border: 0, width: "100%", height: "100%" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              /> */}

              {/* <iframe 
                src="https://www.google.com/maps/@34.7786609,48.3832681,10z" 
                style={{border: "0px #ffffff none"}} 
                name="myiFrame" 
                scrolling="no" 
                frameborder="1" 
                marginheight="0px" 
                marginwidth="0px" 
                height="400px" 
                width="600px" 
                allowfullscreen>

              </iframe> */}

              {/* <iframe loading="lazy" src="https://www.google.com/maps/@34.7786609,48.3832681,10z" name="iFrame Name" scrolling="No" height="500px" width="100%" style={{border: "none"}}></iframe>
 */}

             
              
      {/*       </div>
          </div>
        </div>
      </div> */}
      <Mapir zoom={[5]} center={[52.42047, 32.729054]} Map={Map}>
                {
                  branches.map((data, key) => {
                    
                    //console.warn(data.map_lat);
                    //console.warn(data.map_long);
                    return <>
                    { showModal ?
                    false
                    :
                    <div style={{cursor: "pointer"}}>
                    <Mapir.Marker  coordinates={[data.map_long, data.map_lat]} anchor="bottom" 
                    onClick={() => {setShowModal(true); setSelectedBranch(key);}}/>
                    </div>
                  }
                    </>
                    
                    
                    {/* <Mapir.Marker coordinates={[parseFloat(data.map_lat).toFixed(3), parseFloat(data.map_long).toFixed(3)]} anchor="bottom" /> */}

                  })
                }
                <Mapir.ZoomControl/>
              </Mapir>


              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                {/* <button onClick={() => setShowModal(false)}>close the modal!</button> */}
                <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)',  width: 350, height: 195, borderRadius: 10}}>
                <div className="e-form-field mb-26" style={{padding: 20}}>
                {
                  branches.length > 0 ?
                <>
                  <div style={{marginBottom: 10}}>
                  {branches[selectedBranch].title} ( {branches[selectedBranch].type} )
                  </div>

                  <div style={{marginBottom: 10}}>
                  مدیریت : {branches[selectedBranch].CEO}
                  </div>
                  
                  <div style={{marginBottom: 10}}>
                  استان : {branches[selectedBranch].state}
                  </div>
                  
                  <div style={{marginBottom: 10}}>
                  شهر : {branches[selectedBranch].city}
                  </div>

                  <div style={{marginBottom: 10}}>
                  تلفن : {branches[selectedBranch].tel}
                  </div>

                  
                  </>
                  :false
                }

                  </div>
                </div>
              </Modal>
    </Layout>
  );
}

export default BranchMap;

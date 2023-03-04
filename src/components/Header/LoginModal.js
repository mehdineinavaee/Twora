import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

import { FilePicker } from 'react-file-picker';

const initialValues = {
  number: "",
};
const phoneRegExp =
  /(0|\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/;

const validationSchema = yup.object({
  phonenumber: yup
    .string()
    .typeError("شماره موبایل وارد نشده")
    .matches(phoneRegExp, "شماره موبایل صحیح نیست")
    .required("شماره موبایل وارد نشده"),
  code: yup
    .string()
    .min(4, "کد تایید وارد شده باید ۴ رقم باشد")
    .max(4, "کد تایید وارد شده باید ۴ رقم باشد")
    .typeError("کد تایید وارد نشده")
    .required("کد تایید وارد نشده"),
});
function LoginModal({ history, setAuth }) {
  const [codesent, setCodesent] = useState(false);
  const [codeVerified, setCodeverified] = useState(false);
  const [phone, setPhone] = React.useState("");
  const [newUser, setNewUser] = React.useState(null);
  const [newUserCodeVerify, setNewUserCodeVerify] = React.useState(false);

  const [selectedRule, setSelectedRule] = React.useState("عموم");
  const [notOmoom, setNotOmoom] = React.useState(false);
  const [newName, setNewName] = React.useState(null);
  const [newCodeM, setCodeM] = React.useState(null);
  const [file, setFile] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  const fileInput = React.useRef();

  const getUserDetails = async () => {
    //const local = await localStorage.getItem("phone");
    //const phone = JSON.parse(local);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}UserDetail.aspx?phone=${phone}`)
      .then((res) => {
        res.data.map((dat, key) => {
          //console.log(dat);
          if (dat.codeMelli === null)
            setNewUser(true);
          else
            setNewUser(false);
        })
        /* console.log(res.data);
        if (res.data.length == 0)
          setNewUser(true);
        else
          setNewUser(false);
        //setName(res.data[0].name); */
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSubmit = (e) => {
    const body = document.body;
    const el = document.querySelector(".modal-backdrop");
    if (el.classList.contains("show")) {
      el.classList.remove("show");
    }
    if (el.classList.contains("fade")) {
      el.classList.remove("fade");
    }
    if (el.classList.contains("modal-backdrop")) {
      el.classList.remove("modal-backdrop");
    }
    if (el.classList.contains("show")) {
      el.classList.remove("show");
    }
    if (body.classList.contains("modal-open")) {
      body.classList.remove("modal-open");
    }
    window.location.reload();
    // setLoginSuccess(true);
    // setTimeout(() => {
    //   setLoginSuccess(false);
    // }, 2000);
  };

  return (
    <div className="e-autho-model modal fade" id="login">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="modal-inner">
              <div className="row">
                <div className="col-md-12">
                  <div className="modal-inner-box">
                    <div className="autho-model-header text-center">
                      <img
                        src={require("../../assets/images/logo2RaFinal.png")}
                        alt="logo"
                        style={{ height: "80px" }}
                        className="img-fluid"
                      />
                      <h2 className="autho-model-ttl mb-10 mt-10">
                        {
                          newUserCodeVerify ?
                          "ثبت نام"
                          :
                          " ثبت نام یا ورود"
                        }
                       
                      </h2>
                      <p className="autho-model-sttl">
                        {codesent
                          ? "کد تایید ارسال شده را وارد نمایید"
                          : "شماره تلفن همراه خود را وارد نمایید"}
                      </p>
                    </div>
                    <div className="autho-model-filed">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                      >
                        {({
                          values,
                          setFieldValue,
                          errors,
                          touched,
                          setFieldTouched,

                          setFieldError,
                          setTouched,
                        }) => {
                          const submitForm = async () => {

                            //console.log(selectedRule);
                            setLoading(true);

                            if (selectedRule !== null) {
                            
                            if (notOmoom === true)
                            {
                              
                              axios
                                .get(
                                  `https://2raapp.ir/api/SetRoleUser.aspx?phone=${phone}&role=${selectedRule}`,
                                )
                                .then(async res => {
                                  
                                  
                                  if (newName !== null && newCodeM !== null && file !== null) {
                             
                                    axios
                                      .get(
                                        `https://2raapp.ir/api/SetProfile.aspx?phone=${phone}&name=${newName}&email=&city=&state=&codemelli=${newCodeM}&docurl=${file}`,
                                      )
                                      .then(() => {
                                        onSubmit();
                                        setAuth(true);
                                        window.localStorage.setItem("auth", "true");
                                        setCodeverified(true);
                                        setLoading(false);
                                      })
                                      .catch(err => {
                                        console.warn(err);
                                      });
                                      
                                  } else {
                                    alert('لطفا مشخصات خود را وارد کنید');
                                    setLoading(false);
                                  }


                                })
                                .catch(err => {
                                  console.log(err);
                                });
                            
                          
                          } else
                          {
                            if (newName !== null && newCodeM !== null) {
                             
                              axios
                                .get(
                                  `https://2raapp.ir/api/SetProfile.aspx?phone=${phone}&name=${newName}&email=&city=&state=&codemelli=${newCodeM}&docurl=${file}`,
                                )
                                .then(() => {
                                  onSubmit();
                                  setAuth(true);
                                  window.localStorage.setItem("auth", "true");
                                  setCodeverified(true);
                                  setLoading(false);
                                })
                                .catch(err => {
                                  console.warn(err);
                                });
                                
                            } else {
                              alert('لطفا مشخصات خود را وارد کنید');
                              setLoading(false);
                            }
                          }

                        } else {
                          alert('لطفا نوع استفاده خود را مشخص کنید');
                          setLoading(false);
                        }

                            
                          
                         };
                          const handleFileChange = e => {

                            const result = e.target.files[0];
                      
                            let data = new FormData();
                            data.append('', result);

                            setLoading(true);
                      
                            axios
                              .post(
                                /* `https://2raapp.ir/api/UploadCenter.aspx?phone=${"09375802111"}` */
                                `${process.env.REACT_APP_BASE_URL}UploadCenter.aspx?phone=${phone}`,
                                data,
                              )
                              .then(res => {
                                setFile(res.data);
                                setLoading(false);
                                //alert('مدرک با موفقیت اضافه شد');
                                //console.log(res.data);
                              })
                              .catch(err => {
                                console.warn(err);
                              });
                      
                      
                        };
                          const sendCode = () => {
                            setLoading(true);
                            //setCodesent(true);
                            /* axios
                              .get(
                                `${process.env.REACT_APP_BASE_URL}LoginRegister.aspx?phone=${values.phonenumber}`
                              )
                              .then((res) => {
                                setCodesent(true);
                              })
                              .catch((e) => {
                                alert(
                                  "ارسال کد تایید ناموفق بود لطفا دوباره تلاش کنید"
                                );
                                setCodesent(false);
                                console.log(e);
                              }); */
                              

                              //console.log("new user is" + codesent);
                              

                                  axios
                                  .get(
                                    `${process.env.REACT_APP_BASE_URL}LoginRegister.aspx?phone=${values.phonenumber}`
                                  )
                                  .then((res) => {
                                    setCodesent(true);
                                    getUserDetails();
                                    setLoading(false);
                                    setNewUser(null);
                                  })
                                  .catch((e) => {
                                    alert(
                                      "ارسال کد تایید ناموفق بود لطفا دوباره تلاش کنید"
                                    );
                                    setCodesent(false);
                                    setLoading(false);
                                    console.log(e);
                                  });

                          };
                          const verifyCode = () => {
                            setLoading(true);
                            localStorage.setItem(
                              "phone",
                              JSON.stringify(phone)
                            );

                            
                            //setNewUserCodeVerify(true);
                            
                            /* onSubmit();
                                    setAuth(true);
                                    window.localStorage.setItem("auth", "true");
                                    setCodeverified(true); */
                            axios
                              .get(
                                `${process.env.REACT_APP_BASE_URL}VerifySMSCode.aspx?phone=${phone}&smscode=${values.code}`
                              )
                              .then((res) => {
                                if (res.data === "-1") {
                                  alert("بعلت مشکل فنی لطفا دوباره تلاش کنید");
                                } else {
                                  if (res.data === "0") {
                                    setFieldError(
                                      "code",
                                      "کد تایید وارد شده نادرست میباشد"
                                    );
                                    setLoading(false);
                                  } else {
                                    
                                    if (newUser)
                                    {
                                    
                                    setNewUserCodeVerify(true);
                                    
                                    }
                                    if (newUser == false)
                                    {
                                    onSubmit();
                                    setAuth(true);
                                    window.localStorage.setItem("auth", "true");
                                    setCodeverified(true);
                                    }

                                    setLoading(false);
                                  }
                                }
                              })
                              .catch((e) => {
                                console.log(e);
                              });
                          };
                          return (
                            <Form>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="e-form-field mt-20 mb-20">
                                    <label>
                                          {
                                          newUserCodeVerify ?
                                          "کاربر جدید"
                                          :
                                          codesent
                                            ? "کد تایید"
                                            : "شماره موبایل همراه"}
                                        </label>
                                    {codesent ? (
                                      newUserCodeVerify ? (
                                      <>
                                        {/* <input
                                          onChange={(e) =>
                                            setFieldValue(
                                              "code",
                                              e.target.value
                                            )
                                          }
                                          value={values.code}
                                          onBlur={() => setFieldTouched("code")}
                                          className="e-field-inner input-font"
                                          type="number"
                                          name="code"
                                        /> */}

                                      <br/>
                                      <label>
                                        {"انتخاب نقش"}
                                      </label>
                                        
                                        <Field onChange={(e) => {
                                          setSelectedRule(e.target.value)
                                          if (e.target.value === "عموم")
                                            setNotOmoom(false)
                                          else
                                            setNotOmoom(true)
                                          }
                                          } value={selectedRule} as="select" name="color" className="e-field-inner input-font">
                                          <option value="عموم">عموم</option>
                                          <option value="دامپزشک">دامپزشک</option>
                                          <option value="مایه کوبی">مایه کوبی</option>
                                          <option value="دانشجو">دانشجو</option>
                                          <option value="نماینده">نماینده</option>
                                        </Field>
                                        <label>
                                        <br/>
                                          {"نام و نام خانوادگی"}
                                        </label>
                                        <input
                                          onChange={(e) =>
                                            setNewName(
                                              e.target.value
                                            )
                                          }
                                          value={newName}
                                          //onBlur={() => setFieldTouched("code")}
                                          className="e-field-inner input-font"
                                          name="newName"
                                        />
                                        <label>
                                        <br/>
                                          {"کد ملی"}
                                        </label>
                                        <input
                                          onChange={(e) =>
                                            setCodeM(
                                              e.target.value
                                            )
                                          }
                                          value={newCodeM}
                                          //onBlur={() => setFieldTouched("code")}
                                          className="e-field-inner input-font"
                                          type="number"
                                          name="codeM"
                                        />
                                        <br/><br/>
                                        
                                        
                                        {/* <FilePicker
                                        extensions={["pdf"]}
                                        onChange={handleFileChange}
                                        onError={errMsg => console.log(errMsg)} // Please handle error
                                        > */}
                                        {
                                          //selectedRule = "عموم"
                                          notOmoom == false
                                          ?
                                          false
                                          :
                                        <>
                                        <div
                                          style={{ width: "100%" }}
                                          role="button"
                                          onClick={() => 
                                            (fileInput.current.click()
                                            //console.log(values.phonenumber)
                                          )}
                                          
                                          className="e-btn"
                                        >
                                          مدرک
                                        </div>
                                        <input 
                                          ref={fileInput} 
                                          type="file" 
                                          style={{ display: 'none' }} 
                                          onChange={handleFileChange}
                                        />
                                        </>}
                                        {/* <div
                                          role="button"
                                          style={{
                                            margin: "20px 0",
                                            fontSize: "14px",
                                          }}
                                          onClick={() => setCodesent(false)}
                                        >
                                          تغییر شماره تلفن همراه
                                        </div> */}
                                        {/* {errors.code && touched.code && (
                                          <div className="text-danger mt-2">
                                            {errors.code}
                                          </div>
                                        )} */}
                                      </>
                                    
                                      )
                                    :
                                    <>
                                        
                                        <input
                                          onChange={(e) =>
                                            setFieldValue(
                                              "code",
                                              e.target.value
                                            )
                                          }
                                          value={values.code}
                                          onBlur={() => setFieldTouched("code")}
                                          className="e-field-inner input-font"
                                          type="number"
                                          name="code"
                                        />
                                        <div
                                          role="button"
                                          style={{
                                            margin: "20px 0",
                                            fontSize: "14px",
                                          }}
                                          onClick={() => setCodesent(false)}
                                        >
                                          تغییر شماره تلفن همراه
                                        </div>

                                        
                                        {errors.code && touched.code && (
                                          <div className="text-danger mt-2">
                                            {errors.code}
                                          </div>
                                        )}

                                        
                                      </>
                                    ) : (
                                      <>
                                        <input
                                          onChange={(e) => {
                                            setFieldValue(
                                              "phonenumber",
                                              e.target.value
                                            );
                                            setPhone(e.target.value);
                                          }}
                                          value={values.phonenumber}
                                          onBlur={() =>
                                            setFieldTouched("phonenumber")
                                          }
                                          className="e-field-inner input-font"
                                          type="number"
                                          name="phonenumber"
                                        />
                                        {errors.phonenumber &&
                                          touched.phonenumber && (
                                            <div className="text-danger mt-2">
                                              {errors.phonenumber}
                                            </div>
                                          )}
                                      </>
                                    )}
                                  </div>
                                  
                                </div>
                                
                                <div className="col-md-12">
                                  <div
                                    style={{ width: "100%" }}
                                    role="button"
                                    onClick={() => {
                                      
                                      if (!loading){
                                      if (codesent) {
                                        
                                        if (newUserCodeVerify)
                                        {
                                          submitForm();
                                        }
                                        else if (
                                          values.code &&
                                          !errors.code &&
                                          touched.code
                                        ) {
                                          verifyCode();
                                        } else {
                                          alert(
                                            "لطفا کد تایید ارسال شده را وارد کنید ."
                                          );
                                          setLoading(false);
                                        }
                                      } else {
                                        if (
                                          values.phonenumber &&
                                          !errors.phonenumber &&
                                          touched.phonenumber
                                        ) {
                                          sendCode();
                                          setFieldValue("phonenumber", "");
                                          setFieldValue("code", "");
                                          setTouched([
                                            { phonenumber: false },
                                            { code: "false" },
                                          ]);
                                        } else {
                                          alert(errors.phonenumber);
                                        }
                                      }}
                                    }}
                                    className="e-btn"
                                  >
                                    {
                                    loading ?
                                    "لطفا منتظر بمانید ..."
                                    :
                                    newUserCodeVerify ?
                                    "ثبت نام"
                                    :
                                    codesent 
                                    ? 
                                    "ورود" 
                                    : 
                                    "ارسال کد تایید"
                                    }
                                  </div>
                                  
                                </div>
                              </div>
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCodesent(false)}
              type="button"
              className="autho-close"
              data-dismiss="modal"
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginModal);

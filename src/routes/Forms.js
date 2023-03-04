import React from "react";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form } from 'formik';
function Forms({ match }) {
  const formNumber = match.params.formNo;
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  const [file, setFile] = React.useState(null);

  const [selectedForm, setSelectedForm] = React.useState("ثبت سفارش");
  const [phoneNo, setPhoneNo] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [dimensions, setDimensions] = React.useState({ width:0, height: 0 });

  const targetRef = React.useRef();

  const fileInput = React.useRef();

  


  const submitForm = async () => {


          axios
            .get(
              `https://2raapp.ir/api/SetForm.aspx?phone=${phoneNo}&title=${title}&description=${desc}&type=${selectedForm}&email=${email}&fileURL=${file}`,
            )
            .then(async res => {

              alert("درخواست با موفقیت ثبت شد");
              console.log(res);

            })
            .catch(err => {
              console.log(err);
            });

        
      
    };

    const handleFileChange = e => {

      const result = e.target.files[0];

      let data = new FormData();
      data.append('', result);

      setLoading(true);

      axios
        .post(
          /* `https://2raapp.ir/api/UploadCenter.aspx?phone=${"09375802111"}` */
          `${process.env.REACT_APP_BASE_URL}UploadCenter.aspx?phone=${phoneNo}`,
          data,
        )
        .then(res => {
          setFile(res.data);
          setLoading(false);
          alert('مدرک با موفقیت اضافه شد');
          console.log(res.data);
        })
        .catch(err => {
          console.warn(err);
        });


  };


  React.useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);

  React.useEffect(() => {
    
    console.log(formNumber);

    switch (formNumber)
    {
      case "1" :
        setSelectedForm("ثبت سفارش");
        break;
      case "2" :
        setSelectedForm("درخواست همکاری");
        break;
      case "3" :
        setSelectedForm("مشاوره فنی");
        break;
      default :
      setSelectedForm("ثبت سفارش");
        break;
    }

    axios
      .get(`${process.env.REACT_APP_BASE_URL}AboutUs.aspx`)
      .then((res) => {
        setData(res.data[0]);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [formNumber]);
  return (
    <Layout loading={loading} title="فرم ها">
      {/* <!-- Breadcumbs start --> */}
      <div class="e-breadcumb-wrap text-center">
        <h2 class="e-breadcumb-title">فرم ها</h2>
        <ul class="e-breadcumb-kist">
          <li>
            <NavLink to="/">خانه </NavLink>
          </li>
          <li>
            <NavLink to="/forms">فرم ها</NavLink>
          </li>
        </ul>
        <br/>

        <h2>{selectedForm}</h2>
        
      </div>

      
      <div class="text-center" style={{marginTop:-60}}>
    
    
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form >
      <br/>
      <label style={{marginLeft:10, marginRight:15}}>
        {"نوع فرم"}
      </label>
        
        <Field style={{maxWidth: 480, width: "40%"}} onChange={(e) => {
          setSelectedForm(e.target.value)
          /* if (e.target.value === "عموم")
            setNotOmoom(false)
          else
            setNotOmoom(true) */
          }
          } value={selectedForm} as="select" name="color" className="e-field-inner input-font">
          <option value="ثبت سفارش">ثبت سفارش</option>
          <option value="درخواست همکاری">درخواست همکاری</option>
          <option value="مشاوره فنی">مشاوره فنی</option>
        </Field>
        <br/>
        <br/>
        <label style={{marginLeft:10, marginRight:30}} htmlFor="email">ایمیل</label>
        {/* <Field
          id="email"
          name="email"
          placeholder="مثال: علی دایی"
          type="email"
          style={{width:480}}
        /> */}
        <input
        style={{maxWidth: 480, width: "40%"}}
          onChange={(e) =>
          setEmail(e.target.value)
          }
          value={email}
          onBlur={() => {}}
          className="e-field-inner input-font"
          name="code"
        />
        <br/>
        <br/>
        <label style={{marginLeft:10, marginRight:-20}} htmlFor="lastName">شماره موبایل</label>
        {/* <Field id="lastName" style={{width:480}} name="lastName" placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷" /> */}
        <input
        style={{maxWidth: 480, width: "40%"}}
          onChange={(e) =>
            setPhoneNo(e.target.value)
          }
          value={phoneNo}
          onBlur={() => {}}
          className="e-field-inner input-font"
          name="code"
        />
        <br/>
        <br/>
        <label style={{marginLeft:10, marginRight:30}} htmlFor="lastName">عنوان</label>
        {/* <Field id="lastName" style={{width:480}} name="lastName" placeholder="مثال: درخواست خرید دارو" /> */}
        <input
        style={{maxWidth: 480, width: "40%"}}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          value={title}
          onBlur={() => {}}
          className="e-field-inner input-font"
          name="code"
        />
        
        <br/>
        <br/>

        {/* <div style={{flexDirection: "row",}}> */}
        
        
        <br/>
        {/* <Field  component="textarea" rows="8" style={{width:480, marginRight:80, marginTop:-30}} id="firstName" name="firstName" placeholder="توضیحات مورد نظر خود را وارد کنید" />
          */}       {/* </div> */}
        {/* <input
          
          rows="5"
          onChange={(e) =>
          {}
          }
          /* value={values.code} *
          onBlur={() => {}}
          className="e-field-inner input-font"
          name="code"
        /> */}
        <div style={{marginTop: -10}} ref={targetRef}>
        <label style={dimensions.width > 1200 ? {marginRight: -490}:{marginRight: "-42%"}} htmlFor="desc">توضیحات</label>
        </div>
        <textarea 
        onChange={(e) =>
          setDesc(e.target.value)
          }
        style={{maxWidth: 480, width: "40%", height:200, marginRight:80, marginTop:-40}}
        name="textarea" className="e-field-inner input-font"
        value={desc}>
          
        </textarea>
        <br/>
        <br/>
        {/* <button type="submit">ثبت</button> */}
        <div className="col-md-12">
        <div
          style={{ width: "15%", marginBottom: 20 }}
          role="button"
          onClick={() => 
            (fileInput.current.click()
            //console.log(values.phonenumber)
          )}
          
          className="e-btn"
        >
          ارسال فایل
        </div>
        <input 
            ref={fileInput} 
            type="file" 
            style={{ display: 'none' }} 
            onChange={handleFileChange}
          />
        </div>
        
        <div className="col-md-12">
        
        <div
          style={{ width: "15%", marginBottom: 20 }}
          onClick={submitForm}
          role="button"
          className="e-btn"
          >
            ثبت
          </div>
        </div>
      </Form>
    </Formik>
    </div>
  

    </Layout>
  );
}

export default Forms;

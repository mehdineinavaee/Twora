import React from "react";
import Layout from "../components/Layout/Layout";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { setTotalPrice, setPrevPrice, clearCart } from "../redux/action";
import LoginModal from "../components/Header/LoginModal";

import discountIcon from "../assets/images/index1/svg/discount_Per.svg";



function Shipping({
  totalPrice,
  cartItems,
  history,
  setTotalPrice,
  setPrevPrice,
  location,
  clearCart,
}) {
  const [loading, setLoading] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [addresses, setAddresses] = React.useState([]);
  const [desc, setDesc] = React.useState("توضیحات");
  const [basketID, setBasketID] = React.useState("");
  const [discountPrice, setDiscountPrice] = React.useState("");
  const [isDiscount, setIsDiscount] = React.useState(false);
  //const [sendingPrice, setSendingPrice] = React.useState(0);
  const [discountCode, setDiscountCode] = React.useState("");
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const [disPrice, setDisprice] = React.useState("");
  const [isDis, setIsDis] = React.useState(false);

  const [deliverToMe, setDeliverToMe] = React.useState(true);
  const [delName, setDelName] = React.useState("");
  const [delCodeM, setDelCodeM] = React.useState("");
  const [delNum, setDelNum] = React.useState("");

  const [haveDisCode, setHaveDisCode] = React.useState(false);

  const [needInvoice, setNeedInvoice] = React.useState(true);

  const getAddresses = async () => {
    const localPhone = await localStorage.getItem("phone");
    const parsedPhone = JSON.parse(localPhone);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}Address.aspx?phone=${parsedPhone}`
      )
      .then((res) => {
        setAddresses(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  const addBasketDetail = async (id) => {
    const localPhone = await localStorage.getItem("phone");
    const parsedPhone = JSON.parse(localPhone);
    return await Promise.all(
      cartItems.map(async (each) => {

        //console.warn()
        try {
          return await axios.get(
            `${process.env.REACT_APP_BASE_URL}SetBasketDetail.aspx?phone=${parsedPhone}
            &basketID=${id}&productID=${each.id}&count=${each.quantity}&sizeID=${each.size.id}
            &colorID=${each.color.id}&description=${desc}`
          );
        } catch (err) {
          alert("لطفا دوباره تلاش کنید");
          console.log(err);
        }
      })
    );
  };

  const applyCode = () => {
    let k;
    
    if (discountCode) {
      k = JSON.parse(discountCode);
    } else {
      k = 0;
    }
    
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}CheckDiscount.aspx?code=${k}`
      )
      .then((res) => {
        
        let resposeCode = JSON.parse(res.data.split(" ")[0]);
        let percentage = JSON.parse(res.data.split(" ")[2]);

        //console.warn(res.data.split(" ")[0]);
        //console.warn(percentage);

        if (resposeCode === -1 || resposeCode === 0) {
          alert("کد تخفیف وارد شده صحیح نمیباشد");
        } else {

          //console.warn(res.data);

          //setTotalPrice(res.data);
          alert("کد تخفیف اعمال شد");
          setIsDiscount(true);

          let actualDiscount = 100 - percentage;

          let priceAfterDis = (totalPrice/100) * actualDiscount;

          //console.warn(priceAfterDis);


          /* const price = totalPrice;
          const parsedPercentage = JSON.parse(percentage);
          const percent = `${(price / 100) * parsedPercentage}0`;

          const eeee = (price / 100) * parsedPercentage;
          const newPrice = price - eeee;
          const k = JSON.parse(percent); */

          //setDisprice(`${totalPrice - priceAfterDis}`);

          setDiscountPrice(priceAfterDis);

          //console.warn(priceAfterDis);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const checkAuth = async () => {
    const localAuth = await localStorage.getItem("auth");
    if (localAuth === "true") {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  const setBasket = async () => {
    setLoading(true);
    const localPhone = await localStorage.getItem("phone");
    const parsedPhone = JSON.parse(localPhone);
    const dCode = discountCode === "" ? 0 : discountCode;
    
    let kl;
    
    if ( totalPrice === 0)
    {
      kl = 0;
    }
    else
    {
    
    const p = `${totalPrice}0`;
    kl = JSON.parse(p);

    }

    const u = discountPrice;

    //console.log(kl);
    
    

    let y;
    if (isDiscount) {
      y = JSON.parse(`${u}0`);
    } else {
      y = kl;
    }
    //console.log("YYYYYYY");
    //console.log(y);

    /* axios
      .get(`${process.env.REACT_APP_BASE_URL}ShippingAmount.aspx`)
      .then((hh) => {
        let sendingPrice;
        const freeShipping = JSON.parse(hh.data[0].freeAmount) <= totalPrice;
        if (!freeShipping) {
          sendingPrice = JSON.parse(hh.data[0].shippingAmount);
        } else {
          sendingPrice = 0;
        }
        setSendingPrice(sendingPrice); */
        //setSendingPrice(20000);



        /* console.warn(y);
        console.warn(kl);
        console.warn(dCode);
        console.warn(isDiscount); */



        axios
          .get(
            `${
              process.env.REACT_APP_BASE_URL
            }SetBasket.aspx?phone=${parsedPhone}&addressid=${
              selectedAddress && selectedAddress.id
            }&Discountedprice=${y}&basketPrice=${kl}&discountedCode=${dCode}
            &isdiscounted=${isDiscount}&isinvoice=${needInvoice}&
            &transfereeCodeMelli=${delCodeM}&transfereeName=${delName}&transfereeTel=${delNum}`
          )
          .then((basketRes) => {
            setBasketID(basketRes.data)
            /* addBasketDetail(basketRes.data) */
            //.then(() => {
              

              let baskIDspc = basketRes.data.split("=");
              let baskID = baskIDspc[1].split(" ");
              //console.warn(basketRes.data);
              //console.warn(baskID[1]);

              

              cartItems.map((item, key) => {
                
                //console.warn(basketRes.data);
                //console.warn(parseInt(basketRes.data));
                //console.warn(item.id);

                let totalDP = item.quantity*item.priceTakhfif;

                //console.warn(basketRes.data[0]);
                //console.log(item.color)

                if (basketRes.data[0] == 1)
                {
                axios
                /* .get(
                  `${process.env.REACT_APP_BASE_URL}SetFactor.aspx?phone=${parsedPhone}&basketid=${36}
                  &count=${item.quantity}&productid=${item.id}&totalDiscountedprice=4800&totalPrice=5000&doseid=1
                  basketID=${basketRes.data}`
                ) */
                .get(
                  `${process.env.REACT_APP_BASE_URL}SetFactor.aspx?phone=${parsedPhone}
                  &basketid=${parseInt(baskID[1])}
                  &count=${item.quantity}&productid=${item.id}&totalDiscountedprice=${item.quantity*item.priceTakhfif}
                  &totalPrice=${item.quantity*item.priceTakhfif}&doseid=${item.color}`
                )
                .then((res) => {
                  /* if (res.data === "0" || res.data === "-1") {
                    alert("لطفا دوباره تلاش کنید");
                  } else if (res.data === "1") { */
                  
                    //console.warn(res.data);

                    if (key+1 == cartItems.length)
                      { 
                        if (kl === 0)
                          {
                            alert("سفارش ثبت شد، با شما تماس گرفته خواهد شد");
                            
                          }
                        else
                          {

                            //console.warn("hello" + basketRes.data.split(" ")[2]);
                            //console.warn(kl);
                          
                          //const u = `${totalPrice}0`;
                          //const ww = JSON.parse(u);

                          window
                            .open(
                              `${process.env.REACT_APP_BASE_URL}Pardakht.aspx?basketid=${basketRes.data.split(" ")[2]}&amount=${y}`,
                              "_blank"
                            )
                            .focus();
                        }

                          clearCart();

                        setLoading(false);
                      }
                  /* } else {
                    alert(
                      "موجودی برخی از کالا ها تغییر کرده و از سبد خرید شما حذف خواهند شد"
                    ); */
                  
                })
                .catch((e) => {
                  console.log(e);
                });
                }

              })

              /* //description=${desc}&shippingAmount=${10000} */

              /* const u = `${totalPrice /* + sendingPrice *}0`;
                    const ww = JSON.parse(u);

                    window
                      .open(
                        `${process.env.REACT_APP_BASE_URL}Pardakht.aspx?basketid=${basketRes.data}&amount=${ww}`,
                        "_blank"
                      )
                      .focus();
                    clearCart(); */

              
            //}
            //);



            
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
      /* }); */
  };

  /* const getSendPrice = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}ShippingAmount.aspx`)
      .then((res) => {
        let sendingPrice;
        const freeShipping = JSON.parse(res.data[0].freeAmount) <= totalPrice;
        if (!freeShipping) {
          sendingPrice = JSON.parse(res.data[0].shippingAmount);
        } else {
          sendingPrice = 0;
        }
        setSendingPrice(sendingPrice);
      })
      .catch((e) => {
        console.log(e);
      });
  }; */

  const setDelDetails = async (values) => {
    const localPhone = await localStorage.getItem("phone");
    const phone = JSON.parse(localPhone);
    
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}UserDetail.aspx?phone=${phone}`
          )
          .then((r) => {
            //console.warn(r);
            setDelName(r.data[0].name);
            setDelCodeM(r.data[0].codeMelli);
            setDelNum(phone);
          });
      
  };

  const refillDelData = (e) => {
    
    if (e.target.checked)
    {
      setDelDetails();
      setDeliverToMe(true);
      
    }
    else
    {
      setDelName("");
      setDelNum("");
      setDelCodeM("");
      setDeliverToMe(false);
    }
  }

  React.useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setPrevPrice();
    }
    setDelDetails();
    //getSendPrice();
    //setSendingPrice(20000);
    checkAuth();
    getAddresses();
  }, [location]);

  return (
    <Layout loading={loading} title="پرداخت">
      {/* <!-- Breadcumbs start --> */}
      <div className="e-breadcumb-wrap text-center">
        <h2 className="e-breadcumb-title">بررسی و پرداخت</h2>
        <ul className="e-breadcumb-kist">
          <li>
            <NavLink to="/">خانه </NavLink>
          </li>
          <li>
            <NavLink to="/cart">سبد خرید </NavLink>
          </li>
          <li>
            <NavLink to="/shipping">بررسی و پرداخت</NavLink>
          </li>
        </ul>
      </div>
      {/* <!-- Product Category start --> */}

      {auth ? (
        <>
          {cartItems.length > 0 ? (
            <section className="e-checkout-wrap">
              <div className="container">
                <div className="row">
                  <div className="col-xl-9 col-lg-12">
                    <div className="e-checkout-sec mb-80">
                      <div className="cmn-ck-wrap mb-30">
                        <div className="cmn-ck-header">
                          <h2 className="cmn-ck-heading">بررسی و پرداخت </h2>
                        </div>
                        <div className="cmn-ck-body">
                          <div className="cmn-ck-box mb-20">
                            <div className="d-flex">
                              <h4 className="cmn-brdr-ttle mb-20">
                                کالاهای سبد شما
                              </h4>
                              <div>
                                <NavLink
                                  to="/cart"
                                  style={{
                                    color: "#999",
                                    fontSize: "13px",
                                    marginRight: "10px",
                                  }}
                                >
                                  ویرایش
                                </NavLink>
                              </div>
                            </div>
                            <div className="row">
                              {cartItems.length > 0 &&
                                cartItems.map((c) => {
                                  return (
                                    <div key={c.id} className="col-md-3">
                                      <div className="e-form-field mb-30">
                                        <div>
                                          <NavLink to={`/product/${c.id}`}>
                                            <img
                                              style={{
                                                width: "200px",
                                                height: "200px",
                                              }}
                                              className="img-fluid"
                                              src={c.image}
                                            />
                                          </NavLink>
                                        </div>
                                        <NavLink to={`/product/${c.id}`}>
                                          <div
                                            style={{
                                              fontWeight: 500,
                                              color: "#60babe",
                                              fontSize: "16px",
                                              margin: ".7em 0",
                                            }}
                                          >
                                            {c.title}
                                          </div>
                                        </NavLink>
                                        <div style={{ fontSize: "13px" }}>
                                          {JSON.parse(
                                            c.priceTakhfif
                                          ).toLocaleString("fa-IR")}{" "}
                                          تومان
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "13px",
                                            marginTop: "10px",
                                          }}
                                          className="d-flex"
                                        >
                                          {/* <div style={{paddingLeft: 10}}>تعداد : </div> */}
                                          <div style={{paddingLeft: 5}}>
                                            {c.quantity.toLocaleString("fa-IR")}
                                            
                                          </div>
                                          <div >
                                            {c.unit}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          <div className="cmn-ck-box mb-20">
                            <div className="d-flex">
                              <h4 className="cmn-brdr-ttle mb-20">
                                انتخاب آدرس
                              </h4>

                              <div
                                style={{
                                  marginRight: "10px",
                                  fontSize: "13px",
                                  marginTop: "5px",
                                }}
                              >
                                <NavLink
                                  style={{ color: "#999" }}
                                  to="/profile"
                                >
                                  افزودن آدرس
                                </NavLink>
                              </div>
                            </div>
                            <div className="row">
                            {
                              //console.warn(addresses)
                            }
                              {addresses.length > 0 ? (
                                addresses.map((ad) => {
                                  return (
                                    <div
                                      onClick={() => setSelectedAddress(ad)}
                                      style={{
                                        border:
                                          selectedAddress === ad
                                            ? "2px solid #60babe"
                                            : "1px solid #ccc",
                                        borderRadius: "10px",
                                        marginTop: "20px",
                                        position: "relative",
                                        marginRight: "10px",
                                      }}
                                      key={ad.id}
                                      className="col-lg-3 col-md-3 col-12"
                                    >
                                      {selectedAddress === ad && (
                                        <div
                                          style={{
                                            position: "absolute",
                                            top: 20,
                                            left: 20,
                                          }}
                                        >
                                          <svg
                                            style={{ width: "22px" }}
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm4.71,7.71-5,5a1,1,0,0,1-1.42,0l-2-2a1,1,0,0,1,1.42-1.42L11,12.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z"
                                              fill={"#09acb5"}
                                            />
                                          </svg>
                                        </div>
                                      )}
                                      <div className="e-form-field mb-30">
                                        <div>
                                          <div style={{ margin: "5px" }}>
                                            <div className="row">
                                              <div className="col-12">
                                                <div
                                                  style={{ marginTop: "20px" }}
                                                >
                                                  {" "}
                                                  <svg
                                                    enableBackground="new 0 0 30 30"
                                                    style={{
                                                      width: "22px",
                                                      marginLeft: "10px",
                                                      cursor: "default",
                                                    }}
                                                    viewBox="0 0 30 30"
                                                  >
                                                    <path
                                                      d="M15.1,0.3c-6,0-10,4-10,9.8c0,7.8,7.2,17.5,9.1,19.4c0.1,0.1,0.3,0.2,0.5,0.2c0,0,0,0,0,0  c0.2,0,0.4-0.1,0.5-0.3c1-1.1,9.6-11.1,9.6-19.3C24.9,3.3,20,0.3,15.1,0.3z M14.7,27.8c-2.3-2.7-8.1-11.1-8.1-17.7  c0-5.1,3.3-8.3,8.5-8.3c3.8,0,8.3,2.2,8.3,8.3C23.4,16,18.2,23.8,14.7,27.8z M15,6.1c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4s4-1.8,4-4  C19,7.9,17.2,6.1,15,6.1z M15,12.6c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5C17.5,11.5,16.4,12.6,15,12.6z"
                                                      fill="#7d8fb3"
                                                    />
                                                  </svg>
                                                  {ad.title}{" "}
                                                </div>
                                                <div
                                                  style={{ marginTop: "20px" }}
                                                >
                                                  {" "}
                                                  <svg
                                                    style={{
                                                      width: "22px",
                                                      marginLeft: "10px",
                                                      cursor: "default",
                                                    }}
                                                    fill={"#7d8fb3"}
                                                    viewBox="0 0 16 16"
                                                  >
                                                    <path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />
                                                    <path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />
                                                  </svg>{" "}
                                                  {/* {parseInt(
                                                    ad.address1
                                                  ).toLocaleString("fa-IR", {
                                                    useGrouping: false,
                                                  })} */}
                                                  {ad.address1}
                                                  {" "}
                                                </div>
                                                {/* <div
                                                  style={{ marginTop: "20px" }}
                                                >
                                                  {" "}
                                                  <svg
                                                    style={{
                                                      width: "22px",
                                                      marginLeft: "10px",
                                                      cursor: "default",
                                                    }}
                                                    fill={"#7d8fb3"}
                                                    viewBox="0 0 512 512"
                                                  >
                                                    <g>
                                                      <path d="M348.73,450.06a198.63,198.63,0,0,1-46.4-5.85c-52.43-12.65-106.42-44.74-152-90.36s-77.71-99.62-90.36-152C46.65,146.75,56.15,99.61,86.69,69.07l8.72-8.72a42.2,42.2,0,0,1,59.62,0l50.11,50.1a42.18,42.18,0,0,1,0,59.62l-29.6,29.59c14.19,24.9,33.49,49.82,56.3,72.63s47.75,42.12,72.64,56.31L334.07,299a42.15,42.15,0,0,1,59.62,0l50.1,50.1a42.16,42.16,0,0,1,0,59.61l-8.73,8.72C413.53,439,383.73,450.06,348.73,450.06ZM125.22,78a12,12,0,0,0-8.59,3.56l-8.73,8.72c-22.87,22.87-29.55,60-18.81,104.49,11.37,47.13,40.64,96.1,82.41,137.86s90.73,71,137.87,82.41c44.5,10.74,81.61,4.06,104.48-18.81l8.72-8.72a12.16,12.16,0,0,0,0-17.19l-50.09-50.1a12.16,12.16,0,0,0-17.19,0l-37.51,37.51a15,15,0,0,1-17.5,2.72c-30.75-15.9-61.75-39.05-89.65-66.95s-51-58.88-66.94-89.63a15,15,0,0,1,2.71-17.5l37.52-37.51a12.16,12.16,0,0,0,0-17.19l-50.1-50.11A12.07,12.07,0,0,0,125.22,78Z" />
                                                      <path d="M364.75,269.73a15,15,0,0,1-15-15,99.37,99.37,0,0,0-99.25-99.26,15,15,0,0,1,0-30c71.27,0,129.25,58,129.25,129.26A15,15,0,0,1,364.75,269.73Z" />
                                                      <path d="M428.15,269.73a15,15,0,0,1-15-15c0-89.69-73-162.66-162.65-162.66a15,15,0,0,1,0-30c106.23,0,192.65,86.43,192.65,192.66A15,15,0,0,1,428.15,269.73Z" />
                                                    </g>
                                                  </svg>
                                                  ۰
                                                  {parseInt(
                                                    ad.title
                                                  ).toLocaleString("fa-IR", {
                                                    useGrouping: false,
                                                  })}
                                                </div> */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <div
                                  style={{
                                    marginRight: 20,
                                  }}
                                >
                                  <div>آدرسی ثبت نشده</div>
                                </div>
                              )}
                            </div>
                          </div>
                          {/* <div className="cmn-ck-box mb-20">
                            <h4 className="cmn-brdr-ttle mb-20">توضیحات</h4>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="e-form-field mb-30">
                                  <textarea
                                    className="e-field-inner require input-font"
                                    onChange={(e) => setDesc(e.target.value)}
                                    placeholder="توضیحات"
                                    value={desc}
                                  />
                                </div>
                              </div>
                            </div>
                          </div> */}
                            <div className="row">
                              <div
                                style={{ marginTop: "10px" }}
                                className="col-12"
                              >
                                <input type="checkbox" id="scales" name="scales" checked={haveDisCode} onChange={()=>setHaveDisCode(!haveDisCode)}/>
                                <label style={{marginRight: 10}} for="scales">کد تخفیف دارید ؟</label>

                                {
                                  haveDisCode ?

                                
                                <ul className="shopcart-dis-list">
                                  
                                  <li>
                                  <br/>
                                    <div className="sc-dcinput">
                                      <div className="sc-diswrap">
                                        <img
                                          src={discountIcon}
                                          alt="icon"
                                        />
                                        <span>کد تخفیف</span>
                                      </div>
                                      <div className="sc-disinputwrap">
                                        <form>
                                          <div className="e-nl-box boreder">
                                            <input
                                              value={discountCode}
                                              onChange={(e) =>
                                                setDiscountCode(e.target.value)
                                              }
                                              type="number"
                                              className="input-font"
                                              style={{ width: "100%" }}
                                              placeholder="کد تخفیف را وارد کنید"
                                            />
                                            <div
                                              onClick={() => {
                                                if (!discountCode) {
                                                  alert("کد تخفیف وارد نشده");
                                                } else {
                                                  if (isDiscount) {
                                                    alert("کد تخفیف اعمال شده");
                                                  } else {
                                                    applyCode();
                                                  }
                                                }
                                              }}
                                              role="button"
                                              className="e-btn newsletter-btn"
                                            >
                                              اعمال کد تخفیف{" "}
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </li>
                                </ul>

                                : false
                              }
                              </div>                             
                            </div>

                          
                          <br/>
                          <br/>
                                              
                              <p>
                                
                              </p>
                              <div style={{marginTop: -20}}>
                                <input type="checkbox" id="scales" name="scales" checked={deliverToMe} onChange={refillDelData}/>
                                <label style={{marginRight: 10}} for="scales">تحویل گیرنده خودم هستم</label>

                                {
                                  deliverToMe ?
                                  false:
                                  <div>
                                  <div className="sc-diswrap">
                                  <br/>
                                        <span>مشخصات تحویل گیرنده</span>
                                        
                                      </div>
                                      <br/>
                                  <div className="e-nl-box boreder">
                                    <input
                                      value={delName}
                                      onChange={(e) =>
                                        setDelName(e.target.value)
                                      }
                                      className="input-font"
                                      style={{ width: "100%", marginLeft: 5 }}
                                      placeholder="نام و نام خانوادگی"
                                    />

                                    <input
                                      value={delCodeM}
                                      onChange={(e) =>
                                        setDelCodeM(e.target.value)
                                      }
                                      type="number"
                                      className="input-font"
                                      style={{ width: "100%", marginLeft: 5 }}
                                      placeholder="کد ملی"
                                    />

                                    <input
                                      value={delNum}
                                      onChange={(e) =>
                                        setDelNum(e.target.value)
                                      }
                                      type="number"
                                      className="input-font"
                                      style={{ width: "100%" }}
                                      placeholder="شماره تماس"
                                    />
                                    
                                  </div>
                                  </div>
                                }
                              </div>

                              <br/>
                              
                              <input type="checkbox" id="scales" name="scales" checked={needInvoice} onChange={()=>setNeedInvoice(!needInvoice)}/>
                                <label style={{marginRight: 10}} for="scales">صدور فاکتور</label>
                        </div>
                        
                      </div>
                      <div
                        role="button"
                        onClick={() => {
                          //setSelectedAddress("aaa");
                          if (!selectedAddress) {
                            alert("آدرس انتخاب نشده");
                          } else {
                            
                            setBasket();
                          }
                        }}
                        className="e-btn"
                      >
                        پرداخت صورتحساب{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-12">
                    <div className="e-shopcart-sidebar mb-80">
                      <div className="e-totalsumry mb-30">
                        <div className="e-totalsumry-header">
                          <h2 className="e-totalsumry-ttl">
                            خلاصه مجموع سبد خرید
                          </h2>
                        </div>
                        <div className="e-totalsumry-body">
                          <ul className="e-totalsumry-list">
                            <li>
                              <span className="ts-list-head">مجموع سبد:</span>
                              <span className="ts-list-shead">
                                {totalPrice.toLocaleString("fa-IR")} تومان
                              </span>
                            </li>
                            {/* <li>
                              <span className="ts-list-head">هزینه ارسال:</span>
                              <span className="ts-list-shead">
                                {sendingPrice === 0
                                  ? "رایگان"
                                  : sendingPrice.toLocaleString("fa-IR")}{" "}
                                {sendingPrice !== 0 && "تومان"}
                              </span>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div style={{ padding: "4em 0" }} className="text-center">
              سبد خرید شما خالیست
            </div>
          )}
        </>
      ) : (
        <>
          <LoginModal />
          <div className="text-center" style={{ padding: "10em 0" }}>
            <div style={{ fontSize: "1.3em" }}>
              لطفا ابتدا ثبت نام و یا به حساب کاربری خود وارد شوید .
            </div>
            <div className="d-flex justify-content-center">
              <div
                style={{ marginTop: "2em" }}
                data-toggle="modal"
                data-target="#login"
                className="d-flex topmenu-item e-btn light"
              >
                ثبت نام یا ورود
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

const mapState = (state) => {
  return {
    totalPrice: state.totalPrice,
    cartItems: state.cartItems,
  };
};
const mapDis = (dispatch) => {
  return {
    setTotalPrice: (price) => dispatch(setTotalPrice(price)),
    setPrevPrice: () => dispatch(setPrevPrice()),
    clearCart: () => dispatch(clearCart()),
  };
};
export default connect(mapState, mapDis)(withRouter(Shipping));

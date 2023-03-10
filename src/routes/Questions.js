import React from "react";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";
function Questions() {
  return (
    <Layout loading={false} title="سوالات متداول">
      {/* <!-- Breadcumbs start --> */}
      <div className="e-breadcumb-wrap text-center">
        <h2 className="e-breadcumb-title">سوالات متداول</h2>
        <ul className="e-breadcumb-kist">
          <li>
            <NavLink to="/">خانه </NavLink>
          </li>
          <li>
            <NavLink to="/questions">سوالات متداول</NavLink>
          </li>
        </ul>
      </div>
      {/* <!-- شرایط و ضوابط start --> */}

      <div style={{ paddingBottom: "100px" }} className="e-privacy-wrap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                1- به چه دلیل سایت بازارکده را برای خرید انتخاب کنم؟
              </h2>
              <p className="mt-10">
                بازارکده علاوه بر فروش کالاهایی که به آسودگی در اختیار عموم قرار
                دارد ، اقدام به ایجاد بخش سفارشی ، برای فروش کالاهایی که تنها در
                لحظه و مخصوص سفارش دهنده ساخته می شود کرده است و علاوه بر آن
                اقدام به فروش محصولات برند های معتبر سراسر دنیا با ضمانت ، اصالت
                و سلامت کالا پس از سفارش گیری از کشور های همسایه کرده است که
                بازارکده را با دیگر فروشگاه های آنلاین متمایز کرده.
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                2- چگونه به مجموعه شما اعتماد کنم؟
              </h2>
              <p className="mt-10">
                وجود نماد الکترونیک در سایت بازارکده و اخذ پروانه ی کسب و کار
                های مجازی و ثبت در ستاد ساماندهی میتواند اعتبار ما را در نگاه
                شما مخاطبان عزیز تضمین کند.{" "}
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                3- آیا پس از خرید از سایت ، پشتیبانی انجام میشود؟
              </h2>
              <p className="mt-10">
                بله. شما در مرحله ی قبل از خرید ، هنگام خرید و پس از خرید
                میتوانید با ما در تماس بوده و از پشتیبانی ما بهره مند شوید.{" "}
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                4- نماد اعتماد الکترونیکی که در سایت نمایش داده شده است به چه
                معناست؟
              </h2>
              <p className="mt-10">
                این نماد توسط مرکز توسعه تجارت الکترونیک ارائه می شود و کاربران
                می توانند با کلیک بر روی آن به اطلاعاتی درباره وب سایت و مالک آن
                به دست آورند. وب سایت هایی که دارای این نماد هستند وظیفه دارند
                به شکایات و مشکلات مشتریان خود نسبت به خرید آنلاین رسیدگی کنند.{" "}
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                5- چگونه میتوان از سایت بازارکده خرید کرد؟{" "}
              </h2>
              <p className="mt-10">
                برای خرید از مجموعه ی بازارکده ابتدا وارد حساب کاربری خود شوید و
                در صفحه ی اصلی در قسمت سرچ ، محصول خود را بیابید و در صورت تمایل
                بر روی محصول کلیک کرده و گزینه ی افزودن به سبد خرید را انتخاب
                نمایید. در این صورت کالا در سبد خرید شما ثبت شده و در ادامه در
                صفحه ی اصلی فروشگاه قسمت بالا سمت چپ بر روی سبد خرید کلیک کنید و
                پس از تایید و ثبت سفارش ، گزینه ی پرداخت نهایی را انتخاب نموده و
                کالای خود را تهیه کنید.{" "}
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                6- در صورت عدم وجود محصول چه مدت زمانی طول میکشد تا مبلغ
                برگردانده شود؟{" "}
              </h2>
              <p className="mt-10">
                هنگامی که کالایی ناموجود باشد ، پس از کارشناسی و تأیید واحد
                خدمات پس از فروش، هماهنگی های لازم برای استرداد مبلغ سفارش با
                مشتری به عمل آمده و در مدت 24 و یا 48 ساعت پس از آن مبلغ سفارش
                به حساب مشتری واریز خواهد شد.{" "}
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                7- به طور معمول چه اندازه زمان میبرد که محصول به دست مشتری برسد؟
              </h2>
              <p className="mt-10">
                مجموعه ی بازارکده سه روش ارسال دارد. در صورتی که تهران هستید
                میتوانید روش ارسال با پیک را انتخاب کنید که 2 تا 3 روز زمان
                میبرد. در غیر این صورت اگر تحویل فوری را انتخاب کنید این زمان به
                1 روز کاری تغییر میابد و اگر روش پست پیشتاز را انتخاب کنید مدت 5
                تا 7 روز زمان میبرد تا محصول به دست شما برسد .(این مورد برای
                شهرستان استفاده میشود){" "}
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                8- آیا درگاه بانکی مجموعه ی بازارکده امن است؟{" "}
              </h2>
              <p className="mt-10">
                بله برای فراهم کردن امنیت کامل شما، ما هیچ گونه اطلاعاتی که
                مربوط به حساب بانکی یا شماره کارت شما باشد را ذخیره نمیکنیم .
                سیستم پرداخت توسط وب سایت بانک انجام میشود و ایجاد ارتباط با این
                سایت به شیوه امن میباشد.{" "}
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                9- در صورت عدم رضایت از محصول امکان مرجوع کردن آن وجود دارد؟{" "}
              </h2>
              <p className="mt-10">
                تا پیش از تایید نهایی سفارش و کلیک روی آیکون اتمام خرید شما
                میتوانید سفارش را از سبد خرید خود حذف و یا اصلاح کنید. اما در
                مرحله ی پس از پرداخت و رسیدن محصول به دستتان ، در صورت وجود مشکل
                در محصول میتوانید با واحد پیگیری سفارشات تماس حاصل فرمایید در
                غیر این صورت ، امکان مرجوع کردن محصول وجود ندارد.{" "}
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                10- برای همکاری با مجموعه ی بازارکده چگونه باید اقدام کنم؟
              </h2>
              <p className="mt-10">
                ابتدا وارد سایت بازارکده شده ، سپس به پایین صفحه و بخش فوتر رفته
                و قسمت همکاری با ما را انتخاب کرده و پس از تکمیل اطلاعات منتظر
                بمانید تا در صورت تایید با شما تماس بگیریم.{" "}
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                11- چگونه میتوانم از وضعیت سفارش خود آگاه شوم؟{" "}
              </h2>
              <p className="mt-10">
                با توجه به پیام های ارسال شده از سمت مجموعه ی بازارکده میتوانید
                از وضعیت سفارش خود با خبر شوید. همچنین اگر نیاز به راهنمایی
                بیشتری دارید میتوانید با واحد پشتیبانی تماس بگیرید.{" "}
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                12- آیا میتوان به اطلاعات سفارش قبلی دسترسی داشت؟{" "}
              </h2>
              <p className="mt-10">
                بله. هنگامی که وارد فروشگاه میشوید ، در قسمت حساب کاربری خود در
                بخش سفارشات ، تمامی سفارشات ثبت شده را میتوانید مشاهده کنید.{" "}
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                13- مزیت خرید اینترنتی به خرید حضوری چیست؟{" "}
              </h2>
              <p className="mt-10">
                خرید اینترنتی باعث صرفه جویی در وقت و هزینه های مشتری می شود، در
                این روش خرید، مشتری علاوه بر دسترسی دقیق و کامل به اطلاعات
                محصولات و خدمات، می تواند در هر ساعتی از شبانه روز و با مشاوره
                دوستان و اعضای خانواده، خریدی آرام و مطمئن را تجربه کند و به جهت
                عدم تحمیل بسیاری از هزینه های فروش به فروشنده، عموما خرید ارزانی
                را صورت می دهد{" "}
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                14- آیا میتوان برای شخص دیگری خرید کرد و سفارش به دست او برسد؟{" "}
              </h2>
              <p className="mt-10">
                بله، شما می توانید پس از انتخاب محصول و افزودن آن به سبد خرید ،
                در مرحله ی « انتخاب آدرس» ، آدرسی غیر از محل زندگی خود را وارد
                کنید که در این صورت محصول به هر آدرسی که مایلید ارسال میشود.
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                15- از چه روش هایی میتوانم برای پرداخت استفاده کنم؟{" "}
              </h2>
              <p className="mt-10">
                پرداخت اینترنتی تنها روش پرداخت برای ما محسوب میشود اما اگر
                تعداد محصولات زیاد باشد با هماهنگی ، امکان پرداخت درب منزل
                برایتان فراهم میشود.
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                16- آیا میتوانم مبلغ محصول را به صورت اقساطی پرداخت کنم؟
              </h2>
              <p className="mt-10">
                خیر. امکان پرداخت اقساطی در فروشگاه اینترنتی بازارکده وجود
                ندارد.
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                17- آیا محصولات شما دارای گارانتی هستند؟
              </h2>
              <p className="mt-10">
                بله.تمام محصولات مجموعه از نظر کیفیت و سلامت کالا دارای گارانتی
                می باشند. و در صورت عدم سالم بودن کالا امکان برگشت کالا وجود
                دارد.
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                18- در صورت عدم حضور در آدرس اعلام شده ، هماهنگی بعدی به چه صورت
                انجام می گیرد؟
              </h2>
              <p className="mt-10">
                می بایست با تماس از طریق تلفن به واحد پشتیبانی عدم حضورخود را
                اعلام کنید تا زمان بعدی مجددا هماهنگ شود و محصولتان در زمان
                تعیین شده به دستتان برسد.
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                19- آیا میتوانم سفارش خود را به صورت تلفنی ثبت کنم؟
              </h2>
              <p className="mt-10">
                خیر. زیرا ثبت سفارش در فروشگاه اینترنتی بازارکده به صورت آنلاین
                صورت میگیرد.
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                20- چطور میتوانم سفارشم را لغو کنم؟
              </h2>
              <p className="mt-10">
                ابتدا با پشتیبانی تماس بگیرید و درخواست لغو سفارش کنید و بدین
                صورت درخواست لغو سفارش شما تایید شده و واریز وجه برای شما انجام
                خواهد شد.
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                21- چطور میتوانم امتیاز بگیرم؟
              </h2>
              <p className="mt-10">
                حداقل مبلغ خرید برای امتیاز گیری 100،000 تومان می باشد،شرط
                استفاده برای کالای خاص تا سقف 100،000 تومان میباشد،در اولین خرید
                از بازارکده میتوانید 5% از تخفیف ویژه استفاده نمایید،با معرفی
                سایت بازارکده به دوستان خود 5 امتیاز دریافت خواهید کرد،با 500
                امتیاز شما میتوانید 5000 تومان تخفیف بگیرید
              </p>
            </div>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h2 className="cmn-brdr-ttle big-ttl mb-10">
                21- چطور میتوانم امتیاز بگیرم؟
              </h2>
              <p className="mt-10">
                سفارش تنها زمانی نهایی می‌شود که مشتریان کد سفارش خود را از طریق
                پیامک و ایمیل دریافت کنند و بدیهی است که فروشگاه بازارکده
                هیچ‌گونه مسئولیتی نسبت به کالاهایی که در سبد خرید رها شده است،
                ندارد.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Questions;

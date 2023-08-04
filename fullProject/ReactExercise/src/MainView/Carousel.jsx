import React from "react";

export default function Carousel() {
  return (
    <div
      id="myCarousel"
      className="carousel slide carousel-fade "
      data-ride="carousel"
    >
      <div className="carousel-inner ">
        <div className="carousel-item active">
          <div className="mask flex-center d-flex justify-content-center">
            <div className=" w-70 h-75" style={{ maxWidth: " 1430px" }}>
              <div className="row align-items-center ">
                <div className="col-md-7 col-12 order-md-1 order-2">
                  <h4>Tiramisu</h4>
                  <p>
                    Tiramisu là một loại bánh ngọt tráng miệng vị cà phê của
                    nước Ý, gồm các lớp bánh quy Savoiardi nhúng cà phê xen kẽ
                    với hỗn hợp trứng, đường, phô mai mascarpone đánh bông, thêm
                    một ít bột cacao. Công thức bánh này được biến tấu thành
                    nhiều món bánh và món tráng miệng khác nhau.
                  </p>
                </div>
                <div className="col-md-5 col-12 order-md-2 order-1">
                  <img
                    src="https://bonpasbakery.com/image/cache/data/20170316/20170512/1285-472x378f.png"
                    className="mx-auto"
                    style={{ width: "360px", height: "360px" }}
                    alt="slide"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="mask flex-center d-flex justify-content-center">
            <div className="w-70 h-75" style={{ height: "400px" }}>
              <div className="row align-items-center">
                <div className="col-md-7 col-12 order-md-1 order-2">
                  <h4>Bánh Kem Trái Cây</h4>
                  <p>
                    Bánh là sự kết hợp giữa kem tươi ngọt béo và những miếng
                    trái cây mọng nước, ngọt ngào, không quá ngấy, phù hợp khẩu
                    vị nhiều người.
                  </p>
                </div>
                <div className="col-md-5 col-12 order-md-2 order-1">
                  <img
                    src="https://png.pngtree.com/png-clipart/20230206/ourmid/pngtree-asian-sponge-cake-with-fruit-png-image_6586452.png"
                    className="mx-auto"
                    style={{ maxWidth: "400px" }}
                    alt="slide"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#myCarousel"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#myCarousel"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

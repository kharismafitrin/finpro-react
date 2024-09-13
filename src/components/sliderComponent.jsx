import React, { useEffect } from "react";
import "./sliderComponent.css";
import ItemCard from "./itemCardComponent";

export default function SliderComponent({ film, no }) {
  useEffect(() => {
    const itemsMainDiv = document.querySelector(".MultiCarousel");
    let itemWidth = "";

    // Event listener for left and right buttons
    const handleButtonClick = (e) => {
      const isLeftButton = e.target.classList.contains("leftLst");
      if (isLeftButton) {
        click(0, e.target);
      } else {
        click(1, e.target);
      }
    };

    document.querySelectorAll(".leftLst, .rightLst").forEach((btn) => {
      btn.addEventListener("click", handleButtonClick);
    });
    // Resize and set carousel size
    const ResCarouselSize = () => {
      let incno = 0;
      const dataItems = "data-items";
      const itemClass = ".item";
      let id = 0;
      let itemsSplit = "";
      const sampwidth = itemsMainDiv.offsetWidth;
      const bodyWidth = document.body.offsetWidth;

      document.querySelectorAll(".MultiCarousel").forEach((carousel) => {
        id += 1;
        const itemNumbers = carousel.querySelectorAll(itemClass).length;
        const btnParentSb = carousel.getAttribute(dataItems);
        itemsSplit = btnParentSb.split(",");
        carousel.setAttribute("id", "MultiCarousel" + id);

        if (bodyWidth >= 1200) {
          incno = itemsSplit[3];
        } else if (bodyWidth >= 992) {
          incno = itemsSplit[2];
        } else if (bodyWidth >= 768) {
          incno = itemsSplit[1];
        } else {
          incno = itemsSplit[0];
        }

        itemWidth = sampwidth / incno;
        carousel.querySelector(".MultiCarousel-inner").style.transform =
          "translateX(0px)";
        carousel.querySelector(".MultiCarousel-inner").style.width =
          itemWidth * itemNumbers + "px";

        carousel.querySelectorAll(itemClass).forEach((item) => {
          item.style.width = itemWidth + "px";
        });

        document.querySelector(".leftLst").classList.add("over");
        document.querySelector(".rightLst").classList.remove("over");
      });
    };

    // Handle carousel left and right movement
    const ResCarousel = (e, el, s) => {
      const leftBtn = ".leftLst";
      const rightBtn = ".rightLst";
      let translateXval = "";
      const divStyle = window.getComputedStyle(
        el.querySelector(".MultiCarousel-inner")
      ).transform;
      const values = divStyle.match(/-?[\d.]+/g);
      const xds = Math.abs(values[4]);
      if (e === 0) {
        translateXval = parseInt(xds) - parseInt(itemWidth * s);
        document.querySelector(leftBtn).classList.remove("over");

        if (translateXval <= itemWidth / 2) {
          translateXval = 0;
          document.querySelector(leftBtn).classList.add("over");
        }
      } else if (e === 1) {
        const itemsCondition =
          el.querySelector(".MultiCarousel-inner").offsetWidth - el.offsetWidth;
        translateXval = parseInt(xds) + parseInt(itemWidth * s);
        document.querySelector(rightBtn).classList.remove("over");

        if (translateXval >= itemsCondition - itemWidth / 2) {
          translateXval = itemsCondition;
          document.querySelector(rightBtn).classList.add("over");
        }
      }

      el.querySelector(".MultiCarousel-inner").style.transform =
        "translateX(" + -translateXval + "px)";
    };

    // Handle click event
    const click = (ell, ee) => {
      const Parent = "#" + ee.parentElement.getAttribute("id");
      const slide = ee.parentElement.getAttribute("data-slide");
      ResCarousel(ell, document.querySelector(Parent), slide);
    };

    ResCarouselSize();
    window.addEventListener("resize", ResCarouselSize);

    // Cleanup event listeners on component unmount
    return () => {
      document.querySelectorAll(".leftLst, .rightLst").forEach((btn) => {
        btn.removeEventListener("click", handleButtonClick);
      });
    };
  }, [film]);
  return (
    <div className="container">
      <div className="row">
        <div
          className="MultiCarousel"
          data-items="3,4,5,6"
          data-slide="1"
          id={`MultiCarousel${no}`}
          data-interval="1000"
        >
          <div className="MultiCarousel-inner">
            {film?.map((item) => (
              <div className="item " key={item.id}>
                {/* <div className="card text-white bg-dark">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} // Construct full poster URL
                    className="card-img-top image-fluid"
                    alt={item.title}
                  />
                  <div className="card-body card-text">
                    <p style={{ fontSize: "12px" }} className="text-white">
                      {item.overview}
                    </p>
                  </div>
                  <p className="fs-6 text-warning text-truncate pt-2 px-2">
                    {item.title}
                  </p>
                </div> */}
                <ItemCard film={item} />
              </div>
            ))}
          </div>
          <button className="btn btn-warning leftLst">&lt;</button>
          <button className="btn btn-warning rightLst">&gt;</button>
        </div>
      </div>
    </div>
  );
}

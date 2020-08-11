import React, { useEffect } from "react";

const ScrolltoTopButton = React.memo(() => {
  useEffect(() => {
    let mount = true;
    if (mount) {
      if (typeof window !== "undefined") {
        $(document).ready(function () {
          //Scroll to top button appear
          $(document).on("scroll", function () {
            var scrollDistance = $(this).scrollTop();
            if (scrollDistance > 100) {
              $(".scroll-to-top").fadeIn();
            } else {
              $(".scroll-to-top").fadeOut();
            }
          });
          //Smooth scrolling using jQuery easing
          $(document).on("click", "a.scroll-to-top", function (e) {
            var $anchor = $(this);
            $("html, body")
              .stop()
              .animate(
                {
                  scrollTop: $($anchor.attr("href")).offset().top,
                },
                1000,
                "easeInOutExpo"
              );
            e.preventDefault();
          });
        });
      }
    }
    return () => {
      mount = false;
    };
  }, []);
  return (
    <a className="scroll-to-top rounded" href="#page-top">
      <i className="fas fa-angle-up"></i>
    </a>
  );
});

export default ScrolltoTopButton;

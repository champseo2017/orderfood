import React, { useEffect } from "react";
const Wrapper = React.memo(({ children }) => {
  useEffect(() => {
    let mount = true;
    if (mount) {
      if (typeof window !== "undefined") {
        $(document).ready(function () {
          {
            /* Close any open menu accordions when window is resized below 768px */
          }
          $(window).resize(function () {
            if ($(window).width() < 768) {
              $(".sidebar .collapse").collapse("hide");
            }

            // Toggle the side navigation when window is resized below 480px
            if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
              $("body").addClass("sidebar-toggled");
              $(".sidebar").addClass("toggled");
              $(".sidebar .collapse").collapse("hide");
            }
          });
        });
      }
    }

    return () => {
      mount = false;
    };
  }, []);
  return (
    <React.Fragment>
      {/* Page Wrapper */}
      <div id="wrapper">{children}</div>
    </React.Fragment>
  );
});

export default Wrapper;

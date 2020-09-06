import React, { useEffect } from "react";

const SidebarToggler = React.memo(() => {
  useEffect(() => {
    let mount = true;
    if (mount) {
      if (typeof window !== "undefined") {
        $(document).ready(function () {
          $("#sidebarToggle").on("click", function (e) {
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled")) {
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
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" />
      </div>
    </React.Fragment>
  );
});

// SidebarToggler.defaultProps = {
//   classHeading: "",
// };

export default SidebarToggler;

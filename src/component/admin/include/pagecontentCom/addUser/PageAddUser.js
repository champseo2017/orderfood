import React from "react";
import FormAddUserContainer from "../formAddUser/FormAddUserContainer";

const PageAddUser = React.memo(({ csrfToken }) => {
  return (
    <div>
      <FormAddUserContainer csrfToken={csrfToken} />
    </div>
  );
});
PageAddUser.defaultProps = {
  csrfToken: "",
};
export default PageAddUser;

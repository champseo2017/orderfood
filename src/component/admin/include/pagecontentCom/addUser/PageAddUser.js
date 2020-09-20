import React, { useEffect } from "react";
import FormAddUserContainer from "../formAddUser/FormAddUserContainer";
import { clearUserList } from "../../../../../redux/action/getUsersActions";
import { connect } from "react-redux";

const PageAddUser = React.memo(({ csrfToken, clearUserList }) => {
  useEffect(() => {
    let mount = true;
    if (mount) {
      clearUserList();
    }
    return () => {
      mount = false;
    };
  }, [csrfToken]);
  return (
    <div>
      <FormAddUserContainer csrfToken={csrfToken} />
    </div>
  );
});
const mapDispatchToProps = {
  clearUserList,
};
PageAddUser.defaultProps = {
  csrfToken: "",
  clearUserList: "",
};
export default connect(null, mapDispatchToProps)(PageAddUser);

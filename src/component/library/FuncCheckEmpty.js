export const CheckIsEmpty = (value) => {
  if (
    value == null ||
    (value.hasOwnProperty("length") && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  ) {
    return false;
  }
  return true;
};

/* 
  Returns:
  false: undefined, null, "", [], {}
  true: true, false, 1, 0, -1, "foo", [1, 2, 3], { foo: 1 }

*/

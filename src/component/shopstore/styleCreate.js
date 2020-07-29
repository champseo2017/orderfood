import css from "styled-jsx/css";

export default css.global`
#image-profile-store div {cursor: pointer;}
  #image-profile-store div {
    display: block;
  }

  #image-profile-store div:hover {
    background-color: #fecfcc;
  }

  #image-profile-store .active {
    background-color: #ff8f2b;
  }

  #image-profile-store div:target {
    background-color: #ff8f2b;
  }

  .filepond--image-preview-overlay-idle {
    mix-blend-mode: multiply;
    color: rgb(255 255 255 / 85%) !important;
}
  
`;
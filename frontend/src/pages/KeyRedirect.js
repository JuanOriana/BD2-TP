import React from "react";
import { useParams } from "react-router-dom";

const KeyRedirect = (props) => {
  const { key } = useParams();
  function getLongUrl(key) {
    console.log("hola");
    return "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }
  window.location.replace(getLongUrl(key));
  return <></>;
};

export default KeyRedirect;

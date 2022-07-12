import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleService } from "../scripts/handleService";
import { linkService } from "../services";

const KeyRedirect = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  handleService(
    linkService.getLinkByKey(key),
    navigate,
    (r) => window.location.replace(r.target_url),
    () => {}
  );
  return <></>;
};

export default KeyRedirect;

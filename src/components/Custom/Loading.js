import React from 'react'
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/ClipLoader";
import "./Loading.css"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = () => {
    return (
       <>
       <div className={"loader-wrapper"}>
          <div className={"loader"}>
          <BeatLoader className="loading-icon" color="white" loading  size={60} />
          </div>
        </div>
       </>
    )
}

export default Loading

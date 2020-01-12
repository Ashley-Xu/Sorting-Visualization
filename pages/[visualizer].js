import React, {useState} from "react";
import {useRouter} from "next/router";
import Nav from "../components/nav";

const Slider = ({onChange, min, max, initial}) => (
    <>
        <input type="range" min={min} max={max} defaultValue={initial} onChange={e => onChange(e.target.value)}/>
        <style jsx>{`
          input[type="range"] {
            appearance: none;
            background: #CD9841;
            border-radius: 5px;
            flex-grow: 1;
          }
        `}</style>
    </>
);

const Input = ({N, set_N}) => (
    <div className="container">
        <div className="group grow">
            <span>Input size</span>
            <Slider onChange={n => set_N(n)} min="1" max="500" initial={N}/>
        </div>
        <div className="group">
            <button>Shuffle</button>
        </div>
        <style jsx>{`
          div.container {
            color: darkgrey;
            padding: 10px;
            display: flex;
          }
          div.group {
            padding: 10px 20px;
            display: inline-flex;
          }
          div.group > span {
            margin-right: 5px;
          }
          .grow {
            flex-grow: 1;
          }
        `}</style>
    </div>
);

export default () => {
    const [N, set_N] = useState(500);

    return (
        <Nav>
            <div className="container">
                <div className="input"><Input N={N} set_N={set_N}/></div>
                <style jsx>{`
              div.container {
                display: flex;
              }
              div.input {
                width: 100%;
                margin: 20px;
                border-bottom: 2px solid grey;
              }
            `}</style>
            </div>
        </Nav>
    );
};

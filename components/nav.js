import React from "react";

const TopBar = () => (
    <div>
        <h2>Sorting Visualizer</h2>
        <style jsx>{`
          div {
            height: 60px;
            background: #1C1C1C;
            color: orange;
            display: flex;
            padding: 0px 20px;
            align-items: center;
          }
          h1, h2, h3, h4, h5, h6 {
            display: inline;
          }
        `}</style>
    </div>
);

export default ({children}) => (
    <div>
        <TopBar/>
        {children}
        <style jsx>{`
          div {
            height: 100vh;
            background: #1A1A1A;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
          }
        `}</style>
        <style global jsx>{`
          body {
            margin: 0;
          }
          div {
            font-family: "Roboto Light", sans-serif;
          }
        `}</style>
    </div>
);

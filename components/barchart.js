import React from "react";

export default ({frame: {list, highlights = []}, min, max}) => {
    const base = 0.1;
    const heights = list.map(v =>
        base + (1 - base) * (v - min) / (max - min)
    );
    return (
        <div className="container">
            {heights.map((h, i) =>
                <div className="bar" key={i} style={{height: `${h * 100}%`}}> </div>
            )}
            <style jsx>{`
              div.container {
                display: flex;
                align-items: flex-end;
                height: 100%;
                justify-content: space-between;
              }
              div.bar {
                margin: 0 1px;
                min-width: 1px;
                background: aquamarine;
                flex-grow: 1;
              }
            `}</style>
        </div>
    );
};

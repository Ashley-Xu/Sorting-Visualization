import React, {useState, useContext} from "react";
import {useRouter} from "next/router";
import Nav from "../components/nav";
import Controls from "../components/controls";
import {VisualizerStates} from "../components/contexts";

export default () => {
    const N = useState(100);
    const paused = useState(false);
    const step = useState(0);
    const provideStates = children =>
        <VisualizerStates.Provider
            value={{N, paused, step}}
        >{children}</VisualizerStates.Provider>;

    return provideStates(
        <Nav>
            <div className="container">
                <div className="controls"><Controls/></div>
                <style jsx>{`
                  div.container {
                    display: flex;
                  }
                  div.controls {
                    width: 100%;
                    margin: 0 20px;
                    padding: 15px 0;
                    border-bottom: 2px solid grey;
                  }
                `}</style>
            </div>
        </Nav>
    );
};

import React, {useState, useContext} from "react";
import {useRouter} from "next/router";
import Nav from "../components/nav";
import Controls from "../components/controls";
import {VisualizerStates} from "../components/contexts";
import BarChart from "../components/barchart";

export default () => {
    const N = useState(100);
    const paused = useState(true);
    const step = useState(0);
    const provideStates = children =>
        <VisualizerStates.Provider
            value={{N, paused, step}}
        >{children}</VisualizerStates.Provider>;

    return provideStates(
        <Nav>
            <div className="container">
                <div className="controls"><Controls/></div>
                <div className="visualizer"><BarChart
                    list={[9, 7, 1, 5, 1, 2, 8, 3, 2, 8, 3, 3, 1, 4, 6, 2, 9, 8, 5, 7, 1, 8, 4, 2, 7, 9]}
                    min={1}
                    max={10}
                /></div>
                <style jsx>{`
                  div.container {
                    display: flex;
                    flex-wrap: wrap;
                  }
                  div.controls {
                    width: 100%;
                    margin: 0 20px;
                    padding: 15px 0;
                    border-bottom: 2px solid grey;
                  }
                  div.visualizer {
                    width: 100%;
                    min-height: 300px;
                    margin: 0 20px;
                    padding: 15px 0;
                  }
                `}</style>
            </div>
        </Nav>
    );
};

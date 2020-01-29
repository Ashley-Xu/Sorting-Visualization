import React, {useState, useEffect} from "react";
import Error from "next/error";
import Nav from "../components/nav";
import Controls, {useControlsContext} from "../components/controls";
import BarChart from "../components/barchart";

export default ({generator}) => {
    const {input, paused, set_paused, clear_seek, set_seek, reset} = useControlsContext();
    useEffect(() => {
        if (paused)
            return;
        const timer = setTimeout(() => set_seek(1), 50);
        return () => clearTimeout(timer);
    });

    return (
        <Nav>
            <div className="container">
                <div className="controls"><Controls/></div>
                <div className="visualizer"><BarChart
                    frame={frame}
                    min={1}
                    max={input.length}
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

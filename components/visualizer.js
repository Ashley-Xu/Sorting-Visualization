import React, {useState, useEffect} from "react";
import Error from "next/error";
import Nav from "../components/nav";
import Controls, {useInput, useReset, useSeek, usePaused} from "../components/controls";
import BarChart from "../components/barchart";

function Buffer(input, generator) {
    const gen = generator([...input]);
}

export default ({generator}) => {
    const [input] = useInput();
    const [paused, toggle_paused] = usePaused();
    const [seek, add_seek] = useSeek(true);
    const reset = useReset();
    const [frame, set_frame] = useState(0);
    useEffect(() => {
        if (paused)
            return;
        const timer = setTimeout(() => add_seek(1), 50);
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

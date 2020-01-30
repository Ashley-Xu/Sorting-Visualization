import React, {useState, useEffect} from "react";
import Error from "next/error";
import Nav from "../components/nav";
import Controls, {useInput, useReset, useSeek, usePaused} from "../components/controls";
import BarChart from "../components/barchart";

const useBuffer = (input, generator) => {
    const [gen, set_gen] = useState(generator([...input]));
    const [buf, set_buf] = useState([]);
    const [range, set_range] = useState([0, 0]);

    const BUF_MAX = 1024;
    let [hi, lo] = range;

    const clear = () => {
        set_gen(generator([...input]));
        set_buf([]);
        set_range([0, 0]);
    };

    const fill = target => {
        while (target >= hi) {
            const {value: frame, done} = gen.next();
            if (frame)
                buf[hi++ % BUF_MAX] = frame;
            if (done)
                break;
        }
        lo = Math.max(0, hi - BUF_MAX);
        set_range([hi, lo]);
    };

    const frame = i => buf[i % BUF_MAX];

    return {range, frame, fill, clear};
};

export default ({generator}) => {
    const [input] = useInput();
    const [paused, toggle_paused] = usePaused();
    const [seek, add_seek] = useSeek(true);
    const [cursor, set_cursor] = useState(0);
    const {range: [hi, lo], frame, fill, clear} = useBuffer(input, generator);
    console.debug(`buffer ${lo} to ${hi}, cursor ${cursor}, seek ${seek}`);
    useEffect(() => {
        const target = cursor + seek;
        if (target < lo || target >= hi) {
            console.debug(`filling to ${cursor} + ${seek}`);
            fill(cursor + seek);
        }
        set_cursor(target);
        if (paused)
            return;
        const timer = setTimeout(() => add_seek(1), 50);
        return () => clearTimeout(timer);
    });
    if (useReset()) {
        clear();
        set_cursor(0);
    }

    if (cursor < lo || cursor >= hi) {
        console.log(`cursor ${cursor} is outside buffer range`);
        return null;
    }
    return (
        <Nav>
            <div className="container">
                <div className="controls"><Controls/></div>
                <div className="visualizer"><BarChart
                    frame={frame(cursor)}
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

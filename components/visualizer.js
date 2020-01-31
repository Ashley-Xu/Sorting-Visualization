import React, {useState, useEffect} from "react";
import Error from "next/error";
import Nav from "../components/nav";
import Controls from "../components/controls";
import BarChart from "../components/barchart";
import {useReset, useInput} from "../hooks/controls";

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

const useRingBuffer = (input, generator) => {
    const [gen, set_gen] = useState(generator([...input]));
    const [buf] = useState([]);
    const [range, set_range] = useState([0, 0]);

    const BUF_MAX = 1024;
    let [hi, lo] = range;

    const shift = offset => {
    };

    const reset = () => {
        set_gen(generator([...input]));
        set_range([0, 0]);
    };

    const value = i => buf[i % BUF_MAX];

    return [{hi, lo, value}, shift, reset];
};

export default ({generator}) => {
    const [reset] = useReset();
    const [input] = useInput();
    const {range: [hi, lo], frame, fill, clear} = useBuffer(input, generator);
    const [cursor, set_cursor] = useState(0);
    useEffect(() => {
        if (reset) {
            console.debug(`resetting visualizer`);
            clear();
        }
    });
    console.debug(`======== rendering visualizer ========`);
    console.debug(`range: ${lo} to ${hi}, cursor: ${cursor}, input: ${input.length}`);

    if (cursor < lo || cursor >= hi) {
        console.debug(`cursor ${cursor} out of buffer's valid range`);
        fill(cursor);
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

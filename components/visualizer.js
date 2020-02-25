import React, {useState, useEffect} from "react";
//import Error from "next/error";
import Nav from "../components/nav";
import Controls from "../components/controls";
import BarChart from "../components/barchart";
import {useReset, useInput, useSeek, usePause} from "../hooks/controls";

const useGeneratorBuffer = generator => {
    const [buf, set_buf] = useState([]);
    const [[top, base], set_range] = useState([0, 0]);
    const [ended, set_ended] = useState(false);

    const BUF_MAX = 1024;

    const clear = () => {
        set_buf([]);
        set_range([0, 0]);
        set_ended(false);
    };

    const shift = offset => {
        let p = top;
        const target = p + offset;
        const b = [...buf];
        while (p < target) {
            const {value, done} = generator.next();
            if (value)
                b[p++ % BUF_MAX] = value;
            if (done) {
                set_ended(true);
                break;
            }
        }
        set_buf(b);
        set_range([p, Math.max(0, p - BUF_MAX)]);
        return p - target + offset;
    };

    const value = i => i < base || i >= top ? undefined : buf[i % BUF_MAX];

    return [[base, top - 1, ended], value, shift, clear];
};

const usePlayback = (input, generator) => {
    const [gen, set_gen] = useState(generator([...input]));
    const [[first, last, ended], buf_value, buf_shift, buf_clear] = useGeneratorBuffer(gen);
    const [cursor, set_cursor] = useState(-1);

    const reset = () => {
        set_gen(generator([...input]));
        buf_clear();
        set_cursor(-1);
    };

    const seek = offset => {
        let pos = cursor + offset;
        if (pos < first)
            pos = first;
        if (pos > last)
            pos = last + buf_shift(pos - last);
        set_cursor(pos);
        return pos - cursor;
    };

    const status = {
        frame: buf_value(cursor),
        is_empty: cursor === -1,
        is_first: cursor === 0,
        is_last: cursor === last && ended
    };
    console.debug(`playback valid from ${first} to ${last}, current: ${cursor} unavailable: ${!buf_value(cursor)}`);
    return [status, seek, reset];
};

export default ({generator}) => {
    console.debug(`======== rendering visualizer ========`);
    const [reset] = useReset();
    const [input] = useInput();
    const [
        {frame, is_empty, is_first, is_last},
        playback_seek,
        playback_reset
    ] = usePlayback(input, generator);
    const [seek, set_seek] = useSeek();
    const [pause, set_pause] = usePause();
    useEffect(() => {
        if (reset) {
            console.debug(`resetting visualizer`);
            playback_reset();
        }
    });
    useEffect(() => {
        if (is_empty)
            playback_seek(1);
        else if (seek)
            playback_seek(seek);
    });
    useEffect(() => {
        if (pause)
            return;
        else if (is_last) {
            set_pause(true);
            return;
        }
        const timer = setTimeout(() => set_seek(1), 50);
        return () => clearTimeout(timer);
    });

    if (!frame)
        return null;
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

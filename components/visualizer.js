import React, {useState, useEffect} from "react";
import Error from "next/error";
import Nav from "../components/nav";
import Controls, {useControlsContext} from "../components/controls";
import BarChart from "../components/barchart";

function Task(input, gen) {
    const FRAME_MAX = 1024;

    const generator = gen([...input]);
    const frame_buf = [];
    let height = 0;
    let base = 0;

    this.generate = target => {
        console.debug(`asking for frame ${target}, generated: ${height}`);
        while (target >= height) {
            const {value, done} = generator.next();
            if (value)
                frame_buf[height++ % FRAME_MAX] = value;
            if (done) {
                console.debug(`finished after generating ${generated} frames`);
                break;
            }
        }
        base = Math.max(height - FRAME_MAX, 0);
        return [base, height];
    };

    this.frame = i => frame_buf[i % FRAME_MAX];
}

export default ({generator}) => {
    const {input, paused, seek, set_seek, reset} = useControlsContext();
    const [task, set_task] = useState(new Task(input, generator));
    const [frame, set_frame] = useState(0);
    useEffect(() => {
        if (paused)
            return;
        const timer = setTimeout(() => set_seek(1), 200);
        return () => clearTimeout(timer);
    });

    if (!task) {
        return <Error statusCode={400}/>
    }
    if (reset) {
        set_task(new Task(input, generator));
    }
    let target = frame + seek;
    const [start, end] = task.generate(target);
    if (target < start) {
        target = start;
        set_frame(target);
    }
    else if (target >= end) {
        target = end - 1;
        set_frame(target);
    }
    return (
        <Nav>
            <div className="container">
                <div className="controls"><Controls/></div>
                <div className="visualizer"><BarChart
                    frame={task.frame(target)}
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

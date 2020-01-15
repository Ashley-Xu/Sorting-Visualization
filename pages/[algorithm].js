import React, {useState} from "react";
import {useRouter} from "next/router";
import Error from "next/error";
import Nav from "../components/nav";
import Controls from "../components/controls";
import {VisualizerStates} from "../components/contexts";
import BarChart from "../components/barchart";
import algorithms from "../algorithms";

const random_list = (size, min, max) => Array.from({length: size}, () =>
    min + Math.floor(Math.random() * (max - min))
);

const size_init = 100;
const task_init = (size, algorithm) => {
    const gen = algorithms[algorithm];
    if (!gen || size < 1)
        return null;
    const input = random_list(size, 1, size);
    return {
        input: input,
        generator: gen(input),
        frames: []
    };
};
const paused_init = true;
const frame_init = 0;

export default () => {
    const algorithm = useRouter().query.algorithm;
    const [size, set_size] = useState(size_init);
    let [paused, set_paused] = useState(paused_init);
    let [frame, set_frame] = useState(frame_init);
    const [reset, set_reset] = useState(true);
    const [task, set_task] = useState(task_init(size, algorithm));

    if (!task) {
        return <Error statusCode={404}/>
    }
    if (!reset) {
        set_paused(paused_init);
        set_frame(frame_init);
        set_size(size_init);
        set_reset(true);
        set_task(task_init(size, algorithm));
        return null;
    }
    while (frame >= task.frames.length) {
        const {value, done} = task.generator.next();
        if (value)
            task.frames.push(value);
        if (done) {
            if (task.frames.length === 0) {
                console.error(`the algorithm mostly likely has a faulty implementation because it finished
                               without producing any frames`);
                return <Error statusCode={400}/>
            }
            frame = task.frames.length - 1;
            paused = true;
            set_frame(frame);
            set_paused(paused);
        }
    }
    if (!paused)
        setTimeout(() => set_frame(frame + 1), 50);

    const provideStates = children =>
        <VisualizerStates.Provider value={{
            size, set_size,
            paused, set_paused,
            frame, set_frame,
            reset, set_reset
        }}>{children}</VisualizerStates.Provider>;
    return provideStates(
        <Nav>
            <div className="container">
                <div className="controls"><Controls/></div>
                <div className="visualizer"><BarChart
                    frame={task.frames[frame]}
                    min={1}
                    max={size}
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

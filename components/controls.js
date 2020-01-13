import React, {useContext} from "react";
import {VisualizerStates} from "./contexts";

const Space = () => <Group grow> </Group>;

const Group = ({children, grow}) => (
    <div>
        {children}
        <style jsx>{`
          div {
            display: inline-flex;
            flex-grow: ${grow ? 1 : 0};
          }
        `}</style>
    </div>
);

const Slider = ({onChange, min, max, init, title = null}) => (
    <Group grow>
        {title && <span>{title}</span>}
        <input type="range" min={min} max={max} defaultValue={init} onChange={e => onChange(e.target.value)}/>
        <style jsx>{`
          input[type="range"] {
            appearance: none;
            background: #CD9841;
            border-radius: 5px;
            margin: 0 5px;
            flex-grow: inherit;
          }
          span {
            margin-left: 5px;
            color: lightgrey;
          }
        `}</style>
    </Group>
);

const Button = ({children, onClick}) => (
    <>
        <button onClick={onClick}>{children}</button>
        <style jsx>{`
          button {
            background: none;
            border: 2px solid white;
            border-radius: 10px;
            color: white;
            height: 30px;
            margin: 0 5px;
          }
        `}</style>
    </>
);

export default () => {
    const {
        N: [N, set_N],
        step: [step, set_step],
        paused: [paused, set_paused]
    } = useContext(VisualizerStates);
    const reset = N => {
        set_N(N);
        set_step(0);
        set_paused(true);
    };

    return (
        <div>
            <Group>
                <Button onClick={() => set_step(step - 1)}>Back</Button>
                <Button onClick={() => set_paused(!paused)}>{paused ? "Play" : "Pause"}</Button>
                <Button onClick={() => set_step(step + 1)}>Forward</Button>
            </Group>
            <Space/>
            <Slider onChange={reset} title="Input size" min="1" max="500" init={N}/>
            <Space/>
            <Button>Shuffle</Button>
            <style jsx>{`
              div {
                color: darkgrey;
                display: flex;
                align-items: center;
                justify-content: space-evenly;
              }
            `}</style>
        </div>
    );
};

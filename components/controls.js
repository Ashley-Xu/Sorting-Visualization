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
    const {size, set_size, playback, set_playback, set_reset} = useContext(VisualizerStates);

    const handle_slider = size => {
        set_size(size);
        set_reset(false);
    };
    const back = () => set_playback({...playback, step: Math.max(0, playback.step - 1)});
    const forward = () => set_playback({...playback, step: playback.step + 1});
    const pause = () => set_playback({...playback, paused: !playback.paused});

    console.log(`step: ${playback.step}`)
    return (
        <div>
            <Group>
                <Button onClick={back}>Back</Button>
                <Button onClick={pause}>{playback.paused ? "Play" : "Pause"}</Button>
                <Button onClick={forward}>Forward</Button>
            </Group>
            <Space/>
            <Slider onChange={handle_slider} title="Input size" min="1" max="500" init={size}/>
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

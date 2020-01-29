import React, {useContext, createContext, useState, useEffect} from "react";

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

const random_list = (size, min, max) => Array.from({length: size}, () =>
    min + Math.floor(Math.random() * (max - min))
);

const useControls = () => {
    const [input, set_input_state] = useState(random_list(100, 1, 100));
    const [paused, set_paused] = useState(true);
    const [seek, set_seek] = useState(0);
    const [reset, set_reset] = useState(false);
    useEffect(() => {
        if (reset)
            set_reset(false);
    });

    const set_input = size => {
        set_input_state(random_list(size, 1, size));
        set_reset(true);
    };
    const clear_seek = () => {
        set_seek(0);
        return reset ? 0 : seek;
    };
    return {
        input,
        set_input,
        paused: reset || paused,
        set_paused,
        clear_seek,
        set_seek,
        reset
    };
};

const Context = createContext(null);
export const useControlsContext = () => useContext(Context);
export const ControlsContextProvider = ({children}) => (
    <Context.Provider value={{...useControls()}}>{children}</Context.Provider>
);

export default () => {
    const {
        paused, set_paused, set_seek, input, set_input
    } = useControlsContext();
    return (
        <div>
            <Group>
                <Button onClick={() => set_seek(-1)}>Back</Button>
                <Button onClick={() => set_paused(!paused)}>{paused ? "Play" : "Pause"}</Button>
                <Button onClick={() => set_seek(1)}>Forward</Button>
            </Group>
            <Space/>
            <Slider onChange={set_input} title="Input size" min="1" max="500" init={input.length}/>
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

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

const useStates = () => {
    const [input, set_input] = useState(random_list(100, 1, 100));
    const [paused, set_paused] = useState(true);
    const [seek, set_seek] = useState(0);
    const [reset, set_reset] = useState(false);
    useEffect(() => {
        if (reset)
            set_reset(false);
    });

    const rst_enable = f => (
        (...args) => {
            set_reset(true);
            return f(...args);
        }
    );
    const rst_mask = f => (
        (...args) => {
            if (!reset)
                return f(...args);
        }
    );
    return {
        input,
        set_input: rst_enable(rst_mask(set_input)),
        paused,
        set_paused: rst_mask(set_paused),
        seek,
        set_seek: rst_mask(set_seek),
        reset
    };
};

const Context = createContext(null);
export const ControlsContextProvider = ({children}) => (
    <Context.Provider value={{...useStates()}}>{children}</Context.Provider>
);

export const useInput = () => {
    const {input, set_input} = useContext(Context);
    const new_input = size => {
        set_input(random_list(size, 1, size));
    };
    return [input, new_input];
};

export const usePaused = () => {
    const {paused, set_paused} = useContext(Context);
    const toggle_paused = value => {
        set_paused(value === undefined ? !paused : value)
    };
    return [paused, toggle_paused];
};

export const useSeek = clear => {
    const {seek, set_seek} = useContext(Context);
    useEffect(() => {
        if (clear)
            set_seek(0);
    });
    const add_seek = offset => set_seek(seek + offset);
    return [seek, add_seek];
};

export const useReset = () => useContext(Context).reset;

export default () => {
    const [input, set_input] = useInput();
    const [seek, add_seek] = useSeek();
    const [paused, toggle_pause] = usePaused();
    return (
        <div>
            <Group>
                <Button onClick={() => add_seek(-1)}>Back</Button>
                <Button onClick={() => toggle_pause()}>{paused ? "Play" : "Pause"}</Button>
                <Button onClick={() => add_seek(1)}>Forward</Button>
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

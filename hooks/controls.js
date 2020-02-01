import {useState, createContext, useContext, useEffect} from "react";

const RESET_INIT = 0;
const RESET_MAX = Number.MAX_SAFE_INTEGER;

const Context = createContext(null);
export const ControlsContextProvider = ({children}) => (
    <Context.Provider value={{
        reset: useState(RESET_INIT),
        input: useState(random_list(100, 1, 100)),
        seek: useState(0),
        pause: useState(true)
    }}>{children}</Context.Provider>
);

export const useReset = () => {
    const [global, set_global] = useContext(Context).reset;
    const [local, set_local] = useState(RESET_INIT);
    useEffect(() => {
        set_local(global);
    });

    const reset = local !== global;
    const enable_reset = () => set_global((global + 1) % RESET_MAX);
    return [reset, enable_reset];
};

const random_list = (size, min, max) => Array.from({length: size}, () =>
    min + Math.floor(Math.random() * (max - min))
);

export const useInput = () => {
    const [input, set_input] = useContext(Context).input;
    const [, enable_reset] = useReset();

    const new_input = size => {
        set_input(random_list(size, 1, size));
        enable_reset();
    };
    return [input, new_input];
};

export const useSeek = () => {
    const [seek, set_seek] = useContext(Context).seek;
    useEffect(() => set_seek(0));

    return [seek, set_seek];
};

export const usePause = () => {
    const [pause, set_pause] = useContext(Context).pause;

    const toggle = value => {
        if (value === undefined)
            set_pause(!pause);
        else
            set_pause(value);
    };
    return [pause, toggle];
};
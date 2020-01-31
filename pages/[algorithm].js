import React from "react";
import {useRouter} from "next/router";
import Error from "next/error";
import Visualizer from "../components/visualizer";
import algorithms from "../algorithms";
import {ControlsContextProvider} from "../hooks/controls";

export default () => {
    const gen = algorithms[useRouter().query.algorithm];

    if (!gen)
        return <Error statusCode={404}/>;
    return (
        <ControlsContextProvider>
            <Visualizer generator={gen}/>
        </ControlsContextProvider>
    );
};

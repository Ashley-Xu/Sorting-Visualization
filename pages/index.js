import React from "react";
import Link from "next/link";

const MenuEntry = ({name, algorithm}) => {
    return <>
        <Link href={"/[visualizer]"} as={`/${algorithm}`}>
            <a>{name}</a>
        </Link>
        <style jsx>{`
          a {
            width: 150px;
            height: 150px;
            background: bisque;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
    </>;
};

const Menu = () => {
    return <div>
        <MenuEntry name="Merge Sort" algorithm="mergesort"/>
        <style jsx>{`
          div {
            background: aquamarine;
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
    </div>;
};

const TopBar = () => {
    return <div>
        <h2>Sorting Visualizer</h2>
        <style jsx>{`
          div {
            height: 50px;
            background: rebeccapurple;
            display: flex;
            padding: 0px 10px;
            align-items: center;
          }
          h1, h2, h3, h4, h5, h6 {
            display: inline;
          }
        `}</style>
    </div>;
};

const BottomBar = () => {
    return <div>
        Bottom bar.. put some buttons in it maybe
        <style jsx>{`
          div {
            height: 50px;
            background: rebeccapurple;
          }
        `}</style>
    </div>;
};

export default () => {
    return (
        <div>
            <TopBar/>
            <Menu/>
            <BottomBar/>
            <style jsx>{`
              div {
                height: 100vh;
                background: darkgrey;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
            `}</style>
            <style global jsx>{`
              body {
                margin: 0;
                height: 100%;
              }
            `}</style>
        </div>
    );
};

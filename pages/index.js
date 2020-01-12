import React from "react";
import Link from "next/link";
import Nav from "../components/nav";

const MenuEntry = ({name, algorithm}) => {
    return <>
        <Link href={"/[visualizer]"} as={`/${algorithm}`}>
            <a>{name}</a>
        </Link>
        <style jsx>{`
          a {
            width: 150px;
            height: 100px;
            display: inline-flex;
            align-items: center;
            color: white;
            border: 2px solid white;
            border-radius: 20px;
            justify-content: center;
            text-decoration: none;
            font-size: large;
            font-weight: bold;
          }
        `}</style>
    </>;
};

const Menu = () => {
    return <div>
        <MenuEntry name="Merge Sort" algorithm="mergesort"/>
        <style jsx>{`
          div {
            background: #1C1C1C;
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
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
            background: black;
            color: grey;
          }
        `}</style>
    </div>;
};

export default () => (
    <Nav>
        <Menu/>
        <BottomBar/>
    </Nav>
);

import React, { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { navlinks } from "../constant";

import { useStateContext } from "../context";
import { capitalize } from "../utils";
import Icon from "./Icon";

const MapLinks = ({ navbar, onClick = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isActive, setIsActive] = React.useState("dashboard");

  useEffect(() => {
    setIsActive(() => {
      const [activePage] = navlinks.filter(
        item => item.link === location.pathname
      );
      return activePage?.name || "dashboard";
    });
  }, []);

  const { disconnect } = useStateContext();

  const handleClick = link => {
    if (!link.disabled) {
      if (link.hasFunction) {
        if (link.name === "logout") {
          disconnect();
        }
      } else {
        setIsActive(link.name);
        navigate(link.link);
      }
    }
  };

  return (
    <>
      {navbar
        ? navlinks.map(link => {
            return (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }  cursor-pointer`}
                onClick={() => {
                  onClick();
                  handleClick(link);
                }}>
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}>
                  {capitalize(link.name)}
                </p>
              </li>
            );
          })
        : navlinks.map(link => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                onClick();
                handleClick(link);
              }}
            />
          ))}
    </>
  );
};

export default MapLinks;

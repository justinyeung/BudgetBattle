import React from "react";

import DesktopContainer from "../components/homepage/DesktopContainer";
import MobileContainer from "../components/homepage/MobileContainer";

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

const HomePage = () => {
  return <ResponsiveContainer></ResponsiveContainer>;
};

export default HomePage;

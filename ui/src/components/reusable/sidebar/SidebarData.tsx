import * as FaIcons from "react-icons/fa";

// eslint-disable-next-line
{
  /*Can add more links or change paths to the sidebar using this data file*/
}
export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <FaIcons.FaChartArea size="35" />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <FaIcons.FaScroll size="35" />,
  },
  {
    title: "Cost Forecast",
    path: "/cost-forecast",
    icon: <FaIcons.FaChartLine size="35" />,
  },
  {
    title: "Bill Validation",
    path: "/bill-validation",
    icon: <FaIcons.FaMoneyCheckAlt size="35" />,
  },
];

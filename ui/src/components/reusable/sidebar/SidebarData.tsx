import React from 'react'
import * as FaIcons from 'react-icons/fa' 

{/*Can add more links or change paths to the sidebar using this data file*/}
export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <FaIcons.FaChartArea size='35'/>
    },
    {
        title: 'Bill Validation',
        path: '/billvalidation',
        icon: <FaIcons.FaMoneyCheckAlt size='35' />
    },
    {
        title: 'Reports',
        path: '/reports',
        icon: <FaIcons.FaScroll size='35' />
    },
    {
        title: 'Cost Forecast',
        path: '/costforecast',
        icon: <FaIcons.FaChartLine size='35' />
    }
];
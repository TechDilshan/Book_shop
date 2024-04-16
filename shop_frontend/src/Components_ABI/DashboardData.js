import React from 'react'
import { HomeOutlined,MailOutlined,LineChartOutlined,DashboardOutlined} from '@ant-design/icons';

export const DashboardData = [
    {
        title :"Purchase Order",
        icon:<HomeOutlined />,
        link:"./FM_PO"
    },

    {
        title :"QR Genarate",
        icon:<MailOutlined />,
        link:"./QR_Page"
    },

    {
        title :"Analytics",
        icon:<LineChartOutlined />,
        link:"./ScanQR_Page"
    },

    {
        title :"Dashboard",
        icon:<DashboardOutlined />,
        link:"./Home"
    }
]
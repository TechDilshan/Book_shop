import React from 'react'
import { HomeOutlined,QrcodeOutlined,ScanOutlined,DashboardOutlined} from '@ant-design/icons';

export const DashboardData = [
    {
        title :"Purchase Order",
        icon:<HomeOutlined />,
        link:"./FM_PO"
    },

    {
        title :"QR Genarate",
        icon:<QrcodeOutlined />,
        link:"./QR_Page"
    },

    {
        title :"Employee Salary",
        icon:<ScanOutlined />,
        link:"./ScanQR_Page"
    },

    {
        title :"Dashboard",
        icon:<DashboardOutlined />,
        link:"./FM_Admin"
    }
]
"use client";

import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdDashboard } from 'react-icons/md';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { DEEP_DARK_COLOR, LIGHT_DARK_COLOR } from '../../utils/constants';
import { BsPostageFill, BsPostcard, BsCodeSquare } from 'react-icons/bs';

const AdminSidebar = () => {
    const [activeLink, setActiveLink] = useState({});
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const pathname = typeof window !== 'undefined' ? window.location.pathname : '/admin';
        setActiveLink({ [pathname]: true });
        setCollapsed(window.matchMedia('(max-width: 768px)').matches);
    }, []);

    return (
        <Sidebar toggled={true} backgroundColor={LIGHT_DARK_COLOR} collapsed={collapsed}>
            <Menu
                menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        if (level === 0 || level === 1) {
                            return {
                                color: disabled ? '#fff' : '#fff',
                                backgroundColor: active ? DEEP_DARK_COLOR : LIGHT_DARK_COLOR,
                                '&:hover': {
                                    color: '#ffffff',
                                    backgroundColor: DEEP_DARK_COLOR,
                                },
                            };
                        }
                    },
                }}
            >
                <MenuItem active={true} style={{ height: '100px' }}>
                    <div className='flex justify-between py-2'>
                        {!collapsed && (
                            <div className='flex text-white text-2xl'>
                                <span className='my-auto'>Admin</span>
                            </div>
                        )}
                        <div className='w-full my-auto text-center' onClick={() => setCollapsed(!collapsed)}>
                            <GiHamburgerMenu size={25} className='ml-auto my-auto' />
                        </div>
                    </div>
                </MenuItem>

                <MenuItem active={activeLink['/admin']} component={<a href="/admin" />}>
                    Dashboard
                </MenuItem>

                <SubMenu icon={<BsPostageFill />} label="Post">
                    <MenuItem icont={<BsPostcard />} component={<a href="/admin/posts" />} active={activeLink['/admin/posts']}>
                        All
                    </MenuItem>
                    <MenuItem active={activeLink['/admin/blogs/create']} component={<a href="/admin/blogs/create" />}>
                        Add New
                    </MenuItem>
                </SubMenu>

                <SubMenu icon={<BsCodeSquare />} label="Projects">
                    <MenuItem component={<a href="/admin/projects" />} active={activeLink['/admin/projects']}>
                        All Projects
                    </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
};

export default AdminSidebar;

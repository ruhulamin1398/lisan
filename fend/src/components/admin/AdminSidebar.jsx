import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu, GiSettingsKnobs } from 'react-icons/gi';
import { FaUsersCog } from 'react-icons/fa';
import { RiNftFill, RiNftLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';

import { DEEP_DARK_COLOR, LIGHT_DARK_COLOR } from '../../utils/constants';
import { Link } from 'react-router';

const AdminSidebar = () => {
  const [activeLink, setActiveLink] = useState({});


  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const currentUrl = "/admin";
    setActiveLink(() => ({
      [currentUrl]: true, // Set the current URL as active
    }));

    setCollapsed(window.matchMedia('(max-width: 768px)').matches); // Set the initial collapsed state based on the media query // if mobile it will initial collapse 
  }, []);


  return (
    <Sidebar
      toggled={true}
      backgroundColor={LIGHT_DARK_COLOR}
      collapsed={collapsed}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            if (level === 0 || level === 1) {
              return {
                color: disabled ? '#fff' : '#fff',
                backgroundColor: active ? DEEP_DARK_COLOR : LIGHT_DARK_COLOR,
                '&:hover': {
                  color: '#ffffff', // Hover text color
                  backgroundColor: DEEP_DARK_COLOR, // Hover background color
                },
              };
            }

          },
        }}

      >
        <MenuItem active={true} style={{ height: '100px' }} >
          <div className='flex justify-between py-2 '>
            {!collapsed && (<div className='flex text-white text-2xl  '>
              <span className='my-auto'>Admin</span>
            </div>)}
            <div className=" w-full my-auto  text-center" onClick={() => setCollapsed(!collapsed)}>
              <GiHamburgerMenu size={25} className='ml-auto my-auto' />
            </div>
          </div>
        </MenuItem>


        <MenuItem icon={<MdDashboard />} active={activeLink['/admin']} component={<Link href="/admin" />}>

          Dashboard
        </MenuItem>


        <SubMenu icon={<FaUsersCog />} label="Affiliate"   >
          <MenuItem component={<Link href="/admin/affiliates" />} active={activeLink['/admin/affiliates']}>

            Codes
          </MenuItem>
          <MenuItem active={activeLink['/admin/create-affiliate']} component={<Link href="/admin/create-affiliate" />}   >

            Add New

          </MenuItem>
        </SubMenu>

        <MenuItem icon={<RiNftFill />} component={<Link href="/admin/airdrop" />}>
          Airdrop
        </MenuItem>



        <SubMenu icon={<GiSettingsKnobs />} label="Settings"   >
          <MenuItem icon={<RiNftLine />} component={<Link href="/admin/settings/nft" />} active={activeLink["/admin/settings/nft"]}>

            NFT
          </MenuItem>

        </SubMenu>


      </Menu>
    </Sidebar>
  );
};

export default AdminSidebar;

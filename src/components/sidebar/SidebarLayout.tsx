import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaHome, FaSearch } from 'react-icons/fa';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

const SidebarLayout = () => {
  let navigate = useNavigate();

  const { collapsed, collapseSidebar } = useProSidebar();
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <Sidebar breakPoint="sm" transitionDuration={800} backgroundColor="#dcdcdc" rtl={false} style={{ margin: '16px' }}>
      <Menu>
        {collapsed ? (
          <MenuItem
            onClick={() => {
              collapseSidebar();
            }}
            icon={<FaAngleDoubleRight />}
          ></MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              collapseSidebar();
            }}
            suffix={<FaAngleDoubleLeft />}
          >
            <div
              style={{
                padding: '9px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 15,
                letterSpacing: '1px',
              }}
            ></div>
          </MenuItem>
        )}
      </Menu>

      <Menu>
        <MenuItem
          onClick={() => {
            navigate('/app/tags');
          }}
          icon={<FaHome />}
          active={currentPathName.includes('/tags')}
        >
          Tags
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/app/results');
          }}
          active={currentPathName.includes('/results')}
          icon={<FaSearch />}
        >
          Search Results
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarLayout;

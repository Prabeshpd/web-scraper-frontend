import * as React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../actions/logout';

interface DispatchPropsInterface {
  logout: ({ force }: { force: boolean }) => {};
}

const TopBar = (props: DispatchPropsInterface) => {
  const { logout } = props;
  return (
    <div className="top-bar">
      <div className="top-bar-left"></div>
      <div className="top-bar-right">
        <ul className="menu">
          <li>
            <div className="flex-container align-right">
              <a
                className={`medium button Secondary`}
                onClick={() => {
                  logout({ force: true });
                }}
              >
                <span className="mr-3">Logout</span>
                <i className="fa fa-4 fa-chevron-down"></i>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  logout,
};

export default connect<null, DispatchPropsInterface>(null, mapDispatchToProps)(TopBar);

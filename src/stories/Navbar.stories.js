import React from 'react';

import {DropdownItem, DropdownMenu, Navbar, NavbarItem} from '../components/Navbar';

export default {
  title: 'Reusable/Navbar',
  component: Navbar,
};

const Template = args => (
  <Navbar {...args}>
    <NavbarItem icon={'expand_more'}>
      <DropdownMenu>
        <DropdownItem leftIcon={'settings'}>My Profile</DropdownItem>
      </DropdownMenu>
    </NavbarItem>
  </Navbar>
);

export const Default = Template.bind({});
Default.args = {};

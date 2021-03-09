import React from 'react';

import Button from '../components/Button';

export default {
  title: 'Reusable/Button',
  component: Button,
};

const Template = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};

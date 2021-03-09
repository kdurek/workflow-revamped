import React from 'react';

import Input from '../components/Input';

export default {
  title: 'Reusable/Input',
  component: Input,
};

const Template = args => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {};

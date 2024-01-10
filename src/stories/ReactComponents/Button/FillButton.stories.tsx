import React from 'react';
import FillButton from '../../../components/button/FillButton';

export default {
  title: 'React Components/Button/FillButton',
  component: FillButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: ['gray', 'blue'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    children: {
      control: { type: 'text' },
    },
  },
};

export const FillButtonStory = {
  args: {
    children: '버튼',
    color: 'gray',
    size: 'md',
  },
};

export const FillButtonTestStory = {
  args: {
    children: '버튼',
    color: 'blue',
    size: 'md',
    onClick: () => {
      console.log('onClick');
    },
  },
};

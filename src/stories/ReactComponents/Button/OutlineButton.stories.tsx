import OutlineButton from '../../../components/button/OutlineButton';

export default {
  title: 'React Components/Button/OutlineButton',
  component: OutlineButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['red', 'blue'],
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
    },
  },
};

export const OutlineButtonStory = {
  args: {
    children: '버튼',
    color: 'red',
    size: 'md',
  },
};

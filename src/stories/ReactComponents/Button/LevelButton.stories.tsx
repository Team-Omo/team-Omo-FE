import LevelButton from '../../../components/button/mapActionButton/LevelButton';

export default {
  title: 'React Components/Button/LevelButton',
  component: LevelButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export const LevelButtonStory = {
  args: {
    downMapLevelHandler: () => {
      alert('down!');
    },
    upMapLevelHandler: () => {
      alert('up!');
    },
  },
};

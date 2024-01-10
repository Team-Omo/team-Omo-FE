import CurrentLocationButton from '../../../components/button/mapActionButton/CurrentLocationButton';

export default {
  title: 'React Components/Button/CurrentLocationButton',
  component: CurrentLocationButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export const CurrentLocationButtonStory = {
  args: {
    moveMyLocation: () => {
      alert('move!');
    },
  },
};

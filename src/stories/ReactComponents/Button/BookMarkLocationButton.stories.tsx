import BookMarkLocationButton from '../../../components/button/mapActionButton/BookMarkLocationButton';

export default {
  title: 'React Components/Button/BookMarkLocationButton',
  component: BookMarkLocationButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export const BookMarkLocationButtonStory = {
  args: {
    toggleBookMarkerHandler: () => {
      alert('toggle!');
    },
  },
};

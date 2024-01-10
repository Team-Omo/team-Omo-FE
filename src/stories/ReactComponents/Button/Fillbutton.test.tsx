import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../test/test-utils';

import { composeStories } from '@storybook/react';
import * as stories from './FillButton.stories';

const { FillButtonTestStory } = composeStories(stories);
describe('FillButton 컴포넌트 기능 테스트', () => {
  it('버튼 클릭 시 onClick 함수 발동하는지 확인', () => {
    const onClick = jes.fn(); // jest.fn()을 사용하여 onClick 함수를 감시합니다.
    render(
      <FillButtonTestStory {...FillButtonTestStory.args} onClick={onClick} />,
    );
    const button = screen.getByRole('button');
    button.click();
    expect(onClick).toBeCalled(); // jest.fn()을 통해 감시된 함수가 호출되었는지 확인합니다.
  });
});

import { render } from '@testing-library/react';
import Home from '../pages/index';

it('renders the homepage unchanged', () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});

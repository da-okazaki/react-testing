import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import FrameworkList from '../FrameworkList';

afterEach(() => cleanup());

const dummyData = [
  {
    id: 1,
    item: 'React',
  },
  {
    id: 2,
    item: 'Angular',
  },
  {
    id: 3,
    item: 'Vue',
  },
];

// test suites
describe('Rendering the list with props', () => {
  // test block
  test('Should render no data ! when no data propped', () => {
    render(<FrameworkList />);
    expect(screen.getByText('No data !')).toBeInTheDocument();
  });
  test('Should render list item correctly', () => {
    render(<FrameworkList frameworks={dummyData} />);
    const frameworkItems = screen.getAllByRole('listitem').map((ele) => ele.textContent);
    const dummyItems = dummyData.map((ele) => ele.item);
    expect(frameworkItems).toEqual(dummyItems);
    expect(screen.queryByText('No Data !')).toBeNull();
  });
  test('Should render snapshot', () => {
    const data = [
      {
        id: 1,
        item: 'React',
      },
      {
        id: 2,
        item: 'Angular',
      },
      {
        id: 3,
        item: 'Vue',
      },
    ];
    const tree = renderer.create(<FrameworkList frameworks={data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

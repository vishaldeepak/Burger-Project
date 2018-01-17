import React from 'react'
import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/BuildControls/BuildControls'

configure({adapter: new Adapter()})

describe('<BurgerBuilder />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder initIngredients={() => {}}/>)
 });

  it('it should render build controls when receiving ingredients' , () => {
    wrapper.setProps({ingredients: {salad: 0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1)
  })
})
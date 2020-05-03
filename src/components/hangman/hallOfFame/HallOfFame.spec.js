import React from 'react'

import { shallow } from 'enzyme'
import { expect } from 'chai'

import HallOfFame, {FAKE_HOF} from './HallOfFame'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const wrapper = shallow(<HallOfFame entries={FAKE_HOF}/>, div)
  expect(wrapper).to.matchSnapshot()
})
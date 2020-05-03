/*
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
*/

// More readable code : expect(element).to.have.something
import chai from 'chai'
// Terminating properties as functions, (usefull for debug):
// expect(element).to.have.something()
import dirtyChai from 'dirty-chai'
// Precise display for structural inequalities
import createChaiJestDiff from 'chai-jest-diff'

// Testing components more easily
import { configure as configureEnzyme } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chaiEnzyme from 'chai-enzyme'

// Contain a lot of isolation and simulation solutions (spies, stubs, mocks, etc)
import sinonChai from 'sinon-chai'

// Take snapshot of our tests
import chaiJestSnapshot from "chai-jest-snapshot"
import enzymeToJson from "enzyme-to-json/serializer"

// Allow to reate canvas div
import 'jest-canvas-mock'

chai.use(dirtyChai)
  .use(createChaiJestDiff())
  .use(chaiEnzyme())
  .use(sinonChai)
  .use(chaiJestSnapshot)

expect.addSnapshotSerializer(enzymeToJson)
// enzyme config
configureEnzyme({ adapter: new Adapter() })


import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-18';

configure({ adapter: new Adapter() });

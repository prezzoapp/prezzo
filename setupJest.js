import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

require('stacktrace-parser');

configure({ adapter: new Adapter() });

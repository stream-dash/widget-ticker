import { h, render } from 'preact';
import Widget from './widget.jsx';

const {currentScript} = document;
const {parentNode} = currentScript;

parentNode.style.position = 'relative';

render(<Widget/>, parentNode);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept();
}

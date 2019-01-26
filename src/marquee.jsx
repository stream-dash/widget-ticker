import {h, Component, createRef} from 'preact';

import styles from './marquee.scss';

const movementInterval = 7;
const movementAmount = 1;

const getCssProp = (elem, prop) =>
  getComputedStyle(elem, null).getPropertyValue(prop);

export default class Marquee extends Component {
  static defaultProps = {
    text: '',
    running: false
  };

  constructor() {
    super(...arguments);

    this.textRef = createRef();

    this.setupMarquee = this.setupMarquee.bind(this);
  }

  setupMarquee() {
    const {current: textObject} = this.textRef;

    const textWidth = getCssProp(textObject, 'width');
    const offsetWidth = textObject.parentElement.offsetWidth;

    if (!this.initialLeft) {
      const initialLeft = getCssProp(textObject, 'left');
      this.initialLeft = parseInt(initialLeft) || 0;
    }
    if (!this.availableWidth) {
      this.availableWidth = offsetWidth - this.initialLeft;
      this.availableWidth = this.availableWidth > 0 ? this.availableWidth : 0;
    }

    this.textWidth = parseInt(textWidth) || 0;

    this.resetTextPosition();
    this.doScroll();
  };

  doScroll = () => {
    if (this.props.running) {
      if (this.availableWidth < this.textWidth) {
        setTimeout(() => {
          this.moveText();
        }, movementInterval);
      } else {
        this.resetTextPosition();
      }
    }
  };

  moveText = () => {
    const {current: textObject} = this.textRef;
    const left = parseInt(getCssProp(textObject, 'left'));
    const {textWidth, initialLeft} = this;
    const pos = parseInt(left) || 0;

    if (pos - initialLeft < -(textWidth + initialLeft)) {
      textObject.style.left = textWidth;
    } else {
      textObject.style.left = left - movementAmount;
    }

    return this.doScroll();

  };

  resetTextPosition = () => {
    this.textRef.current.style.left = this.initialLeft;
  };

  render() {
    const {text} = this.props;
    const {textRef} = this;

    return (
      <div className={styles.text}>
        <p ref={textRef}>{text}</p>
      </div>
    );
  }
}

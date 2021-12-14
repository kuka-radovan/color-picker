import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './HueSlider/hue-slider.js';

@customElement('color-picker')
export class ColorPicker extends LitElement {
  render() {
    return html`
        <hue-slider></hue-slider>
    `;
  }
}

import { html, LitElement, CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { style } from './color-picker.style.js';
import './BaseColorPicker/base-color-picker.js';
import './ShadePicker/shade-picker.js';

@customElement('color-picker')
export class ColorPicker extends LitElement {
    static styles: CSSResultGroup = style;

    @state()
    private selectedHue: string = 'rgb(255, 0, 0)';

    @state()
    private selectedColor: Array<number> = [0, 0, 0];

    render() {
        return html`
            <div class="picker-wrapper">
                <div>
                    <shade-picker
                        class="shade-picker"
                        baseColor="${this.selectedHue}"
                        @change="${(event: any) => { this.selectedColor = event.detail.color }}"
                    ></shade-picker>

                    <base-color-picker
                        @change="${(event: any) => { this.selectedHue = event.detail.color }}"
                    ></base-color-picker>
                </div>
                <section>
                    <div
                        class="selected-color"
                        style="${styleMap({
                            backgroundColor: `rgb(${this.selectedColor[0]}, ${this.selectedColor[1]}, ${this.selectedColor[2]})`
                        })}"
                    ></div>

                    <ul>
                        <li>
                            R: <input type="text" .value="${this.selectedColor[0].toString()}" readonly></input>
                        </li>
                        <li>
                            G: <input type="text" .value="${this.selectedColor[1].toString()}" readonly></input>
                        </li>
                        <li>
                            B: <input type="text" .value="${this.selectedColor[2].toString()}" readonly></input>
                        </li>
                    </ul>
                </section>
            </div>
        `;
    }
}

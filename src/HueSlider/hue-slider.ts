import { html, LitElement, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import { style } from './hue-slider.style.js';

@customElement('hue-slider')
export class HueSlider extends LitElement {
    static styles: CSSResultGroup = style;

    @property({ type: Number })
    width = 300;

    @property({ type: Number })
    height = 20;

    private hueCanvas = createRef<HTMLCanvasElement>();

    private hueSlider = createRef<HTMLDivElement>();

    private hueCanvasContext: CanvasRenderingContext2D | null = null;

    private colors = ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00'];

    public connectedCallback(): void {
        if (super.connectedCallback) {
            super.connectedCallback();
        }

        // this.slider.value?.addEventListener('mousedown', (/* event */) => {
        //     // event.preventDefault();
        //     window.addEventListener('mousemove', this.handleSliderMove);
        // });

        // this.slider.value?.addEventListener('mouseup', (/* event */) => {
        //     window.removeEventListener('mousemove', this.handleSliderMove);
        // });
    }

    protected firstUpdated(): void {
        this.hueCanvasContext = this.hueCanvas.value!.getContext('2d');

        this.createColorGradient(this.hueCanvasContext!);
    }

    // protected disconnectedCallback(): void {
    //     if (super.disconnectedCallback) {
    //         super.disconnectedCallback();
    //     }

    //     // TODO: remove event
    // }

    private createColorGradient(hueCanvas: CanvasRenderingContext2D): void {
        const gradient = hueCanvas.createLinearGradient(0, 0, this.width, 0);

        // Add color stops to the gradient
        this.colors.forEach((color, index, colorList) => gradient.addColorStop(index / (colorList.length -1), color));

        // eslint-disable-next-line no-param-reassign
        hueCanvas.fillStyle = gradient;
        hueCanvas.fillRect(0, 0, this.width, this.height);
    }

    // private handleSliderMove(event: MouseEvent) {
    //     console.log(this.height, event.clientY);
    // }

    private handleMoveSlider(event: MouseEvent) {
        const x = event.offsetX - 3;
        console.log(x);
        this.hueSlider.value.style.left = `${x}px`;
    }

    render() {
        return html`
            <div
                class="hue-slider"
                style="${styleMap({
                    width: `${this.width}px`,
                    height: `${this.height}px`
                })}"
            >
                <canvas
                    ${ref(this.hueCanvas)}
                    width=${this.width}
                    height=${this.height}
                    @mousedown="${this.handleMoveSlider}"
                ></canvas>
                <div ${ref(this.hueSlider)} class="slider"></div>
            </div>
        `;
    }
}

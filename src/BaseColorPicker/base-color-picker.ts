import { html, LitElement, CSSResultGroup } from 'lit';
import { customElement, property  } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import { style } from './base-color-picker.style.js';

@customElement('base-color-picker')
export class BaseColorPicker extends LitElement {
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
    }

    protected firstUpdated(): void {
        this.hueCanvasContext = this.hueCanvas.value!.getContext('2d');
        this.initColorGradient(this.hueCanvasContext!);
    }

    private initColorGradient(hueCanvas: CanvasRenderingContext2D): void {
        const gradient = hueCanvas.createLinearGradient(0, 0, this.width, 0);

        // Add color stops to the gradient
        this.colors.forEach((color, index, colorList) => gradient.addColorStop(index / (colorList.length -1), color));

        // eslint-disable-next-line no-param-reassign
        hueCanvas.fillStyle = gradient;
        hueCanvas.fillRect(0, 0, this.width, this.height);
    }

    private handleSliderDrag = (event: MouseEvent): void => {
        let sliderPosition = event.clientX - this.hueCanvas.value.getBoundingClientRect().x;

        if (sliderPosition < 0) {
            sliderPosition = 0;
        } else if (sliderPosition > this.width) {
            sliderPosition = this.width - 1;
        }

        this.moveSliderPosition(sliderPosition);

        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                color: this.getColor(sliderPosition)
            }
        }));
    }

    private moveSliderPosition(newPosition: number): void {
        this.hueSlider.value.style.transform = `translateX(${newPosition}px)`;
    }

    private getColor(position: number) {
        const pixel = this.hueCanvasContext.getImageData(position, 1, 1, 1).data;
        return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    }

    private registerEventListeners(): void {
        window.addEventListener('mousemove', this.handleSliderDrag, true);
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', this.handleSliderDrag, true);
        }, { once: true });
    }

    render() {
        return html`
            <div
                class="base-color__picker--wrapper"
                style="${styleMap({
                    width: `${this.width}px`,
                    height: `${this.height}px`
                })}"
            >
                <canvas
                    ${ref(this.hueCanvas)}
                    width=${this.width}
                    height=${this.height}
                    @mousedown="${(event: MouseEvent) => {
                        event.preventDefault();

                        this.handleSliderDrag(event);
                        this.registerEventListeners();
                    }}"
                ></canvas>
                <div
                    ${ref(this.hueSlider)}
                    class="base-color__slider"
                    style="${styleMap({ height: `${this.height + 10}px` })}"
                    @mousedown="${(event: MouseEvent) => {
                        event.preventDefault();
                        this.registerEventListeners();
                    }}"
                ></div>
            </div>
        `;
    }
}

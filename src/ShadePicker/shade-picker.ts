import { html, LitElement, CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property  } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import { style } from './shade-picker.style.js';

interface Position {
    x: number;
    y: number;
  }

@customElement('shade-picker')
export class ShadePicker extends LitElement {
    static styles: CSSResultGroup = style;

    @property({ type: String })
    baseColor: string;

    @property({ type: Number })
    width = 300;

    @property({ type: Number })
    height = 300;

    private shadePickerCanvas = createRef<HTMLCanvasElement>();

    private colorPicker = createRef<HTMLDivElement>();

    private shadePickerContext: CanvasRenderingContext2D | null = null;

    private pickerPosition: Position = { x: 0, y: 0};

    protected firstUpdated(changedProperties: PropertyValues<this>): void {
        super.firstUpdated(changedProperties);

        this.shadePickerContext = this.shadePickerCanvas.value!.getContext('2d');
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('baseColor')) {
            const oldColor = changedProperties.get('baseColor') as string;

            if (oldColor !== this.baseColor) {
                this.initColorGradients(this.baseColor);
                this.managePickerPositionChange(this.pickerPosition);
            }
        }
    }

    private initColorGradients(color: string): void {
        const shadePickerContext = this.shadePickerCanvas.value.getContext('2d');

        // Create vertical gradient (from color to white)
        const verticalGradient = shadePickerContext.createLinearGradient(0, 0, 0, this.height);
        verticalGradient.addColorStop(0, color);
        verticalGradient.addColorStop(1, '#fff');
        shadePickerContext.fillStyle = verticalGradient; // eslint-disable-line no-param-reassign
        shadePickerContext.fillRect(0, 0, this.width, this.height);

        // Create horizontal gradient (from black to white)
        const horizontalGradient = shadePickerContext.createLinearGradient(0, 0, this.width, 0);
        horizontalGradient.addColorStop(0, '#000');
        horizontalGradient.addColorStop(1, 'rgba(0,0,0,0)');
        shadePickerContext.fillStyle = horizontalGradient; // eslint-disable-line no-param-reassign
        shadePickerContext.fillRect(0, 0, this.width, this.height);
    }

    private handleColorPickerDrag = (event: MouseEvent): void => {
        let x = event.clientX - this.shadePickerCanvas.value.getBoundingClientRect().x;
        let y = event.clientY - this.shadePickerCanvas.value.getBoundingClientRect().y;

        if (x < 0) {
            x = 0;
        } else if (x > this.width) {
            x = this.width - 1;
        }

        if (y < 0) {
            y = 0;
        } else if (y > this.height) {
            y = this.height - 1;
        }

        this.pickerPosition = { x, y };
        this.managePickerPositionChange(this.pickerPosition);
    }

    private managePickerPositionChange(position: Position): void {
        const color = this.getColor(position);
        this.movePickerPosition(position);
        this.changePickerColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);

        this.dispatchEvent(new CustomEvent('change', {
            detail: { color }
        }));
    }

    private movePickerPosition(position: Position): void {
        this.colorPicker.value.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }

    private changePickerColor(color: string): void {
        this.colorPicker.value.style.backgroundColor = color;
    }

    private getColor(position: Position): Array<number> {
        const pixel = this.shadePickerContext.getImageData(position.x, position.y, 1, 1).data;
        return [pixel[0], pixel[1], pixel[2]]
    }

    private registerEventListeners(): void {
        window.addEventListener('mousemove', this.handleColorPickerDrag, true);
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', this.handleColorPickerDrag, true);
        }, { once: true });
    }

    render() {
        return html`
            <div
                class="color-palette__wrapper"
                style="${styleMap({
                    width: `${this.width}px`,
                    height: `${this.height}px`
                })}"
            >
                <canvas
                    ${ref(this.shadePickerCanvas)}
                    width=${this.width}
                    height=${this.height}
                    @mousedown="${(event: MouseEvent) => {
                        event.preventDefault();

                        this.handleColorPickerDrag(event);
                        this.registerEventListeners();
                    }}"
                ></canvas>
                <div
                    ${ref(this.colorPicker)}
                    class="color-palette__color-picker"
                    @mousedown="${(event: MouseEvent) => {
                        event.preventDefault();
                        this.registerEventListeners();
                    }}"
                ></div>
            </div>
        `;
    }
}

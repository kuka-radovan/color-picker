import { css, CSSResultGroup } from 'lit';

export const style: CSSResultGroup = css`
    .hue-slider {
        position: relative;
        border: 1px solid #000;
    }

    .slider {
        width:6px;
        height: 30px;
        box-sizing: border-box;
        border: 2px solid #000;
        position: absolute;
        top: -5px;
        border-radius: 3px;
        cursor: pointer;
    }
`;

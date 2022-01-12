import { css, CSSResultGroup } from 'lit';

export const style: CSSResultGroup = css`
    .base-color__picker--wrapper {
        position: relative;
        border: 1px solid #000;
    }

    .base-color__slider {
        width: 6px;
        box-sizing: border-box;
        border: 2px solid #000;
        position: absolute;
        top: -5px;
        left: -3px;
        border-radius: 3px;
        cursor: pointer;
    }
`;

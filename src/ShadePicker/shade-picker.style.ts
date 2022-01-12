import { css, CSSResultGroup } from 'lit';

export const style: CSSResultGroup = css`
.color-palette__wrapper {
    position: relative;
    border: 1px solid #000;
}

.color-palette__color-picker {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 2px solid #fff;
    position: absolute;
    top: -10px;
    left: -10px;
    border-radius: 50%;
    cursor: pointer;
}
`;

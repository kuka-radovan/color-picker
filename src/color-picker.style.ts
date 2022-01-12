import { css, CSSResultGroup } from 'lit';

export const style: CSSResultGroup = css`
    .picker-wrapper {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .shade-picker {
        display: block;
        margin-bottom: 1rem;
    }

    .selected-color {
        height: 80px;
        width: 80px;
        border: 1px solid #000;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li:not(:first-of-type) {
        margin-top: 0.5rem;
    }

    input {
        width: 50px;
    }
`;

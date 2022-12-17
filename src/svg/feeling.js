import React from 'react';
function Feeling({ color }) {
    return (
        <svg width="25" height="25" fill={color} viewBox="0 0 24 24">
            <g fillRule="evenodd">
                <path
                    d="M460.785 169.5c.49 0 .841.476.712.957-.623 2.324-2.837 4.043-5.473 4.043-2.636 0-4.85-1.719-5.473-4.043-.13-.48.222-.957.712-.957h9.522z"
                    transform="translate(-444 -156)"
                ></path>
                <path
                    fillRule="nonzero"
                    d="M467.524 168c0 6.351-5.149 11.5-11.5 11.5s-11.5-5.149-11.5-11.5 5.149-11.5 11.5-11.5 11.5 5.149 11.5 11.5zm-2 0a9.5 9.5 0 10-19 0 9.5 9.5 0 0019 0z"
                    transform="translate(-444 -156)"
                ></path>
                <path
                    d="M453.024 165c0 .829-.56 1.5-1.25 1.5s-1.25-.671-1.25-1.5.56-1.5 1.25-1.5 1.25.671 1.25 1.5m8.5 0c0 .829-.56 1.5-1.25 1.5s-1.25-.671-1.25-1.5.56-1.5 1.25-1.5 1.25.671 1.25 1.5m-.739 4.5h-9.522c-.49 0-.841.476-.712.957.623 2.324 2.837 4.043 5.473 4.043 2.636 0 4.85-1.719 5.473-4.043.13-.48-.222-.957-.712-.957m-2.165 2c-.667.624-1.592 1-2.596 1a3.799 3.799 0 01-2.596-1h5.192"
                    transform="translate(-444 -156)"
                ></path>
            </g>
        </svg>
    );
}

export default Feeling;

import React from 'react';

export interface Props {
    name: string
}

export default function TestComponent(props: Props) {
    return (
        <div>
            derp, {props.name}
        </div>
    )
}
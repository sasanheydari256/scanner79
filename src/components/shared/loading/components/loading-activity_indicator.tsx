import React from 'react'
import { LoadingProps } from '../loading-types'
import { MotiView } from 'moti'

export default function activity_indicator({
    size = 30,
    color = '#564'
}: LoadingProps) {

    return (
        <MotiView
            from={{
                rotate: '0deg',
            }}
            animate={{
                rotate: '360deg',
            }}
            transition={{
                type: 'timing',
                duration: 1000,
                repeatReverse: false,
                loop: true,
            }}
            style={{
                width: size,
                height: size,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
        </MotiView>
    )
}

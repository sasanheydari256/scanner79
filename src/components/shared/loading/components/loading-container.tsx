import React from 'react'
import {View} from 'react-native'
import { LoadingContainerProps } from '../loading-types'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants/Screen'

export default function container ({
    width = SCREEN_WIDTH,
    height = SCREEN_HEIGHT,
    children
}: LoadingContainerProps) {

    const container : any = {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height
    }

    return <View style={container}>{children}</View>
}
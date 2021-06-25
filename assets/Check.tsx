import Svg, {
    G,
    Path,
} from 'react-native-svg';

import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Check: React.FC<{style: object, width: number | undefined, height: number | undefined}> = ({style, width = 40, height = 40}) => {
    return (
        <View style={{
            width: width, height: height,
        }}>
            <Svg
                x="0px" 
                y="0px"
                viewBox="0 0 32.296 32.296"
                width={width}
                height={height}
            >
                <G>
                    <Path
                        style={style}
                        d="M31.923,9.14L13.417,27.642c-0.496,0.494-1.299,0.494-1.793,0L0.37,16.316
		c-0.494-0.496-0.494-1.302,0-1.795l2.689-2.687c0.496-0.495,1.299-0.495,1.793,0l7.678,7.729L27.438,4.654
		c0.494-0.494,1.297-0.494,1.795,0l2.689,2.691C32.421,7.84,32.421,8.646,31.923,9.14z"/>
                </G>
            </Svg>
        </View>
    )
}
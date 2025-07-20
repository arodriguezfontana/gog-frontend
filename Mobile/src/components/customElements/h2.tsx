import { Text } from 'react-native'
import React from 'react'
import { TextProps } from 'react-native';

type H2Props = React.PropsWithChildren<TextProps>;

const H2: React.FC<H2Props> = ({ children, ...props }) => {
    return (
        <Text
            style={[
                {
                    fontWeight: '600',
                    fontSize: 24,
                    lineHeight: 28,
                    letterSpacing: 0,
                    textTransform: 'uppercase',
                    width: '100%',
                    textAlign: 'left'
                },
                props.style
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

export default H2; 

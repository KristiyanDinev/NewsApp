import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';


export default function ScaledImage(props) {

    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    //const [imageLoading, setImageLoading] = useState(true)

    useEffect(() => {
        Image.getSize(props.uri, (width1, height1) => {
            if (props.width && !props.height) {
                setWidth(props.width)
                setHeight(height1 * (props.width / width1))
                
            } else if (!props.width && props.height) {
                setWidth(width1 * (props.height / height1))
                setHeight(props.height)

            } else {
                setWidth(width1)
                setHeight(height1)
            }
            //setImageLoading(false)
        }, (error) => {
            //console.log("ScaledImage,Image.getSize failed with error: ", error)
        })
    }, [])

    let s = 1.129; // 1.129
    return (
        height ?
            <View style={{// position: 'absolute', top: 0
                height: height * s, width: width * s ,
                borderRadius: 30, marginTop: -141
                }}>
                <Image
                    source={{ uri: props.uri }}
                    style={{ height: height * s, width: width * s, borderRadius: 30, resizeMode: 'stretch'}}
                />
            </View>
            :  null
    );
};
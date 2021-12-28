import React, {useEffect, useRef, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
    Easing,
} from 'react-native';

const {width} = Dimensions.get('window');
const available_width = width - 40 - 6;

const Progress = ({onDone}) => {
    const [progressState, setProgressState] = useState(0);
    const progress = useRef(new Animated.Value(0)).current;

    const getProgressStyles = () => {
        var animated_width = progress.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [0, available_width / 2, available_width],
        });
        //red -> orange -> green
        const color_animation = progress.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [
                'rgb(199, 45, 50)',
                'rgb(224, 150, 39)',
                'rgb(101, 203, 25)',
            ],
        });

        return {
            width: animated_width,
            height: 50, //height of the progress bar
            backgroundColor: color_animation,
        };
    };

    useEffect(() => {
        progress.addListener(progress => {
            setProgressState(parseInt(progress.value));
        });

        Animated.timing(progress, {
            duration: 1000,
            toValue: 100,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start(() => {
            if (onDone) onDone();
        });
    }, [progress]);

    return (
        <View style={styles.container}>
            <View style={styles.progress_container}>
                <Animated.View style={[getProgressStyles()]}></Animated.View>
            </View>
            <Text style={styles.progress_status}>{progressState}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    progress_container: {
        borderWidth: 3,
        borderColor: '#333',
        backgroundColor: '#ccc',
    },
    progress_status: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});

export default Progress;

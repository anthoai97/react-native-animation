import React from 'react';
import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const available_width = width - 40 - 12;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    progress_container: {
        borderWidth: 6,
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

const Progress = () => {
    return (
        <View>
            <Text>Progress Component</Text>
        </View>
    );
};

export default Progress;

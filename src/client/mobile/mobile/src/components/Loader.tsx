import React from "react";
import {Text, View, StyleSheet} from "react-native";

const Loader = () => {
    return (
        <View style={styles.loader}>
            <Text style={styles.loaderText}>Загрузка...</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        opacity: 0.85,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loaderText: {
        color: '#000',
        fontSize: 18
    }
});

export default Loader;
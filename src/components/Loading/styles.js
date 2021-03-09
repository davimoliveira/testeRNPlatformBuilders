import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#201594',
    },
    img:{
        width: Dimensions.get("window").width,
        height:( Dimensions.get("window").width*0.75),
    },
})

export default styles;
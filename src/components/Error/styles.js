import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#201594',
    },
    img:{
        width: Dimensions.get("window").width*0.4,
        height:( Dimensions.get("window").width*0.4*0.87),
    },
    message:{
        fontSize: 28, 
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    cidade: {
        fontSize: 20, 
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        textTransform:"capitalize",
    },
    containerInferior:{
        flexDirection:"row",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
})

export default styles;
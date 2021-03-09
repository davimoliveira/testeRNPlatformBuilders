import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cidade: {
        fontSize: 28, 
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        textTransform:"capitalize",
    },
    btAtualizar: {
        fontSize: 20, 
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        textTransform:"capitalize",
    },
    temperatura: {
        fontSize: 130, 
        color: "#fff",
        textAlign: "center",
        margin:0,
    },
    condicao:{
        color: "#fff",
        textAlign: "center",
        fontSize: 22, 
        textTransform:"capitalize",
        margin:0,
    },
    mini: {
        fontSize: 18, 
        fontWeight: 'bold'
    },
    icon: {
        width: Dimensions.get("window").width*0.3,
        height: Dimensions.get("window").width*0.3,
    },
    containerInferior:{
        flexDirection:"column",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "rgba(0,0,0,0.4)",
        width:"80%",
        textAlign:"center"
    },
    containerTxtInferior:{
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    minMax:{
        fontSize: 60, 
        color: "#fff",
        textAlign: "center",
    },
    txtInferior:{
        fontSize: 20, 
        color: "#fff",
        textAlign: "center",
    },
    txtMiniInferior:{
        fontSize: 14, 
        marginBottom: 10,
        color: "#fff",
        textAlign: "center",
    },
    containerIcons:{
        flexDirection:"column",
        backgroundColor: "#fff",
        width:"100%",
        alignSelf:"center",
        borderRadius: 20,
        padding: 5,
        marginVertical:5,
        alignItems:"center",
        justifyContent:"space-between"
    },
    iconSet:{
        width:Dimensions.get("window").width*0.08,
        height:Dimensions.get("window").width*0.08,
    },
    iconTxt:{
        color: "#000",
        fontSize: 18,
    },
    lineIcons:{
        flexDirection: "row",
        justifyContent:"space-between",
        width:"100%"   
    }
});

export default styles;
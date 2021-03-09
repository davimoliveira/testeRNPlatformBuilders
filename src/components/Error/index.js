import React from "react";
import {View, Image, Text, TouchableOpacity} from "react-native";
import styles from "./styles.js";

export default function Error (props) {
    return(
        <View style={styles.container}>
            <View />
            <Text style={styles.message}>{props.mensagem}</Text>
            <Image style={styles.img} source={require("../../assets/sad.png")} />
            <TouchableOpacity style={styles.containerInferior} onPress={() => {props.verificaTempo()}} >
                <Text style={styles.cidade}>
                    Atualizar
                </Text>
            </TouchableOpacity>
            <View />
        </View>
    );
}

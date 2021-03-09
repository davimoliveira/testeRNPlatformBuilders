import React from "react";
import {View, Image} from "react-native";
import styles from "./styles.js";

export default function Loading () {
    return(
        <View style={styles.container}>
            <Image style={styles.img} source={require("../../assets/loading.gif")} />
        </View>
    );
}

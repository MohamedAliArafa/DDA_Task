import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const Header = ({title}) => {
    return (
        <TouchableOpacity style={styles.listItem} onPress={()=> {
            Alert.alert("Welcome", "Hello")
        }}>
            <View style={styles.listItemView}>
                <Text style={styles.listItemText}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

Header.defaultProps = {
    title: "Happy Meter"
}

const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        // backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        alignItems: "center",
        borderColor: '#eee'
    },
    listItemView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    listItemText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default Header
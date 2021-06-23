import React from "react";
import Moment from 'moment';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

const ListItem = ({ item }) => {

    const dispatch = useDispatch();
    return (
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemView}>
                <Text style={styles.listItemText}>
                    {item.text}
                </Text>
                <Text style={styles.listItemText}>
                    {Moment(item.dateAdd).format('HH:ss d MMM')}
                </Text>
                <TouchableOpacity style={styles.listItemDelete} onPress={() => {
                    dispatch({
                        type: "DELETE_ITEM",
                        id: item.id
                    })
                }}>
                    <MaterialCommunityIcons name={"trash-can"} color="white" size={30} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

ListItem.defaultProps = {
    title: "Empty"
}

const styles = StyleSheet.create({
    listItem: {
        height: 50,
        padding: 15,
        backgroundColor: '#41729F',
        borderBottomWidth: 1,
        borderColor: "white"
    },
    listItemView: {
        height: 50,
        ...StyleSheet.absoluteFillObject,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center"
    },
    listItemText: {
        width: 120,
        color: "white",
        fontSize: 16,
        padding: 16,
        textTransform: 'capitalize'
    },
    listItemDelete: {
        color: "white",
        padding: 40
    }
})

export default ListItem
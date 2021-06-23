import React from "react";
import Moment from 'moment';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const ListItem = ({item}) => {
    return (
        <TouchableOpacity style={styles.listItem} onPress={()=> {
            Alert.alert("Welcome", item.text)
        }}>
            <View style={styles.listItemView}>
                <Text style={styles.listItemText}>
                   {item.text} {Moment(item.dateAdd).format('d MMM') }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

ListItem.defaultProps = {
    title: "Empty"
}

const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    listItemView: {
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center"
    },
    listItemText: {
        fontSize: 18,
        textTransform: 'capitalize'
    }
})

export default ListItem
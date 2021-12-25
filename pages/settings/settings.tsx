import React from "react"
import { View, Text, SafeAreaView, StyleSheet } from "react-native"
import AddSchedule from "./addSchedule"
import ChangeName from "./changeName"


const Settings : React.FC = () => {

    return (
        <>

            <SafeAreaView style={{backgroundColor: "#34495e"}} />
            <View style={styles.jobHeader}>
                <Text style={styles.jobHeaderText}>Settings</Text>
            </View>

            <View style={styles.container}>

                <Text style={styles.header}>Add Schedule</Text>
                <AddSchedule />
                <ChangeName />
        
            </View>

        
        </>
    )

}

const styles = StyleSheet.create({

    container: {
        margin: 8
    },
    jobHeader: {
        backgroundColor: "#34495e",
        alignSelf: "stretch",
        textAlign: "center",
        padding: 18,
        marginTop: -15,
        flexDirection: "row",
        justifyContent: "center"
    },

    jobHeaderText: {
        fontSize: 24,
        color: "#ecf0f1",
        fontWeight: "bold"
    },

    viewContainer: {
        backgroundColor: "white",
        padding: 4,
        borderRadius: 8,
        marginTop: 8
    },

    header: {
        color: "#34495e",
        fontWeight: "bold",
        margin: 6,
        fontSize: 22
    }

})

export default Settings
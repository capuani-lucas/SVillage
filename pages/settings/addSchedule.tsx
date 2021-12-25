import React, { useState } from "react"
import { View, Text, SafeAreaView, StyleSheet, TextInput, Pressable, Alert } from "react-native"
import { useDispatch } from "react-redux";
import { addSchedule } from "../../redux/actions/actions";


const AddSchedule : React.FC = () => {

    const [input, setInput] = useState<string>("");

    const dispatch = useDispatch();

    const alert = (passed: boolean): void => {
        if (passed) {
            Alert.alert(
                "Schedule Added"
            )
        } else {
            Alert.alert(
                "Schedule Not Added",
                "The data is malformed"
            )
        }
    }

    const handlePress = () => {

        try {
            const parsed = JSON.parse(input);


            if (!parsed.shifts) {
                return alert(false);
            }

            alert(true);
            dispatch(addSchedule(parsed));

        } catch (error) {
            console.log(error)
            alert(false)
        }

        setInput("");

    }

    return (
        <>

            <TextInput 
                placeholder="Paste schedule data here"
                placeholderTextColor="black"
                style={styles.textInput}
                onChangeText={setInput}
                value={input}
            />

            <Pressable style={styles.submit} onPress={handlePress}>
                <Text style={styles.submitText}>Submit</Text>
            </Pressable>


        </>
    )

}

const styles = StyleSheet.create({


    viewContainer: {
        backgroundColor: "white",
        padding: 4,
        borderRadius: 8,
        marginTop: 8
    },

    textInput: {
        height: 80,
        borderWidth: 1,
        padding: 10,
        borderColor: "#34495e"
    },
    
    submit: {
        backgroundColor: "#34495e",
        marginTop: 8,
        borderRadius: 6,
        padding: 14,
        alignItems: "center",
        marginBottom: 10
    },

    submitText: {
        color: "white"
    }

})

export default AddSchedule
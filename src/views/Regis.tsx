import React from "react";
import { Text, View, Button } from "react-native";

import ReactNativeBiometrics from 'react-native-biometrics';


const rnBiometrics = new ReactNativeBiometrics()

export default function Regis({ navigation }) {
    rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
        .then((resultObject) => {
            const { success } = resultObject

            if (success) {
                console.log('successful biometrics provided')
                console.log(resultObject)
                navigation.navigate('Todo')
            } else {
                console.log('user cancelled biometric prompt')
                navigation.navigate('Home')
            }
        })
        .catch(() => {
            console.log('biometrics failed')
            navigation.navigate('Home')
        })

    return (
        <View>
            {/* <Button
                title="Back to Authenticate View"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                onPress={() => navigation.navigate('Home')}
            />

            <Button
                title="Todo Page"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                onPress={() => navigation.navigate('Todo')}
            /> */}
        </View>
    )
}

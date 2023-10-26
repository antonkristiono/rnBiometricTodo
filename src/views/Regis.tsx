import React,{useState,useEffect} from "react";
import { Text, View, Button } from "react-native";
import {MMKV} from 'react-native-mmkv'

import ReactNativeBiometrics from 'react-native-biometrics';


const rnBiometrics = new ReactNativeBiometrics()

export const storage = new MMKV()

export default function Regis({ navigation }) {
    const [statusBio, SetStatusBio] = useState(false)

    rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
                .then((resultObject) => {
                    const { success } = resultObject

                    if (success) {
                        console.log('successful biometrics provided')
                        /* console.log(resultObject.success) */
                        storage.set('status.biometric', resultObject.success)
                        const status = storage.getBoolean('status.biometric')
                        SetStatusBio(status)
                        /* console.log(status) */
                        navigation.navigate('Todo')
                    } else {
                        console.log('user cancelled biometric prompt')
                        console.log(resultObject)
                        storage.set('status.biometric', resultObject.success)
                        const status = storage.getBoolean('status.biometric')
                        SetStatusBio(status)
                        navigation.navigate('Home')
                    }
                })
                .catch(() => {
                    console.log('biometrics failed')
                    /* console.log(resultObject) */
                    navigation.navigate('Home')
                })

    useEffect(()=> {
        statusBio ? navigation.navigate('Todo') : navigation.navigate('Home')
    },[])

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

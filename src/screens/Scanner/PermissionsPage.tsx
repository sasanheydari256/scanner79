// PermissionsPage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform, Linking, StyleSheet } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

const PermissionsPage = () => {
    // useEffect(() => {
    //     const requestCameraPermission = async () => {
    //         try {
    //             if (Platform.OS === 'android') {
    //                 // Request Camera Permission for Android
    //                 const granted = await PermissionsAndroid.request(
    //                     PermissionsAndroid.PERMISSIONS.CAMERA,
    //                     {
    //                         title: 'Camera Permission',
    //                         message: 'This app needs access to your camera to take pictures.',
    //                         buttonPositive: 'OK',
    //                     }
    //                 );
    //                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                     console.log('Camera permission granted for Android');
    //                     resetCamera()
    //                     setHasPermission(true);
    //                     // setTorchEnabled(false); // Enable torch after permission is granted
    //                     setIsCameraActive(true); // Enable torch after permission is granted
    //                 } else {
    //                     console.warn('Camera permission denied for Android');
    //                 }
    //             } else {
    //                 // Request Camera Permission for iOS
    //                 const permission = await request(PERMISSIONS.IOS.CAMERA);
    //                 if (permission === RESULTS.GRANTED) {
    //                     console.log('Camera permission granted for iOS');
    //                     resetCamera()
    //                     setHasPermission(true);
    //                     // setTorchEnabled(false); // 
    //                     setIsCameraActive(true); // Enable torch after permission is granted
    //                 } else {
    //                     console.warn('Camera permission denied for iOS');
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error requesting camera permission:', error);
    //         }
    //     };

    //     const checkCameraPermission = async () => {
    //         try {
    //             if (Platform.OS === 'android') {
    //                 const granted = await PermissionsAndroid.check(
    //                     PermissionsAndroid.PERMISSIONS.CAMERA
    //                 );
    //                 if (granted) {
    //                     console.log('Camera permission already granted for Android');

    //                     // setTorchEnabled(false); // Enable torch if permission is already granted
    //                     resetCamera()
    //                     setHasPermission(true);
    //                 } else {
    //                     await requestCameraPermission();
    //                 }
    //             } else {
    //                 const result = await check(PERMISSIONS.IOS.CAMERA);
    //                 if (result === RESULTS.GRANTED) {
    //                     console.log('Camera permission already granted for iOS');
    //                     setHasPermission(true);
    //                     resetCamera()
    //                     // setTorchEnabled(false); // Enable torch if permission is already granted
    //                 } else {
    //                     await requestCameraPermission();
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error checking camera permission:', error);
    //         }
    //     };

    //     checkCameraPermission();
    // }, []);
    const [cameraPermission, setCameraPermission] = useState<string>('checking');

    useEffect(() => {
        checkCameraPermission();
    }, []);

    const checkCameraPermission = async () => {
        const permissionType = Platform.select({
            ios: PERMISSIONS.IOS.CAMERA,
            android: PERMISSIONS.ANDROID.CAMERA,
        });

        if (!permissionType) return;

        const result = await check(permissionType);
        setCameraPermission(result);
    };

    const requestCameraPermission = async () => {
        const permissionType = Platform.select({
            ios: PERMISSIONS.IOS.CAMERA,
            android: PERMISSIONS.ANDROID.CAMERA,
        });

        if (!permissionType) return;

        const result = await request(permissionType);
        setCameraPermission(result);
    };

    const renderContent = () => {
        switch (cameraPermission) {
            case RESULTS.GRANTED:
                return <Text style={styles.text}>Camera permission granted ✅</Text>;

            case RESULTS.DENIED:
                return (
                    <>
                        <Text style={styles.text}>Camera permission denied ❌</Text>
                        <Button title="Request Permission" onPress={requestCameraPermission} />
                    </>
                );

            case RESULTS.BLOCKED:
                return (
                    <>
                        <Text style={styles.text}>Camera access blocked. Please enable it in settings.</Text>
                        <Button title="Open Settings" onPress={openSettings} />
                    </>
                );

            default:
                return <Text style={styles.text}>Checking permissions...</Text>;
        }
    };

    return <View style={styles.container}>{renderContent()}</View>;
};

export default PermissionsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
});

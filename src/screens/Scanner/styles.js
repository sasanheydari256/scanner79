import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: '1%',
        backgroundColor: '#f4f4f4',


    },
    qrSection: {
        alignItems: 'flex-start',
        padding: 5,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 16,
        bottom: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '100%'
    },
    qrSectionTablet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    qrText: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    qrSubText: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
    },
    infoSection: {
        padding: 5,
        backgroundColor: '#ffffff',
        borderRadius: 1,
        marginBottom: 6,
    },
    infoSectionTablet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subHeaderText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    trackText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 4,
    },
    dateText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    instructionText: {
        fontSize: 11,
        color: '#555',
        marginBottom: 1,
    },
    statsContainer: {
        marginTop: 1,
    },
    statText: {
        fontSize: 14,
        color: '#333',
    },
    statValue: {
        fontWeight: 'bold',
    },
    checkInSection: {
        padding: 16,
        borderRadius: 8,
        alignSelf: 'center',
        width: 'auto',
        height: '100%'
    },
    checkInSectionTablet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkInText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: 8,
        alignSelf: 'center'
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    registrationId: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    dateTime: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    roleText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

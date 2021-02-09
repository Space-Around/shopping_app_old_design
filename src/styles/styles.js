import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",    
        position: 'relative'            
    },
    customInput: {
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 10,       
        alignItems: 'center',
        width: 300,
        height: 50,
        position: 'relative'
    },
    customButton: {
        width: 300,
        height: 50,
        borderRadius: 100,
        backgroundColor: "#79408C",
        justifyContent: 'center',
        alignItems: 'center'
    },
    openEnable: {
        backgroundColor: '#79408C'
    },
    openDisable: {
        backgroundColor: '#908394'
    },
});

export default styles;

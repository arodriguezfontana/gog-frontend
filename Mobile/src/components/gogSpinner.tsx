import Spinner from 'react-native-loading-spinner-overlay';

const GogSpinner = () => {
    return (
        <Spinner
            visible={true}
            textStyle={{ color: '#000' }}
            color="#800080"
        />
    )
};

export default GogSpinner;

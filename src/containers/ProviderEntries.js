import { connect } from 'react-redux';
import ProviderEntries from "../components/ProviderEntries/ProviderEntries";
import {setIsHomePage} from "../redux/actions";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        provider: state.provider,
        isHomePage: state.isHomePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsHomePage: (isHomePage) => dispatch(setIsHomePage(isHomePage)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProviderEntries);
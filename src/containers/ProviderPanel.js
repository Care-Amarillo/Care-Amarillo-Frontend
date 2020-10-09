import { connect } from 'react-redux';
import ProviderPanel from "../components/Provider/ProviderPanel";
import {setIsHomePage} from "../redux/actions";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        isHomePage: state.isHomePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsHomePage: (isHomePage) => dispatch(setIsHomePage(isHomePage)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProviderPanel);
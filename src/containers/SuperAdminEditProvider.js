import { connect } from 'react-redux';
import SuperAdminEditProvider from "../components/SuperAdminProviders/SuperAdminEditProvider";
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


export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminEditProvider);
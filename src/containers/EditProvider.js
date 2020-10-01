import { connect } from 'react-redux';
import EditProvider from "../components/Provider/EditProvider";
import {setProvider,setIsHomePage} from "../redux/actions";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        isHomePage: state.isHomePage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProvider: (provider) => dispatch(setProvider(provider)),
        setIsHomePage: (isHomePage) => dispatch(setIsHomePage(isHomePage)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProvider);
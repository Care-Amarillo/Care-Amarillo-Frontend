import { connect } from 'react-redux';
import { setToken,setIsHomePage} from '../redux/actions';
import Register from "../components/Register/Register";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        isHomePage: state.isHomePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (submitEvent) => dispatch(setToken(submitEvent)),
        setIsHomePage: (isHomePage) => dispatch(setIsHomePage(isHomePage)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
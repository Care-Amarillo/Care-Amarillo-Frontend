import { connect } from 'react-redux';
import { setIsHomePage} from '../redux/actions';
import ResetPassword from "../components/Login/ResetPassword";

const mapStateToProps = (state) => {
    return {
        isHomePage: state.isHomePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsHomePage: (isHomePage) => dispatch(setIsHomePage(isHomePage)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
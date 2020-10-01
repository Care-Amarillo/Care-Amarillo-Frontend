import { connect } from 'react-redux';
import {setIsHomePage} from "../redux/actions";
import LandingPage from "../components/LandingPage/LandingPage";

const mapStateToProps = (state) => {
    return {
        isHomePage: state.isHomePage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsHomePage: (isHomePage) => dispatch(setIsHomePage(isHomePage)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
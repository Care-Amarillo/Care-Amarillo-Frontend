import { connect } from 'react-redux';
import {setUser,setIsHomePage} from "../redux/actions";
import ProviderDetail from "../components/ProviderDetail/ProviderDetail";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        isHomePage:state.isHomePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        setIsHomePage: (isHomePage) => dispatch(setIsHomePage(isHomePage)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProviderDetail);
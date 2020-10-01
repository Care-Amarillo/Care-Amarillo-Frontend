import { connect } from 'react-redux';
import {setUser,setIsHomePage} from "../redux/actions";
import EditUser from "../components/User/EditUser";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        isHomePage: state.isHomePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        setIsHomePage: (isHomePage) => dispatch(setIsHomePage(isHomePage)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
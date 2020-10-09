import { connect } from 'react-redux';
import {setIsHomePage, setUser} from "../redux/actions";
import AuditEntries from "../components/AuditEntries/AuditEntries";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        isHomePage: state.isHomePage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsHomePage: (isHomePage) => dispatch(setIsHomePage(isHomePage)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuditEntries);
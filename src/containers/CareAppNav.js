import { connect } from 'react-redux';
import {unsetToken, unsetUser, setOpen, setIsHomePage} from "../redux/actions";
import CareAppNav from "../components/CareAppBar/CareAppNav";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        mobileOpen: state.mobileOpen,
        isHomePage: state.isHomePage,
        provider: state.provider,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        unsetToken: (token) => dispatch(unsetToken(token)),
        unsetUser: (user) => dispatch(unsetUser(user)),
        setOpen: (open) => dispatch(setOpen(open)),
        setIsHomePage: (isHomePage) => dispatch(setIsHomePage(isHomePage)),
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(CareAppNav);
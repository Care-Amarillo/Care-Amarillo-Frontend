import { connect } from 'react-redux';
import CareAppDrawer from "../components/CareAppBar/CareAppDrawer";
import {setOpen, unsetToken, unsetUser} from "../redux/actions";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
        provider: state.provider,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        unsetToken: (token) => dispatch(unsetToken(token)),
        unsetUser: (user) => dispatch(unsetUser(user)),
        setOpen: (open) => dispatch(setOpen(open)),
    }
}




export default connect(mapStateToProps,mapDispatchToProps)(CareAppDrawer);
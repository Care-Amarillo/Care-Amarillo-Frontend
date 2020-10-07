import { connect } from 'react-redux';
import SuperAdminEditUser from "../components/SuperAdminUsers/SuperAdminEditUser";

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}



export default connect(mapStateToProps)(SuperAdminEditUser);
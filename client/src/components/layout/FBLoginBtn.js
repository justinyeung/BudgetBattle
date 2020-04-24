import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/userActions';

const FBLoginBtn = ({ user, getUser }) => {
    const onSubmit = () => {
        getUser();
    }

    return(
        <div>
            <a href="http://localhost:5000/api/fbauth/login/">Login to Facebook</a>
            <br />
            <button onClick={onSubmit}>Get User Info To State</button>
        </div>
    )
}

FBLoginBtn.propTypes = {
    getUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { getUser })(FBLoginBtn);
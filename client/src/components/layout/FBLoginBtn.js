import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/userActions';

// const showUser = false;

const FBLoginBtn = ({ user, getUser }) => {
    const onSubmit = () => {
        getUser();
        // showUser = true;
    }

    return(
        <div>
            <a href="http://localhost:5000/api/fbauth/login/">Login to Facebook</a>
            <a href="#" onClick={onSubmit}>Get User Info</a>
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
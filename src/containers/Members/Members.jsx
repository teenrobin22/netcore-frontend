import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import alertify from 'alertifyjs';
import * as actions from '../../store/actions/actionsIndex';
import MemberCard from './../../components/Cards/MemberCard/MemberCard';
import Pagination from '../../components/UI/Pagination';
import FilterHeader from './FilterHeader';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Moment from 'react-moment';

class Members extends Component {
  state = {
    currentPage: 1,
    pageSize: 5,
    userParams: {
      gender: '',
      minAge: '',
      maxAge: '',
      orderBy: '',
      UserId: ''
    }
  };

  componentDidMount() {

    const { currentPage, pageSize } = this.state;
    const { currentUser, onGetUsers, onActivities } = this.props;

    const userParams = { ...this.state.userParams };
    userParams.gender = currentUser.gender === 'female' ? 'male' : 'female';
    userParams.minAge = 18;
    userParams.maxAge = 99;
    userParams.orderBy = 'lastActive';
    userParams.UserId = currentUser.id;


    onGetUsers(currentPage, pageSize, userParams)
      .then(() => {

        const { pagination, users } = this.props;
        this.setState({ userParams });
        this.setState({ currentPage: pagination.currentPage });

      })
      .catch(error => {
        if (this.props.error) {
          alertify.error('Problem retrieving data');
          alertify.warning(this.props.error.response.statusText);
          this.props.history.push('/home');
        }
      });


    onActivities(currentPage, pageSize, userParams)
      .then(() => {

        const { paginado, activities } = this.props;
        this.setState({ userParams });
        this.setState({ currentPage: paginado.currentPage });

      })
      .catch(error => {

        if (this.props.error) {
          alertify.error('Problem retrieving data');
          alertify.warning(this.props.error.response.statusText);
          this.props.history.push('/home');
        }
      });

  }


  loadActivities = page => {

    const { pageSize, userParams } = this.state;
    this.props.onActivities(page, pageSize, userParams).then(() => {
      this.setState({ currentPage: this.props.paginado.currentPage });
    });
    if (this.props.error) {
      alertify.error('Problem retrieving data');
    }
  };

  handleRedirectToDetail = id => {
    this.props.history.push('/members/' + id);
  };

  handlePageChange = page => {
    this.loadUsers(page);
  };

  handlePageChangeActivity = page => {
    this.loadActivities(page);
  }

  handleOnChange = e => {
    const userParams = { ...this.state.userParams };
    userParams[e.target.name] = e.target.value;
    this.setState({ userParams });
  };

  handleApplyFilters = () => {
    this.loadUsers(1);
  };

  handleResetFilters = () => {
    const { userParams } = this.state;
    const { currentUser } = this.props;
    userParams.gender = currentUser.gender === 'female' ? 'male' : 'female';
    userParams.minAge = 18;
    userParams.maxAge = 99;
    this.loadUsers(1);
  };

  redirectTo = () => {
    this.props.history.push('/members/0');
  }

  doEliminante = async (id)=> {

    alertify.defaults.theme.ok = 'btn btn-primary';
    alertify.defaults.theme.cancel = 'btn btn-warning';
    alertify.confirm(
      'Wait..Before continue',
      'Are you sure you want to delete this activity?',
      async () => {
     await this.props.onDeleteActivity(id);
      const { error, history } = this.props;
        if (error) alertify.warning(this.props.error);
        else alertify.success('Activity has been deleted');
        this.loadActivities(1);

    },
    () => {}
    );



  }

  render() {
    const { users, pagination, paginado, activities } = this.props;
    const data = activities;

    const { currentPage, userParams, genderList, orderByList } = this.state;

    let paginationInfoArea = <h2>My Activities</h2>;


    let paginationAreActivity = <p>There is no pages</p>;
    let tableActivity = null;
    if (paginado) {

      const { itemsPerPage, totalItems, totalPages } = paginado;


      tableActivity = (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Activity</th>
                <th>Activity date</th>
                <th>Registration date</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => {
                return (
                  <tr key={activity.id}>
                    <td>{activity.id}</td>
                    <td>{activity.descripcion}</td>
                    <td><Moment format="DD/MM/YYYY">{activity.fechaActividad}</Moment></td>
                    <td><Moment format="DD/MM/YYYY">{activity.fechaRegistro}</Moment></td>
                    <td>
                      <button
                        className='btn btn-primary btn-icon'
                        onClick={() => this.handleRedirectToDetail(activity.id)}
                        title='Edit'
                      >
                        <i className='fa fa-pencil' />
                      </button>
                      {" "}
                      <button
                        className='btn btn-primary btn-icon'
                        onClick={() => this.doEliminante(activity.id)}
                        title='Eliminate'
                      >
                        <i className='fa fa-trash' />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      paginationAreActivity = (

        <Pagination
          itemsCount={totalItems}
          pageSize={itemsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChangeActivity}
        />
      );

    }





    return (
      <Fragment>
        <div className='text-center mt-3'>{paginationInfoArea}</div>
        <div className='container mt-3 justify-content-center'>
          <br/>
          <div  className='text-center mt-12'>
            <button
              type='button'
              className='btn btn-primary '
              style={{ marginLeft: '10px' }}
              onClick={this.redirectTo}
            >
              Add Activity
      </button>

          </div>
          <br />
          <div className='row justify-content-center'>{tableActivity}</div>
        </div>
        <div className='d-flex justify-content-center'>{paginationAreActivity}</div>
      </Fragment>

    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    currentUser: state.auth.currentUser,
    pagination: state.user.pagination,
    error: state.user.error,
    activities: state.activity.activities,
    paginado: state.activity.pagination
  };
};

const mapDispacthToProps = dispatch => {
  return {
    onGetUsers: (pageNumber, pageSize, userParams) =>
      dispatch(actions.getUsers(pageNumber, pageSize, userParams)),

    onActivities: (pageNumber, pageSize, userParams) =>
      dispatch(actions.getPaginado(pageNumber, pageSize, userParams)),
      onDeleteActivity: id => dispatch(actions.deleteActivity(id))

  };
};

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(Members);

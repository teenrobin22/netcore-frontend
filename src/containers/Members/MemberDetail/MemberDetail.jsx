import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import alertify from 'alertifyjs';
import classnames from 'classnames';
import * as actions from '../../../store/actions/actionsIndex';
import UserCard from '../../../components/Cards/UserCard/UserCard';
import PhotoGallery from '../../../components/PhotoGallery/PhotoGallery';
import Calendar from 'react-calendar';
import Button from '../../../components/UI/Button';
import GenericInput from './../../../components/UI/GenericInput';


class MemberDetail extends Component {
  state = {
    date: new Date(),
    formatDate: '',
    descripcion: '',
    btnForm: '',
    flg: '',
    activity: {
      descripcion: '',
      fechaActividad: new Date()
    }
  };

  setField(e) {
    this.setState({ descripcion: e.target.value })
  }

  async componentDidMount() {

    const { id } = this.props.match.params;
    if (id == 0) { this.setState({ btnForm: 'Register' }) }
    else { this.setState({ btnForm: 'Modify' }) }

    try {
      if (id != 0) {
        await this.props.onGetActivity(id);
        this.setState({ activity: this.props.activity });
        this.setState({ descripcion: this.state.activity.descripcion });
        this.setState({ formatDate: new Date(this.state.activity.fechaActividad).toLocaleDateString() });
        this.setState({ flg: '1' });
      }
      else { this.setState({ flg: '0' }); }
    } catch (error) {
      alertify.error(error);
    }
  }
  handleOnChangeDate = date => {
    this.setState({ date, formatDate: date.toLocaleDateString() });
  };

  redirectTo = () => {
    this.props.history.push('/members');
  }

  doSubmit = async () => {
    let activity = { ...this.state.activity };

    console.log('xxx', this.state.date);
    if (this.state.descripcion == "" || this.state.descripcion == undefined) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.warning('Debe ingresar la actividad');
    }

    else if (this.state.formatDate == "") {
      alertify.set('notifier', 'position', 'top-right');
      alertify.warning('Debe ingresar la fecha de la actividad');
    }

    else {

      if (this.state.flg == "0") {
        activity.descripcion = this.state.descripcion;
        activity.fechaActividad = this.state.date;
        activity.fechaRegistro = new Date().toLocaleDateString();
        activity.userId = this.props.currentUser.id;
        await this.props.onRegisterActiviy(activity).then(() => {
          const { error, history } = this.props;
          if (!error) history.push('/members');
        });
        this.props.history.push('/members');
      }
      else {
        activity.descripcion = this.state.descripcion;
        activity.fechaActividad = this.state.date;

        alertify.defaults.theme.ok = 'btn btn-primary';
        alertify.defaults.theme.cancel = 'btn btn-warning';
        alertify.confirm(
          'Wait..Before continue',
          'Are you sure you want to modify this activity?',
          async () => {
            await this.props.onUpdateActivity(activity);
            const { error, history } = this.props;
            this.props.history.push('/members');
            if (error) alertify.warning(this.props.error);
            else alertify.success('Activity has been modified');

          },
          () => { }
        );


      }
      ;
    }
  }

  render() {
    const { user } = this.props;
    const { activity } = this.props;

    let cuerpo = (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='text-center'>
            <div className='form-group'>
              <label>Actividad</label>
              <GenericInput
                type='text'
                classes='form-control'
                name='descripcion'
                value={this.state.descripcion}
                onChange={(e) => this.setField(e)}
              />
            </div>
            <div className='form-group'>
              <label>Fecha de Actividad</label>
              <Calendar
                onChange={this.handleOnChangeDate}
                value= {this.state.date}
              />
              <input
                type='text'
                className='form-control'
                value={this.state.formatDate}
                readOnly

              />
            </div>
            <br />
            <div className='form-group text-center'>
              <Button bsClasses='btn-primary' clicked={this.doSubmit} >
                {this.state.btnForm}
              </Button>

              <Button bsClasses='btn-secondary' clicked={this.redirectTo}>
                Cancel
          </Button>
            </div>
          </div>
        </div>
      </div>

    );

    return (
      <Fragment>
        <h2 className='text-center text-primary'>Mi Actividad</h2>
        <hr />
        {cuerpo}
      </Fragment >
    );
  }
}

const mapStateToProps = state => {

  return {
    currentUser: state.auth.currentUser,
    user: state.user.user,
    decodedToken: state.auth.decodedToken,
    error: state.user.error,
    activity: state.activity.activity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUser: id => dispatch(actions.getUser(id)),
    onGetActivity: id => dispatch(actions.getActivity(id)),
    onRegisterActiviy: activity => dispatch(actions.registerActivity(activity)),
    onUpdateActivity: activity => dispatch(actions.updateActivity(activity))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberDetail);

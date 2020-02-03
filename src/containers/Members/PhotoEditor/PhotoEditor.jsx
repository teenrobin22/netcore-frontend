import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import alertify from 'alertifyjs';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/actionsIndex';

import './PhotoEditor.css';
import Button from './../../../components/UI/Button';
import MemberPhoto from '../MemberPhoto/MemberPhoto';

const minSize = 0;
const maxSize = 1048576;
const acceptedFileTypes =
  'image/x-png,image/png,image/jpeg,image/jpg,image/gif';

const acceptedFileTypesArray = acceptedFileTypes.split(',').map(item => {
  return item.trim();
});

export class PhotoEditor extends Component {
  state = {
    files: [],
    rejectedFiles: []
  };

  verifyFile = files => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;

      if (currentFileSize > maxSize) {
        alertify.warning(
          'The file ' +
            currentFile.name +
            ' is not allowed.' +
            (currentFileSize / 1024 / 1024).toFixed(2) +
            ' MB is to large'
        );
        return false;
      }

      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alertify.warning('This file is not allowed. Only images are allowed.');
        return false;
      }

      return true;
    }
  };

  handleOnDrop = (files, rejectedFiles) => {
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        this.setState({ files });
      }
    }

    if (rejectedFiles && rejectedFiles.length > 0)
      this.verifyFile(rejectedFiles);

    this.setState({ rejectedFiles });
  };

  handleCancelUploadPhoto = () => {
    this.setState({ files: [], rejectedFiles: [] });
  };

  handleUploadPhoto = () => {
    const {
      decodedToken,
      user,
      currentUser,
      onAddPhotoForUser,
      onSetMainUser
    } = this.props;
    const { files } = this.state;
    const photosForUpload = [];

    files.forEach(file => {
      const fd = new FormData();
      fd.append('file', file, file.name);
      photosForUpload.push(fd);
    });

    photosForUpload.forEach(photo => {
      onAddPhotoForUser(decodedToken.nameid, photo, user).then(() => {
        let updateCurrentUser = { ...currentUser };
        updateCurrentUser.photoUrl = this.props.user.photoUrl;
        onSetMainUser(updateCurrentUser);
      });
    });
    this.setState({ files: [], rejectedFiles: [] });
  };

  handleSetMainPhoto = photo => {
    const { decodedToken, user, currentUser, onSetMainUser } = this.props;
    this.props.onSetMainPhoto(decodedToken.nameid, photo, user);
    if (this.props.error) alertify.error(this.props.error);
    let updateCurrentUser = { ...currentUser };
    updateCurrentUser.photoUrl = photo.url;
    onSetMainUser(updateCurrentUser);
  };

  handleDeletePhoto = photoId => {
    const { decodedToken, user, onDeletePhoto } = this.props;

    alertify.defaults.theme.ok = 'btn btn-primary';
    alertify.defaults.theme.cancel = 'btn btn-warning';
    alertify.confirm(
      'Wait..Before continue',
      'Are you sure you want to delete this photo?',
      async () => {
        await onDeletePhoto(decodedToken.nameid, photoId, user);
        if (this.props.error) alertify.warning(this.props.error);
        else alertify.success('Photo has been deleted');
      },
      () => {}
    );
  };

  render() {
    const { files } = this.state;
    const { user } = this.props;

    let listFileZone = files.length > 0 && (
      <div>
        <h4>Files ready to upload</h4>
        <p>Queue length: {files.length}</p>
        <table className='table'>
          <thead>
            <tr>
              <th width='50%'>Name</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr key={file.name}>
                <td>
                  <strong>{file.name}</strong>
                </td>
                <td>{(file.size / 1024 / 1024).toFixed(2)} MB</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          type='button'
          bsClasses='btn btn-success btn-s'
          disabled={files.length === 0}
          clicked={this.handleUploadPhoto}
        >
          <span className='fa fa-cloud-upload' /> Upload File
        </Button>
        <Button
          type='button'
          bsClasses='btn btn-warning btn-s'
          clicked={this.handleCancelUploadPhoto}
        >
          <span className='fa fa-ban' /> Cancel
        </Button>
      </div>
    );

    let memberPhoto = <p>The user has no photos</p>;
    if (user) {
      memberPhoto = user.photos.map(photo => (
        <MemberPhoto
          key={photo.id}
          photo={photo}
          setMainPhoto={this.handleSetMainPhoto}
          deletePhoto={this.handleDeletePhoto}
        />
      ));
    }

    return (
      <div>
        <div className='row'>{memberPhoto}</div>
        <div className='row mt-3'>
          <div className='col'>
            <h3>Add Photos</h3>
            <div className='card bg-faded p-3 text-center'>
              <Dropzone
                onDrop={this.handleOnDrop}
                accept={acceptedFileTypes}
                minSize={minSize}
                maxSize={maxSize}
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <section className='container'>
                    <div {...getRootProps({ className: 'dropzone file-over' })}>
                      <input {...getInputProps()} />
                      <p>
                        Drag and drop some files here, or click to select files
                      </p>
                      <i className='fa fa-upload fa-3x' />
                    </div>
                    <aside>{listFileZone}</aside>
                  </section>
                )}
              </Dropzone>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    decodedToken: state.auth.decodedToken,
    error: state.user.error,
    currentUser: state.auth.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPhotoForUser: (id, photo, user) =>
      dispatch(actions.addPhotoToUser(id, photo, user)),
    onDeletePhoto: (id, photoId, user) =>
      dispatch(actions.deletePhoto(id, photoId, user)),
    onSetMainPhoto: (id, photo, user) =>
      dispatch(actions.setMainPhoto(id, photo, user)),
    onSetMainUser: currentUser => dispatch(actions.setMainUser(currentUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoEditor);

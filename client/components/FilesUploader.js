import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { filesThunk } from '../store/destinations';
import Slider from 'react-slick';
import TripInfoForm from './TripInfoForm';

class FilesUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [], clicked: false };
  }
  handleClicked = () => {
    this.setState({ clicked: true });
  };
  handleOnDrop = files => {
    this.setState({
      files: files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });
    let filesToSend = new FormData();
    files.forEach(file => {
      filesToSend.append('files', file);
    });
    this.props.getFiles(filesToSend);
  };
  handleOnDropRejected = () => {
    window.alert(
      'One or more of your files is greater than 10MB or not an image file(.jpg/.jpeg, png, gif, or tiff) and cannot be uploaded'
    );
  };

  componentWillUnmount() {
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }
  render() {
    const settings = {
      arrows: false,
      fade: true,
      autoplay: true,
      autoplaySpeed: 3000
    };
    const MAX_SIZE = 10000000;
    const ACCEPTED_FILE_TYPES =
      'image/jpeg, image/jpg image/png, image/tiff,image/gif';
    const { files } = this.state;
    return (
      <div>
        {!this.state.clicked ? (
          <div>
            <div className="ui center aligned container">
              <div className="ui huge header">Escape</div>
              <Dropzone
                onDrop={this.handleOnDrop}
                accept={ACCEPTED_FILE_TYPES}
                maxSize={MAX_SIZE}
                multiple={true}
                onDropRejected={this.handleOnDropRejected}
              >
                {({ getRootProps, getInputProps }) => (
                  <div>
                    {!this.state.files.length ? (
                      <div className="filesClass" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="dropborder">
                          <div className="dropzone">
                            <i className="images outline huge icon" />
                            <div className="ui header">
                              <i>Upload images of your ideal escape</i>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="ui center aligned big image">
                        <Slider {...settings}>
                          {files.map(file => {
                            return (
                              <div key={file.name} className='testing'>
                                <img src={file.preview} />
                              </div>
                            );
                          })}
                        </Slider>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
        ) : (
          <div className="ui segment">
            <div className="ui active transition visible inverted dimmer">
              <div className="content">
                <div className="ui large text loader">Loading</div>
              </div>
            </div>
            <div className="ui center aligned container">
              <div className="ui huge header">Escape</div>
              <Dropzone
                onDrop={this.handleOnDrop}
                accept={ACCEPTED_FILE_TYPES}
                maxSize={MAX_SIZE}
                multiple={true}
                onDropRejected={this.handleOnDropRejected}
              >
                {({ getRootProps, getInputProps }) => (
                  <div>
                    {!this.state.files.length ? (
                      <div className="filesClass" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="dropborder">
                          <div className="dropzone">
                            <i className="images outline huge icon" />
                            <div className="ui header">
                              Drag 'n' drop some files here, or click to select
                              files
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="ui center aligned big image">
                        <Slider {...settings}>
                          {files.map(file => {
                            return (
                              <div key={file.name}>
                                <img src={file.preview} />
                              </div>
                            );
                          })}
                        </Slider>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
        )}

        <TripInfoForm
          clicked={this.state.clicked}
          handleClicked={this.handleClicked}
        />
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    getFiles: files => dispatch(filesThunk(files))
  };
};

export default connect(null, mapDispatch)(FilesUploader);

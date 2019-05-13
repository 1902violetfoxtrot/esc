import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { filesThunk } from '../store/destinations';

class FilesUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
  }
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
    const MAX_SIZE = 10000000;
    const ACCEPTED_FILE_TYPES =
      'image/jpeg, image/jpg image/png, image/tiff,image/gif';
    const { files } = this.state;
    return (
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
            <section>
              {!this.state.files.length ? (
                <div className="filesClass" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="dropborder">
                    <div className="dropzone">
                      <i className="images outline huge icon" />
                      <div className="ui header">
                        Drag 'n' drop some files here, or click to select files
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="ui center aligned big image">
                    {files.map(file => {
                      return (
                        <div key={file.name}>
                          <img src={file.preview}/>
                        </div>
                      );
                    })}
                  </div>
              )}
            </section>
          )}
        </Dropzone>
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

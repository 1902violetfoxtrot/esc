import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { filesThunk } from '../store/files';

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
    files.map(file => {
      let filesToSend = new FormData();
      filesToSend.append('files', file);
      this.props.getFiles(filesToSend);
    });
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
      <Dropzone
        onDrop={this.handleOnDrop}
        accept={ACCEPTED_FILE_TYPES}
        maxSize={MAX_SIZE}
        multiple={true}
        onDropRejected={this.handleOnDropRejected}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className="filesClass" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              <div className="filesListClass">
                {files.map(file => {
                  return (
                    <ul className="filePreviews" key={file.name}>
                      <img src={file.preview} width="200" height="200" />
                    </ul>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    getFiles: () => dispatch(filesThunk())
  };
};

export default connect(null, mapDispatch)(FilesUploader);

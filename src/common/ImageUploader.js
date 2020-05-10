import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class ImageUploader extends Component {
  constructor({onLoad}) {
    super();
    this.onDrop = (files) => {

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = function(e) {
          onLoad(e.target.result, file.name);
        }
        reader.readAsDataURL(file);
    });

  }
}

  render() {

    return (
      <Dropzone onDrop={this.onDrop} accept='image/*' multiple={false}>
        {({getRootProps, getInputProps, isDragActive}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>{isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'}</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default ImageUploader;

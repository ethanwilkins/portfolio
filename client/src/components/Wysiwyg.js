import React, { Component } from 'react';
import axios from 'axios';

import FileBase from 'react-file-base64';
import DefaultImg from '../images/default-img.jpg';

import 'trix';
import 'trix/dist/trix.css';

export class Wysywig extends Component {
  constructor(props) {
    super(props);
    this.trixInput = React.createRef();

    this.state = {
      baseImage: DefaultImg
    }
  }

  componentDidMount() {
    this.trixInput.current.addEventListener("trix-change", event => {
      this.props.onChange(event.target.innerHTML); //calling custom event
    });
    // this.trixInput.current.addEventListener("trix-attachment-add", event => {});
  }

  setDefaultImage = () => {
    this.setState({
      baseImage: DefaultImg
    });
  };

  // function to capture base64 format of an image
  getBaseFile = (files) => {
    // create a local readable base64 instance of an image
    this.setState({
      baseImage: files.base64
    });
    let imageObj = {
      name: "base-image-" + Date.now(),
      data: files.base64.toString()
    };
    axios.post('/images/upload', imageObj)
      .then((data) => {
        if (data.data.success) {
          alert("Image has been successfully uploaded using base64 format");
          this.setDefaultImage();
        }
      })
      .catch((err) => {
        alert("Error while uploading image using base64 format")
        this.setDefaultImage();
      });
  };

  render() {
    const { baseImage } = this.state;

    return (
      <div>
        <input type="hidden" id="trix" value={this.props.value} />
        <trix-editor input="trix" ref={this.trixInput} />

        <FileBase type="file" multiple={false} onDone={this.getBaseFile} />
        <img src={baseImage} alt="upload-img" />
      </div>
    );
  }
}

export default Wysywig;

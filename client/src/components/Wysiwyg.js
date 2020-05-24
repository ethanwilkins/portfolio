import React, { Component } from 'react';

import 'trix';
import 'trix/dist/trix.css';

export class Wysiwy extends Component {
  constructor(props) {
    super(props);
    this.trixInput = React.createRef();
  }

  componentDidMount() {
    this.trixInput.current.addEventListener("trix-change", event => {
      this.props.onChange(event.target.innerHTML); //calling custom event
    });
  }

  render() {
    return (
      <div>
        <input type="hidden" id="trix" value={this.props.value} />
        <trix-editor input="trix" ref={this.trixInput} />
      </div>
    );
  }
}

export default Wysiwy;

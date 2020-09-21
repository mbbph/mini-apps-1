//import React from 'react';
//import ReactDOM from 'react-dom';
//import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 0,
      forms: {1: ['name', 'email', 'password'], 2: ['line1', 'line2', 'city', 'state', 'zip'], 3: ['ccn', 'expire', 'cvv', 'billing']},
      formData: {
      'name': '',
      'email': '',
      'password': '',
      'line1': '',
      'line2': '',
      'city': '',
      'state': '',
      'zip': '',
      'phone': '',
      'ccn': '',
      'expire': '',
      'cvv': '',
      'billing': ''
      }
    };
    this.changeToNext = this.changeToNext.bind(this);
    this.changeToPrevious = this.changeToPrevious.bind(this);
    this.handleFormInputValue = this.handleFormInputValue.bind(this);
    this.postData = this.postData.bind(this);
  }

  postData(event) {
    //event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/checkout',
      data: this.state.formData,
      dataType: 'text',
      success: () => { //upon sucess, clear formdata
        let formData = Object.assign({}, this.state.formData);
        for (let key in formData) {
          formData[key] = '';
        }
        console.log('success');
        this.setState({ form: 0, formData});
      }
    });
  }

  handleFormInputValue(e) {
    let formData = Object.assign({}, this.state.formData);
    formData[e.target.name] = e.target.value;
    this.setState({formData});
  }

  changeToNext() {
    let elements = document.getElementsByClassName('field');
    for (let i = 0; i < elements.length; i++) {
      elements[i].value = '';
    }
    this.setState({
      form: this.state.form < 4 ? this.state.form + 1 : this.state.form
    });
  }

  changeToPrevious() {
    this.setState({
      form: this.state.form > 1 ? this.state.form - 1 : this.state.form
    })
  }


  render() {
    console.log('IM HERE');
    return (
      this.state.form === 0
      ?
    <div>
        <h3>Welcome to the Checkout Station</h3>
        <button id="next" onClick={this.changeToNext}>Check Out Now</button>
      </div>
      :

      (this.state.form < 4
        ?
        <div>
          <h3>Checkout</h3>
          {this.state.forms[this.state.form].map(box => (
            <div>
              <label htmlFor={box}>{box}</label>
              <input name={box} className='field' type='text' onChange={this.handleFormInputValue}></input>
              </div>)
          )}
          <button id="previous" onClick={this.changeToPrevious}>Previous</button>
          <button id="next" onClick={this.changeToNext}>Next</button>
        </div>
        :
        <button onClick={this.postData}>Submit</button>
    ));
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

import React, { Component } from 'react';
import './App.css';
import { getAllData } from '../../reducer';
import { connect } from 'react-redux';
import ComponentOne from './ComponentOne';

class App extends Component{

    componentWillMount(){
        this.props.getAllData();
    }

    render(){
        return (
            <div className='App'>
                {this.props.data}
                <ComponentOne />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.data
    }
}
export default connect(mapStateToProps, { getAllData })(App);

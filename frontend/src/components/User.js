import React from 'react';
import axios from 'axios';

export default class User extends React.Component{
    state={
        users:[]
    }
    componentDidMount(){
        axios.get('')
    }
}
import React, { Component } from 'react'
import Navbar from "../Components/Navbar/Navbar"
import HomeComponent from "../Components/Home/Home"

export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <HomeComponent/>
      </div>
    )
  }
}

import React from 'react'
import { Outlet,Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
export default function driver_navbar() {
  return (
    <div>
      
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Cab on Go</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
           
            
              
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"></a>
            </li>
            
          </ul>
        </div>
      </nav>
    </div>
  )
}

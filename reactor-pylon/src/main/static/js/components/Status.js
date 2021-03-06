/*
 * Copyright (c) 2011-2016 Pivotal Software Inc, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import Config        from '../pages/Config';
import API       from '../services/NexusService';

class Status extends React.Component {

    constructor(props) {
        super(props);
        this.state = {backgroundColor: ''};
        this.type = 0;
        this.disposable = null;
    }

    stateUpdate(data){
        if(data == this.type){
            return;
        }
        this.type = data;
        if(data == API.offline){
            this.setState({backgroundColor: "red"});
        }
        else if(data == API.ready){
            this.setState({backgroundColor: "#6db33f"});
        }
        else if(data == API.working) {
            this.setState({backgroundColor: "blue"});
        }
        else if(data == API.retry) {
            this.setState({backgroundColor: ""});
        }
    }

    componentWillMount() {
        this.disposable = this.props.stateStream.subscribe(
            this.stateUpdate.bind(this),
            error => console.log(error),
            () => console.log("State stream completed")
        );
    }

    componentWillUnmount(){
        if(this.disposable != null) {
            this.disposable.dispose();
        }
    }

    render() {
        return (
            <h1 id="logo">
                <Link style={this.state}  to="/pylon/connect"><strong>Reactor Pylon</strong></Link>
            </h1>
        );
    }

}

export default Status;
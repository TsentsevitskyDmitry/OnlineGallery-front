import React, { Component } from 'react';
import CreateAlbum from './CreateAlbum';
import UploadImage from './UploadImage';
import { Avatar, Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class NewPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props
        };
    }

    render() {
        const tabBarStyle = {
            textAlign: 'center'
        };


        return (
                <Tabs defaultActiveKey="1" 
                    animated={true}
                    tabBarStyle={tabBarStyle}
                    size="large"
                    className="profile-tabs"
                    >
                    <TabPane tab={`Upload Image`}  key="1">
                         <UploadImage {...this.state.props}/>
                    </TabPane>
                    <TabPane tab={`Create Album`} key="2">
                         <CreateAlbum {...this.state.props}/>
                    </TabPane>
                </Tabs>

        );
    }
}

export default NewPoll;
import React, { Component } from 'react';
import { uploadImage } from '../util/APIUtils';
import { NAME_MAX_LENGTH } from '../constants';
import './NewPoll.css';  
import { Form, Input, Button, Icon, Select, Col, notification, Checkbox } from 'antd';
import LoadingIndicator  from '../common/LoadingIndicator';
import MustCreate from '../common/MustCreate';
import ImageUploader from '../common/ImageUploader';
import ServerError from '../common/ServerError';
import { getUserAlbums } from "../util/APIUtils";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class CreateAlbum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            image: {
                data: ''
            },
            isPrivate: false,
            albums: [],
            album: {
                albumId: -1,
                albumName: 'Choose album'
            },
            NothingHere: true,
            isLoading: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAlbumChange = this.handleAlbumChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIsPrivateChange = this.handleIsPrivateChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.createAlbumSelectItems = this.createAlbumSelectItems.bind(this);
    }


    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserAlbums(username)
        .then(response => {
            this.setState({
                albums: response,
                NothingHere: !(response.length),
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });        
    }
     
    componentDidMount() {
        this.loadUserProfile(this.props.currentUser.username);
    }

    handleSubmit(event) {
        event.preventDefault();

        const albumData = {
            name: this.state.name.text,
            albumId: this.state.album.albumId,
            byteArray: this.state.image.data,
            isPrivate: this.state.isPrivate
        };

        uploadImage(albumData)
        .then(response => {
            this.props.history.push("/users/" + this.props.currentUser.username);
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');    
            } else {
                notification.error({
                    message: 'Polling App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });              
            }
        });
    }

    validateImage = (base64) => {
        if(base64 === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your question!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleImageChange(base64, name) {
        this.setState({
            name: {
                text: name.split('.')[0],
                ...this.validateName(name.split('.')[0])
            },
            image: {
                data: base64,
                ...this.validateImage(base64)
            }
        });
    }

    validateName = (nameText) => {
        if(nameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter album name!'
            }
        } else if (nameText.length > NAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed)`
            }    
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({
            name: {
                text: value,
                ...this.validateName(value)
            }
        });
    }


    handleIsPrivateChange(event) {
        const value = event.target.checked;
        this.setState({
            isPrivate: value
        });
    }

    validateAlbum = (index) => {
        if(this.state.albums[index].albumId === -1) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter your question!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleAlbumChange = (index) => {
        this.setState({
            album: {
                albumName: this.state.albums[index].albumName,
                albumId: this.state.albums[index].albumId,
                ...this.validateAlbum(index)
            }
        });
    };

    createAlbumSelectItems() {
        let items = [];         
            for (let i = 0; i < this.state.albums.length; i++) { 
                    items.push(<Option value={i}>{this.state.albums[i].albumName}</Option>);   
            }
        return items;
    } 


    isFormInvalid() {
        if(this.state.album.validateStatus !== 'success') {
            return true;
        }
        if(this.state.image.validateStatus !== 'success') {
            return true;
        }
        if(this.state.name.validateStatus !== 'success') {
            return true;
        }
        return false;
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.MustCreate) {
            return <MustCreate />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        return (
            <div className="new-poll-container">
                <h1 className="page-title">Upload Image</h1>

                <ImageUploader onLoad={this.handleImageChange}/>

                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">

                        <FormItem validateStatus={this.state.name.validateStatus}
                        help={this.state.name.errorMsg} className="poll-form-row">
                            <Input 
                                placeholder = {'Name'}
                                size="large"
                                value={this.state.name.text} 
                                onChange = {this.handleNameChange} />   
                        </FormItem>

                        <FormItem validateStatus={this.state.album.validateStatus} className="poll-form-row">
                            {/*<InputLabel id="demo-simple-select-helper-label">Age</InputLabel>*/}
                            <Select
    
                              value={this.state.album.albumName}
                              onChange={this.handleAlbumChange}
                            >
                            {this.createAlbumSelectItems()}

                            </Select>
                            <FormHelperText>Images will be uploaded to selected album</FormHelperText>
                        </FormItem>

                        {/*<FormItem className="poll-form-row">
                            <Checkbox onChange={this.handleIsPrivateChange}>Make private</Checkbox>
                        </FormItem>*/}

                        <FormItem className="poll-form-row">
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                disabled={this.isFormInvalid()}
                                className="create-poll-form-button">Upload</Button>
                        </FormItem>
                    </Form>
                </div>    
            </div>
        );
    }
}

export default CreateAlbum;
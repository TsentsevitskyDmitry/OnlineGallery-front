import React, { Component } from 'react';
import PollList from '../../poll/PollList';
import { getUserProfile, deleteAlbum, toggleAlbumPrivate , deleteImage} from '../../util/APIUtils';
import { Avatar, Tabs } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';
import LoadingIndicator  from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import AlbumsView from '../../views/AlbumsView/AlbumsView';
import ImagesView from '../../views/ImagesView/ImagesView';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: false,
            user: null,
            tabIndex: "1",
            isLoading: false,
            displayAlbum: {
                userId: 1,
                albumId: 1,
                albumName: 'Album'
            }
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);

        window.addEventListener('popstate', () => {
            var someProperty = this.state.displayAlbum
            someProperty.albumName = "Album";
            this.setState({
                tabIndex: "1",
                displayAlbum: someProperty
            });
        });
    }


    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
        .then(response => {
            let owner = false;
            if (this.props.currentUser != null){
                if (this.props.currentUser.username == response.username){
                    owner = true;
                }
            }
            this.setState({
                user: response,
                owner: owner,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
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

    AlbumSelected = (event, { index, view }) => {
        this.props.history.push("/users/" + this.state.user.username);

        var someProperty = this.state.displayAlbum
        someProperty.albumName = view.albumName;
        someProperty.albumId = view.albumId;
        this.setState({
            tabIndex: "2",
            displayAlbum: someProperty
        });
    };

    goToSelector = (key, event) => {
        if (key == "1"){
            this.props.history.goBack();

            var someProperty = this.state.displayAlbum
            someProperty.albumName = "Album";
            this.setState({
                tabIndex: "1",
                displayAlbum: someProperty
            });
        }
    };

    deleteUserAlbum(albumId) {
        this.setState({
            isLoading: true
        });

        deleteAlbum(albumId)
        .then(response => {
            this.setState({
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

    deleteUserImage(imageId) {
        this.setState({
            isLoading: true
        });

        deleteImage(imageId)
        .then(response => {
            this.setState({
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

    toggleUserAlbumPrivate(albumId) {
        this.setState({
            isLoading: true
        });

        toggleAlbumPrivate(albumId)
        .then(response => {
            this.setState({
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

    AlbumDeleted = (event, { view }) => {
        confirmAlert({
          title: 'Are you sure to delete the album?',
          message: 'This can\'t be undone',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.deleteUserAlbum(view.albumId)
            },
            {
              label: 'No'
            },
            {
              label: (view.private ? 'Make public' : 'Make private'),
              onClick: () => this.toggleUserAlbumPrivate(view.albumId)
            }
          ]
        });
    };    
      

    ImageDeleted = ( view ) => {
        confirmAlert({
          title: 'Are you sure to delete this image?',
          message: 'This can\'t be undone',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.deleteUserImage(view.id)
            },
            {
              label: 'No'
            }
          ]
        });   
    }; 


    componentDidMount() {
        const username = this.props.match.params.username;
        var albumid = this.props.match.params.albumid;
        if (albumid != undefined){ 
            this.props.history.push("/users/" + username);
            this.setState({
                tabIndex: "2",
                displayAlbum: {
                    albumId: albumid,
                    albumName: "Last updated Album",
                }
            });
        }

        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }        
    }



    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">
                { 
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name)}}>
                                        {this.state.user.name[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.state.user.name}</div>
                                    <div className="username">@{this.state.user.username}</div>
                                    <div className="user-joined">
                                        Joined {formatDate(this.state.user.joinedAt)}
                                    </div>
                                </div>
                            </div>
                            <div className="user-poll-details">
                                <Tabs defaultActiveKey="1" 
                                    animated={true}
                                    tabBarStyle={tabBarStyle}
                                    size="large"
                                    className="profile-tabs"
                                    onTabClick={this.goToSelector}
                                    activeKey={this.state.tabIndex}
                                    >
                                    <TabPane tab={this.state.owner ? 'Your Albums' : `User Albums`} key="1">
                                        {/*<PollList username={this.props.match.params.username} type="USER_CREATED_POLLS" />*/}
                                        <AlbumsView isOwner={this.state.owner} username={this.state.user.username} onClick={this.AlbumSelected} onAction={this.AlbumDeleted}/>
                                    </TabPane>
                                    {this.state.tabIndex != "1" ?
                                    <TabPane tab={`${this.state.displayAlbum.albumName}`}  key="2">
                                        {/*<PollList username={this.props.match.params.username} type="USER_VOTED_POLLS" />*/}
                                        <ImagesView  isOwner={this.state.owner} username={this.state.user.username} albumId={this.state.displayAlbum.albumId} onAction={this.ImageDeleted}/>
                                    </TabPane> : null}
                                </Tabs>
                            </div>  
                        </div>  
                    ): null               
                }
            </div>
        );
    }
}

export default Profile;
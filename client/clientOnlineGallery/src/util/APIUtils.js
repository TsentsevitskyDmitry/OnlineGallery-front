import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllPolls(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function createPoll(pollData) {
    return request({
        url: API_BASE_URL + "/polls",
        method: 'POST',
        body: JSON.stringify(pollData)         
    });
}

export function castVote(voteData) {
    return request({
        url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
        method: 'POST',
        body: JSON.stringify(voteData)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/sign-in",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/sign-up",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getUserCreatedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/polls?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/votes?page=" + page + "&size=" + size,
        method: 'GET'
    });
}

// new ones here!

export function getUserAlbums(username) {
    return request({
        url: API_BASE_URL + "/user/" + username + "/profile-content",
        method: 'GET'
    });
}

export function createAlbum(albumData) {
    return request({
        url: API_BASE_URL + "/albums/create-new-album",
        method: 'POST',
        body: JSON.stringify(albumData)         
    });
}

export function deleteAlbum(albumId) {
    return request({
        url: API_BASE_URL + "/albums/delete-album/" + albumId,
        method: 'DELETE'
    });
}   

export function toggleAlbumPrivate(albumId) {
    return request({
        url: API_BASE_URL + "/albums/toggle-private/" + albumId,
        method: 'PUT'
    });
}   

export function getUserImages(username, albumId) {
    return request({
        url: API_BASE_URL + "/user/" + username + "/album/" + albumId,
        method: 'GET'
    });
    // return request({
    //     url: API_BASE_URL + "/albums/album/" + albumId,
    //     method: 'GET'
    // });
}

export function getLastImages() {
    return request({
        url: API_BASE_URL + "/images/last-added",
        method: 'GET'
    });
    // return request({
    //     url: API_BASE_URL + "/albums/album/" + albumId,
    //     method: 'GET'
    // });
}

export function getLastImagesAmount(amount) {
    return request({
        url: API_BASE_URL + "/images/last-added?amount=" + amount,
        method: 'GET'
    });
    // return request({
    //     url: API_BASE_URL + "/albums/album/" + albumId,
    //     method: 'GET'
    // });
}

export function uploadImage(imageData) {
    return request({
        url: API_BASE_URL + "/images/add-new-image",
        method: 'POST',
        body: JSON.stringify(imageData)         
    });
}

export function deleteImage(imageId) {
    return request({
        url: API_BASE_URL + "/images/delete-image/" + imageId,
        method: 'DELETE'
    });
}   
import {profileSubtitle, profileTitle, profileAvatar} from '../utils/constants.js'


export function getProfileData() {
    return {name: profileTitle.textContent, about:profileSubtitle.textContent}
}

export function setProfileData({name, about}) {
    profileTitle.textContent = name;
    profileSubtitle.textContent = about;
}

export function setAvatarData({avatar}) {
    profileAvatar.src = avatar;
}


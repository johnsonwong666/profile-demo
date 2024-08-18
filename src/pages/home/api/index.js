import api from '../../../libs/api';

export function getProfile() {
  return api.get('api/profile/get-profile');
}

export function editProfile(params) {
  return api.post('api/profile/edit-profile', params);
}

export function uploadImage(params) {
  return api.post('api/common/upload', params);
}


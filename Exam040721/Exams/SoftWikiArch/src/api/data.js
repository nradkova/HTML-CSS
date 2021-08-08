import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const host = 'http://localhost:3030';

api.settings.host = host;

export async function getAll() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');
}

export async function getRecentArticles() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}

export async function getOneById(id) {
    return await api.get(host + '/data/wiki/' + id);
}

export async function delOne(id) {
    return await api.del(host + '/data/wiki/' + id);
}

export async function editOne(id, one) {
    return await api.put(host + '/data/wiki/' + id, one);
}

export async function createOne(one) {
    return await api.post(host + '/data/wiki', one);
}

// export async function getMy(userId) {
//     return await api.get(host + `/data/pets?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }

// export async function postLike(petId) {
//     return await api.post(host + '/data/likes', { petId });
// }

// export async function getLikes(petId) {
//     return await api.get(host + `/data/likes?where=petId%3D%22${petId}%22&distinct=_ownerId&count`)
// }

// export async function checkUserLiked(petId, userId) {
//     if (userId == null) {
//         return false;
//     }
//     let response = await api.get(host + `/data/likes?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
//     return !Boolean(response)
// }

export async function mySearch(query) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`);
}

// export async function mySearch(query) {
//     return await api.get(host + `/data/cars?where=year%3D${query}`);
// }

// export async function getAllCount() {
//     return await api.get(host + '/data/wiki?count');
// }

// export async function getAllWithPadination(page=1) {
//     return await api.get(host + `/data/wiki?sortBy=_createdOn%20desc&offset=${(page-1)*3}&pageSize=3`);
// }
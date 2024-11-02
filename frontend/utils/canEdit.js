import {decodeToken} from 'react-jwt';

export function isEditable(id) {
    const token = localStorage.getItem("token");
    const decoded = decodeToken(token);
    return decoded.id == id;
}
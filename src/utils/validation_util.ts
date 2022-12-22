
export const validateId = (value: string) => {
    if (value === undefined || value === null) {
        return 'Invalid id'
    }
    if (value.length === 0) {
        return 'Please enter an id'
    }
    if (!/^[A-Za-z0-9]*$/.test(value)) {
        return 'Invalid id'
    }
    return null
}

export const validateToken = (value: string) => {
    if (value === undefined || value === null) {
        return 'Invalid token'
    }
    if (value.length === 0) {
        return 'Please enter a token'
    }
    if (!/^[A-Za-z0-9]*$/.test(value)) {
        return 'Invalid token'
    }
    return null
}

export const validateFirstName = (value: string) => {
    if (value === undefined || value === null) {
        return 'Invalid first name'
    }
    if (value.length === 0) {
        return 'Please enter your first name'
    }
    if (value.length > 30) {
        return 'Max 30 characters only'
    }
    if (!/^[A-Za-z0-9 ]*$/.test(value)) {
        return 'Only alpha num and space are allowed'
    }
    return null
}

export const validateLastName = (value: string) => {
    if (value === undefined || value === null) {
        return 'Invalid last name'
    }
    if (value.length === 0) {
        return 'Please enter your last name'
    }
    if (value.length > 30) {
        return 'Max 30 characters only'
    }
    if (!/^[A-Za-z0-9 ]*$/.test(value)) {
        return 'Only alpha num and space are allowed'
    }
    return null
}

export const validateEmail = (value: string) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return 'Invalid email'
    }
    return null
}

export const validatePassword = (value: string) => {
    if (value === undefined || value === null) {
        return 'Invalid password'
    }
    if (value.length < 8) {
        return 'Minimum is 8'
    }
    return null
}
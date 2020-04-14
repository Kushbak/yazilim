import { SubmissionError } from 'redux-form'

export const required = (value) => {
    if (value) return undefined

    return 'Обязательное поле'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`

    return undefined
}
 
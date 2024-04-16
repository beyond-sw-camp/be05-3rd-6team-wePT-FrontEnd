/**
 * @description 이메일 유효성 검사 함수. 참이면 true, 거짓이면 false를 반환한다.
 * @param email_address
 * @return {boolean}
 */

export const emailCheck = (email_address) => {
    let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
    return email_regex.test(email_address)
}


/**
 * @description 중첩 객체 동결 함수. 객체를 받아서 객체의 모든 속성을 동결한다.
 * @param object
 * @returns {unknown[]}
 */
export const deepFreeze = (object) => {
    Object.entries(object).forEach(([key, value]) => {
        if (value && typeof value === 'object') deepFreeze(value)
    })
    return Object.freeze(object)
}

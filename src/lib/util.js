/**
 * @description 이메일 유효성 검사 함수. 참이면 true, 거짓이면 false를 반환한다.
 * @param email_address
 * @return {boolean}
 */

export const emailCheck = (email_address) => {
    let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
    return email_regex.test(email_address)
}

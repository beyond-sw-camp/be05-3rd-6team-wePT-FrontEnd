import { deepFreeze } from '@/lib/util.js'

export const authMessages = deepFreeze(
    {
        PASSWORD_RESET_SUCCESS: '비밀번호 재설정 링크가 이메일로 전송되었습니다.',
        PASSWORD_RESET_FAILED: '이메일 전송에 실패했습니다. 이메일 주소를 확인해주세요.',
        EMAIL_NOT_FOUND: '이 이메일 주소는 등록되지 않았습니다.',
        INVALID_EMAIL: '유효하지 않은 이메일 주소입니다.',
        MISSING_EMAIL: '이메일 주소를 입력해주세요.',
    },
)

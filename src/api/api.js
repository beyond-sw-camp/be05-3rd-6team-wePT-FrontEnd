import { addDoc, collection, deleteDoc, doc, getDocs, increment, query, updateDoc, where } from 'firebase/firestore'
import { db } from '@/firebase/index.js'

/**
 * @description 사용자 정보 반환
 * @returns {Promise<*[]>}
 */
export const fetchUsers = async () => {
    const UserCollection = collection(db, 'User')
    const users = []
    try {
        const querySnapshot = await getDocs(UserCollection)
        querySnapshot.forEach(doc => {
            users.push(doc.data())
        })
    } catch (error) {
        console.error('문서를 가져오는 중 오류 발생:', error)
    }
    return users
}

// 문서 전체 출력 (3개 분야별로) id로 넣어줘야함
export const FindPosts = async (id) => {
    const UserCollection = collection(db, 'User')
    const postList = []
    try {
        const querySnapshot = await getDocs(UserCollection)
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const matchingCollection = collection(doc.ref, 'Matching')
            const q = query(matchingCollection, where('matchingCategory', '==', id),
                where('matchingDoneYn', '==', false))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(pDoc => {
                console.log(pDoc.data())
                postList.push(pDoc.data())
            })
        }))
    } catch (error) {
        console.error('문서를 가져오는 중 오류 발생:', error)
    }
    return postList
}


/**
 * @description 매칭 상세 정보 반환
 * @param matchingId
 * @returns {Promise<*[]>}
 */
export const fetchMatchingDetail = async (matchingId) => {
    const UserCollection = collection(db, 'User')
    const post = []
    try {
        const querySnapshot = await getDocs(UserCollection)
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const matchingCollection = collection(doc.ref, 'Matching')
            const q = query(matchingCollection, where('matchingId', '==', matchingId))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(pDoc => {
                console.log('=== fetchMatchingDetail ===', pDoc.data())
                post.push(pDoc.data())
            })
        }))
    } catch (error) {
        console.error('문서를 가져오는 중 오류 발생:', error)
    }
    return post
}

/**
 * @description 내가 작성한 매칭 목록 반환
 * @param userId
 * @returns {Promise<*[]>}
 */
export const fetchMyMatchingList = async (userId) => {
    const UserCollection = collection(db, 'User')
    const userQuery = query(UserCollection, where('userEmail', '==', userId))
    const matchingList = []

    try {
        const querySnapshot = await getDocs(userQuery)

        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const matchingCollection = collection(doc.ref, 'Matching')
            const querySnapshot = await getDocs(matchingCollection)

            querySnapshot.forEach(pDoc => {
                console.log('=== fetchMyMatchingList === ', pDoc.data())
                matchingList.push(pDoc.data())
            })
        }))
    } catch (error) {
        console.error('문서를 가져오는 중 오류 발생:', error)
    }

    return matchingList
}

/**
 * @description 내가 참여한 매칭 목록의 Id 반환
 * @param userId
 * @returns {Promise<*[]>}
 * @constructor
 */
export const fetchJoinIdList = async (userId) => {
    const UserCollection = collection(db, 'User')
    const userQuery = query(UserCollection, where('userEmail', '==', userId))
    const joinMatchingIdList = []

    try {
        const querySnapshot = await getDocs(userQuery)

        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const joinCollection = collection(doc.ref, 'Join')
            const querySnapshot = await getDocs(joinCollection)

            querySnapshot.forEach(pDoc => {
                console.log('=== fetchJoinIdList === ', pDoc.data())
                joinMatchingIdList.push(pDoc.data())
            })
        }))
    } catch (error) {
        console.error('문서를 가져오는 중 오류 발생:', error)
    }

    return joinMatchingIdList
}

/**
 * @description 매칭 작성
 * @param userId
 * @param matchingData
 * @returns {Promise<void>}
 */
export const fetchMatching = async (userId, matchingData) => {
    const UserCollection = collection(db, 'User')
    const userQuery = query(UserCollection, where('userEmail', '==', userId))

    try {
        // 사용자 문서에서 사용자 정보 가져오기
        const querySnapshot = await getDocs(userQuery)

        if (!querySnapshot.empty) {
            // 사용자 문서가 존재하면 사용자의 포스트 컬렉션에 데이터 추가
            querySnapshot.forEach(doc => {
                const userRef = doc.ref
                const matchingCollection = collection(userRef, 'Matching')
                addDoc(matchingCollection, matchingData).then(() => {
                    console.log('포스트가 사용자의 포스트 컬렉션에 추가되었습니다.')
                }).catch(error => {
                    console.error('포스트를 추가하는 중 오류 발생:', error)
                })
            })
        } else {
            console.error('해당 사용자를 찾을 수 없습니다.')
        }
    } catch (error) {
        console.error('사용자를 검색하는 중 오류 발생:', error)
    }
}

// 글 수정
export const updatePost = async (userId, matchingId, newData) => {
    try {
        const UserCollection = collection(db, 'User')
        const userQuery = query(UserCollection, where('userEmail', '==', userId))
        const userQuerySnapshot = await getDocs(userQuery)
        console.log('a')
        if (!userQuerySnapshot.empty) {
            const userDoc = userQuerySnapshot.docs[0]
            if (userDoc) {
                const matchingCollection = collection(db, `Users/${userDoc.id}/Matching`)
                const postQuery = query(matchingCollection, where('matchingId', '==', matchingId))

                const postQuerySnapshot = await getDocs(postQuery)

                if (!postQuerySnapshot.empty) {
                    const matchingId = postQuerySnapshot.docs[0].id
                    const postRef = doc(matchingCollection, matchingId)
                    await updateDoc(postRef, newData)
                    console.log('포스트가 성공적으로 업데이트되었습니다.')
                } else {
                    console.error('해당 포스트를 찾을 수 없습니다.')
                }
            } else {
                console.error('해당 사용자를 찾을 수 없습니다.')
            }
        }
    } catch (error) {
        console.error('포스트를 업데이트하는 중 오류 발생:', error)
    }
}


// 글 삭제
export const deletePost = async (userEmail, matchingId) => {
    try {
        const userId = await findDocumentIdByField(collection(db, 'User'), 'userEmail', userEmail)
        const userDocRef = doc(db, 'User', userId)
        const collectionInput = collection(userDocRef, 'Matching')
        const matchingId = await findDocumentIdByField(collectionInput, 'matchingId', matchingId)
        if (matchingId) {
            const postDocRef = doc(db, 'User', userId, 'Matching', matchingId)
            await deleteDoc(postDocRef)
            console.log('포스트가 성공적으로 삭제되었습니다.')
        } else {
            console.error('해당 필드 값을 가진 문서를 찾을 수 없습니다.')
        }
    } catch (error) {
        console.error('포스트를 삭제하는 중 오류 발생:', error)
    }
}


// 문서 아이디 찾기
export const findDocumentIdByField = async (collectionInput, field, value) => {
    try {
        const q = query(collectionInput, where(field, '==', value))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
            // 필터된 결과에서 첫 번째 문서의 ID 반환
            const documentId = querySnapshot.docs[0].id
            console.log('findDocumentIdByField')
            return documentId
        } else {
            return null
        }
    } catch (error) {
        console.error('문서 ID를 찾는 중 오류 발생:', error)
        return null
    }
}

/**
 * @description 참여 신청
 * @param userEmail
 * @param matchingId
 * @returns {Promise<void>}
 */
export const fetchJoin = async (userEmail, matchingId) => {
    try {
        const userCollectionRef = collection(db, 'User')
        const userSnapshot = await getDocs(userCollectionRef)
        let matchingWriterId

        for (const userDoc of userSnapshot.docs) {
            const matchingCollectionRef = collection(db, `User/${userDoc.id}/Matching`)
            const matchingQuery = query(matchingCollectionRef, where('matchingId', '==', matchingId))
            const matchingSnapshot = await getDocs(matchingQuery)
            // matchingId가 일치하는 문서가 있는 경우 해당하는 사용자의 문서 ID 반환
            if (!matchingSnapshot.empty) {
                matchingWriterId = userDoc.id
                console.log('matching', matchingWriterId)
            }
        }

        const userId = await findDocumentIdByField(collection(db, 'User'), 'userEmail', userEmail)
        console.log(userId)
        const userDocRef = doc(db, 'User', matchingWriterId)
        if (matchingWriterId) {

            const joinCollection = collection(db, 'User', userId, 'Join')
            const commentQuerySnapshot = await getDocs(query(joinCollection, where('matchingId', '==', matchingId)))
            const mId = await findDocumentIdByField(collection(userDocRef, 'Matching'), 'matchingId', matchingId)

            if (commentQuerySnapshot.empty) {
                await addDoc(joinCollection, { matchingId: matchingId })
                console.log('참여 성공')
            } else {
                console.log('이미 참여 기록이 존재합니다.')
            }

            const matchingDocRef = doc(db, `User/${matchingWriterId}/Matching/${mId}`)

            // 증가시킬 값
            const incrementValue = 1

            // 문서 업데이트
            await updateDoc(matchingDocRef, {
                matchingCurrentHead: increment(incrementValue),
            })

        } else {
            console.error('해당 필드 값을 가진 문서를 찾을 수 없습니다.')
        }
    } catch (error) {
        console.error('추가 중 오류 발생:', error)
    }
}

/**
 * @description 참여 신청 철회
 * @param userEmail
 * @param matchingId
 * @returns {Promise<void>}
 */
export const fetchCancelJoin = async (userEmail, matchingId) => {
    try {
        const userCollectionRef = collection(db, 'User')
        const userSnapshot = await getDocs(userCollectionRef)
        let matchingWriterId

        for (const userDoc of userSnapshot.docs) {
            const matchingCollectionRef = collection(db, `User/${userDoc.id}/Matching`)
            const matchingQuery = query(matchingCollectionRef, where('matchingId', '==', matchingId))
            const matchingSnapshot = await getDocs(matchingQuery)
            // matchingId가 일치하는 문서가 있는 경우 해당하는 사용자의 문서 ID 반환
            if (!matchingSnapshot.empty) {
                matchingWriterId = userDoc.id
                console.log('matching', matchingWriterId)
            }
        }

        const userId = await findDocumentIdByField(collection(db, 'User'), 'userEmail', userEmail) // 참여자
        console.log(userId)
        const userDocRef = doc(db, 'User', matchingWriterId)
        if (matchingWriterId) {
            const commentDocId = await findDocumentIdByField(collection(userDocRef, 'Join'), 'matchingId', matchingId)
            const mId = await findDocumentIdByField(collection(userDocRef, 'Matching'), 'matchingId', matchingId)

            if (commentDocId) {
                const commentDocRef = doc(db, 'User', userId, 'Join', commentDocId)
                await deleteDoc(commentDocRef)
                console.log('참여신청이 철회 되었습니다.')

                const matchingDocRef = doc(db, `User/${matchingWriterId}/Matching/${mId}`)

                // 증가시킬 값
                const decrementValue = -1

                // 문서 업데이트
                await updateDoc(matchingDocRef, {
                    matchingCurrentHead: increment(decrementValue),
                })

            } else {
                console.error('해당 matchingId를 가진 join을 찾을 수 없습니다.')
            }
        }
    } catch (error) {
        console.error('댓글을 삭제하는 중 오류 발생:', error)
    }
}


/**
 * @description 참여자 닉네임을 가져오는 함수
 * @param matchingId
 * @returns {Promise<string[]>}
 */
export const findUserNicknamesByMatchingId = async (matchingId) => {
    try {
        const userCollectionRef = collection(db, 'User')
        const userCollectionSnapshot = await getDocs(userCollectionRef)

        const userNicknames = []

        for (const userDoc of userCollectionSnapshot.docs) {
            const joinCollectionRef = collection(userDoc.ref, 'Join')

            const joinQuery = query(joinCollectionRef, where('matchingId', '==', matchingId))
            const joinSnapshot = await getDocs(joinQuery)

            if (!joinSnapshot.empty) {
                const userNickname = userDoc.data().userNickname
                userNicknames.push(userNickname)
            }
        }

        return userNicknames
    } catch (error) {
        console.error('사용자 닉네임을 가져오는 중 오류 발생:', error)
        return []
    }
}

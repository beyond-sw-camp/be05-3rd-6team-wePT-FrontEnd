import { collection, getDocs, query, where, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/index.js';

// 사용자 (전체) 출력 
export const fetchUsers = async () => {
    const UserCollection = collection(db, 'User');
    const users = [];
    try {
        const querySnapshot = await getDocs(UserCollection);
        querySnapshot.forEach(doc => {
            users.push(doc.data());
        });
    } catch (error) {
        console.error("문서를 가져오는 중 오류 발생:", error);
    }
    return users;
};

// 문서 전체 출력 (3개 분야별로) id로 넣어줘야함
export const FindPosts = async (id) => {
    const UserCollection = collection(db, 'User');
    const postList = [];
    try {
        const querySnapshot = await getDocs(UserCollection);
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const postCollection = collection(doc.ref, 'Matching');
            const q = query(postCollection, where('matchingCategory', '==', id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(pDoc => {
                console.log(pDoc.data());
                postList.push(pDoc.data());
            });
        }));
    } catch (error) {
        console.error("문서를 가져오는 중 오류 발생:", error);
    }
    return postList;
};


// 세부 문서 출력 (매칭 신청한 id 까지)
export const postDetail = async (matchingId) => {
    const UserCollection = collection(db, 'User');
    const post = [];
    try {
        const querySnapshot = await getDocs(UserCollection);
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const postCollection = collection(doc.ref, 'Matching');
            const q = query(postCollection, where('matchingId', '==', matchingId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(pDoc => {
                // console.log(pDoc.data());
                post.push(pDoc.data());
            });
        }));
    } catch (error) {
        console.error("문서를 가져오는 중 오류 발생:", error);
    }
    return post;
};

// 내 문서(매칭 글 작성) 출력
export const FindMyPost = async (userId) => {
    const UserCollection = collection(db, 'User');
    const userQuery = query(UserCollection, where('userEmail', '==', userId));
    const postList = [];
    try {
        const querySnapshot = await getDocs(userQuery);
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const postCollection = collection(doc.ref, 'Matching');
            const querySnapshot = await getDocs(postCollection);
            querySnapshot.forEach(pDoc => {
                console.log(pDoc.data());
                postList.push(pDoc.data());
            });
        }));
    } catch (error) {
        console.error("문서를 가져오는 중 오류 발생:", error);
    }
    return postList;
};

// 내 댓글(매칭 참여) 출력
export const FindMyComments = async (userId) => {
    const UserCollection = collection(db, 'User');
    const userQuery = query(UserCollection, where('userEmail', '==', userId));
    const commentList = [];
    try {
        const querySnapshot = await getDocs(userQuery);
        await Promise.all(querySnapshot.docs.map(async (doc) => {
            const commentCollection = collection(doc.ref, 'Join');
            const querySnapshot = await getDocs(commentCollection);
            querySnapshot.forEach(pDoc => {
                console.log(pDoc.data());
                commentList.push(pDoc.data());
            });
        }));
    } catch (error) {
        console.error("문서를 가져오는 중 오류 발생:", error);
    }
    return commentList;
};

// 글 작성 / postData는 사용 파일에서 넣어주어야함
export const addPost = async (userId, postData) => {
    const UserCollection = collection(db, 'User');
    const userQuery = query(UserCollection, where('userEmail', '==', userId));

    try {
        // 사용자 문서에서 사용자 정보 가져오기
        const querySnapshot = await getDocs(userQuery);
        
        if (!querySnapshot.empty) {
            // 사용자 문서가 존재하면 사용자의 포스트 컬렉션에 데이터 추가
            querySnapshot.forEach(doc => {
                const userRef = doc.ref;
                const postCollection = collection(userRef, 'Matching');
                addDoc(postCollection, postData).then(() => {
                    console.log('포스트가 사용자의 포스트 컬렉션에 추가되었습니다.');
                }).catch(error => {
                    console.error('포스트를 추가하는 중 오류 발생:', error);
                });
            });
        } else {
            console.error('해당 사용자를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('사용자를 검색하는 중 오류 발생:', error);
    }
};

// 글 수정
export const updatePost = async (userId, matchingId, newData) => {
    try {
        const UserCollection = collection(db, 'User');
        const userQuery = query(UserCollection, where('userEmail', '==', userId));
        const userQuerySnapshot = await getDocs(userQuery);
        console.log('a');
        if (!userQuerySnapshot.empty) {
            const userDoc = userQuerySnapshot.docs[0];
            if (userDoc) {
                const postCollection = collection(db, `Users/${userDoc.id}/Matching`);
                const postQuery = query(postCollection, where('matchingId', '==', matchingId));
        
                const postQuerySnapshot = await getDocs(postQuery);

                if (!postQuerySnapshot.empty) {
                    const postId =  postQuerySnapshot.docs[0].id;
                    const postRef = doc(postCollection, postId);
                    await updateDoc(postRef, newData);
                    console.log('포스트가 성공적으로 업데이트되었습니다.');
                } else {
                    console.error('해당 포스트를 찾을 수 없습니다.');
                }
            } else {
                console.error('해당 사용자를 찾을 수 없습니다.');
            }
        }
    } catch (error) {
        console.error('포스트를 업데이트하는 중 오류 발생:', error);
    }
};


// 글 삭제
export const deletePost = async (userEmail, matchingId) => {
    try {
        const userId = await findDocumentIdByField(collection(db, 'User'), 'userEmail', userEmail);
        const userDocRef = doc(db, 'User', userId);
        const collectionInput = collection(userDocRef, 'Matching');
        const postId = await findDocumentIdByField(collectionInput, 'matchingId', matchingId);
        if (postId) {
            const postDocRef = doc(db, 'User', userId, 'Matching', postId);
            await deleteDoc(postDocRef);
            console.log('포스트가 성공적으로 삭제되었습니다.');
        } else {
            console.error('해당 필드 값을 가진 문서를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('포스트를 삭제하는 중 오류 발생:', error);
    }
};


// 문서 아이ㅐ디 찾기
export const findDocumentIdByField = async (collectionInput, field, value) => {
    try {
        const q = query(collectionInput, where(field, '==', value));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // 필터된 결과에서 첫 번째 문서의 ID 반환
            const documentId = querySnapshot.docs[0].id;
            console.log('findDocumentIdByField');
            return documentId;
        } else {
            return null;
        }
    } catch (error) {
        console.error('문서 ID를 찾는 중 오류 발생:', error);
        return null;
    }
};

export const addComment = async (userEmail, matchingId) => {
    try {
        const userId = await findDocumentIdByField(collection(db, 'User'), 'userEmail', userEmail);
        console.log(userId);
        const userDocRef = doc(db, 'User', userId);
        console.log('aa');
        const collectionInput = collection(userDocRef, 'Matching');
        const postId = await findDocumentIdByField(collectionInput, 'matchingId', matchingId);
        console.log('aaaa');
        if (postId) {
            const commentCollection = collection(UserCollection, 'Join');
            const commentQuerySnapshot = await getDocs(query(commentCollection, where('matchingId', '==', matchingId)));
            if (commentQuerySnapshot.empty) {
                await addDoc(commentCollection, { matchingId: postId });
                console.log('참여 성공');
            } else {
                console.log('이미 참여 기록이 존재합니다.');
            }
        } else {
            console.error('해당 필드 값을 가진 문서를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('추가 중 오류 발생:', error);
    }
};


export const deleteComment = async (userEmail, postId) => {
    try {
        const userId = await findDocumentIdByField(collection(db, 'User'), 'userEmail', userEmail);
        const userDocRef = doc(db, 'User', userId);
        const collectionInput = collection(userDocRef, 'Join'); 
        const commentDocId = await findDocumentIdByField(collectionInput, 'matchingId', postId);
        if (commentDocId) {
            const commentDocRef = doc(db, 'User', userId, 'Join', commentDocId); 
            await deleteDoc(commentDocRef); // 댓글 삭제
            console.log('댓글이 성공적으로 삭제되었습니다.');
        } else {
            console.error('해당 postId를 가진 댓글을 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('댓글을 삭제하는 중 오류 발생:', error);
    }
};

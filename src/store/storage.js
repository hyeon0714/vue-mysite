import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state() {
        return {
            authUser: null,
            token: null
        };
    },
    mutations: {
        setAuthUser(state, payload) {
            state.authUser = payload;
        },
        setToken(state, payload) {
            state.token = payload;
        },
        setAuthName(state, payload){//수정후 토큰의 이름값만 바꿔주기
            state.authUser.name = payload;
        }
    },
    plugins: [
        createPersistedState({
            paths: ['authUser', 'token']
        })
    ]
});
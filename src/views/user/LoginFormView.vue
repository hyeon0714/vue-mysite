<template>
    <div>
        <div id="wrap">
            <div id="wrap">
                <AppHeader />

                <div id="container" class="clearfix">
                    <div id="aside">
                        <h2>회원</h2>
                        <ul>
                            <li>회원정보</li>
                            <li>로그인</li>
                            <li>회원가입</li>
                        </ul>
                    </div>
                    <!-- //aside -->

                    <div id="content">

                        <div id="content-head">
                            <h3>로그인</h3>
                            <div id="location">
                                <ul>
                                    <li>홈</li>
                                    <li>회원</li>
                                    <li class="last">로그인</li>
                                </ul>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <!-- //content-head -->

                        <div id="user">
                            <div id="loginForm">
                                <form v-on:submit.prevent="login" action="" method="">

                                    <!-- 아이디 -->
                                    <div class="form-group">
                                        <label class="form-text" for="input-uid">아이디</label>
                                        <input type="text" id="input-uid" name="" value="" placeholder="아이디를 입력하세요"
                                            v-model="userVo.id">
                                    </div>

                                    <!-- 비밀번호 -->
                                    <div class="form-group">
                                        <label class="form-text" for="input-pass">비밀번호</label>
                                        <input type="text" id="input-pass" name="" value="" placeholder="비밀번호를 입력하세요"
                                            v-model="userVo.password">
                                    </div>


                                    <!-- 버튼영역 -->
                                    <div class="button-area">
                                        <button type="submit" id="btn-submit">로그인</button>
                                    </div>

                                </form>
                            </div>
                            <!-- //loginForm -->
                        </div>
                        <!-- //user -->
                    </div>
                    <!-- //content  -->

                </div>
                <!-- //container  -->

                <AppFooter />

            </div>
            <!-- //wrap -->
        </div>
        <!-- //wrap -->
    </div>
</template>
<script>

import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import axios from 'axios';
export default {
    name: "LoginFormView",
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            userVo: {
                id: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            console.log("login")

            console.log(this.userVo);
            axios({
                method: 'post', // put, post, delete 
                url: 'http://localhost:8888/api/users/login',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: this.userVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타

                let authUser = response.data.apiData;

                if (response.data.result == "success") {
                    //token은 헤더에 있다
                    const token = response.headers.authorization.split(" ")[1];

                    //vuex에 저장
                    this.$store.commit("setAuthUser", authUser);
                    this.$store.commit("setToken", token);

                    console.log(authUser);
                    console.log(token)

                    //메인으로 이동
                    this.$router.push("/");
                } else {
                    console.log(response.data.message);
                    alert("아이디와 비밀번호를 확인해주세요")
                }



            }).catch(error => {
                console.log(error);
            });

        }
    }
}
</script>
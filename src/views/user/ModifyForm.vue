<template>
    <div>
        <div id="wrap">

            
            <AppHeader/>
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
                        <h3>회원정보</h3>
                        <div id="location">
                            <ul>
                                <li>홈</li>
                                <li>회원</li>
                                <li class="last">회원정보</li>
                            </ul>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <!-- //content-head -->

                    <div id="user">
                        <div id="modifyForm">
                            <form v-on:submit.prevent="modifyUser" action="" method="">

                                <!-- 아이디 -->
                                <div class="form-group">
                                    <label class="form-text" for="input-uid">아이디</label>
                                    <span class="text-large bold">{{ userVo.id }}</span>
                                </div>

                                <!-- 비밀번호 -->
                                <div class="form-group">
                                    <label class="form-text" for="input-pass">패스워드</label>
                                    <input type="text" id="input-pass" name="password" v-model="userVo.password"
                                        placeholder="비밀번호를 입력하세요">
                                </div>

                                <!-- 이메일 -->
                                <div class="form-group">
                                    <label class="form-text" for="input-name">이름</label>
                                    <input type="text" id="input-name" name="name" v-model="userVo.name"
                                        placeholder="이름을 입력하세요">
                                </div>

                                <!-- //나이 -->
                                <div class="form-group">
                                    <span class="form-text">성별</span>

                                    <label for="rdo-male">남</label>
                                    <input type="radio" id="rdo-male" name="gender" value="male"
                                        v-model="userVo.gender">

                                    <label for="rdo-female">여</label>
                                    <input type="radio" id="rdo-female" name="gender" value="female"
                                        v-model="userVo.gender">

                                </div>

                                <!-- 버튼영역 -->
                                <div class="button-area">
                                    <button type="submit" id="btn-submit">회원정보수정</button>
                                </div>

                            </form>


                        </div>
                        <!-- //modifyForm -->
                    </div>
                    <!-- //user -->
                </div>
                <!-- //content  -->

            </div>
            <!-- //container  -->

            <AppFooter/>

        </div>
        <!-- //wrap -->
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import axios from 'axios';
import "@/assets/css/user.css"


export default {
    name: "ModifyForm",
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            userVo: {
                no: "",
                id: "",
                password: "",
                name: "",
                gender: ""
            }
        }
    },
    methods: {
        
        login() {
            axios({
                method: 'get', // put, post, delete 
                url: 'http://localhost:8888/api/users/modifyform',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + this.$store.state.token  //저장된 토큰값을 보내는방식
                }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타

                if(response.data.result == "success"){
                    this.userVo.no = response.data.apiData.no
                    this.userVo.id = response.data.apiData.id
                    this.userVo.password = response.data.apiData.password
                    this.userVo.name = response.data.apiData.name
                    this.userVo.gender = response.data.apiData.gender
                }else{
                    console.log(response.data.message);
                    alert("로그인이 필요합니다");
                    this.$router.push("/user/loginform");
                }

                

            }).catch(error => {
                console.log(error);
            });
        },
        modifyUser() {
            console.log("클릭");
            console.log(this.userVo);
            axios({
                method: 'put', // put, post, delete 
                url: 'http://localhost:8888/api/users/modifyform',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + this.$store.state.token  //저장된 토큰값을 보내는방식
                }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: this.userVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타
                console.log(response); //수신데이타
                console.log(response.data); //수신데이타
                
                if(response.data.result != "fail"){
                    this.$store.commit("setAuthName", response.data.apiData);
                    this.$router.push("/");
                }else{//오류일시 vuex의 토큰값을 전부 지우기
                    this.$store.commit("setAuthUser", null);
                    this.$store.commit("setToken", null);
                    alert("잘못된 접근입니다");
                    this.$router.push("/user/loginform");
                }
                
            }).catch(error => {
                console.log(error);
            });
        }
    },
    created() {
        this.login()
    }
}
</script>
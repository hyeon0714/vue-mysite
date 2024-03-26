<template>
    <div>
        <!-- //html -->
        <div id="header" class="clearfix">
            <h1>
                <a href="">MySite</a>
            </h1>


            <ul v-if="this.$store.state.authUser != null">
                <li>{{ this.$store.state.authUser.name }} 님 안녕하세요^^</li>
                <li><button v-on:click="logout">로그아웃</button></li>
                <li><router-link class="btn_s" to="/user/modifyform">회원정보수정</router-link></li>
            </ul>

            <ul v-else>
                <li><router-link class="btn-s" to="/user/loginform">로그인</router-link></li>
                <li><a href="" class="btn_s">회원가입</a></li>
            </ul>

        </div>
        <!-- //header -->

        <div id="nav">
            <ul class="clearfix">
                <li><a href="">입사지원서</a></li>
                <li><a href="">게시판</a></li>
                <li><a href="">갤러리</a></li>
                <li><a href="">방명록</a></li>
            </ul>
        </div>
        <!-- //nav -->
    </div>
</template>
<script>
export default {
    name: "AppHeader",
    components: {},
    data() {
        return {};
    },
    methods: {
        logout(){
                console.log("logout")
                this.$store.commit("setAuthUser", null);
                this.$store.commit("setToken", null);
            }
    },
    created() { }
};
</script>
<template>
    <div>
        <div id="wrap">

            <AppHeader />


            <div id="container" class="clearfix">
                <div id="aside">
                    <h2>게시판</h2>
                    <ul>
                        <li><a href="">일반게시판</a></li>
                        <li><a href="">댓글게시판</a></li>
                    </ul>
                </div>
                <!-- //aside -->

                <div id="content">

                    <div id="content-head">
                        <h3>일반게시판</h3>
                        <div id="location">
                            <ul>
                                <li>홈</li>
                                <li>게시판</li>
                                <li class="last">일반게시판</li>
                            </ul>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <!-- //content-head -->

                    <div id="board">
                        <div id="writeForm">
                            <form v-on:submit.prevent="write" action="#" method="get">
                                <!-- 제목 -->
                                <div class="form-group">
                                    <label class="form-text" for="txt-title">제목</label>
                                    <input type="text" id="txt-title" name="title" v-model="vo.title"
                                        placeholder="제목을 입력해 주세요">
                                </div>

                                <!-- 내용 -->
                                <div class="form-group">
                                    <textarea id="txt-content" v-model="vo.content"></textarea>
                                </div>

                                <a v-on:click.prevent="out" id="btn_cancel" href="">취소</a>
                                <button id="btn_add" type="submit">등록</button>

                            </form>
                            <!-- //form -->
                        </div>
                        <!-- //writeForm -->
                    </div>
                    <!-- //board -->
                </div>
                <!-- //content  -->


            </div>
            <!-- //container  -->

            <AppFooter />

        </div>
        <!-- //wrap -->
    </div>
</template>
<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import axios from 'axios';

export default {
    name: "BoardWrite",
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            vo: {
                userNo: "",
                title: "",
                content: ""
            }
        }
    },
    methods: {
        write() {
            console.log("write")
            if (this.$store.state.authUser == null) {
                alert("로그인이 필요합니다")
                this.$router.push("/user/loginform");
            } else {
                
                console.log(this.vo)
                console.log(this.$store.state.token)
                axios({
                    method: 'post', // put, post, delete 
                    url: 'http://localhost:8888/api/boardwrite',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Authorization": "Bearer " + this.$store.state.token

                    }, //전송타입
                    //params: guestbookVo, //get방식 파라미터로 값이 전달
                    data: this.vo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                    responseType: 'json' //수신타입
                }).then(response => {
                    console.log(response); //수신데이타

                    if (response.data.result == "success") {
                        alert("등록되엇습니다")
                        this.$router.push("/board/boardlist")
                    } else {
                        alert("오류");
                    }

                }).catch(error => {
                    console.log(error);
                });
            }
        },
        out() {
            console.log("out")
            this.$router.push("/board/boardlist")
        }
    }
}

</script>
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
                        <div id="read">
                            <form action="#" method="get">
                                <!-- 작성자 -->
                                <div class="form-group">
                                    <span class="form-text">작성자</span>
                                    <span class="form-value">{{ boardVo.name }}</span>
                                </div>

                                <!-- 조회수 -->
                                <div class="form-group">
                                    <span class="form-text">조회수</span>
                                    <span class="form-value">{{ boardVo.hit }}</span>
                                </div>

                                <!-- 작성일 -->
                                <div class="form-group">
                                    <span class="form-text">작성일</span>
                                    <span class="form-value">{{ boardVo.date }}</span>
                                </div>

                                <!-- 제목 -->
                                <div class="form-group">
                                    <span class="form-text">제 목</span>
                                    <span class="form-value">{{ boardVo.title }}</span>
                                </div>

                                <!-- 내용 -->
                                <div id="txt-content">
                                    <span class="form-value">
                                        {{ boardVo.content }}
                                    </span>
                                </div>

                                <RouterLink id="btn_modify" :to="`/board/boardmodify?no=${no}`">수정</RouterLink>
                                <RouterLink to="/board/boardlist" id="btn_modify">목록</RouterLink>

                            </form>
                            <!-- //form -->
                        </div>
                        <!-- //read -->
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

            no: "",

            boardVo: {
                title: "",
                content: "",
                hit: "",
                date: "",
                name: ""
            }
        }
    },
    methods: {
        read() {
            const urlParams = new URL(location.href).searchParams;

            const no = urlParams.get('no');
            this.no = no
            console.log(this.vo)
            axios({
                method: 'post', // put, post, delete 
                url: 'http://localhost:8888/api/boardlist',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + this.$store.state.token
                }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: this.no, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                if (response.data.result == "success") {
                    this.boardVo = response.data.apiData
                    console.log(this.boardVo);
                } else {
                    alert(response.data.message)
                }
            }).catch(error => {
                console.log(error);
            });
        }
    },
    created() {
        this.read()
    }
}
</script>
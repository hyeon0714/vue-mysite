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
                        <div id="modifyForm">
                            <form v-on:submit.prevent="mo" action="#" method="get">
                                <!-- 작성자 -->
                                <div class="form-group">
                                    <span class="form-text">작성자</span>
                                    <span class="form-value">{{ this.boardVo.name }}</span>
                                </div>

                                <!-- 조회수 -->
                                <div class="form-group">
                                    <span class="form-text">조회수</span>
                                    <span class="form-value">{{ this.boardVo.hit }}</span>
                                </div>

                                <!-- 작성일 -->
                                <div class="form-group">
                                    <span class="form-text">작성일</span>
                                    <span class="form-value">{{ this.boardVo.date }}</span>
                                </div>

                                <!-- 제목 -->
                                <div class="form-group">
                                    <label class="form-text" for="txt-title">제목</label>
                                    <input type="text" id="txt-title" name="" v-model="this.boardVo.title"
                                        v-bind:placeholder="this.boardVo.title">
                                </div>



                                <!-- 내용 -->
                                <div class="form-group">
                                    <textarea id="txt-content" v-model="this.boardVo.content"
                                        v-bind:placeholder="this.boardVo.content"></textarea>
                                </div>

                                <a id="btn_cancel" href="">취소</a>
                                <button id="btn_modify" type="submit">수정</button>

                            </form>
                            <!-- //form -->
                        </div>
                        <!-- //modifyForm -->
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
    name: "ModifyForm",
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            vo: {


                no: ""
            },
            boardVo: {
                title: "",
                content: "",
                hit: "",
                date: "",
                name: "",
                no: ""
            }
        }
    },
    methods: {
        modify() {
            console.log("modify")
            const urlParams = new URL(location.href).searchParams;
            const no = urlParams.get('no');
            if (no == null) {
                alert("잘못된접근입니다")
                this.$router.push("/board/boardlist")
            } else {
                this.vo.no = no
                console.log(this.vo.no)
                axios({
                    method: 'post', // put, post, delete 
                    url: 'http://localhost:8888/api/boardmodify',
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
                        this.boardVo = response.data.apiData
                        console.log(this.boardVo)

                    } else {
                        alert("오류");
                    }

                }).catch(error => {
                    console.log(error);
                });
            }
        },
        mo() {
            console.log(this.boardVo);
            const urlParams = new URL(location.href).searchParams;
            const no = urlParams.get('no');
            this.boardVo.no = no;

            axios({
                method: 'put', // put, post, delete 
                url: 'http://localhost:8888/api/boardmodify',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + this.$store.state.token
                }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: this.boardVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타


                //귀찮아서 검증 없이 바로 이동...
                this.$router.push("/board/boardlist");
            }).catch(error => {
                console.log(error);
            });

        }
    },
    created() {
        this.modify()
    }
}
</script>
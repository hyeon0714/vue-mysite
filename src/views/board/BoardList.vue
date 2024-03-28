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
                        <div id="list">
                            <form action="" method="">
                                <div class="form-group text-right">
                                    <input type="text">
                                    <button type="submit" id=btn_search>검색</button>
                                </div>
                            </form>
                            <table>
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>제목</th>
                                        <th>글쓴이</th>
                                        <th>조회수</th>
                                        <th>작성일</th>
                                        <th>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-bind:key="i" v-for="(vo, i) in bList" class="last">
                                        <td>{{ vo.no }}</td>
                                        <td class="text-left">
                                            <RouterLink :to="`/board/boardread?no=${vo.no}`">{{ vo.title }}</RouterLink>
                                        </td>
                                        <td>{{ vo.name }}</td>
                                        <td>{{ vo.hit }}</td>
                                        <td>{{ vo.date }}</td>
                                        <td v-on:click="a" v-if="this.$store.state.authUser.no == vo.userNo">
                                            <a href="">[삭제]</a>
                                        </td>
                                        <td v-on:click.prevent="" v-else>
                                            <a href="">[삭제]</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                            <div>
                                <RouterLink id="btn_write" to="/board/boardwrite">글쓰기</RouterLink>
                            </div>
                            <div class="clear"></div>
                            <div>
                                <button id="btn_moreBoard" type="button">글 가져오기</button>
                            </div>

                        </div>
                        <!-- //list -->
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
    name: "BoardList",
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            bList: []
        }
    },
    methods: {
        list() {
            console.log("리스트업")
            axios({
                method: 'get', // put, post, delete 
                url: 'http://localhost:8888/api/boardlist',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                // data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타
                console.log(this.$store.state.authUser.no)
                if (response.data.result == "success") {

                    this.bList = response.data.apiData
                    console.log(this.bList)
                } else {
                    console.log("실패")
                }

            }).catch(error => {
                console.log(error);
            });
        }
    },
    created() {
        this.list()
    }
}
</script>
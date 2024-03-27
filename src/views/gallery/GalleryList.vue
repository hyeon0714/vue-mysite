<template>
    <div>
        <div id="wrap">

            <AppHeader />


            <div id="container" class="clearfix">
                <div id="aside">
                    <h2>갤러리</h2>
                    <ul>
                        <li><a href="">일반갤러리</a></li>
                        <li><a href="">파일첨부연습</a></li>
                    </ul>
                </div>
                <!-- //aside -->

                <div id="content">
                    <div id="content-head">
                        <h3>일반갤러리</h3>
                        <div id="location">
                            <ul>
                                <li>홈</li>
                                <li>갤러리</li>
                                <li class="last">일반갤러리</li>
                            </ul>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <!-- //content-head -->


                    <div id="gallery">
                        <div id="list">


                            <button v-on:click="listUp" type="submit" id="btnImgUpload">이미지올리기</button>
                            <div class="clear"></div>


                            <ul v-bind:key="i" v-for="(vo, i) in gvList" id="viewArea">

                                <!-- 이미지반복영역 -->

                                <li>
                                    <div class="view">
                                        <img class="imgItem" v-bind:src="`http://localhost:8888/upload/${vo.saveName}`">
                                        <div class="imgWriter">작성자: <strong>{{ vo.name }}</strong></div>
                                    </div>
                                </li>


                                <!-- 이미지반복영역 -->


                            </ul>
                        </div>
                        <!-- //list -->
                    </div>
                    <!-- //	gallery -->

                </div>
                <!-- //content  -->

            </div>
            <!-- //container  -->


            <AppFooter />
        </div>
        <!-- //wrap -->

        <!-- 이미지등록 팝업(모달)창 -->
        <div id="addModal" class="modal">
            <div class="modal-content">
                <form v-on:submit.prevent="upload" action="" method="post" enctype="multipart/form-data">
                    <div v-on:click="close" class="closeBtn">×</div>
                    <div class="m-body">

                        <div class="form-group">
                            <label class="form-text">이미지선택</label>
                            <input v-on:change="selectFile" type="file" name="file">
                        </div>
                    </div>
                    <input type="hidden" name="userNo" value="${sessionScope.userVo.no }">
                    <div class="m-footer">
                        <button type="submit">저장</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>
<script>
import AppHeader from "../../components/AppHeader.vue"
import AppFooter from "../../components/AppFooter.vue"
import axios from 'axios';

export default {
    name: "GalleryList",
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            file: "",
            gvList: [],

        }
    },
    methods: {
        list() {
            axios({
                method: 'get', // put, post, delete 
                url: 'http://localhost:8888/api/gallery',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                this.gvList = response.data
                console.log(this.gvList[0].saveName);
                console.log(this.gvList);

            }).catch(error => {
                console.log(error);
            });
        },
        listUp() {
            console.log("업");

            let viewModal = document.querySelector("#addModal");

            viewModal.style.display = "block";
        },
        close() {
            let viewModal = document.querySelector("#addModal");

            viewModal.style.display = "none";
        },
        upload() {

            let formData = new FormData();

            formData.append("file", this.file);
            formData.append("token", this.$store.state.token);
            console.log(this.file)
            console.log(this.$store.state.token)

            axios({
                method: 'post', // put, post, delete    전송은 post
                url: 'http://localhost:8888/api/gallery',
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + this.$store.state.token

                }, //멀티파트로 헤더를 변경해서 보낸다
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: formData, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타

                if(response.data.result == "fail"){
                    alert(response.data.message)
                }

                let viewModal = document.querySelector("#addModal");
                viewModal.style.display = "none";
                //this.$router.push({path: "/attach/attachresult", query: {saveName: response.data.apiData}})
                //이동할 주소와 보낼 데이터까지 보낸다(쿼리는 파라미터로 올라간다)

            }).catch(error => {
                console.log(error);
                alert("실패");
            });

        },
        selectFile(event) {
            this.file = event.target.files[0]
        }
    },
    created() {
        this.list()
    }
}

</script>
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
                        <h3>첨부파일연습</h3>
                        <div id="location">
                            <ul>
                                <li>홈</li>
                                <li>갤러리</li>
                                <li class="last">첨부파일연습</li>
                            </ul>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <!-- //content-head -->

                    <div id="file">
                        <form v-on:submit.prevent="uploadFile" action="" method="post" enctype="multipart/form-data">
                            <table>
                                <colgroup>
                                    <col style="width: 600px;">
                                    <col style="width: 220px;">
                                </colgroup>
                                <!--추가된부분-->
                                <tr>
                                    <td class="text-left">
                                        <label>이름</label>
                                        <input type="text" name="name" v-model="name">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left">
                                        <label>성별</label>
                                        <input type="text" name="gender" v-model="gender">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left"><input v-on:change="selectFile" type="file" name="file"></td>
                                    <td class="text-right"><button type="submit">파일업로드</button></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <!-- //file -->


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
    name: "AttachForm",
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {
            file: "",
            name: "",
            gender: ""
        }
    },
    methods: {
        uploadFile() {
            console.log("z");
            //서번전송용 박스
            let formData = new FormData()
            formData.append("file", this.file);
            formData.append("name", this.name);
            formData.append("gender", this.gender);
            console.log(formData)
            // ->data로 보낸다(json방식이 아님)

            axios({
                method: 'post', // put, post, delete    전송은 post
                url: 'http://localhost:8888/api/attach',
                headers: { "Content-Type": "multipart/form-data" }, //멀티파트로 헤더를 변경해서 보낸다
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: formData, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타

                this.$router.push({path: "/attach/attachresult", query: {saveName: response.data.apiData}})
                //이동할 주소와 보낼 데이터까지 보낸다(쿼리는 파라미터로 올라간다)

            }).catch(error => {
                console.log(error);
            });

        },
        selectFile(event) {
            console.log("h")
            this.file = event.target.files[0]  //파일을 여러개 선택할수 있으므로 배열인 값을 사용
            
        }
    }
}
</script>
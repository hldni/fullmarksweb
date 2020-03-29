<template>
    <div id="uesrtext">
        <!-- <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage"></textarea> -->
		<v-text-field label="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage"></v-text-field>
    </div>
</template>
<script type="application/javascript" src="http://cdn.bootcss.com/stomp.js/2.3.3/stomp.min.js"></script>
<script>
    import {mapState} from 'vuex'

    export default {
        name: 'uesrtext',
        data() {
            return {
                content: ''
            }
        },
        computed: mapState([
            'sessions',
            'currentSession'
        ]),
        methods: {
            addMessage(e) {
                if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                    let msgObj = new Object();
                    msgObj.to = this.currentSession.username;
                    msgObj.content = this.content;
                    this.$store.state.stomp.send('/ws/chat', {}, JSON.stringify(msgObj));
					// alert(JSON.stringify(msgObj)+"json");
                    this.$store.commit('addMessage', msgObj);
                    this.content = '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #uesrtext {
        width: 100%;
        border-top: solid 5px #DDD;

        > v-text-field {
            padding: 10px;
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
        }
    }
</style>

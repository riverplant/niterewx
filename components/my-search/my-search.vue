<template>
    <uni-search-bar placeholder="输入订单号查找订单" bgColor=" #FFFFFF" @input="search" cancel-button="none" :radius="100" />
</template>

<script>
    export default {
        name: "my-search",
        data() {
            return {
                timer: null,
                kw: ''
            };
        },
        methods: {
            search(res) {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.kw = res
                    console.log('res:', res)
                    console.log(this.kw)
                }, 500)
            }
        }

    }
</script>

<style lang="scss">

</style>
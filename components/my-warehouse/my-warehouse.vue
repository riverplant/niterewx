<template>
    <view>
      <view>
        <uni-data-picker placeholder="请选择班级" popup-title="请选择所在地区" :localdata="dataTree" v-model="classes"
        				@change="onchange" @nodeclick="onnodeclick">
        			</uni-data-picker>
       </view>   
    </view>
</template>

<script>
    export default {
      data() {
      			return {
      				classes: '1-2',
      				dataTree: [{
      					text: "一年级",
      					value: "1-0",
      					children: [{
      						text: "1.1班",
      						value: "1-1"
      					},
      					{
      						text: "1.2班",
      						value: "1-2"
      					}]
      				},
      				{
      					text: "二年级",
      					value: "2-0",
      					children: [{
      						text: "2.1班",
      						value: "2-1"
      					},
      					{
      						text: "2.2班",
      						value: "2-2"
      					}]
      				},
      				{
      					text: "三年级",
      					value: "3-0",
      					disable: true
      				}]
      			}
      		},
         methods: {
              onchange(e) {
                const value = e.detail.value
              },
              onnodeclick(node) {}
            }
    }
</script>

<style>

</style>
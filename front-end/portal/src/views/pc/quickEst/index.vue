<template>
  <div class="container">
    <form class="form">
      <div class="item" v-for="(item, index) in wordExcel" :key="item.id">
        <input
          type="checkbox"
          v-model="checkbox"
          :value="'' + item.wordLevelId + index"
          :id="item.id"
        />
        <label class="label" :for="item.id">{{ item.word }}</label>
      </div>
    </form>
    <button id="continue" @click="continueTest">continue</button>
  </div>
</template>
<script>
import estimationApi from "@/api/estimation";
export default {
  name: "Component-test",
  data: function () {
    return {
      wordExcel: [],
      checkbox: [],
      result: [0, 0, 0, 0, 0],
    };
  },
  methods: {
    continueTest() {
      this.checkbox.forEach((item) => {
        var newItem = parseInt(item.slice(0, 1));
        var result = this.result;
        switch (newItem) {
          case 1:
            result[0]++;
            break;
          case 2:
            result[1]++;
            break;
          case 3:
            result[2]++;
            break;
          case 4:
            result[3]++;
            break;
          case 5:
            result[4]++;
            break;
        }
      });
      estimationApi
        .calculate(this.result.join(","))
        .then((resp) => {
          let result = resp.data.result;
          this.$router.push({ name: "Result", params: { result } });
        })
        .catch((err) => console.log(err))
        .finally(() => {
        });
      this.result = [0, 0, 0, 0, 0];
    },
    getWord() {
      estimationApi
        .listEstimationWords()
        .then((resp) => {
          this.wordExcel = resp.data.item.estimationWordList;
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    },
  },
  created() {
    this.getWord();
  },
};
</script>
<style scoped>
.container {
  position: relative;
  width: 70%;
  left: 15%;
  margin: 20px 0px 20px 0px;
  padding: 0;
  border-radius: 30px;
  background-color: white;
}
.form {
  display: flex;
  flex-wrap: wrap;
}
input[type="checkbox"] {
  width: 25px;
  height: 25px;
}
input[type="submit"] {
  flex-wrap: wrap;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
.item {
  padding: 10px;
  width: 200px;
}
.label {
  position: relative;
  bottom: 8px;
  font-size: 15px;
  color: black;
}
#continue {
  position: relative;
  margin: 0 0 10px 0;
  left: 50%;
  transform: translate(-50%);
  border-radius: 10px;
  width: 100px;
  height: 40px;
  background-color: rgb(54, 44, 44);
  color: white;
  font-size: 17px;
}
</style>

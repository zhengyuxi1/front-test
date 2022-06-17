<template>
  <div id="app-container">
    <div id="main" v-if="wordList.length > 0" v-loading="loading">
      <!-- 进度条 -->
      <el-progress
        :stroke-width="12"
        :percentage="(index / wordList.length) * 100"
        :show-text="false"
      ></el-progress>
      <div id="autoplay">
        <el-checkbox v-model="autoplay">自动播放单词读音</el-checkbox>
      </div>
      <div id="box" :style="boxStyle">
        <!-- 单词显示位置 -->
        <div id="word">
          {{ wordList[index].word }}
          <audio
            id="audio"
            ref="audio"
            :src="`https://dict.youdao.com/dictvoice?audio=${wordList[index].word}&type=1`"
            :autoplay="autoplay"
          ></audio>
        </div>
        <div id="voice">
          <svg
            t="1655172136520"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2270"
            width="36"
            height="36"
            :fill="svgColor"
            @click="onVoiceBtnDown"
            @mouseenter="onMouseEnterVoice"
            @mouseleave="onMouseLeaveVoice"
          >
            <path
              d="M257.493333 322.4l215.573334-133.056c24.981333-15.413333 57.877333-7.914667 73.493333 16.746667 5.301333 8.373333 8.106667 18.048 8.106667 27.914666v555.989334C554.666667 819.093333 530.784 842.666667 501.333333 842.666667c-9.994667 0-19.786667-2.773333-28.266666-8L257.493333 701.6H160c-41.237333 0-74.666667-33.013333-74.666667-73.738667V396.138667c0-40.725333 33.429333-73.738667 74.666667-73.738667h97.493333z m26.133334 58.4a32.298667 32.298667 0 0 1-16.96 4.8H160c-5.888 0-10.666667 4.714667-10.666667 10.538667v231.733333c0 5.813333 4.778667 10.538667 10.666667 10.538667h106.666667c5.994667 0 11.872 1.664 16.96 4.8L490.666667 770.986667V253.013333L283.626667 380.8zM800.906667 829.653333a32.288 32.288 0 0 1-45.248-0.757333 31.317333 31.317333 0 0 1 0.768-44.693333c157.653333-150.464 157.653333-393.962667 0-544.426667a31.317333 31.317333 0 0 1-0.768-44.682667 32.288 32.288 0 0 1 45.248-0.757333c183.68 175.306667 183.68 460.010667 0 635.317333z m-106.901334-126.186666a32.288 32.288 0 0 1-45.248-1.216 31.328 31.328 0 0 1 1.237334-44.672c86.229333-80.608 86.229333-210.56 0-291.178667a31.328 31.328 0 0 1-1.237334-44.672 32.288 32.288 0 0 1 45.248-1.216c112.885333 105.546667 112.885333 277.418667 0 382.965333z"
              p-id="2271"
            ></path>
          </svg>
        </div>
        <!-- 按钮 -->
        <div id="buttons">
          <div
            v-for="(option, idx) in wordList[index].options"
            :key="idx"
            style="text-align: center"
            :style="{ top: `${50 + idx * 10}%` }"
            class="button"
          >
            <button
              style="
                width: 75%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              "
              class="bttn-float bttn-md"
              @click="selectOption(option)"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import estimationApi from "@/api/estimation";
export default {
  name: "Estimation",
  data() {
    return {
      loading: false, // 是否加载中
      index: 0, // 当前显示单词在单词列表的索引
      wordList: [],
      wordNums: [],
      levelRightCounts: [],
      autoplay: true, //自动播放音频
      isHoverVoiceBtn: false,
      boxBGColor: [
        ["#dd7132", "#ebd82c"],
        ["#dd7132", "#ebd82c"],
        ["#dd7132", "#ebd82c"],
        ["#dd7132", "#ebd82c"],
        ["#dd7132", "#ebd82c"],
      ],
    };
  },
  computed: {
    svgColor() {
      return this.isHoverVoiceBtn ? "#43b0fd" : "#ccc";
    },
    boxStyle() {
      const idx = this.wordList[this.index].wordLevelId - 1;
      return (
        "background-image: linear-gradient(to bottom right, " +
        this.boxBGColor[idx][0] +
        ", " +
        this.boxBGColor[idx][1] +
        ")"
      );
    },
  },
  created() {
    this.getEstimationWords();
  },
  methods: {
    onMouseEnterVoice() {
      this.isHoverVoiceBtn = true;
    },
    onMouseLeaveVoice() {
      this.isHoverVoiceBtn = false;
    },
    onVoiceBtnDown() {
      this.$refs["audio"].play();
    },
    nextWordOrCalc() {
      if (this.index < this.wordList.length - 1) {
        this.index++;
      } else {
        this.loading = true;
        console.log(this.levelRightCounts.join(','));
        estimationApi
          .calculate(this.levelRightCounts.join(','))
          .then((resp) => {
            let result = resp.data.result;
            this.$router.push({ name: "Result", params: { result } });
          })
          .catch((err) => console.log(err))
          .finally(() => {
            this.loading = false;
          });
      }
    },
    selectOption(option) {
      // 答对
      if (option === this.wordList[this.index].chinese) {
        this.levelRightCounts[this.wordList[this.index].wordLevelId - 1]++;
      }
      this.nextWordOrCalc();
    },
    async getEstimationWords() {
      this.loading = true;
      await estimationApi
        .listEstimationWords()
        .then((resp) => {
          this.wordList = resp.data.item.estimationWordList;
          this.wordNums = resp.data.item.wordNums;
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.loading = false;
        });
      // 初始化
      this.levelRightCounts = new Array(this.wordNums.length).fill(0);
    },
  },
};
</script>

<style scoped>
@import url("../../../styles/btn.min.css");

#main {
  position: relative;
  width: 100%;
  height: 700px;
  background-size: 100% 100%;
  background-image: linear-gradient(
    to bottom right,
    rgb(255, 255, 255),
    rgb(166, 215, 243)
  );
}

#autoplay {
  margin-left: 36px;
  margin-top: 28px;
}

#box {
  position: relative;
  left: 50%;
  transform: translate(-50%, 10%);
  height: 60%;
  width: 30%;
  min-height: 500px;
  min-width: 300px;
  /* margin: auto; */
  text-align: center;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  box-shadow: 2px 4px 20px rgb(82, 82, 82);
  display: flex;
  flex-direction: column;
}

#word {
  font-size: 48px;
  line-height: 54px;
  margin-top: 80px;
  word-break: break-word;
  width: 100%;
  position: relative;
  left: 45%;
  transform: translate(-45%, -45%);
  color: white;
}

#voice {
  position: relative;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 48px;
  width: 48px;
  cursor: pointer;
}

.button {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-evenly;
  user-select: none;
}
</style>

import { EchartsProps } from "./ring";
import { asyncAndCommit } from "./index";
import { GlobalStore } from ".";
import { Module } from "vuex";
export interface GlobalDashBoardProps {
  option: EchartsProps;
}
export const ModuleDashBoard: Module<GlobalDashBoardProps, GlobalStore> = {
  mutations: {
    UserFind(state, res) {
      if (state.option.series) {
        if (state.option.series[0].data) {
          return (state.option.series[0].data[0] = {
            value: res.data.length,
            name: "总用户量",
          });
        }
      }
    },
  },
  actions: {
    async FindUser({ commit }) {
      return asyncAndCommit("/user", "UserFind", commit, {
        method: "get",
      });
    },
  },
  namespaced: true,
  state: {
    option: {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}人",
      },
      series: [
        {
          name: "总用户量",
          type: "gauge",
          center: ["50%", "60%"],
          radius: "100%", //仪表大小
          startAngle: 200, //开始角度
          endAngle: -20, //结束角度
          min: 0,
          max: 1000,
          data: [{ value: 50 }],
          axisLine: {
            show: true,
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: [
                [0.5, "#FF6F90"],
                [0.8, "#FFB36F"],
                [1, "#27D9C8"],
              ],
              shadowColor: "#ccc",
              shadowBlur: 25,
              width: 20,
            },
          },
          splitLine: {
            show: true,
          },
          axisTick: {
            show: true,
          },
          axisLabel: {
            show: true,
          },
          pointer: {
            //指针样式
            length: "60%",
          },
          title: {
            show: true,
            offsetCenter: [0, "60%"],
            color: "#333",
            fontSize: 12,
            backgroundColor: "#D8d8d8",
            borderRadius: 21,
            padding: 5,
          },
        },
      ],
    },
  },
};

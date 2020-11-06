import { Module } from "vuex";
import { GlobalStore } from ".";
import { asyncAndCommit } from "./index";

export interface DataProps {
  name?: string;
  value?: string | number;
  itemStyle?: {};
}
export interface SeriesProps {
  radius?: string[] | string;
  startAngle?: number;
  endAngle?: number;
  center?: string[];
  min?: number;
  max?: number;
  hoverAnimation?: boolean;
  axisLine?: {};
  title?: {};
  splitLine?: {};
  axisLabel?: {};
  type?: string;
  pointer?: {
    length: string;
  };
  axisTick?: {};
  label?: {};
  labelLine?: {};
  emphasis?: {};
  name?: string;
  data: DataProps[];
  itemStyle?: {};
  animation?: boolean;
}
export interface LegendProps {
  orient?: string;
  left?: number;
  data?: string[];
}
export interface TooltipProp {
  formatter?: string;
  trigger?: string;
}
export interface EchartsProps {
  color?: string[];
  tooltip: TooltipProp;
  legend?: LegendProps;
  series: SeriesProps[];
}
export interface GlobalRingStore {
  option: EchartsProps;
  total: number;
  resValues: number[];
}
export const ModuleRing: Module<GlobalRingStore, GlobalStore> = {
  mutations: {
    findTotal(state, res) {
      const resKeys: string[] = Object.keys(res);
      const resValues: number[] = Object.values(res);
      state.resValues = resValues;
      state.total = resValues.reduce((prev, next) => {
        return prev + next;
      });
      state.option.series[0].data.map((item, index) => {
        item.value = resValues[index];
        item.name = resKeys[index];
      });
    },
  },
  actions: {
    async findTotal({ commit }) {
      return asyncAndCommit("/total", "findTotal", commit);
    },
  },
  state: {
    resValues: [],
    total: 0,
    option: {
      color: ["#6236ff", "#fac223", "#df2020", "#6dd400", "#c4bfdf"],
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: 10,
        data: ["1", "2", "3", "4", "5"],
      },
      series: [
        {
          radius: ["90%", "55%"],
          center: ["50%", "50%"],
          hoverAnimation: false, //鼠标移入变大
          type: "pie",
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: true,
          },
          emphasis: {
            label: {
              formatter: "{c}",
              show: true,
              fontSize: 45,
              fontWeight: "bold",
            },
          },
          name: "数据模型",
          data: [
            { name: "1", value: 10 },
            { name: "2", value: 10 },
            { name: "3", value: 10 },
            { name: "4", value: 10 },
            { name: "5", value: 10 },
          ],
        },
        // 边框的设置
        {
          radius: ["85%", "85%"],
          center: ["50%", "50%"],
          hoverAnimation: false, //鼠标移入变大
          type: "pie",
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          animation: false,
          data: [
            {
              value: 1,
              itemStyle: {
                color: "rgba(250,250,250,0.3)",
              },
            },
          ],
        },
        {
          name: "外边框",
          type: "pie",
          hoverAnimation: false, //鼠标移入变大
          center: ["50%", "50%"],
          radius: ["100%", "100%"],
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          animation: false,
          data: [
            {
              value: 1,
              name: "12",
              itemStyle: {
                normal: {
                  borderWidth: 2,
                  borderColor: "#dbd8ea",
                },
              },
            },
          ],
        },
      ],
    },
  },
  namespaced: true,
};

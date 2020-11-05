<template>
  <div>
    <a-page-header
      title="Malfunction"
      sub-title="Information"
      @back="backToGo"
    />
    <a-form class="mt-3" :label-col="{ span: 3 }" :wrapperCol="{ span: 14 }">
      <a-form-item label="optionName" v-bind="validateInfos.optionName">
        <a-input
          v-model:value="malo.optionName"
          placeholder="Please Change optionName"
        ></a-input>
      </a-form-item>
      <a-form-item label="model">
        <a-input :placeholder="model.modelName" :disabled="model.id" />
      </a-form-item>
      <a-form-item label="malfunction" v-bind="validateInfos.malfunctionId">
        <a-select
          placeholder="Please Change classify"
          class="w-25"
          v-model:value="malo.malfunctionId"
          @dropdownVisibleChange="handleSelect"
        >
          <a-select-option
            :label="item.title"
            :value="item.id"
            v-for="item in malfunctionOptions"
            :key="item.id"
          >
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="ratio" v-bind="validateInfos.ratio">
        <a-slider
          v-model:value="malo.ratio"
          :min="1"
          :max="100"
          :tip-formatter="formatter"
        />
      </a-form-item>
      <a-form-item label="action" v-if="!id">
        <a-button
          class="w-25 mr-4"
          style="height:3.25rem;"
          type="primary"
          @click="onSubmit"
        >
          Create
        </a-button>
        <a-button class="w-25" style="height:3.25rem;" @click="onCancel">
          Cancel
        </a-button>
      </a-form-item>
      <a-form-item label="action" v-else>
        <a-button
          class="w-25"
          style="height:3.25rem;"
          type="primary"
          @click="onUpdate"
        >
          Update
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import store from "@/store";
import { MalfunctionProp } from "@/store/malfunction";
import { ModelProps } from "@/store/model";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useForm } from "@ant-design-vue/use";
import { message } from "ant-design-vue";
export default defineComponent({
  name: "MaloEdit",
  props: {
    modelId: Number,
  },
  setup(props) {
    const { resetFields, validate, validateInfos } = useForm(
      reactive(store.state.malo.malo),
      reactive(store.state.malo.vRules)
    );
    const num = ref(0);
    const malo = computed(() => store.state.malo.malo);
    const model = ref<ModelProps>({});
    const malfunctionOptions = ref<MalfunctionProp[]>([]);
    const onCancel = () => {
      resetFields();
    };
    const backToGo = () => {
      router.go(-1);
    };
    const formatter = (value: string) => {
      return `${value}%`;
    };
    const handleSelect = async (open: boolean) => {
      num.value++;
      if (open === true && num.value <= 1) {
        await store.dispatch("malo/findModelMalfunctions", model.value.id);
        malfunctionOptions.value = store.state.malo.malfunctionOptions;
      }
    };
    const onSubmit = () => {
      validate()
        .then(async () => {
          await store.dispatch("malo/createMalo", malo.value);
          await store.commit("malo/clearMalo");
          router.push("/model");
        })
        .catch(() => {
          message.error("Please check the data you want to pass");
        });
    };
    const changeMalfId = (e: number) => {
      store.commit("malo/changeMalfId", e);
    };
    onMounted(async () => {
      if (props.modelId) {
        store.commit("malo/changeModelId", props.modelId);
        await store.dispatch("model/findModel", props.modelId);
        model.value = store.state.model.model;
      }
    });
    return {
      backToGo,
      formatter,
      handleSelect,
      malo,
      model,
      malfunctionOptions,
      onCancel,
      validateInfos,
      onSubmit,
      changeMalfId,
    };
  },
});
</script>
<style lang="scss">
.ant-slider {
  margin-top: 1.25rem;
}
</style>

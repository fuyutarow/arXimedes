import Vue from 'vue';
import axiosbase, {AxiosStatic} from 'axios';

const axios = axiosbase.create({
    baseURL: 'https://export.arxiv.org/api',
});
Vue.prototype.$http = axios;

declare module 'vue/types/vue' {
    interface Vue {
        $http: AxiosStatic;
    }
}

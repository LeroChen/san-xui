/**
 * @file demos/xui-voice.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Button from 'inf-ui/x/components/Button';

import Row from './Row';
import Recorder from './voice';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-button icon="voice" on-click="start">Start</xui-button>
    <strong class="large">
    TEXT: {{voiceText}}
    </strong>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-button': Button
    },
    initData() {
        return {
            voiceText: null
        };
    },
    attached() {
        if (!Recorder.support()) {
            return;
        }
        Recorder.addStyle();
    },

    start() {
        Recorder.init({url: 'https://sp3.baidu.com/6qUDsjip0QIZ8tyhnq/echo.fcgi'})
            .done(recorder => {
                recorder.openUI();
                recorder.onfinish(t => {
                    const e = t.content.item[0];
                    const n = t && t.result ? t.result.corpus_no : '';
                    this.data.set('voiceText', e + ' / ' + n);
                    // console.log(e, n);
                    // changeUrl("wd=" + encodeURIComponent(e) + "&rsv_voice=1&hsug_mtype=2&rsv_vcorpus=" + encodeURIComponent(n)),
                    // bds.comm.lastVoiceQuery = e
                });
            })
            .fail(() => alert('不能获得麦克风的权限'));
    }
});

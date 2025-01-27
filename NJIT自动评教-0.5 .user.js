// ==UserScript==
// @name         NJIT自动评教
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  为教师评价页面自动勾选单选框
// @match        *://jwjxnew.njit.edu.cn/jwglxt/xspjgl*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('[自动评价脚本] 已加载');

    // 用于每隔1秒检测一次页面上的评价题目
    setInterval(() => {
        const rows = document.querySelectorAll('tr.tr-xspj');
        if (!rows || rows.length === 0) {
            return;
        }

        // 统计尚未勾选的题目数量
        let unselectedCount = 0;
        rows.forEach((row) => {
            const radios = row.querySelectorAll('input[type="radio"]');
            const hasChecked = [...radios].some(r => r.checked);
            if (!hasChecked) {
                unselectedCount++;
            }
        });

        if (unselectedCount > 0) {
            console.log(`[自动评价脚本] 检测到 ${unselectedCount} 组尚未勾选，准备自动勾选...`);

            // 依次为所有行勾选
            rows.forEach((row, index) => {
                const feiChangManyi = row.querySelector('input[data-dyf="95"]'); // 非常满意
                const biJiaoManyi   = row.querySelector('input[data-dyf="85"]'); // 比较满意

                if (index < rows.length - 1) {
                    // 前面所有行 → 选非常满意
                    feiChangManyi?.click();
                } else {
                    // 最后一行 → 选比较满意
                    biJiaoManyi?.click();
                }
            });
        }
    }, 1000);
})();

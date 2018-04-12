/**
 * @description: 传入一个相对当前页面的相对路径获取此文件相对于页面的绝对路径;
 * @param { String } path: 文件的相对路径;
 * @returns { String } 返回绝对路径字符串;
 */
function getAbsoluteUrl(path) {
    var a = document.createElement('A');
    a.href = path;
    return a.href;
}
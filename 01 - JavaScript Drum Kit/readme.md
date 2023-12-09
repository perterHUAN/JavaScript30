## 解决方案
1. 在window对象上注册keydown事件。当keydown事件触发时
    1. 查看keycode，根据keycode查找对应元素(key元素和audio元素）。
    2. 设置audio元素的currentTime为0，并调用play播放音乐。
    3. key元素的classList添加playing类名。
2. 在每个key元素上注册transitionend事件。当transitioned事件触发时
    1. 对应key元素的classList中移除playing类名。



## 知识点
1. `HTMLElement.dataset`访问一个元素dataset属性
2. `document.querySelector`返回的是`NodeList`，不是Array，不能使用Array的方法，使用`Array.from`转换成`Array`
3. `Element.classList`是一个只读属性，但是有`add`、`remove`、`replace`、`contain`方法。
    * 重复向classList中添加相同的类名只会保留一个。
    * 删除不存在的类名也不会报错。
4. `<audio>`
    * `play`方法，播放音乐
    * `currentTime`
        * 当前音频播放的时间
        * 可以通过它改变音频播放的时间
    * `getStartTime`
        * 获取音频开始播放的时间
5. `keyboardEvent`
    * 属性
        * `.key`
        * `.keyCode` 现在已经被启用了
        * `.code`
    * 次序
        * 首先触发`keydown`
        * 如果生成的字符插入到`<input>`、`<textarea>`或`HTMLElement.contentEditable`为`true`的元素，还会产生`beforeinput`、`input`事件。
        * 最后触发`keyup`
6. `TransitionEvent`
    * 属性
        * `.propertyName`
    * 类型
        * `transitionend`
        * `transitionrun`
        * `transitionstart`

## 问题
长按之后，为什么playing类名没有从classList中移除呢？
/**
* keyMirror这个方法非常的有用，它可以帮助我们轻松创建与键值key相等的常量。
* */


import keyMirror from 'fbjs/lib/keyMirror'

export default keyMirror({
    ADD_ITEM: null,
    DELETE_ITEM: null,
    DELETE_ALL: null,
    FILTER_ITEM: null
})

// 等于
// export const ADD_ITEM = 'ADD_ITEM';
// export const DELETE_ITEM = 'DELETE_ITEM';
// export const DELETE_ALL = 'DELETE_ALL';
// export const FILTER_ITEM = 'FILTER_ITEM';
import mitt from 'mitt'

const emitter = mitt();

export default emitter

// 这样会是 暴露一个对象，对象内还有一个对象emitter
// export default {
//     emitter: emitter
// }
